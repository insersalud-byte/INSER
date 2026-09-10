(function initHighFlowSimulator() {
  const root = document.getElementById('highFlowSimulator');
  if (!root || !window.HighFlowModel) return;

  const byId = id => document.getElementById(id);
  const controls = {
    flow: byId('hfFlow'), fio2: byId('hfFio2'), temperature: byId('hfTemp'),
    demand: byId('hfDemand'), mouth: byId('hfMouth'), cannulaFit: byId('hfFit'),
  };
  let scenario = window.HighFlowModel.getScenario('pneumonia');
  let fault = 'none';
  const history = { spo2: [], rr: [], flow: [] };

  const setText = (id, value) => { byId(id).textContent = value; };
  const points = (values, min, max, width = 560, height = 90) => values.map((value, index) => {
    const x = values.length === 1 ? 0 : index * width / (values.length - 1);
    const y = height - ((value - min) / (max - min)) * height;
    return `${x.toFixed(1)},${Math.max(0, Math.min(height, y)).toFixed(1)}`;
  }).join(' ');

  function pushHistory(state) {
    history.spo2.push(state.spo2);
    history.rr.push(state.rr);
    history.flow.push(state.effectiveFlow);
    Object.values(history).forEach(series => { if (series.length > 24) series.shift(); });
    byId('hfSpo2Trend').setAttribute('points', points(history.spo2, 75, 100));
    byId('hfRrTrend').setAttribute('points', points(history.rr, 10, 45));
    byId('hfFlowTrend').setAttribute('points', points(history.flow, 0, 80));
  }

  function render() {
    const state = window.HighFlowModel.calculateHighFlowState({
      flow: controls.flow.value,
      fio2: controls.fio2.value,
      temperature: controls.temperature.value,
      demand: controls.demand.value,
      mouth: controls.mouth.value,
      cannulaFit: controls.cannulaFit.value,
      baselineSpo2: scenario.baselineSpo2,
      baselineRr: scenario.baselineRr,
      fault,
    });

    setText('hfFlowValue', `${state.flow} L/min`);
    setText('hfFio2Value', `${state.setFio2} %`);
    setText('hfTempValue', `${state.temperature} °C`);
    setText('hfDemandValue', `${state.demand} L/min`);
    setText('hfFitValue', `${controls.cannulaFit.value} %`);
    setText('hfScenarioName', scenario.name);
    setText('hfScenarioDescription', scenario.description);
    setText('hfMonSpo2', `${state.spo2}`);
    setText('hfMonRr', `${state.rr}`);
    setText('hfMonRox', state.rox.toFixed(2).replace('.', ','));
    setText('hfDeliveredFio2', `${state.deliveredFio2}%`);
    setText('hfCoverage', `${state.coverage}%`);
    setText('hfPressure', `${state.estimatedPressure.toFixed(1).replace('.', ',')} cmH₂O`);
    setText('hfAlarmText', state.alarm.message);
    setText('hfClock', new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }));
    root.dataset.alarm = state.alarm.level;
    byId('hfAlarm').className = `hf-alarm ${state.alarm.level}`;
    byId('hfCoverageBar').style.width = `${state.coverage}%`;
    pushHistory(state);
  }

  Object.values(controls).forEach(control => control.addEventListener('input', render));
  root.querySelectorAll('[data-hf-scenario]').forEach(button => button.addEventListener('click', () => {
    root.querySelectorAll('[data-hf-scenario]').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    scenario = window.HighFlowModel.getScenario(button.dataset.hfScenario);
    controls.demand.value = scenario.demand;
    history.spo2.length = history.rr.length = history.flow.length = 0;
    render();
  }));
  root.querySelectorAll('[data-hf-fault]').forEach(button => button.addEventListener('click', () => {
    root.querySelectorAll('[data-hf-fault]').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    fault = button.dataset.hfFault;
    render();
  }));

  render();
  for (let i = 0; i < 11; i += 1) render();
})();
