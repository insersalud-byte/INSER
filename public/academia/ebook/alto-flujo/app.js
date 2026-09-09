const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const sections = $$('.chapter');
const tocLinks = $$('#toc a');

/* Progreso: capítulos vistos en este navegador, como en los ebooks de VM y VNI. */
const seen = new Set(JSON.parse(localStorage.getItem('hf-progress') || '[]'));
const paintProgress = () => {
  const percent = Math.round(seen.size / sections.length * 100);
  $('#progressBar').style.width = `${percent}%`;
  $('#progressPercent').textContent = `${percent} %`;
};
paintProgress();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    tocLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
    if (!seen.has(entry.target.id)) {
      seen.add(entry.target.id);
      localStorage.setItem('hf-progress', JSON.stringify([...seen]));
      paintProgress();
    }
  });
}, { rootMargin: '-20% 0px -68% 0px' });
sections.forEach(s => observer.observe(s));

const flow = $('#flow'), fio2 = $('#fio2'), temp = $('#temp');
function updateSimulator() {
  $('#flowOut').value = `${flow.value} L/min`;
  $('#fio2Out').value = `${fio2.value}%`;
  $('#tempOut').value = `${temp.value} °C`;
  const f = +flow.value, o = +fio2.value;
  $('#breathAnim').style.setProperty('animation-duration', `${Math.max(.65, 1.55 - f / 75)}s`);
  $('#simHeadline').textContent = f >= 50 ? 'Flujo alto' : f >= 35 ? 'Soporte intermedio' : 'Flujo inicial bajo–moderado';
  $('#simText').textContent = o >= 80 ? 'La alta necesidad de FiO₂ exige vigilancia estrecha y búsqueda activa de deterioro.' : f >= 50 ? 'Evalúe tolerancia, fuga, trabajo respiratorio y respuesta; más flujo no sustituye la reevaluación.' : 'Titule según demanda inspiratoria, esfuerzo, oxigenación y confort.';
}
[flow, fio2, temp].forEach(el => el.addEventListener('input', updateSimulator));
updateSimulator();

function calculateRox(e) {
  e?.preventDefault();
  const spo2 = +$('#roxSpo2').value, oxygen = +$('#roxFio2').value / 100, rr = +$('#roxRr').value;
  if (!spo2 || !oxygen || !rr) return;
  const value = (spo2 / oxygen) / rr;
  $('#roxValue').textContent = value.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const band = $('#roxBand');
  band.className = 'status ' + (value >= 4.88 ? 'stable' : value < 3.85 ? 'risk' : 'watch');
  band.textContent = value >= 4.88 ? 'Zona asociada a menor riesgo*' : value < 3.85 ? 'Zona de alto riesgo contextual*' : 'Zona de vigilancia estrecha*';
  $('#roxNote').textContent = '*Referencia del estudio en neumonía. Compare mediciones seriadas y no retrase el escalamiento ante deterioro clínico.';
}
$('#roxForm').addEventListener('submit', calculateRox);
calculateRox();

const checks = $$('#careChecklist input');
function updateChecklist() {
  const done = checks.filter(c => c.checked).length;
  $('#checkText').textContent = `${done} de ${checks.length} controles`;
  $('#checkBar').style.width = `${done / checks.length * 100}%`;
  localStorage.setItem('hf-checks', JSON.stringify(checks.map(c => c.checked)));
}
const storedChecks = JSON.parse(localStorage.getItem('hf-checks') || '[]');
checks.forEach((c, i) => { c.checked = !!storedChecks[i]; c.addEventListener('change', updateChecklist); });
$('#resetChecklist').addEventListener('click', () => { checks.forEach(c => c.checked = false); updateChecklist(); });
updateChecklist();

const inserGuardar = $('#inserGuardar');
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
const inserCompartir = $('#inserCompartir');
if (inserCompartir) {
  inserCompartir.addEventListener('click', async () => {
    const datos = { title: 'Inser Salud — Equipos Respiratorios', text: 'CPAP · BiPAP · Oxígeno · Accesorios. Venta y alquiler en toda Argentina.', url: 'https://insersalud.com/tarjeta' };
    if (navigator.share) { try { await navigator.share(datos); } catch (e) {} }
    else { try { await navigator.clipboard.writeText(datos.url); } catch (e) {} }
  });
}
const inserQrModal = $('#inserQrModal');
const inserQrAbrir = $('#inserQrAbrir');
if (inserQrModal && inserQrAbrir) {
  inserQrAbrir.addEventListener('click', () => inserQrModal.classList.add('ver'));
  inserQrModal.addEventListener('click', () => inserQrModal.classList.remove('ver'));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') inserQrModal.classList.remove('ver'); });
}

const answered = new Map();
$$('.choices').forEach((group, index) => {
  $$('button', group).forEach(button => button.addEventListener('click', () => {
    if (answered.has(index)) return;
    const correct = button.dataset.choice === group.dataset.answer;
    answered.set(index, correct);
    button.classList.add(correct ? 'correct' : 'wrong');
    if (!correct) $(`button[data-choice="${group.dataset.answer}"]`, group).classList.add('correct');
    group.nextElementSibling.textContent = correct ? 'Correcto. La decisión integra respuesta y tendencia.' : 'Revisá la opción señalada: prioriza seguridad y reevaluación.';
    const score = [...answered.values()].filter(Boolean).length;
    $('#quizScore').innerHTML = `Respondidas correctamente: <b>${score} / 3</b>`;
  }));
});
