/* Estación del test de marcha de seis minutos.
 * Flujo en seis pasos: paciente, restricciones y preparación, datos de inicio,
 * prueba minuto a minuto, final y recuperación, resultado e informe.
 * Reemplaza a walk-monitor.js, walk-report.js y walk-compact.js.
 */
(function () {
 'use strict';

 /* ---------- funciones puras (también usadas por los tests) ---------- */
 function predict(p) {
  if (!['hombre', 'mujer'].includes(p.sex) || !Number.isFinite(p.age) || p.age < 40 || p.age > 80 || !Number.isFinite(p.height) || p.height < 100 || p.height > 230 || !Number.isFinite(p.weight) || p.weight < 20 || p.weight > 300) return null;
  const m = p.sex === 'hombre' ? 7.57 * p.height - 5.02 * p.age - 1.76 * p.weight - 309 : 2.11 * p.height - 2.29 * p.weight - 5.78 * p.age + 667;
  return m > 0 ? m : null;
 }
 function stops(events, total) {
  const result = []; let begin = null;
  for (const e of events) {
   if (e.event === 'Inicio de descanso' && begin === null) begin = e.seconds;
   if (e.event === 'Reanudación' && begin !== null) { result.push({ start: begin, end: e.seconds, duration: Math.max(0, e.seconds - begin) }); begin = null; }
  }
  if (begin !== null) result.push({ start: begin, end: total, duration: Math.max(0, total - begin) });
  return result;
 }
 function assess(values, limits) {
  const reasons = [];
  if (values.spo2 != null && values.spo2 < limits.spo2) reasons.push('SpO₂ ' + values.spo2 + '% < ' + limits.spo2 + '%');
  if (values.fc != null && limits.fc != null && values.fc >= limits.fc) reasons.push('FC ' + values.fc + ' lpm ≥ ' + limits.fc + ' lpm');
  return reasons;
 }
 if (typeof module !== 'undefined') module.exports = { predict, stops, assess };
 if (typeof document === 'undefined') return;

 /* ---------- utilidades ---------- */
 const $ = id => document.getElementById(id);
 const fmt = (n, d = 1) => Number(n).toLocaleString('es-AR', { maximumFractionDigits: d });
 const pad = n => String(n).padStart(2, '0');
 const mmss = s => pad(Math.floor(s / 60)) + ':' + pad(s % 60);
 const setText = (id, text) => { const e = $(id); if (e && e.textContent !== text) e.textContent = text; };
 function num(id, min, max, integer) {
  const e = $(id); if (!e) return null;
  const v = e.value.trim(); if (v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) && n >= min && n <= max && (!integer || Number.isInteger(n)) ? n : null;
 }
 function download(name, text) {
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
  const a = document.createElement('a'); a.href = url; a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
 }

 /* ---------- definición de tomas y campos ---------- */
 const FIELDS = { spo2: ['SpO₂ %', 1, 100, 1], fc: ['FC lpm', 1, 300, 1], disnea: ['Borg disnea', 0, 10, .5], fr: ['FR rpm', 1, 100, 1], sis: ['TA sist. mmHg', 20, 300, 1], dia: ['TA diast. mmHg', 10, 200, 1] };
 const FULL = ['spo2', 'fc', 'disnea', 'fr', 'sis', 'dia'], SHORT = ['spo2', 'fc', 'disnea'];
 const STAGES = [['base', 'Inicio'], ['m1', 'Minuto 1'], ['m2', 'Minuto 2'], ['m3', 'Minuto 3'], ['m4', 'Minuto 4'], ['m5', 'Minuto 5'], ['end', 'Final'], ['recovery', 'Recuperación +2 min']];
 const LABEL = Object.fromEntries(STAGES);
 const RESTRICTIONS = [
  { id: 'r_angina', abs: true, text: 'Angina inestable en el último mes' },
  { id: 'r_iam', abs: true, text: 'Infarto de miocardio en el último mes' },
  { id: 'r_fc', abs: false, text: 'FC en reposo mayor de 120 lpm' },
  { id: 'r_pas', abs: false, text: 'TA sistólica en reposo mayor de 180 mmHg' },
  { id: 'r_pad', abs: false, text: 'TA diastólica en reposo mayor de 100 mmHg' },
 ];
 const PREP = [
  { id: 'p_rest', text: 'Reposo sentado de al menos 10 minutos' },
  { id: 'p_track', text: 'Recorrido llano marcado, conos, oxímetro, silla y oxígeno de rescate a mano' },
  { id: 'p_instr', text: 'Instrucciones estandarizadas explicadas; ayudas, oxígeno y medicación habituales anotados' },
 ];

 function input(stage, field) {
  const [title, min, max, step] = FIELDS[field];
  return '<input id="w-' + stage + '-' + field + '" type="number" inputmode="decimal" min="' + min + '" max="' + max + '" step="' + step + '" data-stage="' + stage + '" aria-label="' + LABEL[stage] + ' · ' + title + '">';
 }
 const labelled = (stage, fields) => fields.map(f => '<label>' + FIELDS[f][0] + input(stage, f) + '</label>').join('');
 const check = (item, cls) => '<label class="' + cls + '"><input type="checkbox" id="' + item.id + '"><span>' + item.text + (item.abs === true ? ' <em>absoluta</em>' : item.abs === false ? ' <em>relativa</em>' : '') + '</span></label>';

 $('walkRestrictions').innerHTML = RESTRICTIONS.map(r => check(r, r.abs ? 'abs' : 'rel')).join('');
 $('walkPrep').innerHTML = PREP.map(p => check(p, 'prep')).join('');
 $('walkBaseFields').innerHTML = labelled('base', FULL);
 $('walkGridBody').innerHTML = ['m1', 'm2', 'm3', 'm4', 'm5', 'end'].map(s => '<tr id="wrow-' + s + '"><td>' + (s === 'end' ? '6 · Final' : s.slice(1)) + '</td>' + SHORT.map(f => '<td>' + input(s, f) + '</td>').join('') + '</tr>').join('');
 $('walkEndFields').innerHTML = labelled('end', ['fr', 'sis', 'dia']);
 $('walkRecoveryFields').innerHTML = labelled('recovery', FULL);

 /* ---------- estado ---------- */
 let walk;
 function blank() { walk = { started: null, elapsed: 0, running: false, complete: false, resting: false, rests: 0, events: [], ended: null, symptom: false, history: [], stamps: {} }; }
 blank();
 const elapsed = () => walk.running ? Math.min(360, (Date.now() - walk.started) / 1000) : walk.elapsed;

 function profile() { return { name: $('patientName').value.trim(), age: num('patientAge', 18, 120, true), weight: num('patientWeight', 20, 300), height: num('patientHeight', 100, 230), sex: $('patientSex').value }; }
 function limits() { return { spo2: num('walkSatLimit', 50, 99, true) ?? 80, fc: num('walkFcLimit', 40, 250, true) }; }
 function data(stage) { return Object.fromEntries(FULL.map(f => [f, num('w-' + stage + '-' + f, FIELDS[f][1], FIELDS[f][2])])); }
 function course() {
  const length = num('walkLength', 1, 100, true), laps = num('walkLaps', 0, 200, true), extra = num('walkExtra', 0, 100);
  const ok = length !== null && laps !== null && extra !== null && extra < length;
  setText('walkValidation', ok ? (length < 30 ? 'Recorrido menor de 30 m: no comparable con el procedimiento estándar.' : '') : 'Revisá tramos enteros y metros finales menores que el tramo.');
  $('walkExtra').max = length === null ? 99 : Math.max(0, length - .1);
  return ok ? { length, laps, extra, distance: length * laps + extra } : null;
 }

 /* ---------- validación y alarmas ---------- */
 function validate() {
  const inputs = [...$('walkLab').querySelectorAll('input[type=number]')];
  const invalid = inputs.filter(i => !i.validity.valid);
  inputs.forEach(i => { if (i.validity.valid) i.removeAttribute('aria-invalid'); else i.setAttribute('aria-invalid', 'true'); });
  const badBP = STAGES.some(([s]) => { const v = data(s); return v.sis != null && v.dia != null && v.sis <= v.dia; });
  setText('walkFormError', invalid.length || badBP ? 'Hay valores fuera de rango o una TA sistólica que no supera a la diastólica. Corregilos antes de continuar.' : '');
  return !invalid.length && !badBP;
 }
 function alarms() {
  const messages = [];
  for (const [stage, label] of STAGES) {
   const why = assess(data(stage), limits());
   const row = $('wrow-' + stage) || $('w-' + stage + '-spo2')?.closest('.walk-fields');
   if (row) row.classList.toggle('has-alarm', why.length > 0);
   if (why.length) messages.push(label + ': ' + why.join('; '));
  }
  if (walk.symptom) messages.push('Síntoma de alarma registrado por el operador');
  const box = $('walkAlarm');
  box.classList.toggle('active', messages.length > 0);
  box.textContent = messages.length ? 'ALERTA · detener y evaluar. ' + messages.join(' | ') : '';
  return messages;
 }
 function stamp(stage) {
  walk.stamps[stage] = { hora: new Date().toISOString(), segundosDesdeInicio: walk.started === null ? null : Math.round((Date.now() - walk.started) / 1000), segundosDesdeFinal: walk.ended === null ? null : Math.round((Date.now() - walk.ended) / 1000) };
 }

 /* ---------- condiciones para largar ---------- */
 function readiness() {
  const reasons = [], warnings = [];
  if (PREP.some(p => !$(p.id).checked)) reasons.push('confirmá la preparación del paso 2');
  const abs = RESTRICTIONS.filter(r => r.abs && $(r.id).checked), rel = RESTRICTIONS.filter(r => !r.abs && $(r.id).checked);
  if (abs.length) reasons.push('contraindicación absoluta marcada: no iniciar');
  if (rel.length) warnings.push('Restricción relativa marcada: iniciar sólo con indicación médica y vigilancia reforzada.');
  if (course() === null) reasons.push('revisá el tramo');
  const base = data('base');
  if (base.spo2 === null || base.fc === null) reasons.push('registrá SpO₂ y FC de inicio en el paso 3');
  if (!validate()) reasons.push('corregí los valores marcados');
  return { ok: !reasons.length, reasons, warnings };
 }

 /* ---------- resultado ---------- */
 function update() {
  const p = profile(), pred = predict(p), c = course(), d = c ? c.distance : null;
  const pct = walk.complete && d !== null && pred !== null ? 100 * d / pred : null;
  setText('walkPrediction', pred === null ? (p.age !== null && (p.age < 40 || p.age > 80) ? 'Sin predicho: la ecuación vale para 40 a 80 años. El informe sale igual, descriptivo.' : 'Completá edad, sexo, peso y altura para calcular la distancia predicha.') : 'Distancia predicha de referencia: ' + fmt(pred) + ' m (Enright–Sherrill).');
  setText('walkDistance', d === null ? '—' : fmt(d) + ' m');
  setText('walkPercent', 'Recorrido: ' + (d === null ? 'revisar tramos' : fmt(d) + ' m') + ' · Predicho: ' + (pred === null ? 'no disponible' : fmt(pred) + ' m') + ' · % del predicho: ' + (pct === null ? (walk.complete ? 'sin predicho válido' : 'pendiente de prueba completa') : fmt(pct) + ' %') + (walk.complete && c && c.length !== 30 ? ' · Recorrido no estándar: comparar con cautela.' : ''));
  const list = stops(walk.events, Math.floor(elapsed()));
  setText('walkStopList', list.length ? list.map((s, i) => 'Detención ' + (i + 1) + ': ' + s.duration + ' s (del segundo ' + s.start + ' al ' + s.end + ')').join(' · ') + ' · Total detenido: ' + list.reduce((a, s) => a + s.duration, 0) + ' s.' : 'Sin detenciones registradas.');
  return { p, pred, c, d, pct, list };
 }

 /* ---------- reloj ---------- */
 function tick() {
  const t = elapsed();
  if (walk.running && t >= 360) { walk.elapsed = 360; walk.running = false; walk.complete = true; walk.resting = false; walk.ended = walk.started + 360000; walk.events.push({ seconds: 360, event: 'Fin de seis minutos' }); }
  const left = 360 - Math.floor(t);
  setText('walkClock', mmss(Math.max(0, left)));
  setText('walkStatus', walk.running ? (walk.resting ? 'Detención registrada · el reloj sigue' : 'Prueba en curso') : walk.complete ? 'Seis minutos completados' : walk.elapsed > 0 ? 'Finalizada a los ' + mmss(Math.round(walk.elapsed)) + ' · prueba incompleta' : 'Preparado');
  setText('walkRests', 'Detenciones: ' + walk.rests);
  const started = walk.running || walk.elapsed > 0 || walk.complete;
  const ready = readiness();
  $('walkStart').disabled = started || !ready.ok;
  $('walkRest').disabled = !walk.running; $('walkStop').disabled = !walk.running; $('walkSymptom').disabled = !walk.running;
  $('walkLength').disabled = started;
  $('walkRest').textContent = walk.resting ? 'Reanudar' : 'Detención';
  setText('walkGate', started ? (ready.warnings[0] || '') : ready.ok ? (ready.warnings[0] || 'Todo listo para iniciar.') : 'Para iniciar: ' + ready.reasons.join(' · ') + '.');
  $('walkGate').classList.toggle('warn', ready.warnings.length > 0);
  const c = course();
  setText('lapAdd', '+ vuelta' + (c ? ' · ' + c.length * 2 + ' m' : ''));
  const minute = walk.running ? Math.min(6, Math.floor(t / 60) + 1) : null;
  ['m1', 'm2', 'm3', 'm4', 'm5', 'end'].forEach((s, i) => $('wrow-' + s).classList.toggle('current', minute === i + 1));
  setText('walkPrompt', walk.running ? 'Minuto ' + minute + ' en curso · al cumplirse, anotá SpO₂, FC y Borg en la fila ' + minute + '. Un tramo es una ida; una vuelta son dos tramos.' : walk.ended !== null ? 'Prueba finalizada · completá la fila 6 y los datos del paso 5.' : 'Al iniciar, anotá cada minuto SpO₂, FC y Borg en su fila. Un tramo es una ida; una vuelta son dos tramos.');
  const rec = $('walkRecovery');
  if (walk.ended !== null) {
   const rest = Math.max(0, 120 - Math.floor((Date.now() - walk.ended) / 1000));
   setText('walkRecovery', rest > 0 ? 'Recuperación · ' + mmss(rest) + ' para la toma de +2 minutos' : 'RECUPERACIÓN +2 MIN · registrá ahora SpO₂, FC, Borg, FR y TA y seguí observando hasta la recuperación clínica.');
   rec.classList.toggle('due', rest === 0);
  } else { setText('walkRecovery', 'Recuperación: el reloj de 02:00 arranca solo cuando finaliza la prueba.'); rec.classList.remove('due'); }
  update();
 }

 /* ---------- acciones ---------- */
 $('walkStart').onclick = () => { if (!readiness().ok) return; walk.started = Date.now(); walk.running = true; walk.history.push({ hora: new Date().toISOString(), evento: 'Inicio', limites: limits() }); tick(); $('walkConsole').scrollIntoView({ block: 'start', behavior: 'smooth' }); };
 $('walkRest').onclick = () => { if (!walk.running) return; walk.resting = !walk.resting; if (walk.resting) walk.rests++; walk.events.push({ seconds: Math.round(elapsed()), event: walk.resting ? 'Inicio de descanso' : 'Reanudación' }); tick(); };
 $('walkStop').onclick = () => { if (!walk.running) return; walk.elapsed = elapsed(); walk.running = false; walk.resting = false; walk.ended = Date.now(); walk.events.push({ seconds: Math.round(walk.elapsed), event: 'Finalización anticipada', motivos: alarms() }); tick(); $('walkStep5').scrollIntoView({ block: 'start', behavior: 'smooth' }); };
 $('walkSymptom').onclick = () => { walk.symptom = true; walk.history.push({ hora: new Date().toISOString(), evento: 'Síntoma de alarma' }); alarms(); };
 $('lapAdd').onclick = () => { const n = num('walkLaps', 0, 200, true); if (n !== null && n <= 198) { $('walkLaps').value = n + 2; update(); } };
 $('lapUndo').onclick = () => { const n = num('walkLaps', 0, 200, true); if (n !== null) { $('walkLaps').value = Math.max(0, n - 2); update(); } };
 $('walkReset').onclick = () => {
  if ((walk.running || walk.elapsed > 0) && !confirm('¿Reiniciar el registro de marcha actual? Se borran todos los datos.')) return;
  blank();
  $('walkLab').querySelectorAll('input:not([type=checkbox])').forEach(i => { if (!['walkLength', 'walkSatLimit'].includes(i.id)) i.value = ''; });
  $('walkLab').querySelectorAll('input[type=checkbox]').forEach(i => { i.checked = false; });
  ['walkLaps', 'walkExtra'].forEach(id => { $(id).value = 0; });
  $('patientSex').value = ''; $('walkNotes').value = '';
  $('walkPrintReport')?.remove(); document.body.classList.remove('show-walk-report');
  setText('walkReportStatus', 'Nuevo registro: completá los datos del paciente.');
  validate(); alarms(); tick();
  $('walkStep1').scrollIntoView({ block: 'start', behavior: 'smooth' });
 };
 $('walkLab').addEventListener('input', e => {
  const stage = e.target.dataset && e.target.dataset.stage;
  if (stage) { stamp(stage); validate(); const why = alarms(); if (why.length) walk.history.push({ hora: new Date().toISOString(), limites: limits(), motivos: why }); }
  else if (['walkSatLimit', 'walkFcLimit'].includes(e.target.id)) { validate(); alarms(); walk.history.push({ hora: new Date().toISOString(), evento: 'Cambio de límites', limites: limits() }); }
  else validate();
  update();
 });

 /* ---------- informe ---------- */
 function gather() {
  const r = update();
  if (r.c === null || !validate()) { setText('walkReportStatus', 'Corregí los campos marcados antes de emitir el informe.'); return null; }
  return {
   patient: r.p, date: new Date().toLocaleString('es-AR'), state: $('walkStatus').textContent, complete: walk.complete, seconds: Math.floor(elapsed()),
   distance: r.d, predicted: r.pred, percent: r.pct, length: r.c.length, stops: r.list, notes: $('walkNotes').value,
   restrictions: RESTRICTIONS.filter(x => $(x.id).checked).map(x => x.text + (x.abs ? ' (absoluta)' : ' (relativa)')),
   monitor: { inicio: walk.started === null ? null : new Date(walk.started).toISOString(), final: walk.ended === null ? null : new Date(walk.ended).toISOString(), limites: limits(), registros: STAGES.map(([key, momento]) => ({ momento, datos: data(key), edicion: walk.stamps[key] ?? null })), historialAlarmas: walk.history, alertasRegistradas: alarms(), recuperacion: $('walkRecovery').textContent },
  };
 }
 function textReport(r) {
  return ['INFORME DE MARCHA DE SEIS MINUTOS · INSER SALUD', 'Fecha: ' + r.date, 'Paciente: ' + (r.patient.name || 'No registrado'), 'Edad: ' + (r.patient.age ?? 'NR') + ' años; peso: ' + (r.patient.weight ?? 'NR') + ' kg; altura: ' + (r.patient.height ?? 'NR') + ' cm; sexo ecuación: ' + (r.patient.sex || 'NR'), 'Restricciones marcadas: ' + (r.restrictions.join('; ') || 'ninguna'), 'Estado: ' + r.state, 'Tiempo: ' + r.seconds + ' s; tramo: ' + r.length + ' m', 'Recorrió ' + fmt(r.distance) + ' m.', 'Predicho Enright–Sherrill: ' + (r.predicted === null ? 'no disponible' : fmt(r.predicted) + ' m'), 'Porcentaje del predicho: ' + (r.percent === null ? 'no calculado: prueba incompleta o datos fuera de aplicación' : fmt(r.percent) + '%'), 'Detenciones: ' + JSON.stringify(r.stops), 'Observaciones: ' + (r.notes || 'No registradas'), 'Signos, horarios y alertas: ' + JSON.stringify(r.monitor, null, 2), 'Referencia: https://pubmed.ncbi.nlm.nih.gov/9817683/', 'Registro de apoyo; requiere revisión y firma profesional.'].join('\n');
 }
 function charts(records, container) {
  const ns = 'http://www.w3.org/2000/svg', stages = ['Inicio', '1 min', '2 min', '3 min', '4 min', '5 min', 'Final', 'Rec. +2 min'];
  function svgNode(tag, attrs, text, parent) { const node = document.createElementNS(ns, tag); Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, String(v))); if (text !== null) node.textContent = text; parent.appendChild(node); return node; }
  for (const [key, title, unit, color] of [['spo2', 'Saturación de oxígeno', '%', '#08786e'], ['disnea', 'Borg de disnea', 'puntos', '#865211'], ['fc', 'Frecuencia cardíaca', 'lpm', '#245aa0']]) {
   const values = records.map(row => row.datos[key]), valid = values.filter(v => v !== null);
   const low = key === 'disnea' ? 0 : key === 'spo2' ? Math.min(80, ...valid.map(v => Math.floor(v / 10) * 10)) : 0;
   const high = key === 'disnea' ? 10 : key === 'spo2' ? 100 : Math.max(100, ...valid.map(v => Math.ceil(v / 20) * 20));
   const figure = document.createElement('figure'); figure.className = 'report-chart'; container.appendChild(figure);
   const caption = document.createElement('figcaption'); caption.textContent = title + ' (' + unit + ')'; figure.appendChild(caption);
   const svg = svgNode('svg', { viewBox: '0 0 700 158', role: 'img', 'aria-label': title + ': ' + values.map((v, i) => stages[i] + ' ' + (v === null ? 'sin dato' : v + ' ' + unit)).join(', ') }, null, figure);
   const x = i => 52 + i * 85, y = v => 112 - (v - low) / (high - low) * 84;
   for (let i = 0; i <= 2; i++) { const v = low + (high - low) * i / 2; svgNode('line', { x1: 48, y1: y(v), x2: 650, y2: y(v), stroke: '#c9d7da' }, null, svg); svgNode('text', { x: 40, y: y(v) + 4, 'text-anchor': 'end', fill: '#364951', 'font-size': 12 }, fmt(v), svg); }
   values.forEach((v, i) => {
    svgNode('text', { x: x(i), y: 139, 'text-anchor': 'middle', fill: '#364951', 'font-size': 11 }, stages[i], svg);
    if (v === null) { svgNode('text', { x: x(i), y: 154, 'text-anchor': 'middle', fill: '#68777d', 'font-size': 10 }, 'Sin dato', svg); return; }
    if (i > 0 && values[i - 1] !== null) svgNode('line', { class: 'data-segment', x1: x(i - 1), y1: y(values[i - 1]), x2: x(i), y2: y(v), stroke: color, 'stroke-width': 2.5 }, null, svg);
    svgNode('circle', { cx: x(i), cy: y(v), r: 4, fill: color }, null, svg);
    svgNode('text', { x: x(i), y: y(v) - 9, 'text-anchor': 'middle', fill: color, 'font-size': 12, 'font-weight': 'bold' }, fmt(v), svg);
   });
   const comparison = document.createElement('p'); comparison.className = 'chart-comparison'; const a = values[0], b = values[values.length - 1];
   comparison.textContent = a === null || b === null ? 'Comparación inicio–recuperación: faltan datos.' : 'Inicio: ' + fmt(a) + ' ' + unit + ' → Recuperación: ' + fmt(b) + ' ' + unit + ' · Cambio: ' + (b - a > 0 ? '+' : '') + fmt(b - a) + ' ' + (key === 'spo2' ? 'puntos porcentuales' : unit) + '.'; figure.appendChild(comparison);
  }
 }
 function preview(r) {
  let panel = $('walkPrintReport'); if (!panel) { panel = document.createElement('section'); panel.id = 'walkPrintReport'; document.body.appendChild(panel); } panel.replaceChildren();
  function add(tag, text, parent = panel) { const node = document.createElement(tag); node.textContent = text; parent.appendChild(node); return node; }
  const bar = add('div', ''); bar.className = 'report-actions'; const print = add('button', 'Imprimir / Guardar como PDF', bar); print.onclick = () => window.print(); const close = add('button', 'Cerrar informe', bar); close.onclick = () => document.body.classList.remove('show-walk-report');
  add('h1', 'INSERSALUD.COM · ACADEMIA');
  add('h2', r.patient.name || 'Paciente no identificado');
  add('p', 'Informe de test de marcha de seis minutos · ' + r.date);
  add('p', 'Edad: ' + (r.patient.age ?? 'NR') + ' años · Peso: ' + (r.patient.weight ?? 'NR') + ' kg · Altura: ' + (r.patient.height ?? 'NR') + ' cm · Sexo utilizado en la ecuación: ' + (r.patient.sex || 'NR'));
  add('p', 'Restricciones marcadas antes de la prueba: ' + (r.restrictions.join('; ') || 'ninguna') + '.');
  add('h2', 'Resultado'); add('p', 'Recorrió ' + fmt(r.distance) + ' metros en ' + r.seconds + ' segundos. ' + r.state + '.');
  add('p', 'Distancia predicha: ' + (r.predicted === null ? 'no disponible' : fmt(r.predicted) + ' metros') + '. Porcentaje del predicho: ' + (r.percent === null ? 'no calculable para una prueba incompleta o sin predicho válido' : fmt(r.percent) + '%') + '.');
  add('p', 'Longitud del tramo: ' + r.length + ' m.' + (r.length !== 30 ? ' Recorrido no estándar: interpretar la comparación con cautela.' : ''));
  add('p', 'El predicho es una referencia de adultos sanos, no una meta obligatoria ni un diagnóstico. Ecuación Enright–Sherrill (1998), 40–80 años. Fuera de ese rango o sin datos suficientes no se extrapola.');
  add('h2', 'Detenciones durante la marcha');
  if (!r.stops.length) add('p', 'No se registraron detenciones.');
  else { r.stops.forEach((s, i) => add('p', 'Detención ' + (i + 1) + ': inicio ' + s.start + ' s; fin ' + s.end + ' s; duración ' + s.duration + ' s.')); add('p', 'Tiempo total detenido: ' + r.stops.reduce((a, s) => a + s.duration, 0) + ' segundos. El reloj de la prueba continuó durante las pausas.'); }
  add('h2', 'Signos y Borg de disnea');
  const table = add('table', ''), thead = add('thead', '', table), tr = add('tr', '', thead);
  ['Momento', 'SpO₂ %', 'FC lpm', 'Borg', 'FR rpm', 'TA mmHg'].forEach(v => add('th', v, tr));
  const body = add('tbody', '', table);
  r.monitor.registros.forEach(row => { const tr = add('tr', '', body), v = row.datos; [row.momento, v.spo2 ?? 'NR', v.fc ?? 'NR', v.disnea ?? 'NR', v.fr ?? 'NR', (v.sis ?? 'NR') + '/' + (v.dia ?? 'NR')].forEach(t => add('td', String(t), tr)); });
  add('p', 'NR: no registrado. Registros manuales; no medición automática. ' + r.monitor.recuperacion);
  const graphSection = add('section', ''); graphSection.className = 'report-graphs'; add('h2', 'Evolución durante la prueba y recuperación', graphSection); add('p', 'Puntos: valores registrados. Huecos: sin datos. El eje horizontal muestra etapas del registro, no intervalos de tiempo proporcionales. Final corresponde al momento de detención; recuperación, al control programado a +2 minutos.', graphSection); charts(r.monitor.registros, graphSection);
  add('h2', 'Observaciones'); add('p', r.notes || 'No registradas.');
  add('h2', 'Seguridad'); add('p', 'Límites configurados: SpO₂ <' + r.monitor.limites.spo2 + '%; FC ' + (r.monitor.limites.fc === null ? 'sin límite numérico' : '>=' + r.monitor.limites.fc + ' lpm') + '.');
  const alerts = [...new Set(r.monitor.historialAlarmas.flatMap(h => h.motivos || [h.evento || '']))].filter(Boolean); add('p', alerts.length ? alerts.join(' · ') : 'No se registraron alertas. Esto no certifica seguridad clínica.');
  add('p', 'Referencia: Enright PL, Sherrill DL. Am J Respir Crit Care Med. 1998;158:1384–1387. DOI: 10.1164/ajrccm.158.5.9710086.');
  add('p', 'Registro generado como apoyo documental. Requiere revisión profesional; no constituye diagnóstico automático.'); add('p', 'Profesional / firma: _______________________________________');
  document.body.classList.add('show-walk-report'); panel.scrollTop = 0; close.focus();
 }
 $('walkPdf').onclick = () => { if (walk.running || walk.started === null) { setText('walkReportStatus', 'Finalizá la prueba antes de preparar el informe.'); return; } const r = gather(); if (r) preview(r); };
 $('walkExport').onclick = () => { const r = gather(); if (r) download('registro-marcha.txt', textReport(r)); };

 validate(); alarms(); tick();
 setInterval(tick, 250);
})();
