(function () {
  'use strict';
  const model = window.SleepLab;
  const $ = id => document.getElementById(id);
  const scoreFields = Array.from(document.querySelectorAll('#ess-form fieldset'));
  const bands = {
    habitual: 'Rango habitual de referencia',
    leve: 'Somnolencia excesiva leve',
    moderada: 'Somnolencia excesiva moderada',
    intensa: 'Somnolencia excesiva intensa'
  };
  function renderEpworth() {
    const result = model.scoreEpworth(scoreFields.map(field => {
      const selected = field.querySelector('input:checked');
      return selected ? Number(selected.value) : null;
    }));
    $('ess-count').textContent = `${result.answered} de 8 situaciones${result.answered === 8 ? ' · completo ✓' : ''}`;
    $('ess-progress').value = result.answered;
    $('ess-total').textContent = result.total ?? '—';
    $('ess-meter').style.width = result.total === null ? '0%' : `${result.total / 24 * 100}%`;
    const remaining = 8 - result.answered;
    $('ess-band').textContent = result.total === null
      ? `${remaining === 1 ? 'Falta 1 situación' : 'Faltan ' + remaining + ' situaciones'}`
      : bands[result.band];
    $('ess-message').textContent = result.total === null
      ? 'Elegí una probabilidad en cada situación. El resultado aparecerá al completar las ocho.'
      : result.total <= 10
        ? 'Este puntaje no descarta AOS ni otros trastornos. Interpretar síntomas y contexto; no usarlo como autorización para conducir.'
        : 'El resultado orienta a evaluar la somnolencia y sus causas. No indica la gravedad de apnea ni el tratamiento que corresponde.';
  }
  scoreFields.forEach(field => field.addEventListener('change', renderEpworth));
  $('ess-form').addEventListener('submit', event => event.preventDefault());
  $('ess-form').addEventListener('reset', () => {
    $('ess-example-note').hidden = true;
    // Wait for the native reset default action before reading the controls.
    setTimeout(renderEpworth, 0);
  });
  $('ess-example').addEventListener('click', () => {
    [2, 1, 2, 3, 1, 1, 2, 2].forEach((value, i) => {
      scoreFields[i].querySelector(`input[value="${value}"]`).checked = true;
    });
    $('ess-example-note').hidden = false;
    renderEpworth();
  });
  const sbFields = Array.from(document.querySelectorAll('#sb-form fieldset'));
  const sbBands = { bajo: 'Riesgo bajo de AOS', intermedio: 'Riesgo intermedio de AOS', alto: 'Riesgo alto de AOS' };
  function renderStopBang() {
    if (!sbFields.length) return;
    const result = model.scoreStopBang(sbFields.map(field => {
      const selected = field.querySelector('input:checked');
      return selected ? Number(selected.value) : null;
    }));
    $('sb-total').textContent = result.total ?? '—';
    $('sb-meter').style.width = result.total === null ? '0%' : `${result.total / 8 * 100}%`;
    const remaining = 8 - result.answered;
    $('sb-band').textContent = result.total === null
      ? (remaining === 1 ? 'Falta 1 situación' : `Faltan ${remaining} situaciones`)
      : sbBands[result.band];
    $('sb-message').textContent = result.total === null
      ? 'Preguntale al paciente y marcá Sí o No en cada fila. El riesgo aparece al completar las ocho.'
      : result.band === 'bajo'
        ? 'Riesgo bajo no descarta AOS: si hay pausas observadas, comorbilidad cardiovascular o somnolencia con riesgo, la sospecha clínica manda.'
        : result.band === 'intermedio'
          ? 'Riesgo intermedio: revisá los ítems STOP. Con dos o más de ellos más sexo masculino, IMC mayor de 35 o cuello grande (más de 43 cm en hombres o 41 cm en mujeres), se considera riesgo alto.'
          : result.highByRule && result.total <= 4
            ? 'Riesgo alto por regla: dos o más ítems STOP más sexo masculino, IMC mayor de 35 o cuello grande. Corresponde priorizar la evaluación clínica y el estudio de sueño.'
            : 'Riesgo alto: corresponde priorizar la evaluación clínica y el estudio de sueño. El cuestionario no mide gravedad ni indica tratamiento.';
  }
  sbFields.forEach(field => field.addEventListener('change', renderStopBang));
  if ($('sb-form')) {
    $('sb-form').addEventListener('submit', event => event.preventDefault());
    $('sb-form').addEventListener('reset', () => { $('sb-example-note').hidden = true; setTimeout(renderStopBang, 0); });
    $('sb-example').addEventListener('click', () => {
      [1, 1, 1, 1, 0, 1, 0, 1].forEach((value, i) => { sbFields[i].querySelector(`input[value="${value}"]`).checked = true; });
      $('sb-example-note').hidden = false;
      renderStopBang();
    });
  }
  function renderIndex() {
    const events = $('event-count'); const minutes = $('event-minutes');
    const value = events.value !== '' && minutes.value !== '' && events.checkValidity() && minutes.checkValidity()
      ? model.eventIndex(Number(events.value), Number(minutes.value)) : null;
    if (value === null) {
      $('index-result').textContent = 'Completá valores válidos: eventos enteros no negativos y tiempo mayor que cero, dentro de los límites del ejercicio.';
      return;
    }
    const type = $('index-kind').value === 'sleep' ? 'IAH' : 'REI';
    const band = model.severity(value);
    const label = band === 'bajo-umbral' ? 'por debajo de 5 eventos/h' : `intervalo convencional ${band}`;
    $('index-result').textContent = `${type} del ejemplo: ${value.toLocaleString('es-AR', { maximumFractionDigits: 2 })} eventos/h · ${label}. ${type === 'REI' ? 'El denominador es tiempo de monitorización, no necesariamente de sueño. ' : ''}No establece un diagnóstico. La categoría usa el valor sin redondear.`;
  }
  ['event-count', 'event-minutes'].forEach(id => $(id).addEventListener('input', renderIndex));
  $('index-kind').addEventListener('change', renderIndex);

  const polySetup = $('poly-setup');
  const setupLabels = {
    batteries: 'revisar equipo y pilas',
    belt: 'centrar cinturón y esfuerzo',
    cannula: 'colocar la cánula nasal',
    oximeter: 'colocar la oximetría',
    indicators: 'iniciar y confirmar luces verdes'
  };
  function renderPolygraphSetup() {
    if (!polySetup) return;
    const values = Object.fromEntries(Array.from(polySetup.querySelectorAll('[data-setup]')).map(input => [input.dataset.setup, input.checked]));
    const result = model.evaluatePolygraphSetup(values);
    $('poly-setup-count').textContent = `${result.completed} / 5`;
    $('poly-setup-state').textContent = result.ready ? 'Listo para iniciar la práctica' : 'Instalación pendiente';
    $('poly-setup-message').textContent = result.ready
      ? 'Los cinco controles están completos. En un estudio real todavía corresponde verificar instrucciones, seguridad y protocolo local.'
      : `Próximo control: ${setupLabels[result.missing[0]]}.`;
    polySetup.closest('.setup-grid').querySelector('.setup-status').classList.toggle('ready', result.ready);
  }
  if (polySetup) {
    polySetup.querySelectorAll('[data-setup]').forEach(input => input.addEventListener('change', renderPolygraphSetup));
    polySetup.addEventListener('reset', () => setTimeout(renderPolygraphSetup, 0));
  }

  const polyCaseSelect = $('poly-case');
  const solvedPolygraphCases = new Set();
  function tracePoints(values, mapper) {
    return values.map((value, index) => {
      const x = 105 + index * 775 / (values.length - 1);
      return `${x.toFixed(1)},${mapper(value).toFixed(1)}`;
    }).join(' ');
  }
  function renderPolygraphScore() {
    $('poly-score').textContent = `${solvedPolygraphCases.size} / ${model.polygraphCases.length} RESUELTOS`;
  }
  function formatMinutes(total) {
    if (!Number.isFinite(total)) return '—';
    const hours = Math.floor(total / 60);
    const minutes = total % 60;
    return `${hours} h ${String(minutes).padStart(2, '0')} min`;
  }
  function reportValue(id, value) {
    const element = $(id);
    if (element) element.textContent = value;
  }
  function reportClockLabels(recordingWindow) {
    const [startText, endText] = String(recordingWindow).split('-');
    const toMinutes = value => {
      const [hours, minutes] = value.split(':').map(Number);
      return hours * 60 + minutes;
    };
    const start = toMinutes(startText);
    let end = toMinutes(endText);
    if (end <= start) end += 24 * 60;
    const format = minutes => {
      const wrapped = Math.round(minutes) % (24 * 60);
      return `${String(Math.floor(wrapped / 60)).padStart(2, '0')}:${String(wrapped % 60).padStart(2, '0')}`;
    };
    return [0, 0.25, 0.5, 0.75, 1].map(fraction => format(start + (end - start) * fraction));
  }
  function renderReportOverview(item) {
    const report = item.report;
    const svgNamespace = 'http://www.w3.org/2000/svg';
    const marks = $('poly-report-event-marks');
    const rowY = { obstructive: 59, central: 84, mixed: 109, hypopneas: 134, desaturations: 159, snoring: 184 };
    const fragment = document.createDocumentFragment();
    Object.entries(report.overview.events).forEach(([kind, positions]) => {
      positions.forEach(position => {
        const line = document.createElementNS(svgNamespace, 'line');
        const x = 120 + position * 760 / 120;
        line.setAttribute('x1', x.toFixed(1));
        line.setAttribute('x2', x.toFixed(1));
        line.setAttribute('y1', String(rowY[kind] - 7));
        line.setAttribute('y2', String(rowY[kind] + 7));
        line.classList.add('report-event-mark', kind);
        fragment.append(line);
      });
    });
    marks.replaceChildren(fragment);
    const overviewPoints = (values, mapper) => values.map((value, index) => {
      const x = 120 + index * 760 / (values.length - 1);
      return `${x.toFixed(1)},${mapper(value).toFixed(1)}`;
    }).join(' ');
    const spo2Y = value => Math.max(350, Math.min(465, 465 - (value - 70) * 2.88));
    $('poly-report-pulse-line').setAttribute('points', overviewPoints(report.overview.pulse, value => Math.max(220, Math.min(330, 330 - (value - 40) * .92))));
    $('poly-report-spo2-line').setAttribute('points', overviewPoints(report.overview.spo2, spo2Y));
    reportValue('poly-report-spo2-baseline', `Saturación basal ${report.spo2.baseline}%`);
    reportValue('poly-report-spo2-average', `Saturación promedio ${report.spo2.average}%`);
    const clockLabels = reportClockLabels(report.recordingWindow);
    ['start', 'quarter', 'middle', 'three-quarter', 'end'].forEach((name, index) => reportValue(`poly-report-time-${name}`, clockLabels[index]));
    const nadirIndex = report.overview.spo2.indexOf(Math.min(...report.overview.spo2));
    const nadirX = 120 + nadirIndex * 760 / (report.overview.spo2.length - 1);
    const nadirY = spo2Y(report.overview.spo2[nadirIndex]);
    const nadirMarker = $('poly-report-spo2-nadir');
    const nadirLabel = $('poly-report-spo2-nadir-label');
    const showNadir = report.interpretable;
    nadirMarker.style.display = showNadir ? '' : 'none';
    nadirLabel.style.display = showNadir ? '' : 'none';
    if (showNadir) {
      nadirMarker.setAttribute('cx', nadirX.toFixed(1));
      nadirMarker.setAttribute('cy', nadirY.toFixed(1));
      nadirLabel.setAttribute('x', Math.max(145, Math.min(850, nadirX)).toFixed(1));
      nadirLabel.setAttribute('y', Math.max(360, nadirY - 7).toFixed(1));
      nadirLabel.setAttribute('text-anchor', 'middle');
      nadirLabel.textContent = `Mín ${report.spo2.minimum}%`;
    }
  }
  function renderPolygraphReport(item) {
    const report = item.report;
    if (!report) return;
    const printable = value => Number.isFinite(value) ? String(value) : '—';
    const indexValue = value => Number.isFinite(value) ? `${value.toFixed(1)} /h` : 'No calculable';
    reportValue('poly-report-patient', report.patient);
    reportValue('poly-report-study', report.studyLabel);
    reportValue('poly-report-window', report.recordingWindow);
    reportValue('poly-report-duration', formatMinutes(report.recordingMinutes));
    reportValue('poly-report-valid-flow', formatMinutes(report.validFlowMinutes));
    reportValue('poly-report-valid-ox', formatMinutes(report.validOximetryMinutes));
    reportValue('poly-report-rei', indexValue(report.indices.rei));
    reportValue('poly-report-apnea-index', indexValue(report.indices.apneas));
    reportValue('poly-report-obstructive-index', indexValue(report.indices.obstructive));
    reportValue('poly-report-central-index', indexValue(report.indices.central));
    reportValue('poly-report-mixed-index', indexValue(report.indices.mixed));
    reportValue('poly-report-hypopnea-index', indexValue(report.indices.hypopneas));
    reportValue('poly-report-odi', indexValue(report.indices.odi));
    reportValue('poly-ref-rei', report.references.rei);
    reportValue('poly-ref-apnea-index', report.references.apneas);
    reportValue('poly-ref-obstructive-index', report.references.obstructive);
    reportValue('poly-ref-central-index', report.references.central);
    reportValue('poly-ref-mixed-index', report.references.mixed);
    reportValue('poly-ref-hypopnea-index', report.references.hypopneas);
    reportValue('poly-ref-odi', report.references.odi);
    reportValue('poly-report-total', report.interpretable ? printable(report.events.total) : 'No validable');
    reportValue('poly-report-apneas', printable(report.events.apneas));
    reportValue('poly-report-types', `${report.events.obstructive} / ${report.events.central} / ${report.events.mixed}`);
    reportValue('poly-report-hypopneas', printable(report.events.hypopneas));
    reportValue('poly-report-rr', Number.isFinite(report.respiratoryRate) ? `${report.respiratoryRate.toFixed(1)} rpm` : 'No calculable');
    reportValue('poly-report-spo2', `${report.spo2.baseline}% / ${report.spo2.average}% / ${report.spo2.minimum}%`);
    reportValue('poly-report-below90', Number.isFinite(report.spo2.below90Minutes) ? `${report.spo2.below90Minutes} min` : 'No validable');
    reportValue('poly-report-desaturations', report.interpretable ? printable(report.desaturations) : 'No validable');
    reportValue('poly-report-pulse', `${report.pulse.minimum} / ${report.pulse.average} / ${report.pulse.maximum} lpm`);
    reportValue('poly-report-snoring', printable(report.snoringEvents));
    reportValue('poly-report-quality', report.quality);
    reportValue('poly-report-commentary', report.commentary);
    reportValue('poly-report-conclusion', report.conclusion);
    reportValue('poly-report-recommendation', report.recommendation);
    const resultText = !report.interpretable
      ? 'REGISTRO NO INTERPRETABLE'
      : report.kind === 'central'
        ? `REI ${report.rei.toFixed(1)}/h · componente central significativo`
        : `REI ${report.rei.toFixed(1)}/h · AOS ${report.severity}`;
    reportValue('poly-report-result', resultText);
    const riskPosition = !report.interpretable ? 52 : report.rei < 5 ? 20 : report.rei < 15 ? 48 : report.rei < 30 ? 70 : 90;
    $('poly-report-risk-arrow').style.setProperty('--risk-position', `${riskPosition}%`);
    renderReportOverview(item);
  }
  function renderTraceWindows(item) {
    const svg = $('poly-traces');
    const svgNamespace = 'http://www.w3.org/2000/svg';
    let markers = $('poly-trace-markers');
    if (!markers) {
      markers = document.createElementNS(svgNamespace, 'g');
      markers.id = 'poly-trace-markers';
      const eventBand = document.createElementNS(svgNamespace, 'rect');
      eventBand.id = 'poly-event-band';
      eventBand.classList.add('trace-band', 'event');
      eventBand.setAttribute('y', '18');
      eventBand.setAttribute('height', '312');
      const recoveryBand = document.createElementNS(svgNamespace, 'rect');
      recoveryBand.id = 'poly-recovery-band';
      recoveryBand.classList.add('trace-band', 'recovery');
      recoveryBand.setAttribute('y', '18');
      recoveryBand.setAttribute('height', '312');
      const eventLabel = document.createElementNS(svgNamespace, 'text');
      eventLabel.id = 'poly-event-label';
      eventLabel.classList.add('trace-marker-label');
      eventLabel.setAttribute('y', '31');
      eventLabel.textContent = 'VENTANA A · EVENTO';
      const recoveryLabel = document.createElementNS(svgNamespace, 'text');
      recoveryLabel.id = 'poly-recovery-label';
      recoveryLabel.classList.add('trace-marker-label');
      recoveryLabel.setAttribute('y', '31');
      recoveryLabel.textContent = 'VENTANA B · RESPUESTA';
      markers.append(eventBand, recoveryBand, eventLabel, recoveryLabel);
      svg.insertBefore(markers, $('poly-flow-line'));
    }
    const toX = index => 105 + index * 775 / (item.traces.flow.length - 1);
    const eventX = toX(item.windows.eventStart);
    const eventEndX = toX(item.windows.eventEnd);
    const recoveryEndX = toX(item.windows.recoveryEnd);
    $('poly-event-band').setAttribute('x', eventX.toFixed(1));
    $('poly-event-band').setAttribute('width', (eventEndX - eventX).toFixed(1));
    $('poly-recovery-band').setAttribute('x', eventEndX.toFixed(1));
    $('poly-recovery-band').setAttribute('width', (recoveryEndX - eventEndX).toFixed(1));
    $('poly-event-label').setAttribute('x', (eventX + 7).toFixed(1));
    $('poly-recovery-label').setAttribute('x', (eventEndX + 7).toFixed(1));
  }
  function renderPolygraphCase(caseId) {
    const item = model.polygraphCases.find(entry => entry.id === caseId) || model.polygraphCases[0];
    if (!item) return;
    polyCaseSelect.value = item.id;
    $('poly-context').textContent = item.context;
    $('poly-metrics').textContent = item.metrics;
    $('poly-flow-line').setAttribute('points', tracePoints(item.traces.flow, value => 75 - value * 26));
    $('poly-effort-line').setAttribute('points', tracePoints(item.traces.effort, value => 155 - value * 22));
    $('poly-spo2-line').setAttribute('points', tracePoints(item.traces.spo2, value => Math.max(202, Math.min(268, 250 - (value - 88) * 1.6))));
    $('poly-pulse-line').setAttribute('points', tracePoints(item.traces.pulse, value => Math.max(282, Math.min(332, 315 - (value - 65) * .45))));
    renderTraceWindows(item);
    renderPolygraphReport(item);
    $('poly-trace-caption').textContent = 'Señales sintéticas. Ventana A: compará flujo y esfuerzo torácico. Ventana B: buscá recuperación y respuesta tardía de SpO₂/pulso.';
    $('poly-event').value = '';
    $('poly-action').value = '';
    const feedback = $('poly-feedback');
    feedback.className = 'feedback poly-feedback';
    feedback.textContent = 'Elegí el patrón y la conducta; después comprobá tu lectura.';
  }
  if (polyCaseSelect) {
    document.querySelectorAll('[data-poly-view]').forEach(button => button.addEventListener('click', () => {
      const showReport = button.dataset.polyView === 'report';
      $('poly-trace-view').hidden = showReport;
      $('poly-report-view').hidden = !showReport;
      document.querySelectorAll('[data-poly-view]').forEach(control => control.setAttribute('aria-pressed', String(control === button)));
    }));
    model.polygraphCases.forEach(item => polyCaseSelect.add(new Option(item.label, item.id)));
    polyCaseSelect.addEventListener('change', () => renderPolygraphCase(polyCaseSelect.value));
    $('poly-case-form').addEventListener('submit', event => {
      event.preventDefault();
      const result = model.checkPolygraphCase(polyCaseSelect.value, $('poly-event').value, $('poly-action').value);
      if (!result) return;
      const feedback = $('poly-feedback');
      feedback.className = `feedback poly-feedback ${result.correct ? 'correct' : 'review'}`;
      const heading = result.correct ? 'Lectura completa.' : result.eventCorrect || result.actionCorrect ? 'Lectura parcialmente correcta.' : 'Conviene volver a las señales.';
      const details = `${result.eventCorrect ? 'Patrón correcto.' : 'Revisá la relación entre flujo y esfuerzo.'} ${result.actionCorrect ? 'Conducta correcta.' : 'Revisá la calidad y el próximo paso.'}`;
      feedback.replaceChildren(Object.assign(document.createElement('strong'), { textContent: heading }), document.createTextNode(` ${details} ${result.rationale}`));
      if (result.correct) solvedPolygraphCases.add(polyCaseSelect.value);
      renderPolygraphScore();
    });
    $('poly-next').addEventListener('click', () => {
      const current = model.polygraphCases.findIndex(item => item.id === polyCaseSelect.value);
      renderPolygraphCase(model.polygraphCases[(current + 1) % model.polygraphCases.length].id);
    });
    $('poly-reset').addEventListener('click', () => {
      solvedPolygraphCases.clear();
      renderPolygraphScore();
      renderPolygraphCase(model.polygraphCases[0].id);
    });
  }

  function renderPap(mode) {
    const values = model.papTrace(mode);
    if (!values) return;
    $('pap-line').setAttribute('points', values.map((value, i) => `${50 + i * 650 / 24},${180 - value * 160}`).join(' '));
    document.querySelectorAll('[data-mode]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.mode === mode)));
    $('trace-title').textContent = mode === 'cpap' ? 'Patrón conceptual de CPAP fija' : 'Patrón conceptual de APAP';
    $('trace-desc').textContent = mode === 'cpap' ? 'Presión relativa constante durante la noche esquemática.' : 'Presión relativa variable durante la noche esquemática, dentro de un intervalo representado.';
    $('pap-description').textContent = mode === 'cpap'
      ? 'CPAP fija: el esquema mantiene un nivel objetivo constante. No representa los cambios transitorios de rampa o alivio espiratorio de equipos reales.'
      : 'APAP: el esquema muestra variación dentro de un rango. La respuesta real depende de señales, ajustes y algoritmo; esta curva no es una titulación ni una recomendación de presión.';
  }
  document.querySelectorAll('[data-mode]').forEach(button => button.addEventListener('click', () => renderPap(button.dataset.mode)));
  const cases = {
    diagnosis: { answer: 'psg', text: 'Una Epworth baja no descarta AOS. Ante HSAT negativo y sospecha persistente corresponde continuar la evaluación, habitualmente con PSG. Fuente: capítulo Diagnóstico [8].' },
    mask: { answer: 'fit', text: 'Revisar piel, talla, estado y ajuste. Apretar o aumentar presión sin evaluar puede empeorar el problema. Después de cambiar interfaz se verifica tolerancia y eficacia. Fuentes: Máscaras y Cuidados [18,20].' },
    complex: { answer: 'specialist', text: 'Opioides e hipoventilación sospechada requieren un estudio y una evaluación apropiados. No extrapolar el inicio con APAP domiciliaria de la AOS no complicada. Fuentes: Diagnóstico e Indicación [8,14].' }
  };
  document.querySelectorAll('[data-check-case]').forEach(button => button.addEventListener('click', () => {
    const fieldset = button.closest('[data-case]');
    const selected = fieldset.querySelector('input:checked');
    const message = fieldset.querySelector('.feedback');
    message.hidden = false;
    if (!selected) { message.textContent = 'Elegí una respuesta antes de comprobar.'; return; }
    const item = cases[fieldset.dataset.case];
    message.textContent = `${selected.value === item.answer ? 'Correcto.' : 'Revisá la decisión.'} ${item.text}`;
  }));
  document.querySelectorAll('[data-case] input').forEach(input => input.addEventListener('change', () => {
    input.closest('[data-case]').querySelector('.feedback').hidden = true;
  }));
  $('cases-reset').addEventListener('click', () => {
    document.querySelectorAll('[data-case] input').forEach(input => { input.checked = false; });
    document.querySelectorAll('[data-case] .feedback').forEach(p => { p.hidden = true; p.textContent = ''; });
  });
  function renderCare() {
    const completed = document.querySelectorAll('[data-care]:checked').length;
    $('care-count').textContent = `${completed} de 6 puntos revisados${completed === 6 ? ' · ejercicio completo, no certificación de competencia' : ''}`;
  }
  document.querySelectorAll('[data-care]').forEach(input => input.addEventListener('change', renderCare));
  $('care-reset').addEventListener('click', () => {
    document.querySelectorAll('[data-care]').forEach(input => { input.checked = false; });
    renderCare();
  });
  // Native modal dialog supplies focus containment and Escape dismissal.
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog
  const dialog = $('image-dialog');
  let imageOpener;
  document.querySelectorAll('.zoom').forEach(button => button.addEventListener('click', () => {
    const img = button.querySelector('img');
    imageOpener = button;
    $('image-large').src = img.src;
    $('image-large').alt = img.alt;
    $('image-title').textContent = img.alt;
    $('image-caption').textContent = button.closest('figure').querySelector('figcaption').textContent;
    dialog.showModal();
  }));
  $('image-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => imageOpener?.focus({ preventScroll: true }));
  const readButtons = Array.from(document.querySelectorAll('[data-read]'));
  const chapterIds = readButtons.map(button => button.dataset.read);
  const progressKey = 'inser-apnea-reading-v1';
  let read = new Set();
  try {
    const saved = JSON.parse(localStorage.getItem(progressKey) || '[]');
    if (Array.isArray(saved)) read = new Set(saved.filter(id => chapterIds.includes(id)));
  } catch { /* Reading and exercises remain usable with storage blocked. */ }
  function renderProgress() {
    $('read-count').textContent = `${read.size} / ${chapterIds.length}`;
    $('read-progress').value = read.size;
    readButtons.forEach(button => {
      const done = read.has(button.dataset.read);
      button.setAttribute('aria-pressed', String(done));
      button.textContent = done ? 'Leído ✓ · desmarcar' : 'Marcar capítulo leído';
    });
    try { localStorage.setItem(progressKey, JSON.stringify([...read])); } catch { /* No persistence required. */ }
  }
  readButtons.forEach(button => button.addEventListener('click', () => {
    const id = button.dataset.read;
    if (read.has(id)) read.delete(id); else read.add(id);
    renderProgress();
  }));
  $('progress-reset').addEventListener('click', () => { read.clear(); renderProgress(); });
  // IntersectionObserver only updates navigation; it never marks material as read.
  // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.filter(entry => entry.isIntersecting).forEach(entry => {
        document.querySelectorAll('.chapters a').forEach(link => {
          if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });
    document.querySelectorAll('.chapter').forEach(section => observer.observe(section));
  }
  // Tarjeta digital de INSER SALUD (la misma que los demás ebooks de la Academia).
  const inserGuardar = $('inserGuardar');
  if (inserGuardar) {
    inserGuardar.addEventListener('click', () => {
      const vcf = [
        'BEGIN:VCARD', 'VERSION:3.0', 'FN:Inser Salud', 'ORG:Inser Salud',
        'TITLE:Equipos Respiratorios — Venta y Alquiler',
        'TEL;TYPE=CELL:+5493512065320', 'EMAIL:inser.salud@gmail.com',
        'URL:https://insersalud.com',
        'NOTE:CPAP · BiPAP · Oxígeno · Máscaras · Accesorios. Instagram: @insersalud',
        'END:VCARD',
      ].join('\r\n');
      const blob = new Blob([vcf], { type: 'text/vcard' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'InserSalud.vcf';
      a.click();
      URL.revokeObjectURL(a.href);
    });
  }
  const inserCompartir = $('inserCompartir');
  if (inserCompartir) {
    inserCompartir.addEventListener('click', async () => {
      const datos = { title: 'Inser Salud — Equipos Respiratorios', text: 'CPAP · BiPAP · Oxígeno · Accesorios. Venta con envío a todo el país y alquiler en Córdoba.', url: 'https://insersalud.com/tarjeta' };
      if (navigator.share) { try { await navigator.share(datos); } catch (e) {} }
      else { try { await navigator.clipboard.writeText(datos.url); } catch (e) {} }
    });
  }
  const inserQrModal = $('inserQrModal');
  const inserQrAbrir = $('inserQrAbrir');
  if (inserQrModal && inserQrAbrir) {
    inserQrAbrir.addEventListener('click', () => inserQrModal.classList.add('ver'));
    inserQrModal.addEventListener('click', () => inserQrModal.classList.remove('ver'));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') inserQrModal.classList.remove('ver'); });
  }
  renderEpworth(); renderStopBang(); renderIndex(); renderPolygraphSetup();
  if (polyCaseSelect) { renderPolygraphCase(model.polygraphCases[0].id); renderPolygraphScore(); }
  renderPap('cpap'); renderProgress();
})();
