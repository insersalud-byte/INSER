(function (root) {
  'use strict';
  function getCase(modality, id) {
    return root.ImagingCases[modality]?.find(item => item.id === id) || null;
  }
  function initialState(modality) {
    const first = root.ImagingCases[modality]?.[0];
    return first ? { caseId: first.id, frame: 0, zoom: 1, answer: '', revealed: false, hints: false, compare: false, practice: false, playing: false, view: 'b' } : null;
  }
  function clampFrame(frame, count) {
    return Number.isFinite(frame) && Number.isInteger(count) && count > 0 ? Math.max(0, Math.min(count - 1, Math.floor(frame))) : 0;
  }
  function checkChoice(item, choice) {
    if (!item || !item.choices.some(option => option.id === choice)) return null;
    return item.answer === choice;
  }
  function thickening(expiratory, inspiratory) {
    if (!Number.isFinite(expiratory) || !Number.isFinite(inspiratory) || expiratory <= 0 || inspiratory <= 0) return null;
    return (inspiratory - expiratory) / expiratory * 100;
  }
  root.ImagingModel = { getCase, initialState, clampFrame, checkChoice, thickening };
})(typeof window !== 'undefined' ? window : globalThis);
