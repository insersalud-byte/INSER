(function (root) {
  'use strict';
  const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function render(modality) {
    const atlas = root.ImagingAnatomy.catalog[modality];
    if (!atlas) return '';
    const background = atlas.image
      ? `<image href="${atlas.image}" width="${atlas.width}" height="${atlas.height}"/>`
      : root.ImagingRender.render(modality, 'normal', { level: 1, view: 'b', phase: 0 }).replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
    const shapes = atlas.components.map((component, index) => ({ component, index })).sort((a, b) => Number(!a.component.id.includes('lung')) - Number(!b.component.id.includes('lung'))).map(({ component, index }) => {
      const { tag, attrs } = component.shape;
      const attributes = Object.entries(attrs).map(([key, value]) => `${key}="${escape(value)}"`).join(' ');
      return `<g class="anatomy-hotspot" role="button" tabindex="0" aria-pressed="false" aria-label="${index + 1}. ${escape(component.label)}" data-component="${component.id}"><${tag} class="anatomy-region" ${attributes}/><g class="anatomy-pin" aria-hidden="true"><circle cx="${component.pin[0]}" cy="${component.pin[1]}" r="18"/><text x="${component.pin[0]}" y="${component.pin[1] + 6}">${index + 1}</text></g></g>`;
    }).join('');
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${atlas.width} ${atlas.height}" role="group" aria-label="${escape(atlas.title)}: zonas seleccionables">${background}${shapes}</svg>`;
  }
  function mount(el, modality) {
    const atlas = root.ImagingAnatomy.catalog[modality];
    if (!atlas) return;
    el.classList.add('anatomy-explorer');
    el.dataset.anatomy = modality;
    el.id = `anatomy-${modality}`;
    el.innerHTML = `<div class="lab-head"><div><p class="eyebrow">Explorador de normalidad</p><h3>${atlas.title}</h3><p>Tocá un número, una zona de la imagen o su nombre en la lista. Ambos se marcarán juntos.</p></div><span class="lab-badge">${atlas.image ? 'IMAGEN CLÍNICA + MARCAS' : 'ESQUEMA INTERACTIVO'}</span></div><div class="anatomy-layout"><div class="anatomy-visual"><div class="anatomy-image">${render(modality)}</div><div class="anatomy-caption"><p>${atlas.note}</p><p><a href="#${atlas.source}">Fuente de referencia</a>${atlas.credit ? ` · <a href="#${atlas.credit}">Imagen original y licencia</a>` : ''}</p><button class="button secondary" type="button" data-clear-anatomy>Quitar selección</button></div></div><div class="anatomy-sidebar"><div class="anatomy-detail" role="status" aria-live="polite"></div><h4>Componentes · elegí uno</h4><div class="anatomy-list">${atlas.components.map((component, index) => `<button type="button" data-component="${component.id}" aria-pressed="false"><span class="anatomy-number">${index + 1}</span><span><b>${escape(component.label)}</b><small>${escape(component.description)}</small></span></button>`).join('')}</div><p class="small">Los números coinciden con la imagen. También podés usar Tab y Enter o la barra espaciadora.</p></div></div>`;
    function select(id) {
      const component = root.ImagingAnatomy.getComponent(modality, id);
      el.dataset.selectedComponent = component?.id || '';
      el.querySelectorAll('[data-component]').forEach(button => {
        const selected = Boolean(component && button.dataset.component === component.id);
        button.setAttribute('aria-pressed', String(selected));
        button.classList.toggle('is-selected', selected);
      });
      el.querySelector('.anatomy-detail').innerHTML = component
        ? `<p class="eyebrow">Seleccionado en la imagen</p><h4>${escape(component.label)}</h4><p>${escape(component.description)}</p><p><strong>Cómo se ve normalmente:</strong> ${escape(component.normal)}</p><p><strong>Qué observar:</strong> ${escape(component.look)}</p>`
        : '<h4>Explorá la imagen normal</h4><p>Seleccioná un componente para resaltarlo y leer su descripción, su aspecto normal y qué conviene observar.</p>';
    }
    el.addEventListener('click', event => {
      if (event.target.closest('[data-clear-anatomy]')) { select(null); return; }
      const button = event.target.closest('[data-component]');
      if (!button) return;
      select(button.dataset.component);
      if (button.closest('.anatomy-list')) {
        const visual = el.querySelector('.anatomy-image'), bounds = visual.getBoundingClientRect();
        if (bounds.bottom < 140 || bounds.top > window.innerHeight) visual.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      }
    });
    el.addEventListener('keydown', event => {
      const hotspot = event.target.closest('.anatomy-hotspot');
      if (hotspot && ['Enter', ' '].includes(event.key)) { event.preventDefault(); select(hotspot.dataset.component); }
    });
    select(null);
  }
  root.ImagingAnatomyUI = { render, mount };
})(typeof window !== 'undefined' ? window : globalThis);
