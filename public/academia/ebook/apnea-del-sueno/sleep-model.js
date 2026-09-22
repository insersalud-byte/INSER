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
    return { total, answered, band: total <= 2 ? 'bajo' : total <= 4 ? 'intermedio' : 'alto' };
  }
  root.SleepLab = { scoreEpworth, eventIndex, severity, papTrace, scoreStopBang };
})(typeof window !== 'undefined' ? window : globalThis);
