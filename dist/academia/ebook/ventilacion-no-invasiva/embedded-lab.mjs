// Shared presentation adapter. Does not exchange prescriptions or patient data.
if (new URLSearchParams(location.search).get('embed') === 'ebook' && parent !== window) {
  document.documentElement.classList.add('ebook-lab-embedded');
  const style = document.createElement('style');
  style.textContent = `
    html.ebook-lab-embedded, .ebook-lab-embedded body {min-height:0!important;height:auto!important}
    .ebook-lab-embedded .site-header,.ebook-lab-embedded .top,
    .ebook-lab-embedded .intro,.ebook-lab-embedded .hero,
    .ebook-lab-embedded .research,.ebook-lab-embedded .sources,
    .ebook-lab-embedded .reference-section,.ebook-lab-embedded footer,
    .ebook-lab-embedded #descripcion,.ebook-lab-embedded #expand {display:none!important}
    .ebook-lab-embedded main {max-width:none;margin:0;padding:16px}
    .ebook-lab-embedded #laboratorio {margin:16px 0 0}
    .ebook-lab-embedded .section-head {margin:24px 0}
    .ebook-lab-embedded .education-note {margin:0 0 16px}
    .ebook-lab-embedded .safety {margin:0}
    @media(max-width:600px){.ebook-lab-embedded main{padding:8px}}
  `;
  document.head.append(style);
  let previous = 0, scheduled = false;
  function resize() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      const height = Math.ceil(document.body.getBoundingClientRect().height) + 16;
      if (height > 100 && Math.abs(height - previous) > 2) {
        previous = height;
        parent.postMessage({type:'respiratory-lab:height', height}, location.origin);
      }
    });
  }
  window.addEventListener('message', event => {
    if (event.source !== parent || event.origin !== location.origin || event.data?.type !== 'respiratory-lab:visibility') return;
    window.dispatchEvent(new CustomEvent('lab-visibility', {detail:{paused:!event.data.visible}}));
    if (event.data.visible) resize();
  });
  new ResizeObserver(resize).observe(document.body);
  window.addEventListener('load',resize);
  resize();
  parent.postMessage({type:'respiratory-lab:ready'}, location.origin);
}
