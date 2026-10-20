(function (root) {
  'use strict';
  const validScore = value => Number.isInteger(value) && value >= 0 && value <= 3;
  function scoreEpworth(values) {
    if (!Array.isArray(values) || values.length !== 8) return { total: null, answered: 0, band: null };
    const answered = values.filter(validScore).length;
    if (answered !== 8) return { total: null, answered, band: null };
    const total = values.reduce((sum, value) => sum + value, 0);
    // ATS ESS: sleepiness bands, never categories of OSA severity.
    // https://site.thoracic.org/assemblies/srn/sleep-related-questionnaires/ess
    return { total, answered, band: total <= 10 ? 'habitual' : total <= 12 ? 'leve' : total <= 15 ? 'moderada' : 'intensa' };
  }
  function eventIndex(events, minutes) {
    if (!Number.isInteger(events) || events < 0 || !Number.isFinite(minutes) || minutes <= 0) return null;
    return events * 60 / minutes;
  }
  function severity(value) {
    if (!Number.isFinite(value) || value < 0) return null;
    return value < 5 ? 'bajo-umbral' : value < 15 ? 'leve' : value < 30 ? 'moderada' : 'grave';
  }
  function papTrace(mode) {
    // Original conceptual drawing in relative units. Not firmware, titration or a physiological model.
    if (mode === 'cpap') return Array(25).fill(0.5);
    if (mode === 'apap') return [0.2,0.2,0.2,0.3,0.4,0.5,0.65,0.7,0.7,0.6,0.5,0.4,0.3,0.25,0.25,0.35,0.5,0.65,0.75,0.8,0.8,0.7,0.6,0.45,0.3];
    return null;
  }
  function scoreStopBang(values) {
    // Chung et al., Chest 2016: 0-2 low, 3-4 intermediate, 5-8 high. Screening only, never a diagnosis.
    if (!Array.isArray(values) || values.length !== 8) return { total: null, answered: 0, band: null };
    const answered = values.filter(v => v === 0 || v === 1).length;
    if (answered !== 8) return { total: null, answered, band: null };
    const total = values.reduce((sum, v) => sum + v, 0);
    // Regla adicional de Chung 2016: dos o más ítems STOP (ronquido, cansancio, apneas observadas, hipertensión)
    // más sexo masculino, IMC > 35 o cuello grande se consideran riesgo alto aunque la suma sea 3 o 4.
    const stop = values[0] + values[1] + values[2] + values[3];
    const highByRule = stop >= 2 && (values[7] === 1 || values[4] === 1 || values[6] === 1);
    const band = total >= 5 || highByRule ? 'alto' : total <= 2 ? 'bajo' : 'intermedio';
    return { total, answered, band, highByRule };
  }

  const setupKeys = ['batteries', 'belt', 'cannula', 'oximeter', 'indicators'];
  function evaluatePolygraphSetup(values) {
    const safeValues = values && typeof values === 'object' ? values : {};
    const missing = setupKeys.filter(key => safeValues[key] !== true);
    return { completed: setupKeys.length - missing.length, ready: missing.length === 0, missing };
  }

  const polygraphWindows = Object.freeze({ eventStart: 45, eventEnd: 108, recoveryEnd: 141 });
  function respiratoryWave(i, amplitude, phaseOffset = 0, samplesPerBreath = 9) {
    const phase = (i + phaseOffset) * Math.PI * 2 / samplesPerBreath;
    return Number((Math.sin(phase) * amplitude).toFixed(3));
  }
  function delayedDesaturation(i, nadir) {
    // La respuesta oximétrica es tardía: comienza después de que termina
    // el evento respiratorio, alcanza el nadir y luego se recupera.
    const descentStart = polygraphWindows.eventEnd + 6;
    const nadirAt = 138;
    const recoveryEnd = 174;
    if (i < descentStart || i > recoveryEnd) return 96;
    if (i <= nadirAt) return Number((96 - (96 - nadir) * (i - descentStart) / (nadirAt - descentStart)).toFixed(1));
    return Number((nadir + (96 - nadir) * (i - nadirAt) / (recoveryEnd - nadirAt)).toFixed(1));
  }
  function recoveryAmplitude(i, peak, floor) {
    const progress = (i - polygraphWindows.eventEnd) / (polygraphWindows.recoveryEnd - polygraphWindows.eventEnd);
    return peak - (peak - floor) * progress;
  }
  function createPolygraphTraces(kind) {
    // Three samples/second over 60 seconds: enough resolution to keep thoracic excursions visible.
    const length = 180;
    const flow = [];
    const effort = [];
    const spo2 = [];
    const pulse = [];
    for (let i = 0; i < length; i += 1) {
      const inEvent = i >= polygraphWindows.eventStart && i < polygraphWindows.eventEnd;
      const inRecovery = i >= polygraphWindows.eventEnd && i < polygraphWindows.recoveryEnd;
      const eventProgress = inEvent ? (i - polygraphWindows.eventStart) / (polygraphWindows.eventEnd - polygraphWindows.eventStart - 1) : 0;
      let flowAmplitude = 1;
      let effortAmplitude = 0.78;
      let flowValue;
      let effortValue;
      let saturation = 96;
      let heartRate = 68;
      if (kind === 'obstructive' && inEvent) {
        // El flujo desaparece. La excursión de la banda se reduce de forma
        // marcada, pero conserva oscilaciones durante todo el evento; si el
        // esfuerzo desapareciera por completo, el patrón sería central.
        flowValue = respiratoryWave(i, 0.025, 0, 5);
        effortAmplitude = 0.2 + eventProgress * 0.18;
      } else if (kind === 'central' && inEvent) {
        flowValue = respiratoryWave(i, 0.018, 0, 5);
        effortValue = respiratoryWave(i, 0.018, 1, 5);
      } else if (kind === 'hypopnea' && inEvent) {
        flowAmplitude = 0.42;
        effortAmplitude = 0.86 + eventProgress * 0.22;
      }
      if (inRecovery && (kind === 'obstructive' || kind === 'central' || kind === 'hypopnea')) {
        // Recovery breaths are deeper and slightly faster, then settle back toward baseline.
        const recoveryIndex = i - polygraphWindows.eventEnd;
        flowValue = respiratoryWave(recoveryIndex + 1, recoveryAmplitude(i, 1.65, 1.05), 0, 8);
        effortValue = respiratoryWave(recoveryIndex + 1, recoveryAmplitude(i, 1.45, 0.86), 0.65, 8);
      }
      if (kind === 'obstructive') {
        saturation = delayedDesaturation(i, 90);
        heartRate = i >= 116 && i <= 168 ? Number((68 + 19 * Math.sin((i - 116) / 52 * Math.PI)).toFixed(1)) : 68;
      } else if (kind === 'central') {
        saturation = delayedDesaturation(i, 92);
        heartRate = i >= 100 && i <= 145 ? Number((66 + 12 * Math.sin((i - 100) / 45 * Math.PI)).toFixed(1)) : 66;
      } else if (kind === 'hypopnea') {
        saturation = delayedDesaturation(i, 93);
        heartRate = i >= 100 && i <= 145 ? Number((67 + 9 * Math.sin((i - 100) / 45 * Math.PI)).toFixed(1)) : 67;
      } else if (kind === 'artifact') {
        if (i >= 58 && i <= 124) {
          flowValue = respiratoryWave(i, 0.035, 0, 5);
          saturation = [82, 0, 79, 98, 45, 0][i % 6];
          heartRate = [0, 145, 28, 0, 190, 34][i % 6];
        }
      }
      flow.push(flowValue ?? respiratoryWave(i, flowAmplitude));
      effort.push(effortValue ?? respiratoryWave(i, effortAmplitude, 0.65));
      spo2.push(saturation);
      pulse.push(heartRate);
    }
    return { flow, effort, spo2, pulse };
  }

  function distributeMarkers(count, seed) {
    if (!count) return [];
    return Array.from({ length: count }, (_, index) => Number((((index * 47 + seed * 19) % 118) + 1 + ((index % 5) * 0.12)).toFixed(2))).sort((a, b) => a - b);
  }

  function createReportOverview(kind, report) {
    const length = 120;
    const pulse = Array.from({ length }, (_, i) => Number((report.pulse.average + Math.sin(i / 8) * 2.4 + Math.sin(i / 2.9) * 1.2).toFixed(1)));
    const spo2 = Array.from({ length }, (_, i) => Number((report.spo2.average + Math.sin(i / 11) * 0.8).toFixed(1)));
    const eventBurden = report.interpretable ? Math.max(1, report.events.total) : 8;

    for (let i = 0; i < length; i += 1) {
      const cluster = Math.max(0, Math.sin((i + 8) / 9));
      if (kind === 'artifact') {
        pulse[i] = i > 48 && i < 80 ? [48, 92, 54, 110, 50, 87][i % 6] : pulse[i];
        spo2[i] = i > 20 && i < 88 ? [84, 96, 82, 95, 86, 93][i % 6] : spo2[i];
      } else {
        const burdenScale = Math.min(1, eventBurden / 100);
        pulse[i] = Number((pulse[i] + cluster * burdenScale * 8).toFixed(1));
        spo2[i] = Number((spo2[i] - cluster * burdenScale * (report.spo2.average - report.spo2.minimum) * 0.55).toFixed(1));
      }
    }
    pulse[18] = report.pulse.minimum;
    pulse[76] = report.pulse.maximum;
    spo2[73] = report.spo2.minimum;

    return {
      pulse,
      spo2,
      events: {
        obstructive: distributeMarkers(report.events.obstructive, 2),
        central: distributeMarkers(report.events.central, 5),
        mixed: distributeMarkers(report.events.mixed, 7),
        hypopneas: distributeMarkers(report.events.hypopneas, 11),
        desaturations: distributeMarkers(report.desaturations, 13),
        snoring: distributeMarkers(Math.min(report.snoringEvents, 160), 17)
      }
    };
  }

  function buildReport(config) {
    const report = { ...config };
    const validHours = report.validFlowMinutes / 60;
    const t90Percent = Number.isFinite(report.spo2.below90Minutes)
      ? report.spo2.below90Minutes / report.validOximetryMinutes * 100
      : null;
    const severity = !report.interpretable
      ? 'no interpretable'
      : report.rei < 5 ? 'sin frecuencia diagnóstica por índice'
        : report.rei < 15 ? 'leve'
          : report.rei < 30 ? 'moderada' : 'severa';
    report.severity = severity;
    report.t90Percent = Number.isFinite(t90Percent) ? Number(t90Percent.toFixed(1)) : null;

    if (!report.interpretable) {
      report.commentary = `Durante el estudio poligráfico domiciliario sólo fueron válidos ${Math.floor(report.validFlowMinutes / 60)} h ${String(report.validFlowMinutes % 60).padStart(2, '0')} min de flujo y ${Math.floor(report.validOximetryMinutes / 60)} h ${String(report.validOximetryMinutes % 60).padStart(2, '0')} min de oximetría; se observaron artefactos no fisiológicos. La SpO₂ basal fue ${report.spo2.baseline}%, el promedio ${report.spo2.average}% y la mínima ${report.spo2.minimum}%.`;
      report.conclusion = 'REGISTRO TÉCNICAMENTE INADECUADO Y NO INTERPRETABLE. REI y ODI no son válidos; el estudio no permite confirmar ni excluir apnea obstructiva del sueño.';
      report.recommendation = 'Se recomienda polisomnografía. Sólo considerar repetir HSAT si el equipo médico identifica una causa técnica corregible y la persona continúa siendo candidata apropiada.';
    } else if (report.kind === 'central') {
      const centralIndex = report.events.central / validHours;
      report.centralApneaIndex = Number(centralIndex.toFixed(1));
      report.commentary = `Durante el estudio poligráfico domiciliario se obtuvieron ${validHours.toFixed(1)} h de flujo válido; registro técnicamente adecuado. Se observó un REI de ${report.rei.toFixed(1)} eventos/h y un índice de apnea central de ${report.centralApneaIndex.toFixed(1)}/h (${report.events.central} apneas centrales). El ODI fue de ${report.odi.toFixed(1)}/h; la SpO₂ basal fue ${report.spo2.baseline}%, el promedio ${report.spo2.average}%, la mínima ${report.spo2.minimum}% y el T90 ${report.spo2.below90Minutes} min (${report.t90Percent.toFixed(1)}%).`;
      report.conclusion = 'ESTUDIO CON COMPONENTE CENTRAL SIGNIFICATIVO. NO CORRESPONDE CLASIFICARLO COMO AOS NO COMPLICADA.';
      report.recommendation = 'Requiere evaluación médica y polisomnografía para caracterizar el patrón, las comorbilidades y sus posibles causas antes de indicar tratamiento.';
    } else {
      const severityGrade = severity === 'moderada' ? 'MODERADO' : severity === 'severa' ? 'SEVERO' : severity.toUpperCase();
      report.commentary = `Durante el estudio poligráfico domiciliario se obtuvieron ${validHours.toFixed(1)} h de flujo válido; registro técnicamente adecuado. Se observó un REI de ${report.rei.toFixed(1)} eventos/h y un ODI de ${report.odi.toFixed(1)}/h. La SpO₂ basal fue ${report.spo2.baseline}%, el promedio ${report.spo2.average}%, la SpO₂ mínima de ${report.spo2.minimum}% y el T90 de ${report.spo2.below90Minutes} min (${report.t90Percent.toFixed(1)}%).`;
      report.conclusion = `ESTUDIO COMPATIBLE CON APNEA OBSTRUCTIVA DEL SUEÑO DE GRADO ${severityGrade}, DE PREDOMINIO OBSTRUCTIVO (${report.events.obstructive} APNEAS OBSTRUCTIVAS Y ${report.events.hypopneas} HIPOPNEAS).`;
      report.recommendation = 'Correlacionar con síntomas, comorbilidades y examen clínico. La conducta terapéutica debe definirse después de la interpretación médica del registro completo.';
    }
    report.impression = `${report.commentary} ${report.conclusion} ${report.recommendation}`;
    report.overview = createReportOverview(config.kind, report);
    return report;
  }

  const polygraphCases = [
    {
      id: 'obstructive',
      label: 'Caso 1 · Pausa con esfuerzo',
      context: 'Varón de 54 años, ronquido habitual y apneas presenciadas. Ventana educativa de 60 segundos.',
      metrics: 'Ventana 60 s · flujo casi ausente · esfuerzo reducido pero presente · SpO₂ 96→90% después del evento',
      correctEvent: 'obstructive-apnea',
      correctAction: 'validate',
      rationale: 'El flujo casi desaparece y la excursión torácica disminuye mucho, pero conserva oscilaciones durante todo el evento. La obstrucción termina con respiraciones de recuperación amplias; la SpO₂ empieza a descender después y alcanza su nadir de forma tardía. Es un patrón compatible con apnea obstructiva. La conducta educativa es revisar todo el registro, artefactos y contexto antes de validar el informe.',
      windows: polygraphWindows,
      traces: createPolygraphTraces('obstructive'),
      report: buildReport({
        kind: 'obstructive', patient: 'Paciente simulado A', studyLabel: 'Estudio educativo 01', recordingWindow: '22:30-05:30',
        recordingMinutes: 420, validFlowMinutes: 390, validOximetryMinutes: 405, interpretable: true, quality: 'Adecuada',
        rei: 22, odi: 19, respiratoryRate: 15.2, desaturations: 128, snoringEvents: 640,
        events: { total: 143, apneas: 65, obstructive: 60, central: 2, mixed: 3, indeterminate: 0, hypopneas: 78 },
        spo2: { baseline: 96, average: 94, minimum: 84, below90Minutes: 24 },
        pulse: { minimum: 52, maximum: 109, average: 72 },
        impression: 'Hallazgos educativos compatibles con apnea obstructiva del sueño de frecuencia moderada. Correlacionar con síntomas, comorbilidades y revisión completa de señales.'
      })
    },
    {
      id: 'central',
      label: 'Caso 2 · Pausa sin esfuerzo',
      context: 'Paciente de 67 años con insuficiencia cardíaca. Ventana educativa de 60 segundos.',
      metrics: 'Ventana 60 s · flujo y esfuerzo casi ausentes · SpO₂ 96→92% después del evento',
      correctEvent: 'central-apnea',
      correctAction: 'refer-psg',
      rationale: 'Flujo y esfuerzo se interrumpen juntos y luego aparece una caída de saturación. Es un patrón compatible con apnea central, no con obstrucción aislada. Requiere revisión médica y, según el contexto, evaluación más completa; el simulador no indica tratamiento.',
      windows: polygraphWindows,
      traces: createPolygraphTraces('central'),
      report: buildReport({
        kind: 'central', patient: 'Paciente simulado B', studyLabel: 'Estudio educativo 02', recordingWindow: '23:00-05:30',
        recordingMinutes: 390, validFlowMinutes: 360, validOximetryMinutes: 372, interpretable: true, quality: 'Adecuada con patrón central',
        rei: 18, odi: 16, respiratoryRate: 14.1, desaturations: 99, snoringEvents: 84,
        events: { total: 108, apneas: 54, obstructive: 8, central: 42, mixed: 4, indeterminate: 0, hypopneas: 54 },
        spo2: { baseline: 96, average: 94, minimum: 86, below90Minutes: 12 },
        pulse: { minimum: 50, maximum: 96, average: 66 },
        impression: 'Predominio educativo de eventos centrales. No asumir AOS no complicada: requiere evaluación médica y considerar polisomnografía según el contexto clínico.'
      })
    },
    {
      id: 'hypopnea',
      label: 'Caso 3 · Reducción parcial',
      context: 'Mujer de 49 años con hipertensión y sueño no reparador. Ventana educativa de 60 segundos.',
      metrics: 'Ventana 60 s · amplitud de flujo reducida 58% (no desaparece) · esfuerzo presente · SpO₂ 96→93%',
      correctEvent: 'obstructive-hypopnea',
      correctAction: 'validate',
      rationale: 'El flujo disminuye de forma parcial durante al menos 10 segundos, persiste el esfuerzo y sigue una desaturación. El patrón es compatible con hipopnea obstructiva. En HSAT sin EEG no puede puntuarse un microdespertar y debe declararse la regla de desaturación utilizada.',
      windows: polygraphWindows,
      traces: createPolygraphTraces('hypopnea'),
      report: buildReport({
        kind: 'hypopnea', patient: 'Paciente simulado C', studyLabel: 'Estudio educativo 03', recordingWindow: '22:45-05:15',
        recordingMinutes: 390, validFlowMinutes: 360, validOximetryMinutes: 378, interpretable: true, quality: 'Adecuada',
        rei: 12, odi: 10, respiratoryRate: 15.8, desaturations: 63, snoringEvents: 310,
        events: { total: 72, apneas: 8, obstructive: 8, central: 0, mixed: 0, indeterminate: 0, hypopneas: 64 },
        spo2: { baseline: 96, average: 94, minimum: 89, below90Minutes: 4 },
        pulse: { minimum: 55, maximum: 94, average: 67 },
        impression: 'Predominio educativo de hipopneas obstructivas, con reducción parcial del flujo y esfuerzo conservado. Informar la regla de desaturación utilizada.'
      })
    },
    {
      id: 'artifact',
      label: 'Caso 4 · Señal no fisiológica',
      context: 'Registro domiciliario con cánula desplazada y sensor digital intermitente.',
      metrics: 'Flujo válido 2 h 41 min · oximetría válida 2 h 06 min · saltos abruptos de pulso y SpO₂',
      correctEvent: 'no-interpretable',
      correctAction: 'repeat-or-psg',
      rationale: 'Los saltos imposibles de SpO₂ y pulso, junto con tiempo válido insuficiente, indican artefacto y mala calidad de señal. No corresponde informar un resultado negativo: debe repetirse el estudio o realizar PSG según sospecha, comorbilidades y protocolo.',
      windows: polygraphWindows,
      traces: createPolygraphTraces('artifact'),
      report: buildReport({
        kind: 'artifact', patient: 'Paciente simulado D', studyLabel: 'Estudio educativo 04', recordingWindow: '22:20-05:20',
        recordingMinutes: 420, validFlowMinutes: 161, validOximetryMinutes: 126, interpretable: false, quality: 'Técnicamente inadecuada',
        rei: null, odi: null, respiratoryRate: null, desaturations: 0, snoringEvents: 38,
        events: { total: 8, apneas: 2, obstructive: 2, central: 0, mixed: 0, indeterminate: 0, hypopneas: 6 },
        spo2: { baseline: 95, average: 91, minimum: 82, below90Minutes: null },
        pulse: { minimum: 47, maximum: 110, average: 64 },
        impression: 'Registro educativo no interpretable por tiempo de flujo y oximetría válidos insuficientes y artefactos no fisiológicos. Repetir HSAT o completar con PSG según la sospecha clínica.'
      })
    }
  ];

  function checkPolygraphCase(caseId, event, action) {
    const item = polygraphCases.find(entry => entry.id === caseId);
    if (!item) return null;
    const eventCorrect = event === item.correctEvent;
    const actionCorrect = action === item.correctAction;
    return {
      eventCorrect,
      actionCorrect,
      correct: eventCorrect && actionCorrect,
      rationale: item.rationale
    };
  }

  root.SleepLab = {
    scoreEpworth,
    eventIndex,
    severity,
    papTrace,
    scoreStopBang,
    evaluatePolygraphSetup,
    polygraphCases,
    checkPolygraphCase
  };
})(typeof window !== 'undefined' ? window : globalThis);
