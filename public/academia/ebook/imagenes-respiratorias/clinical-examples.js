(function (root) {
  'use strict';
  const examples = root.ImagingClinicalExamples;
  const visibleExample = (id, state = {}) => state.practice && !state.revealed ? null : examples[id] || null;
  const validSign = (example, index) => Number.isInteger(index) && index >= 0 && index < example.signs.length;
  root.ImagingClinicalModel = {visibleExample, validSign};
  if (typeof document === 'undefined') return;
  const assets = new Map([...root.ImagingAssets, ...root.ImagingAtlasMedia, ...root.ImagingClinicalMedia].map(a => [a.id, a]));
  const base = '/academia/ebook/imagenes-respiratorias/images/';
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
  const credit = a => `<a href="${esc(a.source)}" target="_blank" rel="noreferrer">Ver publicación / original</a> · ${esc(a.author)} · <a href="${esc(a.licenseUrl || a.source)}" target="_blank" rel="noreferrer">${esc(a.license)}</a>`;
  function imageHTML(example, asset) {
    return `<div class="clinical-image"><img loading="lazy" src="${base}${esc(asset.poster || asset.file)}" alt="${esc(example.caption)}"><div class="clinical-marks">${example.signs.map((s,i) => `<button type="button" class="clinical-mark" data-clinical-sign="${i}" style="left:${s.x}%;top:${s.y}%" aria-label="${i+1}. ${esc(s.label)}" aria-pressed="${i===0}">${i+1}</button>`).join('')}</div></div>`;
  }
  function bindSigns(container, example) {
    container.addEventListener('click', event => {
      const button = event.target.closest('[data-clinical-sign]');
      if (!button) return;
      const index = Number(button.dataset.clinicalSign);
      if (!validSign(example, index)) return;
      container.querySelectorAll('[data-clinical-sign]').forEach(b => b.setAttribute('aria-pressed', String(Number(b.dataset.clinicalSign) === index)));
      const detail = container.querySelector('.clinical-sign-detail');
      detail.innerHTML = `<strong>${index+1}. ${esc(example.signs[index].label)}</strong><p>${esc(example.signs[index].detail)}</p>`;
    });
  }
  function update(host, caseId, state) {
    if (!examples[caseId]) { host.hidden = true; return; }
    host.hidden = false;
    const example = visibleExample(caseId, state);
    const key = `${caseId}-${Boolean(example)}`;
    if (host.dataset.clinicalKey === key) return;
    host.dataset.clinicalKey = key;
    host.querySelectorAll('video').forEach(v => v.pause());
    if (!example) {
      host.innerHTML = '<p class="clinical-practice">Ejemplo clínico y signos ocultos durante la práctica. Se muestran al comprobar tu respuesta.</p>';
      return;
    }
    const asset = assets.get(example.asset);
    const panel = document.createElement('section');
    panel.className = 'clinical-example';
    panel.setAttribute('aria-label', 'Ejemplo clínico real con signos seleccionables');
    panel.innerHTML = `<div class="clinical-heading"><div><p class="eyebrow">Del esquema al estudio real</p><h4>Ejemplo clínico · tocá sus signos</h4></div><span class="clinical-tag">${asset.poster ? 'FOTOGRAMA + VIDEO' : 'IMAGEN PUBLICADA'}</span></div><p>${esc(example.caption)}</p><p class="small">Otro paciente y otra adquisición: la posición, extensión y lateralidad pueden diferir del esquema. Marcas orientativas, no segmentación diagnóstica.</p><div class="clinical-grid"><figure>${imageHTML(example, asset)}<div class="clinical-tools"><button type="button" data-clinical-toggle aria-pressed="true">Ocultar marcas educativas</button><button type="button" data-clinical-enlarge>Ampliar imagen y signos</button></div><figcaption>${credit(asset)}<span>Original intacto. Las marcas educativas se superponen por separado; las flechas impresas en el original permanecen visibles.</span></figcaption></figure><aside aria-label="Signos del ejemplo"><h5>Qué mirar en esta imagen</h5><div class="clinical-signs">${example.signs.map((s,i) => `<button type="button" data-clinical-sign="${i}" aria-pressed="${i===0}"><b>${i+1}</b><span>${esc(s.label)}</span></button>`).join('')}</div><div class="clinical-sign-detail" aria-live="polite"><strong>1. ${esc(example.signs[0].label)}</strong><p>${esc(example.signs[0].detail)}</p></div></aside></div>${asset.poster ? `<div class="clinical-example-video"><h5>Confirmá los signos dinámicos en el video</h5><video controls preload="none" playsinline poster="${base}${esc(asset.poster)}" aria-label="Video clínico: ${esc(example.caption)}"><source src="${base}${esc(asset.file)}" type="video/webm"></video><p class="small">Video clínico sin narración. Descripción visual arriba y en la lista de signos. Las marcas del fotograma no siguen estructuras en movimiento.</p></div>` : ''}<div class="clinical-limit"><strong>Lo que este ejemplo no demuestra</strong><p>${esc(example.limit)}</p>${example.notShown.length ? `<ul>${example.notShown.map(s=>`<li>${esc(s)}</li>`).join('')}</ul>` : ''}<a href="${esc(example.reference)}">Referencia para ampliar la interpretación →</a></div><p class="small">Uso educativo. Anotaciones sin validación clínica independiente; no utilizar para tomar decisiones asistenciales.</p>`;
    host.replaceChildren(panel);
    bindSigns(panel, example);
    panel.querySelector('[data-clinical-toggle]').addEventListener('click', event => {
      const button = event.currentTarget, visible = button.getAttribute('aria-pressed') !== 'true';
      button.setAttribute('aria-pressed', String(visible));
      button.textContent = visible ? 'Ocultar marcas educativas' : 'Mostrar marcas educativas';
      panel.querySelector('.clinical-marks').hidden = !visible;
    });
    panel.querySelector('[data-clinical-enlarge]').addEventListener('click', () => {
      const modal = document.createElement('dialog');
      modal.className = 'clinical-dialog';
      modal.setAttribute('aria-label', 'Imagen clínica ampliada con signos');
      modal.innerHTML = `<button type="button" class="clinical-close">Cerrar imagen ampliada</button><p>${esc(example.caption)}</p>${imageHTML(example, asset)}<div class="clinical-sign-detail" aria-live="polite"><strong>1. ${esc(example.signs[0].label)}</strong><p>${esc(example.signs[0].detail)}</p></div><p class="small">${credit(asset)}</p>`;
      bindSigns(modal, example);
      document.body.append(modal);
      modal.querySelector('.clinical-close').addEventListener('click', () => modal.close());
      modal.addEventListener('close', () => modal.remove(), {once:true});
      modal.showModal();
    });
  }
  root.ImagingClinicalUI = {update};
})(typeof window === 'undefined' ? globalThis : window);
