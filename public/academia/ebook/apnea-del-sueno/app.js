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
    $('ess-count').textContent = `${result.answered} de 8 respuestas${result.answered === 8 ? ' · completo ✓' : ''}`;
    $('ess-progress').value = result.answered;
    $('ess-total').textContent = result.total ?? '—';
    $('ess-meter').style.width = result.total === null ? '0%' : `${result.total / 24 * 100}%`;
    const remaining = 8 - result.answered;
    $('ess-band').textContent = result.total === null
      ? `${remaining === 1 ? 'Falta 1 respuesta' : 'Faltan ' + remaining + ' respuestas'}`
      : bands[result.band];
    $('ess-message').textContent = result.total === null
      ? 'Elegí un número en cada fila. El resultado aparecerá al completar las ocho.'
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
      ? (remaining === 1 ? 'Falta 1 respuesta' : `Faltan ${remaining} respuestas`)
      : sbBands[result.band];
    $('sb-message').textContent = result.total === null
      ? 'Respondé Sí o No en cada fila. El riesgo aparece al completar las ocho.'
      : result.band === 'bajo'
        ? 'Riesgo bajo no descarta AOS: si hay pausas observadas, comorbilidad cardiovascular o somnolencia con riesgo, la sospecha clínica manda.'
        : result.band === 'intermedio'
          ? 'Riesgo intermedio: revisá los ítems STOP. Con dos o más de ellos más sexo masculino, IMC mayor de 35 o cuello mayor de 40 cm, se considera riesgo alto.'
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
  function renderPap(mode) {
    const values = model.papTrace(mode);
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
  renderEpworth(); renderStopBang(); renderIndex(); renderPap('cpap'); renderProgress();
})();
