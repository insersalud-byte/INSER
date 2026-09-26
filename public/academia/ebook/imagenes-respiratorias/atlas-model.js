(function(root){
  'use strict';
  const data=root.ImagingAtlas;
  function frame(value,length){return Number.isFinite(value)&&length>0?Math.max(0,Math.min(length-1,Math.floor(value))):0;}
  function grade(answers){
    if(!answers||data.exam.some(q=>!q.choices.some(c=>c.id===answers[q.id])))return null;
    const results=data.exam.map(q=>({id:q.id,correct:answers[q.id]===q.answer}));
    return {correct:results.filter(r=>r.correct).length,total:results.length,results};
  }
  root.ImagingAtlasModel={card:id=>data.cards.find(c=>c.id===id)||null,filter:modality=>modality==='all'?data.cards:data.cards.filter(c=>c.modality===modality),frame,grade};
})(typeof window!=='undefined'?window:globalThis);
