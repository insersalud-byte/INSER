/* Formularios compartidos de la Academia INSER SALUD (ebooks interactivos).
 *
 * Se insertan con un marcador en el HTML de cada ebook:
 *   <div data-inser-form="simulador"   data-ebook="Oxigenoterapia de alto flujo"></div>
 *   <div data-inser-form="sugerencias" data-ebook="Oxigenoterapia de alto flujo"></div>
 * y este script: <script src="https://insersalud.com/academia/ebook/inser-formularios.js" defer></script>
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
.inser-form-eyebrow{display:block;color:#087b6e;font-size:.68rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase}\
.inser-form-copy h2,.inser-form-copy h3{margin:.4rem 0 .6rem;font-size:clamp(1.35rem,2.6vw,1.9rem);line-height:1.15;letter-spacing:-.02em;color:#0f2a2e}\
.inser-form-copy p{margin:0;color:#3f5b60;font-size:.95rem}\
.inser-form-note{margin-top:1.2rem;padding:.8rem .9rem;display:flex;gap:.6rem;align-items:flex-start;background:#d9f2ec;color:#1f4a46;font-size:.82rem;border-radius:10px}\
.inser-form-note svg{flex:0 0 auto;margin-top:.1rem}\
.inser-form form{padding:clamp(20px,3.5vw,38px);display:grid;grid-template-columns:1fr 1fr;gap:.35rem 1rem;background:#fff}\
.inser-form label{margin-top:.5rem;font-size:.78rem;font-weight:800;color:#284650}\
.inser-form label span{font-weight:500;color:#64797e}\
.inser-form input,.inser-form select,.inser-form textarea{width:100%;min-width:0;padding:.65rem .75rem;border:1px solid #a9bfbd;border-radius:8px;background:#fff;color:#1c2a30;font:inherit;font-size:.92rem}\
.inser-form textarea{resize:vertical;min-height:84px}\
.inser-form .inser-form-full{grid-column:1/-1}\
.inser-form input:focus-visible,.inser-form select:focus-visible,.inser-form textarea:focus-visible{outline:3px solid #f0b83a;outline-offset:1px;border-color:#80601f}\
.inser-form [aria-invalid="true"]{border-color:#b44437}\
.inser-form small[role="alert"]{color:#9c3025;font-size:.74rem;font-weight:700}\
.inser-form button{grid-column:1/-1;width:fit-content;margin-top:.75rem;padding:.75rem 1.1rem;display:inline-flex;align-items:center;gap:.5rem;border:0;border-radius:999px;background:#087b6e;color:#fff;font:inherit;font-size:.9rem;font-weight:800;cursor:pointer}\
.inser-form button:hover{background:#075f56}\
.inser-form button:focus-visible{outline:3px solid #f0b83a;outline-offset:3px}\
.inser-form-status{grid-column:1/-1;margin:.3rem 0 0;color:#34565e;font-size:.82rem}\
.inser-form-fallback{grid-column:1/-1;width:fit-content;color:#087b6e;font-weight:800;font-size:.85rem}\
.inser-form-privacy{grid-column:1/-1;color:#61777d;font-size:.72rem;line-height:1.45}\
@media (max-width:760px){.inser-form-grid{grid-template-columns:1fr}.inser-form form{grid-template-columns:1fr}.inser-form .inser-form-full{grid-column:auto}}\
@media print{.inser-form{display:none!important}}';

  var ICON_CHAT = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#087b6e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>';
  var ICON_SEND = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>';

  function clean(value, max) { return String(value || '').trim().replace(/\s+/g, ' ').slice(0, max); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function slug() { var p = location.pathname.split('/').filter(Boolean); var s = p[p.length - 1]; return s && s !== 'academia' ? 'academia-' + s : 'academia'; }
  function medir(ev, params) { try { if (typeof window.gtag === 'function') { params.source = slug(); window.gtag('event', ev, params); } } catch (e) { /* sin GA4 */ } }
  function ebookName(el) {
    var n = el.getAttribute('data-ebook');
    if (n) return n;
    var t = (document.title || '').split('|')[0].replace(/^Curso gratuito de\s*/i, '').split(':')[0].trim();
    return t || 'este ebook';
  }

  function field(id, label, html, optional) {
    return '<label for="' + id + '">' + label + (optional ? ' <span>(opcional)</span>' : '') + '</label>' + html;
  }

  function build(el, kind, uid) {
    var ebook = ebookName(el);
    var id = 'inser-' + kind + '-' + uid;
    var copy, form;
    if (kind === 'simulador') {
      copy = '<span class="inser-form-eyebrow">¿Necesita otro equipo?</span>' +
        '<h3>Solicite el próximo simulador</h3>' +
        '<p>Complete sus datos y díganos qué respirador, equipo o dispositivo de otra marca le gustaría practicar en este ebook. La institución es opcional.</p>' +
        '<div class="inser-form-note">' + ICON_CHAT + '<span>Al continuar se abrirá WhatsApp con el mensaje preparado para el <strong>351 557 5258</strong>. Usted podrá revisarlo antes de enviarlo.</span></div>';
      form =
        field(id + '-name', 'Nombre y apellido', '<input id="' + id + '-name" name="name" autocomplete="name" maxlength="' + MAX.name + '">') +
        field(id + '-contact', 'Contacto', '<input id="' + id + '-contact" name="contact" autocomplete="tel" maxlength="' + MAX.contact + '" placeholder="WhatsApp, teléfono o correo">') +
        '<div class="inser-form-full">' + field(id + '-institution', 'Institución', '<input id="' + id + '-institution" name="institution" autocomplete="organization" maxlength="' + MAX.institution + '">', true) + '</div>' +
        '<div class="inser-form-full">' + field(id + '-simulator', '¿Qué simulador o equipo le gustaría ver?', '<textarea id="' + id + '-simulator" name="simulator" rows="3" maxlength="' + MAX.simulator + '" placeholder="Ej.: marca y modelo del equipo, u otro dispositivo…"></textarea>') + '</div>' +
        '<button type="submit">' + ICON_SEND + ' Enviar solicitud por WhatsApp</button>';
    } else {
      copy = '<span class="inser-form-eyebrow">Su opinión mejora este ebook</span>' +
        '<h2>Sugerencias y pedidos</h2>' +
        '<p>¿Encontró un error, le faltó un tema o quiere pedir un caso, una herramienta o un capítulo nuevo? Cuéntenos y lo revisamos para la próxima revisión del ebook.</p>' +
        '<div class="inser-form-note">' + ICON_CHAT + '<span>Al continuar se abrirá WhatsApp con el mensaje preparado para el <strong>351 557 5258</strong>. Usted podrá revisarlo antes de enviarlo.</span></div>';
      form =
        field(id + '-name', 'Nombre y apellido', '<input id="' + id + '-name" name="name" autocomplete="name" maxlength="' + MAX.name + '">') +
        field(id + '-contact', 'Contacto', '<input id="' + id + '-contact" name="contact" autocomplete="tel" maxlength="' + MAX.contact + '" placeholder="WhatsApp, teléfono o correo">') +
        '<div class="inser-form-full">' + field(id + '-type', 'Tipo de mensaje', '<select id="' + id + '-type" name="type"><option value="Sugerencia de mejora">Sugerencia de mejora</option><option value="Pedido de contenido o herramienta">Pedido de contenido o herramienta</option><option value="Error o dato a corregir">Error o dato a corregir</option><option value="Consulta">Consulta</option></select>') + '</div>' +
        '<div class="inser-form-full">' + field(id + '-message', 'Mensaje', '<textarea id="' + id + '-message" name="message" rows="4" maxlength="' + MAX.message + '" placeholder="Indique el capítulo o la sección si corresponde…"></textarea>') + '</div>' +
        '<button type="submit">' + ICON_SEND + ' Enviar por WhatsApp</button>';
    }
    el.className = (el.className ? el.className + ' ' : '') + 'inser-form inser-form-' + kind;
    el.setAttribute('aria-label', kind === 'simulador' ? 'Solicitar otro simulador' : 'Sugerencias y pedidos para el ebook');
    el.innerHTML = '<div class="inser-form-grid"><div class="inser-form-copy">' + copy + '</div>' +
      '<form novalidate>' + form + '<p class="inser-form-status" role="status" hidden></p><a class="inser-form-fallback" target="_blank" rel="noopener noreferrer" hidden>Abrir WhatsApp ahora</a>' +
      '<small class="inser-form-privacy">Los datos no se guardan en el ebook: se incluyen únicamente en el mensaje de WhatsApp.</small></form></div>';

    var f = el.querySelector('form');
    var status = el.querySelector('.inser-form-status');
    var fallback = el.querySelector('.inser-form-fallback');

    function get(name) { return f.elements[name] ? f.elements[name].value : ''; }
    function setError(name, msg) {
      var input = f.elements[name]; if (!input) return;
      var old = f.querySelector('#' + input.id + '-error'); if (old) old.remove();
      if (msg) {
        input.setAttribute('aria-invalid', 'true');
        input.setAttribute('aria-describedby', input.id + '-error');
        var s = document.createElement('small'); s.id = input.id + '-error'; s.setAttribute('role', 'alert'); s.textContent = msg;
        var holder = input.closest('.inser-form-full') || input; holder.insertAdjacentElement('afterend', s);
      } else { input.removeAttribute('aria-invalid'); input.removeAttribute('aria-describedby'); }
    }
    function validate() {
      var errors = 0;
      var name = clean(get('name'), MAX.name), contact = clean(get('contact'), MAX.contact);
      setError('name', name ? '' : 'Ingresá tu nombre.'); errors += name ? 0 : 1;
      setError('contact', contact ? '' : 'Ingresá un medio de contacto.'); errors += contact ? 0 : 1;
      if (kind === 'simulador') { var sim = clean(get('simulator'), MAX.simulator); setError('simulator', sim ? '' : 'Indicá qué simulador o equipo te gustaría ver.'); errors += sim ? 0 : 1; }
      else { var msg = clean(get('message'), MAX.message); setError('message', msg ? '' : 'Escribí tu sugerencia, pedido o consulta.'); errors += msg ? 0 : 1; }
      return errors === 0;
    }
    function message() {
      var lines;
      if (kind === 'simulador') {
        lines = ['Hola Sergio, quiero solicitar un nuevo simulador para el ebook de ' + ebook + '.', '',
          'Nombre: ' + clean(get('name'), MAX.name), 'Contacto: ' + clean(get('contact'), MAX.contact),
          'Institución: ' + (clean(get('institution'), MAX.institution) || 'No corresponde'),
          'Simulador o equipo solicitado: ' + clean(get('simulator'), MAX.simulator)];
      } else {
        lines = ['Hola Sergio, te escribo desde el ebook de ' + ebook + '.', 'Tipo: ' + get('type'), '',
          'Nombre: ' + clean(get('name'), MAX.name), 'Contacto: ' + clean(get('contact'), MAX.contact),
          'Mensaje: ' + clean(get('message'), MAX.message)];
      }
      return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(lines.join('\n'));
    }
    f.addEventListener('input', function (e) { if (e.target && e.target.name && e.target.name !== 'institution' && e.target.name !== 'type') setError(e.target.name, ''); status.hidden = true; fallback.hidden = true; });
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) { status.textContent = 'Revisá los campos marcados antes de continuar.'; status.hidden = false; var first = f.querySelector('[aria-invalid="true"]'); if (first) first.focus(); return; }
      var url = message();
      medir(kind === 'simulador' ? 'solicitud_simulador' : 'sugerencia_ebook', { tipo: kind === 'simulador' ? 'simulador' : get('type') });
      var opened = null;
      try { opened = window.open(url, '_blank', 'noopener,noreferrer'); } catch (err) { opened = null; }
      if (opened) { status.textContent = 'Abrimos WhatsApp con el mensaje completo. Revisalo y tocá Enviar.'; fallback.hidden = true; }
      else { status.textContent = 'El navegador bloqueó la nueva ventana. Usá el enlace que aparece debajo.'; fallback.href = url; fallback.hidden = false; }
      status.hidden = false;
    });
    f.setAttribute('data-ebook-name', esc(ebook));
  }

  // Configuracion por atributos del <script> (sin tocar el cuerpo del ebook):
  //   data-ebook="Nombre del ebook"  data-simulador="#seccion-del-simulador"  data-sugerencias="aside.ebook-desarrollo"
  // El formulario de simulador se agrega al final de la seccion indicada; el de sugerencias, antes del elemento indicado.
  var me = document.currentScript;
  var cfg = me ? { ebook: me.getAttribute('data-ebook') || '', simulador: me.getAttribute('data-simulador') || '', sugerencias: me.getAttribute('data-sugerencias') || '' } : { ebook: '', simulador: '', sugerencias: '' };

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
  function start() {
    if (hydrated() || tries++ > 130) { setTimeout(init, 150); return; }
    setTimeout(start, 150);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  window.inserFormularios = { init: init };
})();
