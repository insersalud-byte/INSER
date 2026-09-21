(function () {
  const root = document.getElementById('tecmeOafLab');
  if (!root || !window.TecmeOaf) return;
  const model = window.TecmeOaf;
  root.innerHTML = `
    <div class="tec-intro"><div><p class="tec-eyebrow">OXIGENOTERAPIA DE ALTO FLUJO · PRÁCTICA EDUCATIVA</p><h2>Simulador inspirado en TECME</h2><p>Tocá Flujo u Oxígeno, girá la perilla y pulsala para confirmar. Después, presioná Iniciar.</p></div><a class="tec-source-link" href="#tec-fuentes">Referencias y alcance ↓</a></div>
    <p class="tec-note">Inspirado en el Neumovent Advance para practicar alto flujo. Desarrollo educativo independiente, no afiliado ni certificado por TECME. No reproduce su software ni es apto para uso clínico.</p>
    <div class="tec-workspace">
      <div class="tec-device-wrap" id="tec-equipo"><div class="tec-machine">
        <div class="tec-shell-top"><strong>Inspirado en TECME</strong><span id="tec-top-lamp" aria-label="Indicador luminoso de alarma"></span></div>
        <div class="tec-panel"><div class="tec-front"><div class="tec-screen">
          <div class="tec-monitor"><div class="tec-mode"><b>ADL</b><span>Oxigenoterapia</span></div><div><strong id="tec-flow">0</strong><small>Flujo pico<br>L/min</small></div><div class="tec-inactive"><strong>—</strong><small>Tᵢ<br>s</small></div><div class="tec-inactive"><strong>—</strong><small>Tₑ<br>s</small></div><div class="tec-inactive"><strong>—</strong><small>I:E</small></div><div class="tec-inactive"><strong>—</strong><small>f total<br>rpm</small></div><div><strong id="tec-oxygen">—</strong><small>O₂<br>%</small></div></div>
          <div id="tec-alarm" class="tec-alarm" role="status" aria-live="polite">En espera</div>
          <div class="tec-display-body">
            <div class="tec-pressure-rail"><small>Presión<br>cmH₂O</small><strong id="tec-pressure">0</strong><span>P pico</span><span class="tec-unavailable">P media<br>—<br>PEEP<br>—</span><button data-tec-panel="limits" aria-label="Consultar límites de alarma">Límites<br>de presión</button></div>
            <div class="tec-plots">${[['oxygen','Oxígeno / tiempo','O₂ (%)','100','0'],['flow','Flujo / tiempo','L/min','80','0'],['pressure','Presión / tiempo','cmH₂O','40','0']].map(([id,label,unit,max,min]) => `<div class="tec-plot"><div>${label}<span>${unit}</span></div><svg viewBox="0 0 300 85" preserveAspectRatio="none" role="img" aria-label="Tendencia simulada de ${label}"><path class="tec-grid" d="M24 8V70H296 M24 39H296 M92 8V70 M160 8V70 M228 8V70"/><text x="1" y="12">${max}</text><text x="6" y="70">${min}</text><text x="25" y="82">−60 s</text><text x="282" y="82">0</text><polyline id="tec-trace-${id}" class="tec-trace" points="24,70 296,70"/></svg></div>`).join('')}</div>
            <div class="tec-therapy"><div class="tec-window-title">Oxigenoterapia</div><span id="tec-state">EN ESPERA</span><output id="tec-timer">00:00:00</output><div class="tec-actions"><button id="tec-start">Iniciar</button><button id="tec-stop" disabled>Parar</button><button id="tec-restore">Restaurar</button></div><div class="tec-screen-warning"><b>Atención</b><p>Sin monitorización espiratoria.</p><p>Vigilancia externa del paciente.</p><small>PRÁCTICA SIMULADA</small></div></div>
            <div class="tec-toolbar"><button data-tec-panel="graphics" aria-label="Gráficos">▦</button><button data-tec-panel="freeze" aria-label="Congelar gráficos">❄</button><button data-tec-panel="measurements" aria-label="Mediciones">⌁</button><button data-tec-panel="loop" aria-label="Guardar bucle">▱</button><button data-tec-panel="nebulizer" aria-label="Nebulizador">♧</button><button id="tec-help" aria-label="Ayuda">?</button><button id="tec-standby" aria-label="En espera">⏻</button></div>
          </div>
          <div class="tec-settings"><button data-tec-setting="flow" aria-label="Ajustar Flujo"><strong id="tec-set-flow">20</strong><small>L/min</small><span>Flujo</span></button><button data-tec-setting="fio2" aria-label="Ajustar Concentración O₂"><strong id="tec-set-fio2">50</strong><small>%</small><span>Oxígeno</span></button><span id="tec-screen-message" role="status">Seleccionar · girar · confirmar</span></div>
        </div><div class="tec-keys"><div class="tec-alarm-signals">Alarm<br>Signals<span id="tec-led-high">△</span><small>High</small><span id="tec-led-low">○</span><small>Med / Low</small></div><button data-tec-panel="limits" aria-label="Límites de alarma"><span>Alarm<br>Limits</span></button><button id="tec-audio" aria-label="Audio pausado 30 o 60 segundos"><span>♧<br>30 / 60 s</span></button><button data-tec-panel="menu">Menu</button><button data-tec-panel="mode">Mode</button></div></div>
        <div class="tec-bottom"><div class="tec-power"><span>▰ 110–220 VAC</span><span>▰ Battery/Charge</span></div><button id="tec-lock" aria-label="Bloquear pantalla: mantener 2 segundos" aria-pressed="false">▣</button><div class="tec-maneuvers"><button data-tec-panel="suction">Suction<br>+O₂</button><button data-tec-panel="inspiration">Manual<br>Insp.</button><button data-tec-panel="pause">Insp/Exp<br>Pause</button></div><button data-tec-panel="ctrl">Ctrl</button><button id="tec-esc">Esc</button><button id="tec-dial" aria-label="Perilla: girar para ajustar; pulsar para confirmar" aria-describedby="tec-dial-help"><span aria-hidden="true"></span></button></div>
        </div><div class="tec-name"><span>Alto flujo <b>OAF</b></span><small>SIMULADOR EDUCATIVO</small></div>
      </div><div class="tec-connector-block" aria-label="Representación del bloque inferior de conexiones"><div><small>ESP.</small><span class="tec-port tec-exp"></span></div><div class="tec-prox"><small>P2　P1　Prox</small><span>┃ ┃ ┃</span></div><div><small>O₂ %</small><span class="tec-port tec-sensor"></span></div><div><small>SALIDA PACIENTE</small><span class="tec-port tec-insp"></span></div><div><small>CO₂</small><span class="tec-port tec-small-port"></span></div></div>
      <p id="tec-dial-help" class="tec-dial-help">Perilla: arrastrá hacia arriba/abajo o usá la rueda del mouse. Clic para confirmar. Teclado: ↑ ↓ y Enter; Esc cancela.</p></div>
      <aside class="tec-coach"><p class="tec-eyebrow">GUÍA EXTERNA AL EQUIPO</p><h3 id="tec-step">1. Elegí un parámetro</h3><p id="tec-feedback" role="status" aria-live="polite">Tocá Flujo u Oxígeno. Girá la perilla y pulsala para confirmar.</p><div class="tec-dial-assist"><button id="tec-minus" aria-label="Girar perilla a la izquierda">−</button><span>Alternativa al giro</span><button id="tec-plus" aria-label="Girar perilla a la derecha">+</button></div>
        <div id="tec-editor" hidden><label id="tec-edit-label" for="tec-edit-value">Nuevo valor</label><input id="tec-edit-value" type="number" step="1"><div class="tec-actions"><button id="tec-confirm">Confirmar ajuste</button><button id="tec-cancel">Cancelar</button></div></div>
        <div id="tec-stop-confirm" hidden><p>¿Detener el flujo del equipo simulado?</p><div class="tec-actions"><button id="tec-confirm-stop">Confirmar detención</button><button id="tec-cancel-stop">Seguir terapia</button></div></div>
        <details id="tec-help-panel"><summary>Qué cambia en este modo</summary><p>El equipo entrega flujo continuo con concentración de oxígeno regulada. En el manual consultado monitoriza flujo, concentración de O₂ y presión. No mide volumen espirado ni frecuencia respiratoria; la alarma de apnea está deshabilitada.</p><p>La presión mostrada aquí pertenece al circuito. No representa una PEEP regulada ni una medición de la presión nasofaríngea.</p></details>
        <p class="tec-note">Los valores iniciales 20 L/min y 50% son los predeterminados ADL del manual, no una recomendación de inicio clínico.</p>
      </aside>
    </div>
    <section class="tec-mount" aria-labelledby="tec-mount-title"><div><p class="tec-eyebrow">MONTAJE · FIGURA 9-36 DEL MANUAL</p><h3 id="tec-mount-title">Del respirador a la cánula</h3></div>
      <ol class="tec-circuit"><li><b>01</b>Salida paciente<br><small>Respirador + filtro bacteriano/viral</small></li><li><b>02</b>Tramo corto<br><small>Hacia la cámara</small></li><li><b>03</b>Humidificador<br><small>Agua y alimentación propias</small></li><li><b>04</b>Circuito calentado<br><small>Sensor de temperatura</small></li><li><b>05</b>Cánula de alto flujo<br><small>Interfaz abierta</small></li></ol>
      <div class="tec-humidifier"><div><strong>Humidificador externo</strong><p>La temperatura se regula en el humidificador compatible, según su propio manual. No es una perilla de temperatura del Neumovent.</p></div><label><input id="tec-humidifier-on" type="checkbox" checked> Humidificación preparada (simulada)</label></div>
      <p class="tec-note">El montaje usa una rama; el manual excluye la doble rama y las interfaces de VNI para esta modalidad. Este esquema identifica componentes y no reproduce una calibración física.</p>
    </section>
    <div class="tec-learning"><section><p class="tec-eyebrow">ENTRENAR LA VIGILANCIA</p><h3>Introducí una situación</h3><label for="tec-fault">Escenario del circuito o del paciente</label><select id="tec-fault"><option value="none">Funcionamiento de referencia</option><option value="obstruction">Obstrucción · presión máxima</option><option value="oxygen-low">Concentración de oxígeno baja</option><option value="oxygen-high">Concentración de oxígeno alta</option><option value="disconnection">Cánula desconectada</option><option value="apnea">Paciente sin respiración espontánea</option><option value="temperature">Problema de humidificación</option></select><p id="tec-fault-note" class="tec-case-note" role="status" aria-live="polite"></p><p class="tec-note">Las lecturas de presión y O₂ de los escenarios son ilustrativas. No reproducen umbrales, demoras, precisión ni protecciones del firmware TECME.</p></section>
      <section><p class="tec-eyebrow">OBSERVACIÓN EXTERNA AL RESPIRADOR</p><h3>Oximetría, frecuencia y ROX</h3><p>Ingresá observaciones de un caso. Estos valores no se calculan a partir de los ajustes del equipo.</p><div class="tec-external"><label>SpO₂ observada (%)<input id="tec-spo2" type="number" min="50" max="100" value="94"></label><label>FR observada (/min)<input id="tec-rr" type="number" min="0" max="80" value="28"></label><label>FiO₂ documentada (%)<input id="tec-rox-fio2" type="number" min="21" max="100" value="50"></label></div><p class="tec-rox">ROX <output id="tec-rox">6,71</output><small id="tec-rox-note">Cálculo del caso, independiente de la pantalla TECME.</small></p></section>
    </div>
    <section id="tec-fuentes" class="tec-sources"><p class="tec-eyebrow">MANUALES Y ALCANCE</p><h3>La documentación detrás del simulador</h3><ul><li><a href="https://www.manualslib.es/manual/37565/Tecme-Neumovent.html?page=68" target="_blank" rel="noopener">Manual de usuario TECME · §9.14, pp. 68–69 ↗</a> — modo OAF, montaje, monitorización y alarmas. Copia consultada en ManualsLib.</li><li><a href="https://www.manualslib.es/manual/37565/Tecme-Neumovent.html?page=116" target="_blank" rel="noopener">Tabla de parámetros · p. 116 ↗</a> — ADL: flujo 1–80 L/min, O₂ 21–100%, incrementos de 1.</li><li><a href="https://docs.tecmeglobal.com/web-asset/03-Neumovent-Advance/4134L1V_REV11_Neumovent_Advance_Brochure_ESP.pdf" target="_blank" rel="noopener">Folleto oficial Neumovent Advance · 4134L1V REV11 ↗</a> — equipo y disponibilidad de OAF.</li><li><a href="https://tecmeglobal.com/ventiladores-mecanicos-neumovent/" target="_blank" rel="noopener">Familia Neumovent · TECME ↗</a> — disponibilidad del módulo según modelo.</li></ul><p class="tec-note">Interfaz reinterpretada para aprender, no réplica exacta de una versión de software. Se recrean controles y secuencias documentados; no firmware, calibraciones, todas las alarmas ni predicción clínica. Laboratorio independiente, no afiliado ni certificado por TECME. Revisión: septiembre de 2026.</p></section>`;
  const $ = id => root.querySelector('#' + id);
  const sourceList = root.querySelector('.tec-sources ul');
  sourceList.insertAdjacentHTML('beforeend', `<li><a href="https://tecmeglobal.com/wp-content/uploads/2025/10/producto-neumovent-advance-outline-01.png" target="_blank" rel="noopener">Frente oficial del Advance ↗</a> — geometría, posición de pantalla, teclas y perilla.</li><li><a href="https://www.infobae.com/economia/2020/03/19/una-pyme-cordobesa-es-el-mayor-fabricante-de-respiradores-artificiales-de-pais-dejo-de-exportar-y-aumento-300-su-produccion-en-medio-de-la-pandemia/" target="_blank" rel="noopener">Fotografía del Advance en oxigenoterapia ↗</a> — referencia visual de tres gráficos y contador lateral; no fuente de indicaciones clínicas.</li><li><a href="https://www.manualslib.es/manual/37565/Tecme-Neumovent.html?page=27" target="_blank" rel="noopener">Manual TECME · teclas y perilla ↗</a> — funciones del panel físico.</li>`);
  root.querySelector('.tec-sources > .tec-note').textContent = 'Recreación educativa basada en referencias visuales, no réplica certificada ni firmware TECME. Menús completos, calibración y combinaciones Ctrl no implementados: sus teclas muestran el alcance de esta práctica. Audio pausado se representa visualmente, sin sonido. Gráficos y fallas son guiones, no datos clínicos. Independiente y no afiliado a TECME. Revisión: 21/09/2026.';
  const statusText = (id, text) => { if ($(id).textContent !== text) $(id).textContent = text; };
  $('tec-timer').setAttribute('role', 'timer');
  $('tec-timer').setAttribute('aria-live', 'off');
  let state = model.initial();
  let lastTime = performance.now();
  let dialAngle = 0;
  const history = [];
  let historySecond = -1;
  const names = { flow: 'Flujo', fio2: 'Concentración O₂' };
  const feedback = {
    none: 'Observá por separado el circuito, el humidificador y al paciente. La ausencia de alarmas no confirma una respuesta clínica adecuada.',
    obstruction: 'Guion: la presión del circuito supera el límite de la práctica. Identificá acodamientos u obstrucción; esta lectura no mide la PEEP del paciente.',
    'oxygen-low': 'Guion: concentración medida menor que la programada. Revisá conceptualmente el suministro y la medición de oxígeno.',
    'oxygen-high': 'Guion: concentración medida mayor que la programada. Diferenciá el ajuste de O₂ de la concentración monitorizada.',
    disconnection: 'La salida del respirador puede seguir entregando flujo al ambiente. No se promete alarma de desconexión en OAF: verificá la cánula y al paciente.',
    apnea: 'La alarma de apnea está deshabilitada en este modo y no hay respiraciones de respaldo. La detección depende de la vigilancia externa; requiere respuesta asistencial inmediata.',
    temperature: 'El problema corresponde al humidificador externo. Su alarma no debe confundirse con una alarma OAF del respirador.'
  };
  function updateRox() {
    const inputs = ['tec-spo2', 'tec-rox-fio2', 'tec-rr'].map(id => $(id));
    const value = inputs.every(input => input.value !== '' && input.checkValidity())
      ? model.rox(...inputs.map(input => Number(input.value))) : null;
    $('tec-rox').textContent = value === null ? '—' : value.toFixed(2).replace('.', ',');
    $('tec-rox-note').textContent = value === null ? 'ROX no calculable: revisá los valores; una FR de 0 requiere atención inmediata.' : 'Caso externo · interpretar tendencia y contexto; no es una alarma del TECME.';
  }
  function render() {
    const obs = model.observe(state);
    $('tec-state').textContent = state.running ? 'OAF EN CURSO' : 'EN ESPERA';
    $('tec-flow').textContent = obs.flow;
    $('tec-oxygen').textContent = obs.oxygen ?? '—';
    $('tec-pressure').textContent = obs.pressure.toFixed(1).replace('.', ',');
    $('tec-set-flow').textContent = state.pending?.key === 'flow' ? state.pending.value : state.flow;
    $('tec-set-fio2').textContent = state.pending?.key === 'fio2' ? state.pending.value : state.fio2;
    const seconds = Math.floor(state.elapsed);
    $('tec-timer').textContent = [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60].map(v => String(v).padStart(2, '0')).join(':');
    statusText('tec-alarm', obs.alarm ? `ALARMA SIMULADA · ${obs.alarm}${state.muted ? ' · Audio pausado ' + Math.ceil(state.muted) + ' s' : ''}` : state.locked ? 'Pantalla bloqueada' : state.running ? 'Oxigenoterapia en curso · simulación' : 'En espera · flujo detenido');
    $('tec-alarm').classList.toggle('active', Boolean(obs.alarm));
    $('tec-start').disabled = state.locked || state.running || Boolean(state.pending);
    $('tec-stop').disabled = state.locked || !state.running || Boolean(state.pending);
    $('tec-standby').disabled = state.locked || !state.running || Boolean(state.pending);
    $('tec-restore').disabled = state.locked || state.running || Boolean(state.pending);
    $('tec-lock').setAttribute('aria-pressed', String(state.locked));
    $('tec-lock').setAttribute('aria-label', state.locked ? 'Desbloquear pantalla' : 'Bloquear pantalla: mantener 2 segundos');
    $('tec-top-lamp').classList.toggle('active', Boolean(obs.alarm));
    $('tec-led-high').classList.toggle('active', Boolean(obs.alarm));
    root.querySelectorAll('.tec-keys button,.tec-toolbar button,.tec-pressure-rail button').forEach(button => {
      if (button.id !== 'tec-standby') button.disabled = state.locked;
    });
    const editing = state.pending && state.pending.key !== 'stop';
    $('tec-editor').hidden = !editing;
    $('tec-stop-confirm').hidden = state.pending?.key !== 'stop';
    $('tec-minus').disabled = $('tec-plus').disabled = !editing;
    $('tec-dial').disabled = !state.pending;
    root.querySelectorAll('[data-tec-setting]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.tecSetting === state.pending?.key));
      button.disabled = state.locked || state.pending?.key === 'stop';
    });
    if (editing && document.activeElement !== $('tec-edit-value')) {
      $('tec-edit-label').textContent = `${names[state.pending.key]} · ${model.limits[state.pending.key].join('–')}`;
      [$('tec-edit-value').min, $('tec-edit-value').max] = model.limits[state.pending.key];
      $('tec-edit-value').value = state.pending.value;
    }
    statusText('tec-fault-note', `${state.running ? '' : 'Iniciá la simulación para activar la situación. '}${feedback[state.fault]}${$('tec-humidifier-on').checked ? '' : ' Humidificación pendiente: el respirador no verifica este control externo en el laboratorio.'}`);
    $('tec-step').textContent = state.pending?.key === 'stop' ? 'Confirmá la detención' : editing ? 'Ajustá y confirmá' : state.running ? 'Vigilá equipo y paciente' : 'Configurá e iniciá';
    statusText('tec-screen-message', state.pending?.key === 'stop' ? 'Parar: pulse la perilla para confirmar' : editing ? `${names[state.pending.key]}: girar y pulsar para aceptar` : state.locked ? 'Pantalla bloqueada' : 'Seleccionar · girar · confirmar');
    const sampleSecond = Math.floor(state.elapsed);
    if (sampleSecond !== historySecond || !history.length) {
      history.push(obs); if (history.length > 61) history.shift(); historySecond = sampleSecond;
    }
    for (const [key, max] of [['oxygen', 100], ['flow', 80], ['pressure', 40]]) {
      $('tec-trace-' + key).setAttribute('points', history.map((sample, i) => `${296 - (history.length - 1 - i) * 4.5},${70 - Math.min(max, Math.max(0, sample[key] ?? 0)) / max * 60}`).join(' '));
    }
  }
  function dispatch(action) {
    // Account for elapsed time before any change, including stop/start between ticks.
    const now = performance.now();
    state = model.reduce(state, { type: 'tick', seconds: document.hidden ? 0 : (now - lastTime) / 1000 });
    lastTime = now;
    state = model.reduce(state, action);
    render();
  }
  root.querySelectorAll('[data-tec-setting]').forEach(button => button.addEventListener('click', () => {
    dispatch({ type: 'edit', key: button.dataset.tecSetting });
    $('tec-dial').focus({ preventScroll: true });
    $('tec-feedback').textContent = 'El valor nuevo queda pendiente hasta pulsar Confirmar. Cancelar conserva el ajuste anterior.';
  }));
  function confirm() {
    const key = state.pending?.key;
    if (!key) return;
    if (state.pending && state.pending.key !== 'stop') {
      const input = $('tec-edit-value');
      if (input.value === '' || !input.reportValidity()) return;
      state = model.reduce(state, { type: 'adjust', value: input.value });
    }
    dispatch({ type: 'confirm' });
    $('tec-feedback').textContent = key === 'stop' ? 'Flujo detenido. El contador conserva el tiempo acumulado; Restaurar lo vuelve a cero.' : 'Ajuste confirmado. Iniciá la terapia o seguí observando la lectura del equipo y al paciente.';
    (key === 'stop' ? $('tec-start') : root.querySelector(`[data-tec-setting="${key}"]`))?.focus({ preventScroll: true });
  }
  ['tec-confirm', 'tec-dial', 'tec-confirm-stop'].forEach(id => $(id).addEventListener('click', confirm));
  function cancel() {
    const key = state.pending?.key;
    dispatch({ type: 'cancel' });
    (key === 'stop' ? $('tec-stop') : root.querySelector(`[data-tec-setting="${key}"]`))?.focus({ preventScroll: true });
  }
  ['tec-cancel', 'tec-cancel-stop'].forEach(id => $(id).addEventListener('click', cancel));
  [['tec-minus', -1], ['tec-plus', 1]].forEach(([id, delta]) => $(id).addEventListener('click', () => {
    rotate(delta);
  }));
  function rotate(delta) {
    if (!state.pending || !model.limits[state.pending.key]) return;
    dispatch({ type: 'rotate', delta });
    $('tec-edit-value').value = state.pending.value;
    dialAngle += delta * 12;
    $('tec-dial').style.setProperty('--dial-angle', dialAngle + 'deg');
  }
  const dial = $('tec-dial');
  dial.addEventListener('wheel', event => {
    if (!state.pending || !model.limits[state.pending.key]) return;
    event.preventDefault(); rotate(event.deltaY < 0 ? 1 : -1);
  }, { passive: false });
  dial.addEventListener('keydown', event => {
    if (['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(event.key)) {
      event.preventDefault(); rotate(['ArrowUp', 'ArrowRight'].includes(event.key) ? 1 : -1);
    }
  });
  let drag = null;
  let suppressClick = false;
  dial.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    drag = { y: event.clientY, moved: false }; suppressClick = false;
    // MDN: setPointerCapture keeps mouse/touch drag bound to the dial outside its border.
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture
    dial.setPointerCapture(event.pointerId);
  });
  dial.addEventListener('pointermove', event => {
    if (!drag) return;
    const delta = Math.trunc((drag.y - event.clientY) / 6);
    if (delta) { drag.moved = true; drag.y = event.clientY; rotate(delta); }
  });
  dial.addEventListener('pointerup', () => { suppressClick = Boolean(drag?.moved); drag = null; });
  dial.addEventListener('pointercancel', () => { drag = null; suppressClick = true; });
  // A drag adjusts only: releasing must never also confirm the new setpoint.
  dial.addEventListener('click', event => {
    if (suppressClick) { event.stopImmediatePropagation(); suppressClick = false; }
  }, true);
  $('tec-esc').addEventListener('click', cancel);
  root.addEventListener('keydown', event => {
    if (event.key === 'Escape' && state.pending) { event.preventDefault(); cancel(); }
  });
  let lockTimer;
  function endLockHold() { clearTimeout(lockTimer); lockTimer = undefined; }
  function beginLockHold() {
    if (state.locked || lockTimer) return;
    $('tec-feedback').textContent = 'Mantené el bloqueo presionado durante 2 segundos.';
    lockTimer = setTimeout(() => { dispatch({ type: 'lock' }); $('tec-feedback').textContent = 'Pantalla bloqueada. Soltá y pulsá nuevamente para desbloquear.'; }, 2000);
  }
  $('tec-lock').addEventListener('pointerdown', beginLockHold);
  for (const event of ['pointerup', 'pointercancel', 'pointerleave', 'blur']) $('tec-lock').addEventListener(event, endLockHold);
  $('tec-lock').addEventListener('keydown', event => {
    if ([' ', 'Enter'].includes(event.key)) { event.preventDefault(); if (!event.repeat) beginLockHold(); }
  });
  // Unlock only if the control was already locked before a new press began.
  let unlockOnRelease = false;
  $('tec-lock').addEventListener('pointerdown', () => { unlockOnRelease = state.locked; });
  $('tec-lock').addEventListener('pointerup', () => { if (unlockOnRelease) dispatch({ type: 'lock' }); unlockOnRelease = false; });
  $('tec-lock').addEventListener('keydown', event => { if (!event.repeat && [' ', 'Enter'].includes(event.key)) unlockOnRelease = state.locked; });
  $('tec-lock').addEventListener('keyup', event => { if ([' ', 'Enter'].includes(event.key)) { endLockHold(); if (unlockOnRelease) dispatch({ type: 'lock' }); unlockOnRelease = false; } });
  $('tec-audio').addEventListener('click', () => { dispatch({ type: 'mute' }); $('tec-feedback').textContent = `Audio pausado: ${Math.ceil(state.muted)} s. Esta práctica representa el estado visual, sin emitir sonidos de alarma.`; });
  const panelNotes = {
    limits: 'Alarmas en OAF: presión máxima y concentración de O₂ alta/baja. Elegí un escenario más abajo para practicarlas. Esta vista no replica la programación completa de límites del firmware.',
    menu: 'Menu: la versión local se limita a la práctica OAF. No se simulan calibración, configuración técnica ni el resto de los menús clínicos.',
    mode: 'Mode: este laboratorio está limitado a Oxigenoterapia ADL. No cambia a ventilación mecánica ni produce respiraciones de respaldo.',
    graphics: 'Gráficos: se muestran las tendencias simuladas de oxígeno, flujo y presión. No son curvas de respiraciones ni una predicción fisiológica.',
    freeze: 'Congelar: función complementaria no implementada en esta práctica OAF.',
    measurements: 'Mediciones de mecánica respiratoria: no disponibles en esta práctica de circuito abierto.',
    loop: 'Guardar bucle: no hay bucles ventilatorios en esta pantalla OAF.',
    nebulizer: 'Nebulización: no se activa desde esta práctica. El manual no habilita funciones complementarias en OAF.',
    suction: 'Aspiración +O₂: no se activa en OAF; no cambia el oxígeno configurado.',
    inspiration: 'Inspiración manual: no disponible en OAF. El equipo entrega flujo continuo, no respiraciones.',
    pause: 'Pausa Insp/Exp: no disponible en OAF. No detiene el flujo continuo; usá Parar y confirmá con la perilla.',
    ctrl: 'Ctrl: las combinaciones especiales del firmware quedan fuera de esta práctica. Los ajustes OAF usan incrementos de 1.'
  };
  root.querySelectorAll('[data-tec-panel]').forEach(button => button.addEventListener('click', () => { statusText('tec-feedback', panelNotes[button.dataset.tecPanel]); }));
  $('tec-edit-value').addEventListener('keydown', event => {
    if (event.key === 'Enter') { event.preventDefault(); confirm(); }
    if (event.key === 'Escape') cancel();
  });
  $('tec-edit-value').addEventListener('input', event => {
    if (event.target.value !== '' && event.target.checkValidity()) {
      state = model.reduce(state, { type: 'adjust', value: event.target.value });
      render();
    }
  });
  $('tec-start').addEventListener('click', () => dispatch({ type: 'start' }));
  ['tec-stop', 'tec-standby'].forEach(id => $(id).addEventListener('click', () => dispatch({ type: 'stop' })));
  $('tec-restore').addEventListener('click', () => dispatch({ type: 'restore' }));
  $('tec-fault').addEventListener('change', event => dispatch({ type: 'fault', value: event.target.value }));
  $('tec-humidifier-on').addEventListener('change', render);
  $('tec-help').addEventListener('click', () => { $('tec-help-panel').open = !$('tec-help-panel').open; });
  ['tec-spo2', 'tec-rox-fio2', 'tec-rr'].forEach(id => $(id).addEventListener('input', updateRox));
  document.addEventListener('visibilitychange', () => { lastTime = performance.now(); });
  setInterval(() => { if (!document.hidden && (state.running || state.muted)) dispatch({ type: 'tick', seconds: 0 }); else lastTime = performance.now(); }, 1000);
  render(); updateRox();
})();
