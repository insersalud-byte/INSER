/* Formularios compartidos de la Academia INSER SALUD (ebooks interactivos).
 *
 * Se configura desde la etiqueta <script> de cada ebook, sin tocar el cuerpo del HTML:
 *   <script src="/academia/ebook/inser-formularios.js" defer
 *           data-ebook="Oxigenoterapia nasal de alto flujo"
 *           data-simulador="#simulador-tecme"
 *           data-sugerencias="aside.ebook-desarrollo, main > footer, body > footer, footer, main"></script>
 * El formulario de pedido de simulador se agrega al final de la sección indicada; el de sugerencias y
 * pedidos, antes del primer elemento que exista de la lista (o al final de <main>).
 *
 * No hay servidor: al enviar se abre WhatsApp (351 557 5258) con el mensaje ya armado, igual que el
 * formulario del simulador TECME del ebook de ventilación mecánica. Los datos no se guardan en el ebook.
 */
(function () {
  'use strict';
  if (window.__inserFormularios) return;
  window.__inserFormularios = true;

  var WHATSAPP = '5493515575258';
  var MAX = { name: 80, contact: 120, institution: 120, simulator: 160, message: 600 };

  var CSS = '\
.inser-form{box-sizing:border-box;margin:2rem auto;max-width:1100px;border:1px solid #cfe0dd;border-radius:14px;overflow:hidden;background:#fff;color:#1c2a30;font-family:inherit;line-height:1.5}\
.inser-form *{box-sizing:border-box}\
.inser-form-grid{display:grid;grid-template-columns:minmax(240px,.8fr) minmax(0,1.2fr)}\
.inser-form-copy{padding:clamp(20px,3.5vw,38px);background:#f2faf8}\
.inser-form-eyebrow{display:block;color:#087b6e;font-size:.76rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase}\
.inser-form-copy h2,.inser-form-copy h3{margin:.4rem 0 .6rem;font-size:clamp(1.35rem,2.6vw,1.9rem);line-height:1.15;letter-spacing:-.02em;color:#0f2a2e}\
.inser-form-copy p{margin:0;color:#3f5b60;font-size:.95rem}\
.inser-form-note{margin-top:1.2rem;padding:.8rem .9rem;display:flex;gap:.6rem;align-items:flex-start;background:#d9f2ec;color:#1f4a46;font-size:.82rem;border-radius:10px}\
.inser-form-note svg{flex:0 0 auto;margin-top:.1rem}\
.inser-form form{padding:clamp(20px,3.5vw,38px);display:grid;grid-template-columns:1fr 1fr;gap:.9rem 1rem;align-items:start;background:#fff}\
.inser-form-field{display:flex;flex-direction:column;gap:.3rem;min-width:0}\
.inser-form-field.inser-form-full,.inser-form-actions{grid-column:1/-1}\
.inser-form label{font-size:.78rem;font-weight:800;color:#284650}\
.inser-form label span{font-weight:500;color:#64797e}\
.inser-form input,.inser-form select,.inser-form textarea{width:100%;min-width:0;padding:.65rem .75rem;border:1px solid #a9bfbd;border-radius:8px;background:#fff;color:#1c2a30;font:inherit;font-size:.92rem}\
.inser-form textarea{resize:vertical;min-height:84px}\
.inser-form input:focus-visible,.inser-form select:focus-visible,.inser-form textarea:focus-visible{outline:3px solid #f0b83a;outline-offset:1px;border-color:#80601f}\
.inser-form [aria-invalid="true"]{border-color:#b44437}\
.inser-form small[role="alert"]{color:#9c3025;font-size:.76rem;font-weight:700}\
.inser-form-actions{display:flex;flex-wrap:wrap;align-items:center;gap:.6rem 1rem;margin-top:.2rem}\
.inser-form button{padding:.75rem 1.1rem;display:inline-flex;align-items:center;gap:.5rem;border:0;border-radius:999px;background:#087b6e;color:#fff;font:inherit;font-size:.9rem;font-weight:800;cursor:pointer}\
.inser-form button:hover{background:#075f56}\
.inser-form button:focus-visible,.inser-form-fallback:focus-visible{outline:3px solid #f0b83a;outline-offset:3px}\
.inser-form-fallback{color:#087b6e;font-weight:800;font-size:.85rem}\
.inser-form-status{grid-column:1/-1;margin:0;color:#34565e;font-size:.82rem}\
.inser-form-privacy{grid-column:1/-1;color:#61777d;font-size:.76rem;line-height:1.45}\
@media (max-width:760px){.inser-form-grid{grid-template-columns:1fr}.inser-form form{grid-template-columns:1fr}}\
@media print{.inser-form{display:none!important}}';

  var ICON_CHAT = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#087b6e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>';
  var ICON_SEND = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>';

  function clean(value, max) { return String(value || '').trim().replace(/\s+/g, ' ').slice(0, max); }
  // Para el mensaje libre se conservan los saltos de línea (párrafos) y solo se compactan espacios repetidos.
  function cleanText(value, max) { return String(value || '').replace(/\r\n?/g, '\n').replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim().slice(0, max); }
  function slug() { var p = location.pathname.split('/').filter(Boolean); var s = p[p.length - 1]; return s && s !== 'academia' ? 'academia-' + s : 'academia'; }
  function medir(ev, params) { try { if (typeof window.gtag === 'function') { params.source = slug(); window.gtag('event', ev, params); } } catch (e) { /* sin GA4 */ } }
  function ebookName(el) {
    var n = el.getAttribute('data-ebook');
    if (n) return n;
    var t = (document.title || '').split('|')[0].replace(/^Curso gratuito de\s*/i, '').split(':')[0].trim();
    return t || 'este ebook';
  }

  function field(id, name, label, control, opts) {
    opts = opts || {};
    // Los campos obligatorios llevan aria-required (el control viene sin cerrar el tag: se inserta antes del primer '>').
    if (!opts.optional && name !== 'type') control = control.replace('>', ' aria-required="true">');
    return '<div class="inser-form-field' + (opts.full ? ' inser-form-full' : '') + '" data-field="' + name + '">' +
      '<label for="' + id + '">' + label + (opts.optional ? ' <span>(opcional)</span>' : name === 'type' ? '' : ' <span>(obligatorio)</span>') + '</label>' + control + '</div>';
  }

  function build(el, kind, uid) {
    var ebook = ebookName(el);
    var id = 'inser-' + kind + '-' + uid;
    var titleId = id + '-titulo';
    var copy, form;
    var nota = '<div class="inser-form-note">' + ICON_CHAT + '<span>Al enviar se abre WhatsApp con el mensaje ya preparado para el <strong>351 557 5258</strong>. Usted puede revisarlo antes de enviarlo.</span></div>';
    if (kind === 'simulador') {
      // data-simulador-texto permite adaptar la consigna al ebook (p. ej. imágenes: patrones y modalidades, no equipos).
      var consigna = cfg.simuladorTexto || 'Díganos qué equipo o dispositivo (marca y modelo) le gustaría practicar en un simulador de este ebook.';
      copy = '<span class="inser-form-eyebrow">¿Le gustaría practicar con otro simulador?</span>' +
        '<h3 id="' + titleId + '">Pida el próximo simulador</h3>' +
        '<p>' + consigna + ' La institución es opcional.</p>' + nota;
      form =
        field(id + '-name', 'name', 'Nombre y apellido', '<input id="' + id + '-name" name="name" autocomplete="name" maxlength="' + MAX.name + '">') +
        field(id + '-contact', 'contact', 'Contacto', '<input id="' + id + '-contact" name="contact" autocomplete="tel" maxlength="' + MAX.contact + '" placeholder="WhatsApp, teléfono o correo">') +
        field(id + '-institution', 'institution', 'Institución', '<input id="' + id + '-institution" name="institution" autocomplete="organization" maxlength="' + MAX.institution + '">', { optional: true, full: true }) +
        field(id + '-simulator', 'simulator', '¿Qué simulador o equipo le gustaría ver?', '<textarea id="' + id + '-simulator" name="simulator" rows="3" maxlength="' + MAX.simulator + '" placeholder="Ej.: marca y modelo del equipo, u otro dispositivo…"></textarea>', { full: true }) +
        '<div class="inser-form-actions"><button type="submit">' + ICON_SEND + ' Enviar pedido por WhatsApp</button><a class="inser-form-fallback" target="_blank" rel="noopener noreferrer" onclick="" hidden>Si no se abrió WhatsApp, toque aquí</a></div>';
    } else {
      copy = '<span class="inser-form-eyebrow">Su opinión mejora este ebook</span>' +
        '<h2 id="' + titleId + '">Sugerencias y pedidos</h2>' +
        '<p>¿Encontró un error, le faltó un tema o quiere pedir un caso, una herramienta o un capítulo nuevo? Cuéntenos y lo tenemos en cuenta en la próxima revisión del ebook.</p>' + nota;
      form =
        field(id + '-name', 'name', 'Nombre y apellido', '<input id="' + id + '-name" name="name" autocomplete="name" maxlength="' + MAX.name + '">') +
        field(id + '-contact', 'contact', 'Contacto', '<input id="' + id + '-contact" name="contact" autocomplete="tel" maxlength="' + MAX.contact + '" placeholder="WhatsApp, teléfono o correo">') +
        field(id + '-type', 'type', 'Tipo de mensaje', '<select id="' + id + '-type" name="type"><option value="Sugerencia de mejora">Sugerencia de mejora</option><option value="Pedido de contenido o herramienta">Pedido de contenido o herramienta</option><option value="Error o dato a corregir">Error o dato a corregir</option><option value="Consulta">Consulta</option></select>', { full: true }) +
        field(id + '-message', 'message', 'Mensaje', '<textarea id="' + id + '-message" name="message" rows="4" maxlength="' + MAX.message + '" placeholder="Indique el capítulo o la sección si corresponde…"></textarea>', { full: true }) +
        '<div class="inser-form-actions"><button type="submit">' + ICON_SEND + ' Enviar por WhatsApp</button><a class="inser-form-fallback" target="_blank" rel="noopener noreferrer" onclick="" hidden>Si no se abrió WhatsApp, toque aquí</a></div>';
    }
    // El enlace de respaldo lleva onclick vacío a propósito: el medidor global de wa.me de cada ebook ignora los enlaces con onclick
    // y así el clic no se cuenta dos veces (ya se mide como solicitud_simulador / sugerencia_ebook).
    el.className = (el.className ? el.className + ' ' : '') + 'inser-form inser-form-' + kind;
    el.setAttribute('role', 'region');
    el.setAttribute('aria-labelledby', titleId);
    el.innerHTML = '<div class="inser-form-grid"><div class="inser-form-copy">' + copy + '</div>' +
      '<form novalidate>' + form + '<p class="inser-form-status" role="status" hidden></p>' +
      '<small class="inser-form-privacy">Los datos no se guardan en el ebook: se incluyen únicamente en el mensaje de WhatsApp.</small></form></div>';

    var f = el.querySelector('form');
    var status = el.querySelector('.inser-form-status');
    var fallback = el.querySelector('.inser-form-fallback');

    function get(name) { return f.elements[name] ? f.elements[name].value : ''; }
    function setError(name, msg) {
      var input = f.elements[name]; if (!input) return;
      var holder = input.closest('.inser-form-field') || input.parentNode;
      var old = holder.querySelector('small[role="alert"]'); if (old) old.remove();
      if (msg) {
        input.setAttribute('aria-invalid', 'true');
        input.setAttribute('aria-describedby', input.id + '-error');
        var s = document.createElement('small'); s.id = input.id + '-error'; s.setAttribute('role', 'alert'); s.textContent = msg;
        holder.appendChild(s);
      } else { input.removeAttribute('aria-invalid'); input.removeAttribute('aria-describedby'); }
    }
    function validate() {
      var errors = 0;
      var name = clean(get('name'), MAX.name), contact = clean(get('contact'), MAX.contact);
      setError('name', name ? '' : 'Ingrese su nombre.'); errors += name ? 0 : 1;
      setError('contact', contact ? '' : 'Ingrese un medio de contacto.'); errors += contact ? 0 : 1;
      if (kind === 'simulador') { var sim = clean(get('simulator'), MAX.simulator); setError('simulator', sim ? '' : 'Indique qué simulador o equipo le gustaría ver.'); errors += sim ? 0 : 1; }
      else { var msg = clean(get('message'), MAX.message); setError('message', msg ? '' : 'Escriba su sugerencia, pedido o consulta.'); errors += msg ? 0 : 1; }
      return errors === 0;
    }
    function message() {
      var lines;
      if (kind === 'simulador') {
        lines = ['Hola Sergio, quiero pedir un nuevo simulador para el ebook de ' + ebook + '.', '',
          'Nombre: ' + clean(get('name'), MAX.name), 'Contacto: ' + clean(get('contact'), MAX.contact),
          'Institución: ' + (clean(get('institution'), MAX.institution) || 'No corresponde'),
          'Simulador o equipo pedido: ' + clean(get('simulator'), MAX.simulator)];
      } else {
        lines = ['Hola Sergio, le escribo desde el ebook de ' + ebook + '.', 'Tipo: ' + get('type'), '',
          'Nombre: ' + clean(get('name'), MAX.name), 'Contacto: ' + clean(get('contact'), MAX.contact),
          'Mensaje: ' + cleanText(get('message'), MAX.message)];
      }
      return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(lines.join('\n'));
    }
    f.addEventListener('input', function (e) { if (e.target && e.target.name && e.target.name !== 'institution' && e.target.name !== 'type') setError(e.target.name, ''); status.hidden = true; });
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) { status.textContent = 'Revise los campos marcados antes de continuar.'; status.hidden = false; var first = f.querySelector('[aria-invalid="true"]'); if (first) first.focus(); return; }
      var url = message();
      medir(kind === 'simulador' ? 'solicitud_simulador' : 'sugerencia_ebook', { tipo: kind === 'simulador' ? 'simulador' : get('type') });
      // Sin "noopener" en las features: con esa opción window.open devuelve null aunque haya abierto la
      // pestaña y no se puede saber si el navegador la bloqueó. El opener se corta a mano.
      var opened = null;
      try { opened = window.open(url, '_blank'); if (opened) opened.opener = null; } catch (err) { opened = null; }
      fallback.href = url;
      fallback.hidden = false;
      status.textContent = opened
        ? 'Se abrió WhatsApp con el mensaje completo. Revíselo y toque Enviar.'
        : 'El navegador bloqueó la nueva ventana. Use el enlace que está junto al botón.';
      status.hidden = false;
    });
  }

  // Configuracion por atributos del <script>:
  //   data-ebook="Nombre del ebook"  data-simulador="#seccion-del-simulador"  data-sugerencias="aside.ebook-desarrollo, footer, main"
  var me = document.currentScript;
  var cfg = me
    ? { ebook: me.getAttribute('data-ebook') || '', simulador: me.getAttribute('data-simulador') || '', simuladorTexto: me.getAttribute('data-simulador-texto') || '', sugerencias: me.getAttribute('data-sugerencias') || '' }
    : { ebook: '', simulador: '', simuladorTexto: '', sugerencias: '' };

  function placeholder(kind, anchorSel, where) {
    if (!anchorSel) return;
    // Varios selectores separados por coma: se usa el primero que exista en la pagina.
    var anchor = null, sels = anchorSel.split(',');
    for (var k = 0; k < sels.length && !anchor; k++) { try { anchor = document.querySelector(sels[k].trim()); } catch (e) { anchor = null; } }
    if (!anchor || document.querySelector('[data-inser-form="' + kind + '"]')) return;
    var div = document.createElement('div');
    div.setAttribute('data-inser-form', kind);
    if (cfg.ebook) div.setAttribute('data-ebook', cfg.ebook);
    // Si el ancla es <main> (ebooks sin pie ni aside), el formulario va al final de <main>.
    if (where === 'append' || anchor.tagName === 'MAIN') anchor.appendChild(div); else anchor.parentNode.insertBefore(div, anchor);
  }

  function init() {
    placeholder('simulador', cfg.simulador, 'append');
    placeholder('sugerencias', cfg.sugerencias, 'before');
    var nodes = document.querySelectorAll('[data-inser-form]');
    if (!nodes.length) return;
    if (!document.getElementById('inser-form-css')) { var st = document.createElement('style'); st.id = 'inser-form-css'; st.textContent = CSS; document.head.appendChild(st); }
    for (var i = 0; i < nodes.length; i++) {
      var kind = nodes[i].getAttribute('data-inser-form') === 'simulador' ? 'simulador' : 'sugerencias';
      if (!nodes[i].getAttribute('data-inser-ready')) { build(nodes[i], kind, i + 1); nodes[i].setAttribute('data-inser-ready', '1'); }
    }
  }

  // En los ebooks hechos con React (VM, VNI, guía) hay que esperar a que termine de hidratar antes de
  // agregar nodos dentro de #root; si no, React los toma como diferencia con el HTML prerenderizado y
  // vuelve a dibujar todo. React marca cada nodo hidratado con una propiedad __reactFiber$…: cuando la
  // última sección del root la tiene, la hidratación terminó. Tope de 20 s por si algo falla.
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
  // Arranca con el DOM listo (no espera a que carguen todas las imágenes); en páginas sin React, hydrated() da true enseguida.
  var tries = 0;
  function pending() {
    return (cfg.simulador && !document.querySelector('[data-inser-form="simulador"]')) ||
      (cfg.sugerencias && !document.querySelector('[data-inser-form="sugerencias"]'));
  }
  function start() {
    if (hydrated() || tries++ > 130) {
      setTimeout(init, 150);
      // Reintenta un rato (init es idempotente): cubre anclas que aparecen tarde o un redibujado de React.
      var again = 0, timer = setInterval(function () { init(); if (!pending() || again++ > 60) clearInterval(timer); }, 700);
      window.addEventListener('load', init);
      return;
    }
    setTimeout(start, 150);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  window.inserFormularios = { init: init };
})();
