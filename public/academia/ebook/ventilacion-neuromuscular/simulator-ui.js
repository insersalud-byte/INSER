import { assessPatient } from './simulator-logic.js';

const form = document.getElementById('patientSimulator');
const resultPanel = document.getElementById('simulatorResult');
const exampleButton = document.getElementById('loadExample');

const statusLabels = {
  neutral: 'Esperando datos',
  green: 'Verde · seguimiento',
  yellow: 'Amarillo · estudiar',
  orange: 'Naranja · actuar',
  red: 'Rojo · derivar'
};

function readForm() {
  const data = new FormData(form);
  return {
    ageGroup: data.get('ageGroup'),
    sex: data.get('sex'),
    fvcPercent: data.get('fvcPercent'),
    supineDrop: data.get('supineDrop'),
    peakCoughFlow: data.get('peakCoughFlow'),
    spo2: data.get('spo2'),
    mip: data.get('mip'),
    mep: data.get('mep'),
    paco2: data.get('paco2'),
    nocturnalFinding: data.get('nocturnalFinding'),
    knownLungDisease: data.has('knownLungDisease'),
    acuteDeterioration: data.has('acuteDeterioration'),
    symptoms: data.getAll('symptoms')
  };
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function render(result, moveFocus = false) {
  resultPanel.replaceChildren();
  resultPanel.className = `simulator-result ${result.level}`;
  resultPanel.tabIndex = -1;

  const status = element('div', 'result-status');
  const lamp = element('i', 'result-lamp');
  lamp.setAttribute('aria-hidden', 'true');
  status.append(lamp, element('span', '', statusLabels[result.level] || 'Resultado'));
  resultPanel.append(status, element('h3', '', result.title), element('p', 'result-summary', result.summary));

  const list = element('div', 'recommendation-list');
  result.recommendations.forEach(item => {
    const card = element('article', 'recommendation');
    card.append(element('h4', '', item.title), element('p', '', item.detail));
    if (item.reasons.length > 0) {
      const reasons = element('ul');
      item.reasons.forEach(reason => reasons.append(element('li', '', reason)));
      card.append(reasons);
    }
    list.append(card);
  });
  resultPanel.append(list);

  if (result.notes.length > 0) {
    const details = element('details', 'result-notes');
    details.append(element('summary', '', 'Límites de la interpretación'));
    const notes = element('ul');
    result.notes.forEach(note => notes.append(element('li', '', note)));
    details.append(notes);
    resultPanel.append(details);
  }

  if (moveFocus) resultPanel.focus({ preventScroll: false });
}

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  render(assessPatient(readForm()), true);
});

form.addEventListener('reset', () => {
  window.setTimeout(() => render(assessPatient({ ageGroup: 'adult' })), 0);
});

exampleButton.addEventListener('click', () => {
  form.reset();
  window.setTimeout(() => {
    form.elements.fvcPercent.value = '58';
    form.elements.supineDrop.value = '24';
    form.elements.peakCoughFlow.value = '145';
    form.elements.spo2.value = '96';
    form.elements.mip.value = '36';
    form.elements.mep.value = '48';
    form.elements.nocturnalFinding.value = 'hypoventilation';
    form.querySelector('[value="orthopnea"]').checked = true;
    form.querySelector('[value="weak-cough"]').checked = true;
    render(assessPatient(readForm()), true);
  }, 0);
});

render(assessPatient({ ageGroup: 'adult' }));
