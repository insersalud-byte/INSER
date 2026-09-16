// Add the two device laboratories after the original VNI simulator.
// The ebook's existing React application and its cases remain untouched.
const css = document.createElement('link');
css.rel = 'stylesheet'; css.href = new URL('respiradores.css',import.meta.url).href;
document.head.append(css);
const devices = [
  {id:'astral',name:'Astral 150',image:'astral/astral-official.jpg',
   description:'Ventilador portátil con pantalla táctil, modos por presión y volumen y cuatro programas independientes. Admite rama única con fuga, rama única con válvula y doble rama; los modos disponibles dependen del circuito. Incluye iVAPS y AutoEPAP según versión.',
   exercise:'Practicá la selección de circuito, los ajustes, las curvas y las alarmas. El laboratorio abre en Astral 150 y también permite comparar el modelo 100.'},
  {id:'stellar',name:'Stellar 150',image:'stellar/stellar-official.jpg',
   description:'Ventilador portátil con pantalla a color, botones de menú y perilla giratoria. Ofrece CPAP, S, ST, T, PAC e iVAPS, dos programas y circuito de una rama con fuga intencional. La opción AutoEPAP depende de la variante regional.',
   exercise:'Practicá la navegación con la perilla, el reconocimiento del circuito, los cambios de presión y tiempo, y observá las curvas y alarmas del paciente virtual.'}
];
const entries = [];
function createSection(device) {
  const section = document.createElement('section');
  section.id = 'simulador-' + device.id;
  section.className = 'respirator-section';
  section.setAttribute('aria-labelledby',device.id+'-heading');
  section.innerHTML = `
    <div class="respirator-intro"><div>
      <p class="respirator-kicker">Después del laboratorio de VNI · Equipo específico</p>
      <h2 id="${device.id}-heading">Simulador ${device.name}</h2>
      <p>${device.description}</p><p>${device.exercise}</p>
      <div class="respirator-links"><a href="/academia/ebook/ventilacion-no-invasiva/${device.id}/#descripcion" target="_blank" rel="noopener">Descripción completa del aparato ↗</a><a href="/academia/ebook/ventilacion-no-invasiva/${device.id}/#laboratorio" target="_blank" rel="noopener">Abrir en pantalla completa ↗</a></div>
    </div><figure><img src="${device.image}" alt="Fotografía oficial del ResMed ${device.name}" width="220" height="170" loading="lazy"><figcaption>Imagen oficial de ResMed</figcaption></figure></div>
    <details><summary>Usar ${device.name} aquí, dentro del ebook <small>Abrir / cerrar el laboratorio interactivo</small></summary><div class="respirator-slot"></div></details>
    <p class="respirator-independence">Simulación educativa. Cada laboratorio conserva su propio paciente y sus ajustes; no modifica el simulador de VNI ni transfiere una prescripción a un equipo real.</p>`;
  const entry = {section,device,details:section.querySelector('details'),frame:null,inView:true};
  entry.details.addEventListener('toggle',() => {
    if (entry.details.open && !entry.frame) {
      const frame = document.createElement('iframe');
      frame.className = 'respirator-frame';
      frame.title = 'Simulador interactivo ' + device.name;
      frame.style.height = '1900px';
      frame.allow = 'fullscreen';
      entry.frame = frame;
      frame.src = new URL(device.id+'/?embed=ebook',import.meta.url).href;
      frame.addEventListener('load',() => visibility(entry));
      section.querySelector('.respirator-slot').append(frame);
    }
    visibility(entry);
  });
  entries.push(entry);
  return section;
}
function visibility(entry) {
  entry.frame?.contentWindow?.postMessage({type:'respiratory-lab:visibility',visible:entry.details.open&&entry.inView&&!document.hidden},location.origin);
}
window.addEventListener('message',event => {
  if (event.origin !== location.origin || !event.data) return;
  const entry = entries.find(e=>e.frame?.contentWindow===event.source);
  if (!entry) return;
  if (event.data.type==='respiratory-lab:ready') visibility(entry);
  if (event.data.type==='respiratory-lab:height'&&Number.isFinite(event.data.height)) {
    entry.frame.style.height = Math.max(900,Math.min(14000,event.data.height))+'px';
  }
});
document.addEventListener('visibilitychange',()=>entries.forEach(visibility));
const observer = new IntersectionObserver(changes=>{
  for (const change of changes) {
    const entry=entries.find(e=>e.section===change.target);
    if (entry){entry.inView=change.isIntersecting;visibility(entry);}
  }
},{rootMargin:'300px'});
function mount() {
  const existing=document.getElementById('simulador');
  if (!existing || document.getElementById('simulador-astral')) return false;
  let previous=existing;
  for (const device of devices) {
    const section=createSection(device);previous.after(section);previous=section;observer.observe(section);
  }
  const navAnchor=document.querySelector('header nav a[href="#simulador"]');
  if (navAnchor) {
    let previousLink=navAnchor;
    for (const device of devices) {
      const link=document.createElement('a');link.href='#simulador-'+device.id;link.textContent=device.name;previousLink.after(link);previousLink=link;
    }
  }
  if (['#simulador-astral','#simulador-stellar'].includes(location.hash)) {
    requestAnimationFrame(()=>document.querySelector(location.hash)?.scrollIntoView());
  }
  return true;
}
if (!mount()) {
  const pending=new MutationObserver(()=>{if(mount())pending.disconnect();});
  pending.observe(document.getElementById('root')??document.body,{childList:true,subtree:true});
}
