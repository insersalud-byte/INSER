(function(){
 'use strict';
 function predict(p){
  if(!['hombre','mujer'].includes(p.sex)||!Number.isFinite(p.age)||p.age<40||p.age>80||!Number.isFinite(p.height)||p.height<100||p.height>230||!Number.isFinite(p.weight)||p.weight<20||p.weight>300)return null;
  const m=p.sex==='hombre'?7.57*p.height-5.02*p.age-1.76*p.weight-309:2.11*p.height-2.29*p.weight-5.78*p.age+667;
  return m>0?m:null;
 }
 function stops(events,total){
  const result=[];let begin=null;
  for(const e of events){if(e.event==='Inicio de descanso'&&begin===null)begin=e.seconds;
   if(e.event==='Reanudación'&&begin!==null){result.push({start:begin,end:e.seconds,duration:Math.max(0,e.seconds-begin)});begin=null;}}
  if(begin!==null)result.push({start:begin,end:total,duration:Math.max(0,total-begin)});
  return result;
 }
 if(typeof module!=='undefined')module.exports={predict,stops};
 if(typeof document==='undefined')return;
 const el=id=>document.getElementById(id),number=n=>Number(n).toLocaleString('es-AR',{maximumFractionDigits:1});
 const patient=document.createElement('section');patient.className='patient-card';patient.id='walkPatient';
 patient.innerHTML='<h3>1 · Datos del paciente</h3><div class="patient-fields"><label>Nombre del paciente<input id="patientName" maxlength="100" autocomplete="off" placeholder="Nombre o código"></label><label>Edad (años)<input id="patientAge" type="number" min="18" max="120" step="1"></label><label>Peso (kg)<input id="patientWeight" type="number" min="20" max="300" step="0.1"></label><label>Altura (cm)<input id="patientHeight" type="number" min="100" max="230" step="0.1" placeholder="Ej. 170"></label><label>Sexo para la ecuación<select id="patientSex"><option value="">Seleccionar</option><option value="hombre">Hombre</option><option value="mujer">Mujer</option></select></label></div><p id="walkPrediction" role="status">Completá edad, peso, altura y sexo para calcular la referencia.</p><details><summary>Cómo se calcula y cuándo se aplica</summary><p>Enright–Sherrill (1998), adultos sanos de 40–80 años. Hombre: 7,57 × altura(cm) − 5,02 × edad − 1,76 × peso(kg) − 309. Mujer: 2,11 × altura(cm) − 2,29 × peso(kg) − 5,78 × edad + 667. El resultado es una referencia poblacional, no una distancia exigible ni un diagnóstico. Fuera del rango de edad no se extrapola. La aplicabilidad a cada población debe revisarse clínicamente.</p><a href="https://pubmed.ncbi.nlm.nih.gov/9817683/">Publicación original</a></details><p class="fineprint">Los datos se usan sólo en esta página y en el informe que decidas guardar; no se envían a un servidor ni se conservan al recargar. Protegé los archivos que contengan datos personales.</p>';
 el('walkLab').querySelector('.lab-grid').before(patient);
 const summary=document.createElement('section');summary.className='walk-results';summary.innerHTML='<h3>3 · Resultado y detenciones</h3><p id="walkPercent" role="status"></p><p id="walkStopList"></p><button type="button" id="walkPdf">Preparar informe / Guardar PDF</button><p id="walkReportStatus" role="status">Al finalizar, prepará el informe y elegí Guardar como PDF en la ventana de impresión.</p>';
 el('walkExport').before(summary);
 el('walkExport').textContent='Descargar registro de respaldo (TXT)';
 function profile(){return {name:el('patientName').value.trim(),age:numeric('patientAge',18,120,true),weight:numeric('patientWeight',20,300),height:numeric('patientHeight',100,230),sex:el('patientSex').value};}
 function distance(){const l=numeric('walkLength',1,100,true),n=numeric('walkLaps',0,100,true),x=numeric('walkExtra',0,100);return l!==null&&n!==null&&x!==null&&x<l?l*n+x:null;}
 function percentage(d,p){return walk.complete&&d!==null&&p!==null?100*d/p:null;}
 function update(){
  const p=profile(),pred=predict(p),d=distance(),pct=percentage(d,pred);
  el('walkPrediction').textContent=pred===null?(p.age!==null&&(p.age<40||p.age>80)?'Sin predicho: ecuación limitada a 40–80 años. Se puede emitir un informe descriptivo.':'Completá datos válidos para calcular la referencia. Altura en centímetros.'):'Distancia predicha de referencia: '+number(pred)+' m.';
  el('walkPercent').textContent='Recorrido: '+(d===null?'revisar tramos':number(d)+' m')+' · Predicho: '+(pred===null?'no disponible':number(pred)+' m')+' · % del predicho: '+(pct===null?'pendiente de prueba completa y datos válidos':number(pct)+'%')+(walk.complete&&numeric('walkLength',1,100,true)!==30?' · Recorrido no estándar: comparación con cautela.':'');
  const list=stops(walk.events,Math.floor(elapsed()));
  el('walkStopList').textContent=list.length?list.map((s,i)=>'Detención '+(i+1)+': '+s.duration+' s (del segundo '+s.start+' al '+s.end+')').join(' · ')+' · Total detenido: '+list.reduce((a,s)=>a+s.duration,0)+' s':'Sin detenciones registradas.';
 }
 function gather(){
  if(!walkInputs())return null;
  const invalid=[...patient.querySelectorAll('input')].some(i=>!i.validity.valid);
  const monitoring=window.walkMonitor.report();
  if(invalid||monitoring===null){el('walkReportStatus').textContent='Corregí los campos inválidos antes de emitir el informe.';return null;}
  const p=profile(),pred=predict(p),d=distance();
  return {patient:p,date:new Date().toLocaleString('es-AR'),state:el('walkStatus').textContent,complete:walk.complete,seconds:Math.floor(elapsed()),distance:d,predicted:pred,percent:percentage(d,pred),length:Number(el('walkLength').value),stops:stops(walk.events,Math.floor(elapsed())),notes:el('walkNotes').value,monitor:JSON.parse(monitoring.slice(monitoring.indexOf('{')))};
 }
 function textReport(r){return ['INFORME DE MARCHA DE SEIS MINUTOS · INSER SALUD','Fecha: '+r.date,'Paciente: '+(r.patient.name||'No registrado'),'Edad: '+(r.patient.age??'NR')+' años; peso: '+(r.patient.weight??'NR')+' kg; altura: '+(r.patient.height??'NR')+' cm; sexo ecuación: '+(r.patient.sex||'NR'),'Estado: '+r.state,'Tiempo: '+r.seconds+' s; tramo: '+r.length+' m','Recorrió '+number(r.distance)+' m.','Predicho Enright–Sherrill: '+(r.predicted===null?'no disponible':number(r.predicted)+' m'),'Porcentaje del predicho: '+(r.percent===null?'no calculado: prueba incompleta o datos fuera de aplicación':number(r.percent)+'%'),'Detenciones: '+JSON.stringify(r.stops),'Observaciones: '+(r.notes||'No registradas'),'Signos, horarios y alertas: '+JSON.stringify(r.monitor,null,2),'Referencia: https://pubmed.ncbi.nlm.nih.gov/9817683/','Registro de apoyo; requiere revisión y firma profesional.'].join('\n');}
 function charts(records,container){
  const ns='http://www.w3.org/2000/svg';
  const stages=['Inicio','1 min','2 min','3 min','4 min','5 min','Final','Rec. +2 min'];
  function svgNode(tag,attrs,text,parent){const node=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([k,v])=>node.setAttribute(k,String(v)));if(text!==null)node.textContent=text;parent.appendChild(node);return node;}
  for(const [key,title,unit,color] of [['spo2','Saturación de oxígeno','%', '#08786e'],['disnea','Borg de disnea','puntos','#865211'],['fc','Frecuencia cardíaca','lpm','#245aa0']]){
   const values=records.map(row=>row.datos[key]),valid=values.filter(v=>v!==null);
   const low=key==='disnea'?0:key==='spo2'?Math.min(80,...valid.map(v=>Math.floor(v/10)*10)):0;
   const high=key==='disnea'?10:key==='spo2'?100:Math.max(100,...valid.map(v=>Math.ceil(v/20)*20));
   const figure=document.createElement('figure');figure.className='report-chart';container.appendChild(figure);
   const caption=document.createElement('figcaption');caption.textContent=title+' ('+unit+')';figure.appendChild(caption);
   const svg=svgNode('svg',{viewBox:'0 0 700 158',role:'img','aria-label':title+': '+values.map((v,i)=>stages[i]+' '+(v===null?'sin dato':v+' '+unit)).join(', ')},null,figure);
   const x=i=>52+i*85,y=v=>112-(v-low)/(high-low)*84;
   for(let i=0;i<=2;i++){const v=low+(high-low)*i/2;svgNode('line',{x1:48,y1:y(v),x2:650,y2:y(v),stroke:'#c9d7da'},null,svg);svgNode('text',{x:40,y:y(v)+4,'text-anchor':'end',fill:'#364951','font-size':12},number(v),svg);}
   values.forEach((v,i)=>{
    svgNode('text',{x:x(i),y:139,'text-anchor':'middle',fill:'#364951','font-size':11},stages[i],svg);
    if(v===null){svgNode('text',{x:x(i),y:154,'text-anchor':'middle',fill:'#68777d','font-size':10},'Sin dato',svg);return;}
    if(i>0&&values[i-1]!==null)svgNode('line',{class:'data-segment',x1:x(i-1),y1:y(values[i-1]),x2:x(i),y2:y(v),stroke:color,'stroke-width':2.5},null,svg);
    svgNode('circle',{cx:x(i),cy:y(v),r:4,fill:color},null,svg);
    svgNode('text',{x:x(i),y:y(v)-9,'text-anchor':'middle',fill:color,'font-size':12,'font-weight':'bold'},number(v),svg);
   });
   const comparison=document.createElement('p');comparison.className='chart-comparison';const a=values[0],b=values[values.length-1];
   comparison.textContent=a===null||b===null?'Comparación inicio–recuperación: faltan datos.':'Inicio: '+number(a)+' '+unit+' → Recuperación: '+number(b)+' '+unit+' · Cambio: '+(b-a>0?'+':'')+number(b-a)+' '+(key==='spo2'?'puntos porcentuales':unit)+'.';figure.appendChild(comparison);
  }
 }
 function preview(r){
  let panel=el('walkPrintReport');if(!panel){panel=document.createElement('section');panel.id='walkPrintReport';document.body.appendChild(panel);}panel.replaceChildren();
  function add(tag,text,parent=panel){const node=document.createElement(tag);node.textContent=text;parent.appendChild(node);return node;}
  const bar=add('div','');bar.className='report-actions';const print=add('button','Imprimir / Guardar como PDF',bar);print.onclick=()=>window.print();const close=add('button','Cerrar informe',bar);close.onclick=()=>document.body.classList.remove('show-walk-report');
  add('h1','INSERSALUD.COM ACADEMIS');
  add('h2',r.patient.name||'Paciente no identificado');
  add('p','Informe de test de marcha de seis minutos · '+r.date);
  add('p','Edad: '+(r.patient.age??'NR')+' años · Peso: '+(r.patient.weight??'NR')+' kg · Altura: '+(r.patient.height??'NR')+' cm · Sexo utilizado en ecuación: '+(r.patient.sex||'NR'));
  add('h2','Resultado');add('p','Recorrió '+number(r.distance)+' metros en '+r.seconds+' segundos. '+r.state+'.');
  add('p','Distancia predicha: '+(r.predicted===null?'no disponible':number(r.predicted)+' metros')+'. Porcentaje del predicho: '+(r.percent===null?'no calculable para una prueba incompleta o sin predicho válido':number(r.percent)+'%')+'.');
  add('p','Longitud del tramo: '+r.length+' m.'+(r.length!==30?' Recorrido no estándar: interpretar la comparación con cautela.':''));
  add('p','El predicho es una referencia de adultos sanos, no una meta obligatoria ni un diagnóstico. Ecuación Enright–Sherrill (1998), 40–80 años. Fuera de ese rango o sin datos suficientes no se extrapola.');
  add('h2','Detenciones durante la marcha');
  if(!r.stops.length)add('p','No se registraron detenciones.');
  else{r.stops.forEach((s,i)=>add('p','Detención '+(i+1)+': inicio '+s.start+' s; fin '+s.end+' s; duración '+s.duration+' s.'));add('p','Tiempo total detenido: '+r.stops.reduce((a,s)=>a+s.duration,0)+' segundos. El reloj de la prueba continuó durante las pausas.');}
  add('h2','Signos y Borg de disnea');
  const table=add('table',''),thead=add('thead','',table),tr=add('tr','',thead);
  ['Momento','SpO₂ %','FC lpm','Borg','FR rpm','TA mmHg'].forEach(v=>add('th',v,tr));
  const body=add('tbody','',table);
  r.monitor.registros.forEach(row=>{const tr=add('tr','',body),v=row.datos;[row.momento,v.spo2??'NR',v.fc??'NR',v.disnea??'NR',v.fr??'NR',(v.sis??'NR')+'/'+(v.dia??'NR')].forEach(t=>add('td',String(t),tr));});
  add('p','NR: no registrado. Registros manuales; no medición automática. '+r.monitor.recuperacion);
  const graphSection=add('section','');graphSection.className='report-graphs';add('h2','Evolución durante la prueba y recuperación',graphSection);add('p','Puntos: valores registrados. Huecos: sin datos. El eje horizontal muestra etapas del registro, no intervalos de tiempo proporcionales. Final corresponde al momento de detención; recuperación, al control programado a +2 minutos.',graphSection);charts(r.monitor.registros,graphSection);
  add('h2','Observaciones');add('p',r.notes||'No registradas.');
  add('h2','Seguridad');add('p','Límites configurados: SpO₂ <'+r.monitor.limites.spo2+'%; FC '+(r.monitor.limites.fc===null?'sin límite numérico':'>='+r.monitor.limites.fc+' lpm')+'.');
  const alerts=[...new Set(r.monitor.historialAlarmas.flatMap(h=>h.motivos||[h.evento||'']))].filter(Boolean);add('p',alerts.length?alerts.join(' · '):'No se registraron alertas. Esto no certifica seguridad clínica.');
  add('p','Referencia: Enright PL, Sherrill DL. Am J Respir Crit Care Med. 1998;158:1384–1387. DOI: 10.1164/ajrccm.158.5.9710086.');
  add('p','Registro generado como apoyo documental. Requiere revisión profesional; no constituye diagnóstico automático.');add('p','Profesional / firma: _______________________________________');
  document.body.classList.add('show-walk-report');panel.scrollTop=0;close.focus();
 }
 patient.addEventListener('input',update);
 el('walkPdf').onclick=()=>{if(walk.running||walk.started===null){el('walkReportStatus').textContent='Finalizá la prueba antes de preparar el informe.';return;}const r=gather();if(r)preview(r);};
 window.walkReport={update,reset(){patient.querySelectorAll('input').forEach(i=>i.value='');el('patientSex').value='';el('walkReportStatus').textContent='Nuevo registro: completá los datos del paciente.';el('walkPrintReport')?.remove();document.body.classList.remove('show-walk-report');update();},text(){const r=gather();return r?textReport(r):null;}};
 update();
})();
