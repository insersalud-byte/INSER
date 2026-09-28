const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const dir=path.join(__dirname,'../public/academia/ebook/imagenes-respiratorias');
const ctx={};
test('example videos do not share the atlas video controller selector',()=>{
  assert.doesNotMatch(fs.readFileSync(path.join(dir,'clinical-examples.js'),'utf8'),/class="clinical-video"/);
});
for(const f of ['cases.js','clinical-examples-data.js'])vm.runInNewContext(fs.readFileSync(path.join(dir,f),'utf8'),ctx);
test('every RX, CT and ultrasound scenario has a real clinical example with signs and limits',()=>{
  for(const m of ['rx','ct','us'])for(const c of ctx.ImagingCases[m]){
    const e=ctx.ImagingClinicalExamples[c.id];assert.ok(e,c.id);assert.ok(e.asset);assert.ok(e.caption);assert.ok(e.limit);assert.ok(e.reference);assert.ok(e.signs.length);
    for(const s of e.signs){assert.ok(s.label);assert.ok(s.detail);for(const n of [s.x,s.y])assert.ok(Number.isFinite(n)&&n>=0&&n<=100);}
  }
});
test('atelectasis separates demonstrated volume loss from signs not resolved in the plate',()=>{
  const e=ctx.ImagingClinicalExamples['rx-atelectasia'];assert.match(JSON.stringify(e),/tráquea/i);assert.match(JSON.stringify(e),/volumen/i);assert.ok(e.notShown.length>=2);
});
test('all 24 examples resolve to local licensed images, posters and sources',()=>{
  const assets=['recursos.json','atlas-media.json','clinical-media.json'].flatMap(f=>JSON.parse(fs.readFileSync(path.join(dir,f),'utf8')));
  assert.equal(Object.keys(ctx.ImagingClinicalExamples).length,24);
  for(const e of Object.values(ctx.ImagingClinicalExamples)){
    const a=assets.find(a=>a.id===e.asset);assert.ok(a,e.asset);assert.match(a.source,/^https:/);assert.ok(a.license);assert.ok(a.author);
    assert.ok(fs.existsSync(path.join(dir,'images',a.file)),a.file);
    if(a.poster)assert.ok(fs.existsSync(path.join(dir,'images',a.poster)));
  }
});
test('practice hides clinical answers until reveal, and sign selection rejects invalid indices',()=>{
  vm.runInNewContext(fs.readFileSync(path.join(dir,'clinical-examples.js'),'utf8'),ctx);
  const m=ctx.ImagingClinicalModel,e=ctx.ImagingClinicalExamples['rx-atelectasia'];
  assert.equal(m.visibleExample('rx-atelectasia',{practice:true,revealed:false}),null);
  assert.equal(m.visibleExample('rx-atelectasia',{practice:true,revealed:true}),e);
  assert.equal(m.visibleExample('rx-atelectasia',{practice:false}),e);
  assert.equal(m.visibleExample('missing'),null);
  for(const n of [-1,NaN,Infinity,.5,'1',e.signs.length])assert.equal(m.validSign(e,n),false);
  assert.equal(m.validSign(e,2),true);
});
