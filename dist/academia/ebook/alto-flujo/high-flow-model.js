(function exposeHighFlowModel(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.HighFlowModel = api;
})(typeof window !== 'undefined' ? window : globalThis, function createHighFlowModel() {
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const round = (value, digits = 0) => {
    const factor = 10 ** digits;
    return Math.round(value * factor) / factor;
  };

  const scenarios = {
    pneumonia: { id: 'pneumonia', name: 'Neumonía hipoxémica', baselineSpo2: 86, baselineRr: 34, demand: 58, description: 'Hipoxemia y demanda inspiratoria alta.' },
    postextubation: { id: 'postextubation', name: 'Posextubación', baselineSpo2: 91, baselineRr: 27, demand: 44, description: 'Soporte y vigilancia tras retirar la vía aérea artificial.' },
    copd: { id: 'copd', name: 'EPOC · precaución', baselineSpo2: 87, baselineRr: 30, demand: 42, description: 'Objetivo de SpO₂ individual y control de CO₂/pH según indicación.' },
    weaning: { id: 'weaning', name: 'Destete', baselineSpo2: 94, baselineRr: 22, demand: 34, description: 'Paciente estable con reducción progresiva del soporte.' },
  };

  function getScenario(id) {
    return { ...(scenarios[id] || scenarios.pneumonia) };
  }

  function calculateHighFlowState(input) {
    const flow = clamp(Number(input.flow) || 0, 0, 80);
    const fio2 = clamp(Number(input.fio2) || 21, 21, 100);
    const temperature = clamp(Number(input.temperature) || 34, 20, 42);
    const demand = clamp(Number(input.demand) || 40, 20, 90);
    const cannulaFit = clamp(Number(input.cannulaFit) || 70, 35, 95);
    const baselineSpo2 = clamp(Number(input.baselineSpo2) || 88, 50, 100);
    const baselineRr = clamp(Number(input.baselineRr) || 30, 5, 80);
    const fault = input.fault || 'none';

    let effectiveFlow = flow;
    if (fault === 'obstruction') effectiveFlow *= 0.3;
    if (fault === 'disconnection') effectiveFlow = 0;

    const coverage = clamp(effectiveFlow / demand, 0, 1);
    const deliveredFio2 = clamp(21 + (fio2 - 21) * (0.55 + 0.45 * coverage), 21, fio2);
    const oxygenGain = (deliveredFio2 - 21) * 0.13;
    const flowGain = coverage * 3.1;
    const spo2 = round(clamp(baselineSpo2 + oxygenGain + flowGain, 70, 99));
    const rr = round(clamp(baselineRr - coverage * 6 - Math.max(0, spo2 - baselineSpo2) * 0.12, 8, 60));
    const mouthFactor = input.mouth === 'closed' ? 1 : 0.52;
    const estimatedPressure = round(clamp((effectiveFlow / 60) * 4.2 * (cannulaFit / 100) * mouthFactor, 0, 5), 1);
    const rox = round((spo2 / (deliveredFio2 / 100)) / rr, 2);

    let alarm = { level: 'ok', message: 'Sistema estable · vigilar respuesta clínica' };
    if (fault === 'obstruction') alarm = { level: 'high', message: 'Obstrucción de cánula/circuito · revisar de inmediato' };
    else if (fault === 'disconnection') alarm = { level: 'high', message: 'Circuito desconectado · flujo no entregado' };
    else if (fault === 'temperature') alarm = { level: 'medium', message: 'Temperatura fuera de rango · comprobar humidificador' };
    else if (spo2 < 90 || rr >= 35) alarm = { level: 'high', message: 'Respuesta insuficiente · activar reevaluación y escalamiento' };
    else if (fio2 >= 80 || rox < 4.88) alarm = { level: 'medium', message: 'Vigilancia estrecha · alta necesidad o ROX bajo' };

    return {
      flow,
      effectiveFlow: round(effectiveFlow, 1),
      setFio2: fio2,
      deliveredFio2: round(deliveredFio2),
      temperature,
      demand,
      coverage: round(coverage * 100),
      spo2,
      rr,
      estimatedPressure,
      rox,
      alarm,
    };
  }

  return { calculateHighFlowState, getScenario };
});
