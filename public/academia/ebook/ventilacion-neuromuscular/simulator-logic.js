const LEVEL_WEIGHT = { neutral: 0, green: 1, yellow: 2, orange: 3, red: 4 };

const isNumber = value => Number.isFinite(Number(value)) && value !== '' && value !== null && value !== undefined;
const numberOrNull = value => isNumber(value) ? Number(value) : null;

export function assessPatient(raw = {}) {
  const input = {
    ageGroup: raw.ageGroup || 'adult',
    sex: raw.sex || 'unspecified',
    fvcPercent: numberOrNull(raw.fvcPercent),
    supineDrop: numberOrNull(raw.supineDrop),
    peakCoughFlow: numberOrNull(raw.peakCoughFlow),
    spo2: numberOrNull(raw.spo2),
    mip: numberOrNull(raw.mip),
    mep: numberOrNull(raw.mep),
    paco2: numberOrNull(raw.paco2),
    nocturnalFinding: raw.nocturnalFinding || 'not-measured',
    knownLungDisease: Boolean(raw.knownLungDisease),
    acuteDeterioration: Boolean(raw.acuteDeterioration),
    symptoms: Array.isArray(raw.symptoms) ? raw.symptoms : []
  };

  const symptoms = new Set(input.symptoms);
  const recommendations = [];
  const notes = [];
  let level = 'green';

  const elevate = next => {
    if (LEVEL_WEIGHT[next] > LEVEL_WEIGHT[level]) level = next;
  };

  const add = (id, urgency, title, detail, reason) => {
    let item = recommendations.find(entry => entry.id === id);
    if (!item) {
      item = { id, urgency, title, detail, reasons: [] };
      recommendations.push(item);
    }
    if (reason && !item.reasons.includes(reason)) item.reasons.push(reason);
    elevate(urgency);
  };

  const numericValues = [input.fvcPercent, input.supineDrop, input.peakCoughFlow, input.spo2, input.mip, input.mep, input.paco2];
  const hasData = numericValues.some(value => value !== null)
    || symptoms.size > 0
    || input.nocturnalFinding !== 'not-measured'
    || input.knownLungDisease
    || input.acuteDeterioration;

  if (!hasData) {
    return {
      level: 'neutral',
      title: 'Faltan datos para orientar el control',
      summary: 'Cargá al menos una medición o un indicio clínico. La tendencia respecto del basal es tan importante como el valor actual.',
      recommendations: [{
        id: 'complete-assessment', urgency: 'neutral', title: 'Completá la evaluación',
        detail: 'Ingresá los datos disponibles; no es obligatorio completar todos los campos.', reasons: []
      }],
      notes: ['Este simulador es educativo y no reemplaza la valoración clínica ni los protocolos de cada enfermedad.']
    };
  }

  const isChild = input.ageGroup === 'child';
  const respiratorySymptoms = ['orthopnea', 'morning-headache', 'daytime-sleepiness', 'disturbed-sleep', 'dyspnea']
    .filter(symptom => symptoms.has(symptom));
  const coughSymptoms = ['weak-cough', 'secretion-trouble', 'recurrent-infections']
    .filter(symptom => symptoms.has(symptom));
  const severeClinicalSigns = ['dyspnea', 'bulbar', 'secretion-trouble', 'rapid-decline']
    .filter(symptom => symptoms.has(symptom));

  if (isChild) {
    add(
      'pediatric-specialist', 'yellow', 'Usar referencias pediátricas específicas',
      'En menores de 12 años no se aplican automáticamente los cortes adultos de FVC, PCF, PIMax o PEMax. Integrar edad, talla, diagnóstico y trayectoria con un equipo pediátrico especializado.',
      'Edad menor de 12 años.'
    );
    notes.push('Los umbrales numéricos adultos de tos y fuerza no se usaron para generar las sugerencias.');
  }

  if (input.acuteDeterioration && severeClinicalSigns.length > 0) {
    add(
      'emergency-evaluation', 'red', 'Evaluación urgente en un área monitorizada',
      'El deterioro agudo con fatiga, compromiso bulbar, secreciones inmanejables o caída rápida puede requerir protección de la vía aérea antes de que cambien la SpO₂ o la gasometría.',
      'Deterioro agudo asociado a signos clínicos de alto riesgo.'
    );
  } else if (input.acuteDeterioration) {
    add(
      'urgent-clinical-review', 'orange', 'Reevaluación clínica prioritaria',
      'Repetir mediciones, buscar infección, aspiración o retención de secreciones y definir el nivel de monitorización según la trayectoria.',
      'Se informó deterioro agudo.'
    );
  }

  if (input.paco2 !== null && input.paco2 > 45) {
    add(
      'urgent-respiratory', 'red', 'Derivación respiratoria urgente',
      'Una PaCO₂ mayor de 45 mmHg es compatible con hipoventilación. Requiere evaluación rápida por un servicio con experiencia en ventilación; si hay deterioro agudo, somnolencia marcada o dificultad respiratoria, corresponde atención de emergencia.',
      `PaCO₂ ${input.paco2} mmHg.`
    );
    add(
      'niv-evaluation', 'orange', 'Evaluar soporte ventilatorio no invasivo',
      'Confirmar el contexto, tratar causas reversibles y valorar una prueba de VNI individualizada por un equipo respiratorio.',
      'Hipercapnia documentada.'
    );
  }

  if (input.spo2 !== null) {
    const gasThreshold = input.knownLungDisease ? 92 : 94;
    if (input.spo2 <= gasThreshold) {
      add(
        'blood-gas', 'orange', 'Medir gases y buscar la causa de la hipoxemia',
        'Confirmar la señal en reposo y aire ambiente, medir CO₂ y evaluar secreciones, atelectasia, aspiración, infección y falla ventilatoria. No corregir sólo el número con oxígeno sin valorar ventilación.',
        `SpO₂ ${input.spo2}% (umbral de referencia ${gasThreshold}% o menos).`
      );
    }
  }

  if (!isChild) {
    if (input.fvcPercent !== null && input.fvcPercent < 50) {
      add(
        'niv-evaluation', 'orange', 'Evaluar soporte ventilatorio no invasivo',
        'Derivar a un servicio de ventilación para integrar síntomas, CO₂ y estudio nocturno y valorar una prueba de VNI.',
        `FVC ${input.fvcPercent}% del predicho, por debajo de 50%.`
      );
    }

    if (input.fvcPercent !== null && input.fvcPercent < 80 && respiratorySymptoms.length > 0) {
      add(
        'niv-evaluation', 'orange', 'Evaluar soporte ventilatorio no invasivo',
        'La combinación de reducción de capacidad vital y síntomas respiratorios justifica evaluación especializada y eventual prueba de VNI.',
        `FVC ${input.fvcPercent}% con síntomas respiratorios.`
      );
    }

    if (input.mip !== null && input.mip < 40) {
      add(
        'niv-evaluation', 'orange', 'Evaluar soporte ventilatorio no invasivo',
        'Una PIMax/MIP de magnitud menor de 40 cmH₂O indica debilidad inspiratoria marcada y debe integrarse con síntomas y CO₂.',
        `PIMax/MIP ${input.mip} cmH₂O.`
      );
    } else if (input.mip !== null && respiratorySymptoms.length > 0) {
      const symptomThreshold = input.sex === 'male' ? 65 : input.sex === 'female' ? 55 : 60;
      if (input.mip < symptomThreshold) {
        add(
          'niv-evaluation', 'orange', 'Evaluar soporte ventilatorio no invasivo',
          'La fuerza inspiratoria reducida junto con síntomas respiratorios requiere evaluación por un servicio de ventilación.',
          `PIMax/MIP ${input.mip} cmH₂O con síntomas (referencia ${symptomThreshold} cmH₂O).`
        );
      }
    }

    if (input.supineDrop !== null && input.supineDrop >= 20) {
      add(
        'overnight-study', 'yellow', 'Estudiar hipoventilación nocturna',
        'Una caída relevante de la capacidad vital al acostarse orienta a debilidad diafragmática. Correlacionar con ortopnea y monitorizar sueño con CO₂ cuando esté disponible.',
        `Caída supina de FVC/VC ${input.supineDrop}%.`
      );
    }

    if (input.peakCoughFlow !== null && input.peakCoughFlow <= 270) {
      add(
        'cough-augmentation', input.peakCoughFlow <= 160 ? 'orange' : 'yellow', 'Evaluar y entrenar asistencia de tos',
        'Medir PCF espontáneo y asistido. Optimizar postura, volumen previo, apilamiento de aire o insuflación y tos manual según función bulbar y tolerancia.',
        `Pico flujo de tos ${input.peakCoughFlow} L/min.`
      );
    }

    if (input.peakCoughFlow !== null && input.peakCoughFlow <= 160) {
      add(
        'mechanical-cough-assist', 'orange', 'Valorar cough assist / MI-E',
        'El pico de tos está en un rango de depuración muy ineficaz. Un equipo entrenado debe probar insuflación-exuflación mecánica y verificar el flujo logrado, secreciones, fugas, bulbar y tolerancia.',
        `Pico flujo de tos ${input.peakCoughFlow} L/min, igual o menor de 160 L/min.`
      );
    }

    if (input.mep !== null && input.mep < 60) {
      add(
        'cough-augmentation', 'yellow', 'Evaluar y entrenar asistencia de tos',
        'La PEMax/MEP reducida sugiere debilidad espiratoria. Confirmar la eficacia con pico flujo de tos espontáneo y asistido.',
        `PEMax/MEP ${input.mep} cmH₂O, menor de 60 cmH₂O.`
      );
    }
  }

  if (respiratorySymptoms.length > 0 && input.nocturnalFinding === 'not-measured') {
    add(
      'overnight-study', 'yellow', 'Estudiar hipoventilación nocturna',
      'Los síntomas de sueño u ortopnea justifican oximetría nocturna con CO₂, poligrafía o polisomnografía según disponibilidad y sospecha.',
      'Hay síntomas respiratorios o relacionados con el sueño.'
    );
  }

  if (input.nocturnalFinding === 'hypoventilation') {
    add(
      'niv-evaluation', 'orange', 'Evaluar soporte ventilatorio nocturno',
      'La hipoventilación nocturna documentada debe ser revisada por el equipo respiratorio para valorar y titular VNI.',
      'El estudio nocturno informó hipoventilación.'
    );
  } else if (input.nocturnalFinding === 'desaturation' || input.nocturnalFinding === 'sleep-disordered-breathing') {
    add(
      'overnight-study', 'yellow', 'Completar interpretación del estudio nocturno',
      'Diferenciar obstrucción, hipoventilación y causas pulmonares; incorporar CO₂ si no fue medido.',
      'El estudio nocturno mostró una alteración.'
    );
  }

  if (coughSymptoms.length > 0) {
    add(
      'cough-augmentation', 'yellow', 'Evaluar y entrenar asistencia de tos',
      'La clínica puede detectar una tos ineficaz aun con un valor aislado conservado. Medir PCF espontáneo y asistido y preparar un plan para infecciones.',
      'Se informaron tos débil, secreciones difíciles o infecciones repetidas.'
    );
  }

  if (symptoms.has('bulbar')) {
    add(
      'bulbar-assessment', 'yellow', 'Evaluar deglución y protección de la vía aérea',
      'Revisar saliva, voz, deglución, aspiración y capacidad de cerrar la glotis; esto modifica la interfaz y la estrategia de tos.',
      'Se informó compromiso bulbar o disfagia.'
    );
  }

  if (symptoms.has('rapid-decline') && !input.acuteDeterioration) {
    add(
      'urgent-clinical-review', 'orange', 'Adelantar el control respiratorio',
      'Una caída rápida respecto del basal obliga a repetir pruebas y revisar el intervalo de seguimiento aunque los valores absolutos todavía no crucen un corte.',
      'Se informó deterioro rápido respecto del basal.'
    );
  }

  if (recommendations.length === 0) {
    add(
      'routine-follow-up', 'green', 'Continuar controles y registrar la tendencia',
      'Los datos cargados no activan una señal específica de este orientador. Mantener el seguimiento definido para la enfermedad y repetir antes si aparecen síntomas.',
      'Mediciones cargadas sin señales de alarma en este esquema.'
    );
  }

  const titles = {
    green: 'Control programado',
    yellow: 'Necesita evaluación dirigida',
    orange: 'Control prioritario',
    red: 'Alerta respiratoria'
  };
  const summaries = {
    green: 'No se activaron criterios de intervención en este esquema; importa seguir la tendencia.',
    yellow: 'Hay datos que justifican completar estudios o entrenar una estrategia preventiva.',
    orange: 'Hay datos que ameritan evaluación respiratoria prioritaria y una conducta individualizada.',
    red: 'Hay datos de alto riesgo que requieren derivación rápida; si el deterioro es agudo, atención de emergencia.'
  };

  return {
    level,
    title: titles[level],
    summary: summaries[level],
    recommendations: recommendations.sort((a, b) => LEVEL_WEIGHT[b.urgency] - LEVEL_WEIGHT[a.urgency]),
    notes: [
      ...notes,
      'La SpO₂ normal no descarta hipoventilación; medir CO₂ o realizar estudio nocturno cuando la clínica lo sugiera.',
      'Las mediciones técnicamente inválidas, el compromiso bulbar y la trayectoria pueden cambiar la interpretación.'
    ]
  };
}
