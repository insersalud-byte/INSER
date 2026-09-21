(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.TecmeOaf = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  const limits = { flow: [1, 80], fio2: [21, 100] }; // Manual TECME, ADL, tabla 17-7, p. 116.
  const bounded = (value, range, fallback) => Number.isFinite(Number(value))
    ? Math.max(range[0], Math.min(range[1], Math.round(Number(value)))) : fallback;
  function initial() {
    return { flow: 20, fio2: 50, running: false, elapsed: 0, pending: null, fault: 'none', locked: false, muted: 0 };
  }
  function reduce(state, action) {
    const next = { ...state };
    if (state.locked && ['edit', 'start', 'stop', 'restore', 'mute'].includes(action.type)) return next;
    switch (action.type) {
      case 'edit':
        if (limits[action.key]) next.pending = { key: action.key, value: state[action.key] };
        break;
      case 'adjust':
        if (next.pending && limits[next.pending.key]) next.pending = {
          ...next.pending, value: bounded(action.value, limits[next.pending.key], next.pending.value)
        };
        break;
      case 'rotate':
        if (next.pending && limits[next.pending.key]) next.pending = {
          ...next.pending, value: bounded(next.pending.value + Number(action.delta), limits[next.pending.key], next.pending.value)
        };
        break;
      case 'lock': next.locked = !state.locked; break;
      case 'mute': next.muted = state.muted > 0 ? 60 : 30; break;
      case 'confirm':
        if (next.pending?.key === 'stop') next.running = false;
        else if (limits[next.pending?.key]) next[next.pending.key] = next.pending.value;
        next.pending = null;
        break;
      case 'cancel': next.pending = null; break;
      case 'start': if (!next.pending) next.running = true; break;
      case 'stop': if (next.running) next.pending = { key: 'stop' }; break;
      case 'restore': if (!next.running && !next.pending) next.elapsed = 0; break;
      case 'tick': {
        const seconds = Math.max(0, Number(action.seconds) || 0);
        if (next.running) next.elapsed += seconds;
        next.muted = Math.max(0, next.muted - seconds);
        break;
      }
      case 'fault':
        if (['none', 'obstruction', 'disconnection', 'oxygen-low', 'oxygen-high', 'apnea', 'temperature'].includes(action.value)) next.fault = action.value;
        break;
    }
    if (observe(next).alarm) next.locked = false;
    return next;
  }
  function observe(state) {
    const active = state.running;
    // Scenarios are scripted teaching events, not the manufacturer's pneumatic/alarm firmware.
    const flow = active ? state.flow : 0;
    const oxygen = active ? (state.fault === 'oxygen-low' ? Math.max(21, state.fio2 - 10)
      : state.fault === 'oxygen-high' ? Math.min(100, state.fio2 + 10) : state.fio2) : null;
    const pressure = !active ? 0 : state.fault === 'disconnection' ? 0
      : state.fault === 'obstruction' ? 25 : Math.round(state.flow * 0.12 * 10) / 10;
    let alarm = null;
    if (active && state.fault === 'obstruction') alarm = 'Presión máxima';
    if (active && state.fault === 'oxygen-low' && oxygen < state.fio2) alarm = 'Concentración de oxígeno baja';
    if (active && state.fault === 'oxygen-high' && oxygen > state.fio2) alarm = 'Concentración de oxígeno alta';
    return { flow, oxygen, pressure, alarm, reachesPatient: active && state.fault !== 'disconnection' };
  }
  function rox(spo2, fio2, rr) {
    if (![spo2, fio2, rr].every(x => Number.isFinite(x)) || spo2 < 50 || spo2 > 100 || fio2 < 21 || fio2 > 100 || rr <= 0 || rr > 80) return null;
    return (spo2 / (fio2 / 100)) / rr;
  }
  return { initial, reduce, observe, rox, limits };
});
