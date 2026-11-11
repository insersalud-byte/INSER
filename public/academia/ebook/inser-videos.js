/* Videos prácticos compartidos de la Academia INSER SALUD (ebooks interactivos).
 *
 * Se configura desde la etiqueta <script> de cada ebook, sin tocar el cuerpo del HTML:
 *   <script src="/academia/ebook/inser-videos.js" defer data-ebook="alto-flujo"></script>
 * Para cada ebook: los videos propios (MP4 en ./videos/) se agregan al final de la sección indicada y
 * se arma un bloque "Videos prácticos" antes de la sección de cierre, con los propios y videos
 * externos verificados (YouTube sin cookies, se cargan solo al tocar).
 * En los ebooks hechos con React espera a que termine la hidratación antes de agregar nodos.
 */
(function () {
  'use strict';
  if (window.__inserVideos) return;
  window.__inserVideos = true;

  var script = document.currentScript || document.querySelector('script[src*="inser-videos.js"]');
  var EB = script && script.getAttribute('data-ebook');
  var BASE = '/academia/ebook/' + EB + '/videos/';

  var DATA = {
    'ventilacion-no-invasiva': {
      before: '#evidencia',
      own: [
        ['vni1', '#interfaces', 'Fuga intencional y no intencional', 'Cómo leer la fuga en la curva de flujo y cuándo reajustar la máscara.', '0:26'],
        ['vni2', '#monitoreo', 'Asincronías en VNI', 'Autodisparo, esfuerzo ineficaz, ciclado tardío por fuga y doble disparo.', '0:26'],
        ['vni3', '#monitoreo', 'La primera y la segunda hora', 'EPOC con acidosis: qué mirar a la hora y cuándo la VNI fracasó.', '0:26']
      ],
      yt: [['8Qo0HZm58f0', 'Colocación y ajuste de una máscara oronasal', 'Intersurgical · en español']]
    },
    'alto-flujo': {
      before: '#referencias',
      own: [
        ['oaf1', '#fisiologia', 'Qué hace el flujo', 'Flujo contra demanda, FiO₂ real y lavado del espacio muerto.', '0:26'],
        ['oaf2', '#rox', 'El índice ROX', 'Tres trayectorias a las 2, 6 y 12 horas y sus cortes.', '0:26']
      ],
      yt: [['ZEG8mr22tnQ', 'Armado y puesta en marcha de un equipo de alto flujo', 'Enfermería en Corto · en español']]
    },
    'oxigenoterapia': {
      before: '#fuentes',
      own: [
        ['o21', '#venturi', 'Cómo funciona la Venturi', 'Mezcla fija por adaptador y flujo total que cae al subir la FiO₂.', '0:26'],
        ['o22', '#bigotera', 'Bigotera y FiO₂', 'Por qué el mismo caudal no da la misma FiO₂ con taquipnea.', '0:26']
      ],
      yt: [['u7oax-_6nVA', 'Uso de la máscara Venturi', 'Universidad de Santiago de Chile · en español']]
    },
    'extubacion-decanulacion-deglucion': {
      before: '#evidencia',
      own: [
        ['ext1', '#extubacion', 'Prueba de fuga del manguito', 'Cómo se hace, cómo se calcula y qué hacer si la fuga es baja.', '0:26'],
        ['ext2', '#extubacion', 'Prueba de ventilación espontánea', 'Cómo se ve el éxito y el fracaso en 30 minutos.', '0:26']
      ],
      yt: [
        ['M6KOcFJwtI4', 'Decanulación paso a paso', 'Clínica Basilea · en español'],
        ['3ylhPBm3Yhg', 'Cuff leak test en el ventilador', 'Respiratory HQ · en inglés']
      ]
    },
    'rehabilitacion-pulmonar': {
      before: '#evidencia',
      own: [
        ['reh1', '#marcha', 'Prueba de marcha de 6 minutos', 'Dos respuestas: completar la prueba o detenerla por desaturación.', '0:26'],
        ['reh2', '#respiracion', 'Labios fruncidos', 'Por qué reducen el atrapamiento aéreo durante el esfuerzo.', '0:26']
      ],
      yt: [['3dWHS4ksOH8', 'Cómo se realiza la prueba de marcha de 6 minutos', 'Hospital Vozandes · en español']]
    },
    'ventilacion-neuromuscular': {
      before: '#fuentes',
      own: [
        ['nm1', '#tos', 'Pico flujo de tos', 'De la tos espontánea a la insuflación-exuflación mecánica.', '0:26'],
        ['nm2', '#estudios', 'CV sentado y acostado', 'Una prueba simple para detectar debilidad diafragmática.', '0:26']
      ],
      yt: [['sW7zuKTzWUg', 'Técnicas de tos asistida', 'FEDIMURA · en español']]
    },
    'apnea-del-sueno': {
      before: '#referencias',
      own: [
        ['ap2', '#poligrafia', 'Leer la poligrafía', 'Apnea obstructiva, central e hipopnea en los canales del registro.', '0:26'],
        ['ap1', '#pap', 'CPAP fija y APAP', 'Cómo se comportan en una noche y qué leer en la descarga.', '0:26']
      ],
      yt: [['bLJFwkUXu_I', 'Colocación del polígrafo domiciliario ApneaLink Air', 'ResMed · en español']]
    },
    'imagenes-respiratorias': {
      before: '#bibliografia',
      own: [
        ['img1', '#diafragma', 'Ecografía diafragmática', 'Excursión en modo M y fracción de engrosamiento.', '0:26']
      ],
      yt: [['7hXL9cl5RqM', 'Ecografía del diafragma: técnica', 'Ecografía de nervios DTF · en español']]
    }
  };
  var D = DATA[EB];
  if (!D) return;

  var CSS = '\
.iv-wrap{box-sizing:border-box;max-width:1100px;margin:1.6rem auto;font-family:inherit}\
.iv-wrap *{box-sizing:border-box}\
.iv-fig{margin:1.4rem auto;max-width:900px;border-radius:14px;overflow:hidden;background:#071923;border:1px solid #173a48;color:#eaf4f3}\
.iv-fig video{display:block;width:100%;height:auto;aspect-ratio:16/9;background:#071923}\
.iv-cap{padding:.8rem 1rem .95rem;display:flex;gap:.7rem;align-items:flex-start;font-size:.92rem;line-height:1.45}\
.iv-cap b{display:block;color:#fff;font-size:1rem}\
.iv-cap span{color:#9fb6ba}\
.iv-kick{flex:0 0 auto;margin-top:.15rem;padding:.18rem .5rem;border-radius:6px;background:#19bca6;color:#071923;font-size:.68rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase}\
.iv-sec{margin:2.4rem auto;padding:clamp(18px,3vw,32px);border-radius:16px;background:#0d2632;color:#eaf4f3;border:1px solid #173a48}\
.iv-sec h2{margin:.2rem 0 .4rem;font-size:clamp(1.4rem,2.6vw,1.9rem);line-height:1.15;color:#fff}\
.iv-sec>p{margin:0 0 1.2rem;color:#9fb6ba;font-size:.95rem}\
.iv-eyebrow{display:block;color:#19bca6;font-size:.76rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase}\
.iv-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px}\
.iv-card{display:flex;flex-direction:column;border-radius:12px;overflow:hidden;background:#071923;border:1px solid #173a48;color:inherit;text-decoration:none;cursor:pointer;text-align:left;padding:0;font:inherit}\
.iv-card:hover,.iv-card:focus-visible{border-color:#19bca6;outline:none}\
.iv-thumb{position:relative;display:block;aspect-ratio:16/9;background:#000 center/cover no-repeat}\
.iv-thumb iframe{position:absolute;inset:0;width:100%;height:100%;border:0}\
.iv-play{position:absolute;left:50%;top:50%;width:54px;height:54px;margin:-27px 0 0 -27px;border-radius:50%;background:rgba(7,25,35,.82);border:2px solid #8ff0e1}\
.iv-play:after{content:"";position:absolute;left:21px;top:15px;border-left:16px solid #8ff0e1;border-top:11px solid transparent;border-bottom:11px solid transparent}\
.iv-dur{position:absolute;right:8px;bottom:8px;padding:1px 6px;border-radius:5px;background:rgba(0,0,0,.75);color:#fff;font-size:.75rem;font-weight:700}\
.iv-meta{padding:.7rem .85rem .85rem;font-size:.85rem;line-height:1.4}\
.iv-meta b{display:block;color:#fff;font-size:.95rem;margin-bottom:.15rem}\
.iv-meta span{color:#9fb6ba}\
.iv-note{margin:1.1rem 0 0;color:#9fb6ba;font-size:.8rem}\
@media (max-width:560px){.iv-cap{flex-direction:column;gap:.35rem}}';

  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function figure(v) {
    var f = el('figure', 'iv-fig');
    f.setAttribute('data-iv', v[0]);
    f.id = 'video-' + v[0];
    var vid = document.createElement('video');
    vid.controls = true; vid.preload = 'none'; vid.playsInline = true;
    vid.setAttribute('poster', BASE + v[0] + '.jpg');
    vid.setAttribute('aria-label', v[2]);
    var src = document.createElement('source'); src.src = BASE + v[0] + '.mp4'; src.type = 'video/mp4';
    vid.appendChild(src);
    f.appendChild(vid);
    f.appendChild(el('figcaption', 'iv-cap', '<span class="iv-kick">Video práctico</span><div><b>' + esc(v[2]) + '</b><span>' + esc(v[3]) + ' Animación docente con señales sintéticas · ' + v[4] + '</span></div>'));
    return f;
  }

  function ownCard(v) {
    var a = el('a', 'iv-card');
    a.href = '#video-' + v[0];
    a.innerHTML = '<span class="iv-thumb" style="background-image:url(' + BASE + v[0] + '-t.jpg)"><span class="iv-play"></span><span class="iv-dur">' + v[4] + '</span></span><span class="iv-meta"><b>' + esc(v[2]) + '</b><span>Video propio · Academia INSER</span></span>';
    a.addEventListener('click', function (e) {
      var t = document.getElementById('video-' + v[0]);
      if (!t) return;
      e.preventDefault();
      t.scrollIntoView({ behavior: 'smooth', block: 'center' });
      var vid = t.querySelector('video');
      if (vid) setTimeout(function () { try { var p = vid.play(); if (p && p.catch) p.catch(function () {}); } catch (err) {} }, 500);
    });
    return a;
  }

  function ytCard(y) {
    var b = el('button', 'iv-card');
    b.type = 'button';
    b.setAttribute('aria-label', 'Reproducir: ' + y[1]);
    b.innerHTML = '<span class="iv-thumb" style="background-image:url(https://i.ytimg.com/vi/' + y[0] + '/hqdefault.jpg)"><span class="iv-play"></span></span><span class="iv-meta"><b>' + esc(y[1]) + '</b><span>' + esc(y[2]) + ' · YouTube</span></span>';
    b.addEventListener('click', function () {
      var th = b.querySelector('.iv-thumb');
      if (th.querySelector('iframe')) return;
      var fr = document.createElement('iframe');
      fr.src = 'https://www.youtube-nocookie.com/embed/' + y[0] + '?autoplay=1&rel=0';
      fr.title = y[1];
      fr.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      fr.allowFullscreen = true;
      th.innerHTML = '';
      th.appendChild(fr);
    });
    return b;
  }

  function section() {
    var s = el('section', 'iv-wrap iv-sec');
    s.id = 'videos-practicos';
    s.setAttribute('data-iv', 'sec');
    s.appendChild(el('span', 'iv-eyebrow', 'Ver para aprender'));
    s.appendChild(el('h2', null, 'Videos prácticos'));
    s.appendChild(el('p', null, 'Animaciones propias que resumen los procedimientos del ebook y videos externos seleccionados. Los externos se cargan solo al tocarlos.'));
    var g = el('div', 'iv-grid');
    D.own.forEach(function (v) { g.appendChild(ownCard(v)); });
    D.yt.forEach(function (y) { g.appendChild(ytCard(y)); });
    s.appendChild(g);
    s.appendChild(el('p', 'iv-note', 'Los videos externos pertenecen a sus autores y pueden usar equipos o protocolos distintos de los de su institución. Ante una diferencia, siga el texto del ebook y las normas locales.'));
    return s;
  }

  function init() {
    if (!document.getElementById('iv-style')) { var st = el('style'); st.id = 'iv-style'; st.textContent = CSS; document.head.appendChild(st); }
    D.own.forEach(function (v) {
      if (document.querySelector('[data-iv="' + v[0] + '"]')) return;
      var target = document.querySelector(v[1]);
      if (!target) return;
      var w = el('div', 'iv-wrap'); w.setAttribute('data-iv-host', v[0]); w.appendChild(figure(v));
      target.appendChild(w);
    });
    if (!document.querySelector('[data-iv="sec"]')) {
      var before = document.querySelector(D.before);
      if (before && before.parentNode) before.parentNode.insertBefore(section(), before);
      else { var m = document.querySelector('main') || document.body; m.appendChild(section()); }
    }
  }
  function pending() {
    if (!document.querySelector('[data-iv="sec"]')) return true;
    for (var i = 0; i < D.own.length; i++) if (!document.querySelector('[data-iv="' + D.own[i][0] + '"]')) return true;
    return false;
  }

  function hydrated() {
    var root = document.getElementById('root');
    if (!root) return true;
    var keys = Object.keys(root), isReact = false;
    for (var i = 0; i < keys.length; i++) if (keys[i].indexOf('__reactContainer') === 0) isReact = true;
    if (!isReact) return false;
    var last = root.querySelector('section:last-of-type') || root.lastElementChild;
    if (!last) return true;
    var lk = Object.keys(last);
    for (var j = 0; j < lk.length; j++) if (lk[j].indexOf('__reactFiber') === 0) return true;
    return false;
  }
  var tries = 0;
  function start() {
    if (hydrated() || tries++ > 130) {
      setTimeout(init, 200);
      var again = 0, timer = setInterval(function () { init(); if (!pending() || again++ > 60) clearInterval(timer); }, 700);
      window.addEventListener('load', init);
      return;
    }
    setTimeout(start, 150);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  window.inserVideos = { init: init };
})();
