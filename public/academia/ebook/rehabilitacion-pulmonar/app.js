'use strict';
const $ = id => document.getElementById(id);
const fmt = (n,d=0) => Number(n).toLocaleString('es-AR',{maximumFractionDigits:d,minimumFractionDigits:d});
const clamp = (n,a,b) => Math.max(a,Math.min(b,n));
function numeric(id,min,max,integer=false) {
  const e=$(id), n=e.value.trim()===''?NaN:Number(e.value);
  return Number.isFinite(n)&&n>=min&&n<=max&&(!integer||Number.isInteger(n))?n:null;
}
function download(name,text) {
  const blob=new Blob([text],{type:'text/plain;charset=utf-8'}), url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download=name;a.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}
$('print').addEventListener('click',()=>window.print());
document.querySelectorAll('section.chapter[id]:not(#inicio):not(#indice)').forEach(s=>{
  const a=document.createElement('a');a.href='#'+s.id;
  a.textContent=s.querySelector('.section-number').textContent+' · '+s.querySelector('h2').textContent;
  $('chapterIndex').appendChild(a);
});
const exercises=[
{title:'Caminata en superficie llana',type:'aerobico',image:'portada',alt:'Caminata supervisada en rehabilitación',goal:'Entrenar resistencia y desplazamiento cotidiano.',steps:['Elegir un trayecto despejado y el apoyo indicado. Empezar a ritmo suave.','Mantener mirada al frente, paso cómodo y hombros sueltos.','Caminar al ritmo acordado; usar intervalos si no se sostiene un bloque continuo.','Reducir la velocidad al terminar y registrar síntomas y pausas.'],dose:'Ejemplo inicial: bloques breves de 2–5 minutos, con recuperación según necesidad. El tiempo acumulado se acuerda con el equipo.',adapt:'Acortar bloques antes de abandonar la actividad. Progresar el tiempo y luego la velocidad, una variable por vez.',error:'Acelerar para alcanzar a otra persona, sostenerse de objetos móviles o ignorar mareo y dolor.'},
{title:'Bicicleta fija',type:'aerobico',image:'bicicleta',alt:'Paciente pedaleando en bicicleta fija con supervisión',goal:'Graduar trabajo aeróbico con apoyo estable.',steps:['Ajustar asiento para que la rodilla no quede completamente extendida al bajar el pedal.','Subir y bajar con ayuda si existe riesgo de caída.','Comenzar con baja resistencia; buscar pedaleo fluido sin balancear el tronco.','Finalizar con pedaleo suave y comprobar recuperación antes de ponerse de pie.'],dose:'Ensayo educativo: 3–5 minutos suaves para valorar tolerancia; el bloque de entrenamiento se prescribe individualmente.',adapt:'Alternar períodos cortos de trabajo y recuperación. Revisar dolor de rodilla y ajuste del asiento antes de subir resistencia.',error:'Sillín muy bajo, carga que obliga a empujar con todo el cuerpo o bajarse bruscamente después del esfuerzo.'},
{title:'Sentarse y levantarse',type:'fuerza',image:'fuerza',alt:'Paciente levantándose de una silla estable',goal:'Fortalecer piernas para transferencias y autonomía.',steps:['Ubicar una silla firme contra una pared; apoyar ambos pies separados cómodamente.','Acercarse al borde sin perder estabilidad y llevar el tronco ligeramente adelante.','Soltar el aire mientras se pone de pie. Usar apoyabrazos si están indicados.','Descender de forma controlada hasta sentarse; evitar dejarse caer.'],dose:'Ejemplo de familiarización: 1 serie de 5 repeticiones. La progresión puede dirigirse al rango de fuerza prescripto.',adapt:'Elevar asiento o usar brazos si es necesario. Progresar reduciendo ayuda, aumentando repeticiones o resistencia según evaluación.',error:'Silla con ruedas, pies demasiado adelantados, impulso brusco o retención del aire.'},
{title:'Subida a escalón bajo',type:'fuerza',image:'escalon',alt:'Paciente subiendo un escalón bajo con apoyo fijo',goal:'Practicar fuerza funcional para desniveles.',steps:['Usar un escalón bajo, ancho y antideslizante, junto a un apoyo fijo.','Apoyar completamente un pie sobre el escalón.','Subir soltando el aire y mantener alineada la rodilla con el pie.','Bajar lentamente, alternar la pierna inicial y recuperar si se necesita.'],dose:'Ejemplo de aprendizaje: 3–5 subidas por pierna con ayuda disponible. Ajustar por dolor, equilibrio y disnea.',adapt:'Reducir altura o reemplazar por transferencias desde silla. Aumentar volumen antes de aumentar altura.',error:'Apoyar sólo la punta del pie, usar un banquito inestable o continuar cuando se pierde equilibrio.'},
{title:'Remo con banda elástica',type:'fuerza',image:'bandas',alt:'Paciente realizando remo sentado con banda alrededor de los pies',goal:'Trabajar espalda y brazos para tareas de tracción.',steps:['Sentarse estable y revisar que la banda no esté deteriorada.','Asegurar el punto de apoyo según la técnica enseñada; si rodea los pies, impedir que se deslice.','Llevar codos atrás cerca del cuerpo mientras se suelta el aire.','Volver despacio sin elevar hombros ni redondear excesivamente la espalda.'],dose:'Ejemplo: 1 serie corta con resistencia ligera para aprender técnica. El profesional define carga y repeticiones.',adapt:'Elegir menor resistencia si se pierde postura. Ajustar la tensión de la banda de forma gradual.',error:'Anclaje inseguro, banda dirigida hacia la cara, tirones o compensación con el tronco.'},
{title:'Elevación de talones con apoyo',type:'fuerza',image:null,goal:'Fortalecer pantorrillas y control del apoyo.',steps:['Pararse junto a una superficie fija con ambos pies apoyados.','Elevar lentamente los talones manteniendo el peso repartido.','Sostener un instante sin bloquear rodillas.','Descender con control y respirar durante todo el movimiento.'],dose:'Ejemplo: 5 repeticiones apoyado; aumentar según control y tolerancia.',adapt:'Realizar sentado si estar de pie es inseguro. No retirar el apoyo sólo para aumentar dificultad.',error:'Balancearse, apoyarse en una silla que se mueve o forzar altura con dolor.'},
{title:'Extensión de rodilla sentado',type:'fuerza',image:null,goal:'Activar cuádriceps con menor demanda de equilibrio.',steps:['Sentarse con espalda cómoda y muslo apoyado.','Extender una rodilla lentamente hasta un rango sin dolor.','Soltar el aire al elevar la pierna; evitar levantar el muslo.','Bajar controladamente y alternar según la pauta indicada.'],dose:'Ejemplo: 5 movimientos por lado sin carga para aprender. Agregar resistencia sólo tras valorar técnica.',adapt:'Limitar el rango si hay dolor. Las tobilleras requieren una carga apropiada, no la mayor disponible.',error:'Patada rápida, bloquear dolorosamente la rodilla o inclinarse hacia atrás para compensar.'},
{title:'Flexión de brazos contra pared',type:'fuerza',image:null,goal:'Entrenar empuje con carga regulable.',steps:['Apoyar manos en la pared aproximadamente a altura de hombros.','Separar los pies de la pared manteniendo una postura estable.','Flexionar codos acercando el cuerpo como una unidad.','Empujar suave mientras se espira, sin arquear la cintura.'],dose:'Ejemplo: 5 repeticiones a corta distancia de la pared.',adapt:'Acercar los pies reduce dificultad. Aumentar distancia sólo con control y sin dolor de hombro.',error:'Apoyarse en muebles que se deslizan, elevar hombros o contener la respiración.'},
{title:'Movilidad de hombros y tórax',type:'movilidad',image:null,goal:'Preparar movimientos y reducir rigidez.',steps:['Sentarse o pararse con apoyo seguro.','Realizar círculos pequeños y suaves de hombros.','Abrir los brazos en un rango cómodo, acompañando con respiración natural.','Volver despacio; evitar rebotes o estiramientos dolorosos.'],dose:'Ejemplo: 3–5 movimientos por dirección, al comienzo o al cierre de la sesión.',adapt:'Usar menor amplitud ante rigidez. Valorar dolor persistente en vez de forzar el movimiento.',error:'Buscar amplitud máxima a cualquier costo o usar estos movimientos como único entrenamiento.'},
{title:'Transferencias de peso y equilibrio',type:'movilidad',image:null,goal:'Mejorar control postural para caminar con seguridad.',steps:['Ubicarse al lado de una baranda o superficie fija.','Desplazar suavemente el peso entre ambos pies sin levantar los apoyos.','Volver al centro y repetir en un rango pequeño.','Realizarlo con supervisión si hubo caídas o inestabilidad.'],dose:'Ejemplo: 20–30 segundos de práctica con apoyo y descanso posterior.',adapt:'Mantener ambas manos apoyadas al inicio. No cerrar los ojos ni retirar ayuda sin valoración.',error:'Entrenar junto a objetos inestables, inclinar todo el tronco o practicar solo con alto riesgo de caída.'}
];
exercises.forEach((e,i)=>{
 const card=document.createElement('article');card.className='exercise-card';card.dataset.type=e.type;
 card.innerHTML='<span class="pill">'+String(i+1).padStart(2,'0')+' · '+e.type+'</span><h3>'+e.title+'</h3><p>'+e.goal+'</p><div class="'+(e.image?'exercise-layout':'')+'">'+(e.image?'<figure><img loading="lazy" src="/academia/ebook/rehabilitacion-pulmonar/images/'+e.image+'.webp" alt="'+e.alt+'"><figcaption>Recreación ilustrativa. Seguir la técnica y las adaptaciones descritas.</figcaption></figure>':'')+'<div><ol>'+e.steps.map(s=>'<li>'+s+'</li>').join('')+'</ol><p class="dose">'+e.dose+'</p><details><summary>Adaptar y progresar</summary><p>'+e.adapt+'</p></details><details><summary>Errores a evitar</summary><p>'+e.error+'</p></details></div></div>';
 $('exerciseCards').appendChild(card);
});
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{
 document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});
 document.querySelectorAll('.exercise-card').forEach(c=>c.hidden=b.dataset.filter!=='todos'&&c.dataset.type!==b.dataset.filter);
}));
// El test de marcha vive en walk-test.js.
const scenarios={estable:{label:'EPOC estable',hr:78,sat:96,capacity:3.2,loss:1.2},fragil:{label:'Desacondicionamiento',hr:86,sat:96,capacity:2.1,loss:.5},intersticial:{label:'Limitación de oxigenación',hr:82,sat:94,capacity:2.8,loss:3.1}};
let scenario='estable';
function simulate(p,speed,minutes,mode,recovery) {
 let stress=0,dist=0;
 const rows=[];
 for(let i=0;i<=minutes*4;i++){
  const t=i/4,active=mode==='continuo'||Math.floor(t)%2===0;
  const velocity=active?speed:Math.min(recovery,speed);
  const load=velocity/p.capacity;
  stress+=(load-stress)*.22;
  if(i>0)dist+=velocity/60*.25*1000;
  rows.push({t,hr:p.hr+stress*34+stress*t*.18,sat:clamp(p.sat-stress*p.loss*(1+t/28),65,100),dysp:clamp(stress*3.4+stress*t*.055,0,10),fatigue:clamp(stress*2.4+stress*t*.09,0,10)});
 }
 return {rows,distance:dist};
}
function chart(id,rows,base,keys,min,max,colors,minutes){
 const w=600,h=140,l=38,r=12,top=10,bottom=23;
 const x=t=>l+t/minutes*(w-l-r),y=v=>top+(1-clamp((v-min)/(max-min),0,1))*(h-top-bottom);
 let out='';
 for(let k=0;k<3;k++){const v=min+(max-min)*k/2;out+='<line x1="'+l+'" y1="'+y(v)+'" x2="'+(w-r)+'" y2="'+y(v)+'" stroke="#24424e"/><text x="2" y="'+(y(v)+3)+'">'+Math.round(v)+'</text>';}
 for(const t of [0,minutes/2,minutes])out+='<text x="'+x(t)+'" y="135" text-anchor="'+(t===0?'start':t===minutes?'end':'middle')+'">'+fmt(t,1)+' min</text>';
 keys.forEach((key,i)=>{
 const points=data=>data.map(v=>x(v.t).toFixed(1)+','+y(v[key]).toFixed(1)).join(' ');
 out+='<polyline fill="none" stroke="#849ba6" stroke-dasharray="5 5" stroke-width="1.5" points="'+points(base)+'"/><polyline fill="none" stroke="'+colors[i]+'" stroke-width="2.5" points="'+points(rows)+'"/>';
 });
 $(id).innerHTML=out;
}
function renderSim(){
 const speed=Number($('speed').value),minutes=Number($('minutes').value),mode=$('trainingMode').value;
 $('recovery').max=speed;if(Number($('recovery').value)>speed)$('recovery').value=speed;
 const recovery=Number($('recovery').value);$('recovery').disabled=mode==='continuo';
 $('speedOut').textContent=fmt(speed,1)+' km/h';$('minutesOut').textContent=minutes+' min';$('recoveryOut').textContent=fmt(recovery,1)+' km/h';
 const p=scenarios[scenario],current=simulate(p,speed,minutes,mode,recovery),base=simulate(p,2.5,minutes,'continuo',1);
 const hr=Math.max(...current.rows.map(v=>v.hr)),sat=Math.min(...current.rows.map(v=>v.sat)),dysp=Math.max(...current.rows.map(v=>v.dysp));
 chart('hrChart',current.rows,base.rows,['hr'],60,180,['#4ed7c4'],minutes);
 chart('satChart',current.rows,base.rows,['sat'],70,100,['#71b9ff'],minutes);
 chart('symChart',current.rows,base.rows,['dysp','fatigue'],0,10,['#ffd16a','#fa8e82'],minutes);
 $('hrValue').textContent=fmt(hr)+' lpm';$('satValue').textContent=fmt(sat,1)+' %';$('dyspValue').textContent=fmt(dysp,1)+' /10';$('simDistance').textContent=fmt(current.distance)+' m';
 const concern=sat<88||dysp>6;
 $('simFeedback').classList.toggle('alert',concern);
 $('simFeedback').textContent=concern?'Escenario con mayor carga de síntomas o desaturación: sirve para discutir reducción de carga y reevaluación. Los límites reales son individuales.':'Escenario de menor carga relativa: observar síntomas, técnica y recuperación antes de discutir progresión.';
 $('changeNotes').innerHTML='<p>Velocidad: '+fmt(speed,1)+' km/h. '+(speed>2.5?'La carga y las curvas de esfuerzo aumentan respecto a la referencia.':speed<2.5?'La carga es menor que en la referencia.':'Coincide con la velocidad de referencia.')+'</p><p>'+ (mode==='intervalos'?'Intervalos: los segmentos suaves permiten recuperación parcial; la línea discontinua muestra trabajo continuo a 2,5 km/h.':'Continuo: no hay segmentos de recuperación programados.')+'</p><p>Duración: '+minutes+' minutos. La fatiga acumulada aumenta con el tiempo en este modelo.</p>';
}
['speed','minutes','trainingMode','recovery'].forEach(id=>$(id).addEventListener('input',renderSim));
document.querySelectorAll('[data-scenario]').forEach(b=>b.onclick=()=>{scenario=b.dataset.scenario;document.querySelectorAll('[data-scenario]').forEach(x=>x.classList.toggle('active',x===b));renderSim();});
$('simReset').onclick=()=>{$('speed').value=2.5;$('minutes').value=20;$('trainingMode').value='continuo';$('recovery').value=1;renderSim();};renderSim();
let sgExampleActive=false;
const domains=[['symptoms','Síntomas'],['activity','Actividad'],['impact','Impacto'],['total','Total oficial']];
domains.forEach(([key,label])=>{
 const tr=document.createElement('tr');tr.innerHTML='<th scope="row">'+label+'</th><td><input type="number" step="0.01" min="0" max="100" id="sg_'+key+'_before" aria-label="'+label+' antes"></td><td><input type="number" step="0.01" min="0" max="100" id="sg_'+key+'_after" aria-label="'+label+' después"></td><td id="sg_'+key+'_change">—</td>';$('sgRows').appendChild(tr);
});
function sgData(){return domains.map(([key,label])=>({key,label,before:numeric('sg_'+key+'_before',0,100),after:numeric('sg_'+key+'_after',0,100)}));}
function renderSG(){
 const same=$('sgBeforeVersion').value===$('sgAfterVersion').value,rows=sgData();
 let invalid=false;
 rows.forEach(r=>['before','after'].forEach(side=>{if($('sg_'+r.key+'_'+side).value!==''&&r[side]===null)invalid=true;}));
 $('sgBars').replaceChildren();
 rows.forEach(r=>{
 const ok=same&&!invalid&&r.before!==null&&r.after!==null;
 $('sg_'+r.key+'_change').textContent=ok?fmt(r.after-r.before,2):'—';
 if(ok){const div=document.createElement('div');div.className='sg-bar-row';div.innerHTML='<strong>'+r.label+'</strong><div>Antes '+fmt(r.before,2)+'</div><span style="width:'+r.before+'%"></span><div>Después '+fmt(r.after,2)+'</div><span class="after" style="width:'+r.after+'%"></span>';$('sgBars').appendChild(div);}
 });
 const t=rows[3];
 $('sgStatus').textContent=!same?'Versiones diferentes: no comparar directamente. Ingresá resultados de la misma versión.':invalid?'Hay valores inválidos. Todos los puntajes deben estar entre 0 y 100.':t.before===null||t.after===null?'Ingresá el total oficial antes y después. No se obtiene promediando componentes.':(t.after-t.before<=-4?'El total disminuyó '+fmt(t.before-t.after,2)+' puntos: alcanza la referencia habitual de 4 puntos de mejoría.':t.after-t.before>=4?'El total aumentó '+fmt(t.after-t.before,2)+' puntos: mayor afectación registrada; requiere interpretación clínica.':'Cambio total: '+fmt(t.after-t.before,2)+' puntos. Interpretar con síntomas, función y contexto.')+' Comparación educativa.';
 if(sgExampleActive)$('sgStatus').textContent='EJEMPLO FICTICIO · '+$('sgStatus').textContent;
 return same&&!invalid&&t.before!==null&&t.after!==null;
}
$('sgRows').addEventListener('input',renderSG);['sgBeforeVersion','sgAfterVersion'].forEach(id=>$(id).addEventListener('change',renderSG));
$('sgExample').onclick=()=>{const values=[[60,52],[70,59],[50,45],[59,51]];domains.forEach(([k],i)=>{['before','after'].forEach((s,j)=>$('sg_'+k+'_'+s).value=values[i][j]);});$('sgBeforeVersion').value='SGRQ';$('sgAfterVersion').value='SGRQ';renderSG();$('sgStatus').textContent='EJEMPLO FICTICIO · '+$('sgStatus').textContent;};
$('sgExample').addEventListener('click',()=>{sgExampleActive=true;renderSG();});
$('sgClear').onclick=()=>{sgExampleActive=false;document.querySelectorAll('#sgRows input').forEach(e=>e.value='');renderSG();};
$('sgExport').onclick=()=>{if(!renderSG())return;download('comparacion-st-george.txt','COMPARACIÓN EDUCATIVA · '+$('sgBeforeVersion').value+'\n'+sgData().map(r=>r.label+': '+(r.before??'No ingresado')+' → '+(r.after??'No ingresado')).join('\n')+'\n'+$('sgStatus').textContent+'\nValores ingresados manualmente; no es el cálculo oficial del cuestionario.');};
renderSG();
function planner(){
 const ids=['planWarm','planAerobic','planStrength','planCool'],ranges=[[3,15],[3,60],[0,40],[3,15]],vals=ids.map((id,i)=>numeric(id,...ranges[i]));
 if(vals.some(v=>v===null)){$('planTotal').textContent='Revisá los tiempos dentro de los rangos indicados.';$('planBar').replaceChildren();return;}
 const total=vals.reduce((a,b)=>a+b,0),names=['Calentar','Aeróbico','Fuerza','Recuperar'],colors=['#547785','#0a887a','#173d51','#77824b'];
 $('planTotal').textContent='Duración planificada: '+total+' minutos. Ejemplo para discutir con el equipo.';
 $('planBar').innerHTML=vals.map((v,i)=>v?'<span style="width:'+v/total*100+'%;background:'+colors[i]+'">'+names[i]+' '+v+'′</span>':'').join('');
}
['planWarm','planAerobic','planStrength','planCool'].forEach(id=>$(id).addEventListener('input',planner));planner();
$('homeChecklist').addEventListener('change',()=>{$('checkCount').textContent=document.querySelectorAll('#homeChecklist input:checked').length+' de 6 preparativos revisados';});
function compareDistance(){
 const a=numeric('distanceBefore',0,2000),b=numeric('distanceAfter',0,2000);
 $('distanceChange').textContent=a===null||b===null?'Ingresá dos distancias válidas entre 0 y 2000 m.':'Cambio: '+fmt(b-a,1)+' m. '+(b-a>=30?'Alcanza la referencia orientativa de 30 m; verificar que las condiciones sean comparables.':b<a?'La distancia disminuyó: revisar metodología y evolución clínica.':'No alcanza 30 m de aumento; valorar también otros resultados.');
}
['distanceBefore','distanceAfter'].forEach(id=>$(id).addEventListener('input',compareDistance));
const cases=[
{q:'En el 6MWT, el paciente se detiene para recuperar. ¿Qué pasa con el reloj?',options:['Se pausa hasta que camine.','Continúa; se registra el descanso.','Se agregan minutos al final.'],correct:1,why:'El test dura seis minutos de tiempo transcurrido. Registrar las pausas preserva la interpretación de la distancia.'},
{q:'Puede completar las repeticiones sólo conteniendo el aire y balanceándose. ¿Cómo proceder?',options:['Aumentar la carga.','Mantenerla hasta acostumbrarse.','Reducir o adaptar la carga y revisar técnica.'],correct:2,why:'La calidad del movimiento y la respiración orientan la carga. La progresión no se basa sólo en terminar repeticiones.'},
{q:'El total SGRQ pasa de 58 a 50 con la misma versión. ¿Cómo se interpreta?',options:['Reducción de 8 puntos, compatible con mejoría relevante.','Empeoramiento de 8 puntos.','Promediar los componentes para confirmarlo.'],correct:0,why:'Un total menor indica menor afectación. La disminución supera la referencia habitual de 4 puntos y debe contextualizarse.'},
{q:'Aparece dolor torácico nuevo durante el ejercicio. ¿Qué corresponde?',options:['Bajar un poco la velocidad y esperar.','Interrumpir y activar evaluación clínica inmediata.','Tomar sólo la saturación y seguir si es normal.'],correct:1,why:'El síntoma exige interrupción y evaluación; una saturación normal no garantiza seguridad.'}
];
let answers={};
cases.forEach((c,i)=>{const div=document.createElement('article');div.className='case';div.innerHTML='<span class="pill">CASO '+(i+1)+'</span><h3>'+c.q+'</h3><div class="button-row"></div><p class="answer" role="status"></p>';c.options.forEach((o,j)=>{const b=document.createElement('button');b.textContent=o;b.onclick=()=>{answers[i]=j;div.querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===b));div.querySelector('.answer').textContent=(j===c.correct?'Correcto. ':'Revisá la decisión. ')+c.why;$('quizScore').textContent=Object.keys(answers).filter(k=>answers[k]===cases[k].correct).length+' de 4 casos resueltos correctamente';};div.querySelector('.button-row').appendChild(b);});$('quiz').appendChild(div);});


/* ---------- progreso de lectura (mismo comportamiento que los otros ebooks) ---------- */
(function () {
  var bar = document.getElementById('progressBar');
  var label = document.getElementById('progressPercent');
  if (!bar || !label) return;
  var chapters = [].slice.call(document.querySelectorAll('main > section.chapter'));
  if (!chapters.length) return;
  var KEY = 'rehab-progress';
  var seen;
  try { seen = new Set(JSON.parse(localStorage.getItem(KEY) || '[]')); } catch (e) { seen = new Set(); }
  function paint() {
    var pct = Math.round(seen.size * 100 / chapters.length);
    bar.style.width = pct + '%';
    label.textContent = pct + ' %';
  }
  function store() {
    try { localStorage.setItem(KEY, JSON.stringify([].slice.call(seen))); } catch (e) {}
  }
  paint();
  if (!('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (entries) {
    var changed = false;
    entries.forEach(function (entry) {
      if (entry.isIntersecting && entry.target.id && !seen.has(entry.target.id)) {
        seen.add(entry.target.id);
        changed = true;
      }
    });
    if (changed) { paint(); store(); }
  }, { threshold: 0.35 });
  chapters.forEach(function (chapter) { io.observe(chapter); });
})();
