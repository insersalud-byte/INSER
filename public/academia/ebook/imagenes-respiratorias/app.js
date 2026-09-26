(function () {
  'use strict';
  const bank = window.ImagingCases, model = window.ImagingModel, draw = window.ImagingRender.render;
  const names = { rx: 'Radiografía', ct: 'Tomografía y angio-TC', us: 'Ecografía pulmonar', dia: 'Ecografía diafragmática', vq: 'Ventilación / perfusión', mr: 'Resonancia torácica', pet: 'PET-TC' };
  const refs = { rx: 'ref-glosario', ct: 'ref-glosario', us: 'ref-lus', dia: 'ref-musculos', vq: 'ref-vq', mr: 'ref-rm', pet: 'ref-pet' };
  const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const controllers = new Map();

  document.querySelectorAll('[data-diagram]').forEach(el => {
    el.innerHTML = draw(el.dataset.diagram, 'normal', { hints: el.dataset.hints === 'true', view: el.dataset.view || 'b', level: 1, phase: 0 });
  });
  document.querySelectorAll('[data-lessons]').forEach(el => {
    el.innerHTML = bank[el.dataset.lessons].slice(1).map(item => `<article class="lesson"><h3><a href="#${el.dataset.lessons}-lab" data-load-case="${item.id}">${escape(item.title)} ↗</a></h3><p><strong>Reconocer:</strong> ${escape(item.finding)}</p><p>${escape(item.meaning)}</p><p><strong>Límite:</strong> ${escape(item.limit)}</p><a class="button secondary" href="#${el.dataset.lessons}-lab" data-load-case="${item.id}">Ver cómo se ve en el simulador</a></article>`).join('');
  });

  for (const [modality, selector, position] of [
    ['rx', '#rx-normal .chapter-head', 'afterend'], ['ct', '#tc-normal .split', 'afterend'],
    ['us', '#eco-normal .split', 'afterend'], ['dia', '[data-lab="dia"]', 'beforebegin'],
    ['vq', '[data-lab="vq"]', 'beforebegin'], ['mr', '[data-lab="mr"]', 'beforebegin'], ['pet', '[data-lab="pet"]', 'beforebegin']
  ]) {
    const explorer = document.createElement('section');
    document.querySelector(selector).insertAdjacentElement(position, explorer);
    window.ImagingAnatomyUI.mount(explorer, modality);
  }
  // Conservar la imagen estática como alternativa sin JS; con JS, la RX principal es el explorador.
  document.querySelector('#rx-normal .real-figure').hidden = true;
  document.querySelector('#rx-normal .split').classList.add('normal-reading');

  function makeLab(el) {
    const modality = el.dataset.lab, cases = bank[modality], dynamic = ['us', 'dia'].includes(modality);
    el.id ||= `${modality}-lab`;
    let state = model.initialState(modality), animation = 0, lastTime = 0;
    const selectCase = () => model.getCase(modality, state.caseId);
    const button = (action, label, toggle = true) => `<button type="button" data-action="${action}"${toggle ? ' aria-pressed="false"' : ''}>${label}</button>`;
    el.innerHTML = `<div class="lab-head"><div><p class="eyebrow">Simulador educativo</p><h3>${names[modality]}</h3><p>Primero lo normal. Después compará, elegí una respuesta y revisá la explicación.</p></div><span class="lab-badge">${cases.length} ESCENARIOS · ESQUEMAS</span></div><div class="lab-content">
      <div class="toolbar"><label>Escenario<select data-control="case" aria-label="Escenario de ${names[modality]}"></select></label><label>Ampliación del dibujo<select data-control="zoom"><option value="1">100 %</option><option value="1.5">150 %</option><option value="2">200 %</option></select></label>
      ${modality === 'ct' ? '<label>Nivel didáctico<select data-control="level"><option value="0">Superior</option><option value="1">Hiliar</option><option value="2">Basal</option></select></label><label>Vista esquemática<select data-control="view"><option value="pulmon">Pulmonar</option><option value="mediastino">Mediastínica</option></select></label>' : ''}
      ${modality === 'us' ? '<label>Representación<select data-control="view"><option value="b">Modo B</option><option value="m">Modo M: referencia / sin deslizamiento</option></select></label>' : ''}</div>
      <div class="toggles">${button('compare', 'Comparar con normal')}${button('hints', 'Ver pistas')}${button('practice', 'Modo práctica')}${button('reset', 'Reiniciar', false)}</div>
      <p class="case-context"></p><div class="viewer-grid"><section class="image-panel current-panel"><div class="image-label"><b data-case-label></b><span>ESQUEMA · NO ES IMAGEN CLÍNICA</span></div><div class="viewport"><div class="drawing"></div></div><p class="viewer-note">Ilustración simplificada, sin escala de medición ni calibración clínica.</p></section><section class="image-panel normal-panel" hidden><div class="image-label"><b>Referencia normal</b><span>ESQUEMA</span></div><div class="viewport"><div class="drawing"></div></div><p class="viewer-note">Mismo nivel didáctico y fase para comparar el patrón.</p></section></div>
      ${dynamic ? `<div class="playback"><button type="button" class="button secondary" data-action="play" aria-pressed="false">Reproducir ciclo</button><label>Fase del ciclo ilustrativo<input data-control="phase" type="range" min="0" max="100" value="0" step="1"></label></div><p class="small">Movimiento esquemático, no video clínico ni escala de tiempo real. Podés recorrerlo manualmente.</p>` : ''}
      ${modality === 'ct' ? '<p class="small">Los tres niveles son dibujos conceptuales, no cortes consecutivos de una lesión real. Cambiar la vista modifica la paleta ilustrativa; no ajusta ventanas DICOM ni unidades Hounsfield.</p>' : ''}
      <p class="hint" hidden></p><fieldset class="question"><legend>¿Qué interpretación es más adecuada?</legend><div class="options"></div></fieldset><button type="button" class="button" data-action="check" disabled>Comprobar respuesta</button><div class="feedback" role="status" hidden></div><p class="lab-status" aria-live="polite"></p></div>`;
    const find = selector => el.querySelector(selector);
    const control = name => find(`[data-control="${name}"]`);
    const workspace = document.createElement('div');
    workspace.className = 'lab-workspace';
    const viewer = find('.viewer-grid');
    viewer.before(workspace);
    workspace.append(viewer);
    const sidebar = document.createElement('aside');
    sidebar.className = 'case-sidebar';
    sidebar.innerHTML = '<h4>Elegí qué querés ver</h4><div class="case-buttons"></div><div class="pattern-detail" aria-live="polite"></div>';
    workspace.append(sidebar);
    find('.case-buttons').innerHTML = cases.map(item => `<button type="button" data-action="case" data-case-id="${item.id}" aria-pressed="false">${escape(item.title)}</button>`).join('');
    function paint() {
      const options = { hints: state.hints, level: state.frame, view: state.view, phase: state.phase || 0 };
      find('.current-panel .drawing').innerHTML = draw(modality, selectCase().pattern, options);
      if (state.compare) find('.normal-panel .drawing').innerHTML = draw(modality, 'normal', options);
      el.querySelectorAll('.drawing').forEach(node => { node.style.width = `${state.zoom * 100}%`; });
    }
    function stop() {
      state.playing = false;
      cancelAnimationFrame(animation);
      animation = 0;
      const play = find('[data-action="play"]');
      if (play) { play.textContent = 'Reproducir ciclo'; play.setAttribute('aria-pressed', 'false'); }
    }
    function tick(time) {
      if (!state.playing) return;
      state.phase = ((state.phase || 0) + Math.min(time - lastTime, 100) / 3200) % 1;
      lastTime = time;
      control('phase').value = Math.round(state.phase * 100);
      paint();
      animation = requestAnimationFrame(tick);
    }
    function refresh() {
      const item = selectCase(), index = cases.indexOf(item);
      control('case').innerHTML = cases.map((entry, i) => `<option value="${entry.id}">${state.practice ? `Caso ${String(i + 1).padStart(2, '0')}` : escape(entry.title)}</option>`).join('');
      control('case').value = item.id;
      control('zoom').value = state.zoom;
      if (control('level')) control('level').value = state.frame;
      if (control('phase')) control('phase').value = (state.phase || 0) * 100;
      if (control('view')) {
        if (modality === 'us') {
          const supportsM = ['normal', 'pneumothorax'].includes(item.pattern);
          control('view').querySelector('[value="m"]').disabled = !supportsM;
          if (!supportsM) state.view = 'b';
        }
        control('view').value = state.view;
      }
      ['compare', 'hints', 'practice'].forEach(action => find(`[data-action="${action}"]`).setAttribute('aria-pressed', String(state[action])));
      find('[data-case-label]').textContent = state.practice && !state.revealed ? `Caso ${index + 1}` : item.title;
      find('.case-context').textContent = item.context;
      find('.lab-workspace').classList.toggle('with-comparison', state.compare);
      el.querySelectorAll('[data-case-id]').forEach((button, i) => {
        button.setAttribute('aria-pressed', String(button.dataset.caseId === item.id));
        button.textContent = state.practice ? `Caso ${String(i + 1).padStart(2, '0')}` : cases[i].title;
      });
      find('.pattern-detail').innerHTML = state.practice && !state.revealed
        ? '<p>Modo práctica: mirá la imagen y respondé abajo. La explicación aparecerá al comprobar tu respuesta.</p>'
        : `<h4>${escape(item.title)}</h4><p><strong>Cómo se ve:</strong> ${escape(item.finding)}</p><p>${escape(item.meaning)}</p><p class="small"><strong>Límite:</strong> ${escape(item.limit)}</p>${item.pattern === 'normal' ? `<a class="button secondary" href="#anatomy-${modality}">Tocar y reconocer sus componentes ↑</a>` : ''}`;
      find('.viewer-grid').classList.toggle('comparing', state.compare);
      find('.normal-panel').hidden = !state.compare;
      find('.hint').hidden = !state.hints;
      find('.hint').textContent = item.hint;
      find('.options').innerHTML = item.choices.map(choice => `<label class="answer"><input type="radio" name="answer-${modality}" value="${choice.id}"${choice.id === state.answer ? ' checked' : ''}><span>${escape(choice.text)}</span></label>`).join('');
      find('[data-action="check"]').disabled = !state.answer;
      find('.feedback').hidden = !state.revealed;
      if (state.revealed) {
        const correct = model.checkChoice(item, state.answer);
        find('.feedback').innerHTML = `<strong>${correct ? 'Respuesta correcta.' : 'Revisemos la interpretación.'} ${escape(item.title)}</strong><p>${escape(item.finding)}</p><p>${escape(item.meaning)}</p><p class="caution"><b>Límite:</b> ${escape(item.limit)}</p><p class="source"><a href="#${item.id === 'ct-embolia' ? 'ref-tep' : refs[modality]}">Consultar fuente de referencia</a></p>`;
      }
      find('.lab-status').textContent = `Escenario ${index + 1} de ${cases.length}. ${state.practice ? 'Práctica: nombres ocultos hasta responder. Las pistas son opcionales.' : 'Aprendizaje: nombres de patrones visibles.'}`;
      paint();
    }
    function loadCase(id, learning = false) {
      if (!model.getCase(modality, id)) return;
      stop();
      const keepPractice = learning ? false : state.practice;
      state = { ...model.initialState(modality), caseId: id, practice: keepPractice, view: modality === 'ct' ? 'pulmon' : 'b', phase: 0 };
      refresh();
    }
    el.addEventListener('change', event => {
      const target = event.target;
      if (target.matches('input[type="radio"]')) { state.answer = target.value; state.revealed = false; refresh(); find(`input[value="${state.answer}"]`).focus(); }
      if (!target.dataset.control) return;
      switch (target.dataset.control) {
        case 'case': loadCase(target.value); break;
        case 'zoom': state.zoom = Number(target.value); paint(); break;
        case 'level': state.frame = model.clampFrame(Number(target.value), 3); paint(); break;
        case 'view': state.view = target.value; paint(); break;
      }
    });
    el.addEventListener('input', event => {
      if (event.target.dataset.control === 'phase') { stop(); state.phase = Number(event.target.value) / 100; paint(); }
    });
    el.addEventListener('click', event => {
      const target = event.target.closest('[data-action]');
      if (!target) return;
      const action = target.dataset.action;
      if (action === 'case') { loadCase(target.dataset.caseId); }
      else if (['compare', 'hints', 'practice'].includes(action)) {
        state[action] = !state[action];
        if (action === 'practice') { state.answer = ''; state.revealed = false; state.hints = false; }
        refresh();
      } else if (action === 'check' && state.answer) { state.revealed = true; refresh(); }
      else if (action === 'reset') { state.practice = false; loadCase(cases[0].id); }
      else if (action === 'play') {
        if (state.playing) stop();
        else { state.playing = true; target.textContent = 'Pausar ciclo'; target.setAttribute('aria-pressed', 'true'); lastTime = performance.now(); animation = requestAnimationFrame(tick); }
      }
    });
    document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
    if ('IntersectionObserver' in window) new IntersectionObserver(entries => { if (!entries[0].isIntersecting) stop(); }).observe(el);
    state.view = modality === 'ct' ? 'pulmon' : 'b';
    refresh();
    controllers.set(modality, { loadCase });
  }
  document.querySelectorAll('[data-lab]').forEach(makeLab);
  document.querySelectorAll('[data-load-case]').forEach(link => link.addEventListener('click', () => {
    const modality = window.ImagingAnatomy.modalityForCase(bank, link.dataset.loadCase);
    if (modality) controllers.get(modality).loadCase(link.dataset.loadCase, true);
  }));

  const frameNumbers = [15, 25, 35, 45, 55, 65, 75, 85, 95];
  const regions = ['Región superior: ápices, tráquea y pared.', 'Tórax superior: tráquea y vasos mediastínicos.', 'Región de la bifurcación traqueal y bronquios.', 'Región hiliar: bronquios y vasos.', 'Nivel cardíaco: parénquima y estructuras centrales.', 'Nivel cardíaco inferior y vasos pulmonares.', 'Regiones inferiores y contorno cardíaco.', 'Bases pulmonares y aparición del hígado.', 'Bases, diafragmas y abdomen superior.'];
  const stack = document.querySelector('#ct-stack-range');
  function setFrame(index) {
    const n = model.clampFrame(index, frameNumbers.length), number = frameNumbers[n];
    stack.value = n;
    const img = document.querySelector('#ct-stack-image');
    img.src = `/academia/ebook/imagenes-respiratorias/images/ct-normal-${number}.jpg`;
    img.alt = `TC normal, captura seleccionada ${n + 1} de 9. ${regions[n]}`;
    document.querySelector('#ct-stack-count').textContent = `${n + 1} de 9`;
    document.querySelector('#ct-stack-description').textContent = regions[n];
    document.querySelector('#ct-stack-source').href = window.ImagingAssets.find(a => a.file === `ct-normal-${number}.jpg`).source;
    document.querySelector('#ct-prev').disabled = n === 0;
    document.querySelector('#ct-next').disabled = n === 8;
  }
  stack.addEventListener('input', () => setFrame(Number(stack.value)));
  document.querySelector('#ct-prev').addEventListener('click', () => setFrame(Number(stack.value) - 1));
  document.querySelector('#ct-next').addEventListener('click', () => setFrame(Number(stack.value) + 1));
  document.querySelector('#ct-reset').addEventListener('click', () => setFrame(0));
  setFrame(0);

  function calculate() {
    const result = model.thickening(document.querySelector('#dia-exp').valueAsNumber, document.querySelector('#dia-ins').valueAsNumber);
    document.querySelector('#dia-result').textContent = result === null ? 'Revisá los valores' : `${new Intl.NumberFormat('es-AR', { maximumFractionDigits: 1 }).format(result)} %`;
    document.querySelector('#dia-explanation').textContent = result === null ? 'Se necesitan dos medidas numéricas, finitas y mayores que cero.' : result < 0 ? 'Resultado negativo: revisar fase, técnica y contexto. No determina por sí solo disfunción.' : 'Resultado matemático. No clasifica normalidad ni predice extubación.';
  }
  ['#dia-exp', '#dia-ins'].forEach(id => document.querySelector(id).addEventListener('input', calculate));
  calculate();

  const quiz = [
    { title: '1. Disnea aguda con RX sin hallazgos evidentes', choices: ['La RX descarta embolia pulmonar.', 'La evaluación clínica debe continuar; una RX normal no excluye embolia.', 'Siempre corresponde una TC sin contraste.'], answer: 1, explanation: 'La sospecha de embolia se estudia según probabilidad clínica y pruebas apropiadas. La RX aporta al diagnóstico diferencial, pero no la descarta; una TC sin protocolo angiográfico no equivale a angio-TC.' },
    { title: '2. No se observa deslizamiento en una zona', choices: ['Es suficiente para confirmar neumotórax.', 'La ecografía descarta cualquier otra causa.', 'Hay que revisar técnica, ventilación, otros signos y contexto clínico.'], answer: 2, explanation: 'La ausencia de deslizamiento no es específica. Explorar e integrar sin retrasar la atención ante inestabilidad. Un signo local tampoco describe todo el tórax.' },
    { title: '3. La fracción de engrosamiento calculada es 50 %', choices: ['Es un resultado matemático que necesita contexto; no decide extubación.', 'Garantiza que el paciente puede extubarse.', 'Demuestra que ambos hemidiafragmas son normales.'], answer: 0, explanation: 'La medida depende de adquisición, esfuerzo y soporte ventilatorio. Ninguna cifra aislada reemplaza la evaluación integral de preparación para el destete y protección de la vía aérea.' }
  ];
  const quizArea = document.querySelector('#integrated-cases');
  quiz.forEach((item, index) => {
    const form = document.createElement('form');
    form.innerHTML = `<fieldset class="integrated"><legend>${item.title}</legend>${item.choices.map((choice, i) => `<label class="answer"><input type="radio" name="integrated-${index}" value="${i}" required><span>${choice}</span></label>`).join('')}<button class="button" type="submit">Ver devolución</button><p class="feedback" role="status" hidden></p></fieldset>`;
    form.addEventListener('submit', event => { event.preventDefault(); const correct = Number(new FormData(form).get(`integrated-${index}`)) === item.answer; const feedback = form.querySelector('.feedback'); feedback.hidden = false; feedback.textContent = `${correct ? 'Correcto.' : 'Revisemos el caso.'} ${item.explanation}`; });
    form.addEventListener('change', () => { form.querySelector('.feedback').hidden = true; });
    quizArea.append(form);
  });

  const chapters = [...document.querySelectorAll('.chapter')].filter(el => el.id !== 'bibliografia');
  const storageKey = 'inser-imagenes-respiratorias-read-v1';
  let read = new Set();
  try { const saved = JSON.parse(localStorage.getItem(storageKey) || '[]'); if (Array.isArray(saved)) read = new Set(saved.filter(id => chapters.some(chapter => chapter.id === id))); } catch { /* El ebook funciona sin almacenamiento. */ }
  function updateProgress() {
    document.querySelector('#reading-count').textContent = `${read.size} / 13 capítulos`;
    document.querySelector('#reading-progress').value = read.size;
    document.querySelectorAll('[data-read]').forEach(button => { const done = read.has(button.dataset.read); button.setAttribute('aria-pressed', String(done)); button.textContent = done ? '✓ Leído · desmarcar' : 'Marcar como leído'; });
    try { localStorage.setItem(storageKey, JSON.stringify([...read])); } catch { /* Almacenamiento opcional. */ }
  }
  chapters.forEach((chapter, index) => {
    const footer = document.createElement('div'); footer.className = 'chapter-footer';
    footer.innerHTML = `<button type="button" data-read="${chapter.id}" aria-pressed="false">Marcar como leído</button><a href="#${chapters[index + 1]?.id || 'bibliografia'}">${index === 12 ? 'Consultar bibliografía' : 'Siguiente capítulo'} →</a>`;
    footer.querySelector('button').addEventListener('click', () => { read.has(chapter.id) ? read.delete(chapter.id) : read.add(chapter.id); updateProgress(); });
    chapter.append(footer);
  });
  updateProgress();

  document.querySelector('#asset-credits').innerHTML = window.ImagingAssets.map(asset => `<li id="credit-${escape(asset.id)}"><a href="${escape(asset.source)}">${escape(asset.file)}</a> · ${escape(asset.author)} · ${asset.licenseUrl ? `<a href="${escape(asset.licenseUrl)}">${escape(asset.license)}</a>` : escape(asset.license)}. ${escape(asset.modifications)}.</li>`).join('');
  const dialog = document.querySelector('#image-dialog');
  document.querySelectorAll('[data-enlarge]').forEach(button => button.addEventListener('click', () => {
    const image = button.querySelector('img');
    document.querySelector('#dialog-image').src = image.src;
    document.querySelector('#dialog-image').alt = image.alt;
    document.querySelector('#dialog-caption').textContent = button.closest('figure').querySelector('figcaption').textContent;
    dialog.showModal();
  }));
  document.querySelector('#dialog-close').addEventListener('click', () => dialog.close());
})();
