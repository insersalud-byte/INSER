(function () {
 'use strict';
 function assess(values, limits) {
  const reasons=[];
  if(values.spo2!=null && values.spo2<limits.spo2) reasons.push('SpO₂ '+values.spo2+'% < '+limits.spo2+'%');
  if(values.fc!=null && limits.fc!=null && values.fc>=limits.fc) reasons.push('FC '+values.fc+' lpm ≥ '+limits.fc+' lpm');
  return reasons;
 }
 if(typeof module!=='undefined') module.exports={assess};
 if(typeof document==='undefined') return;
 const el=id=>document.getElementById(id);
 const rows=[['base','Inicio'],['m1','Minuto 1'],['m2','Minuto 2'],['m3','Minuto 3'],['m4','Minuto 4'],['m5','Minuto 5'],['end','Final / minuto 6 si completa'],['recovery','Recuperación +2 min']];
 const fields=[['spo2','SpO₂ (%)',1,100,1],['fc','FC (lpm)',1,300,1],['disnea','Borg disnea',0,10,.5],['fr','FR (rpm)',1,100,1],['sis','TA sistólica (mmHg)',20,300,1],['dia','TA diastólica (mmHg)',10,200,1]];
 let started=null,ended=null,stamps={},history=[],symptom=false;
 const box=document.createElement('section');box.id='walkMonitor';box.className='walk-monitor';
 box.innerHTML='<h3>Signos y síntomas · inicio, cada minuto y recuperación</h3><p>Registro manual, sin conexión a sensores. Campos vacíos significan <strong>no registrado</strong>, nunca cero. Un único Borg de disnea registra cómo siente el paciente la falta de aire, de 0 a 10, con valores intermedios como 0,5. Administrar la escala oficial correspondiente. Los registros intermedios no deben alterar el ritmo ni reemplazan la vigilancia continua.</p><div class="planner"><label>Alertar si SpO₂ es menor que (%)<input id="monitorSatLimit" type="number" min="80" max="99" step="1" value="80"></label><label>Alertar si FC alcanza (lpm)<input id="monitorFcLimit" type="number" min="40" max="250" step="1" placeholder="Límite individual"></label></div><p class="fineprint">SpO₂ &lt;80%: criterio de interrupción del estándar ERS/ATS. El profesional puede fijar un umbral más conservador. La FC no tiene un único límite universal de detención; no se calcula con 220 − edad. Sin límite configurado, no hay alarma numérica de FC. <a href="https://doi.org/10.1183/09031936.00150314">Fuente ERS/ATS</a>.</p><p id="monitorValidation" role="status"></p><div id="monitorAlarm" role="alert" aria-live="assertive">Sin datos de alarma ingresados. Esto no confirma seguridad clínica.</div><div class="button-row"><button id="monitorSymptom" type="button">Registrar síntoma de alarma</button><button id="monitorStop" type="button">Detener prueba por seguridad</button></div><p class="fineprint">Dolor torácico, disnea intolerable, tambaleo, palidez u otros signos de alarma requieren detener y evaluar según protocolo, aunque las cifras no activen una alerta. Una alerta de esta pantalla no detiene por sí sola al paciente ni sustituye al operador.</p><p id="monitorPrompt" role="status">Registrar condiciones iniciales tras el reposo previo.</p><div class="table-wrap" tabindex="0" aria-label="Registro minuto a minuto, desplazable horizontalmente"><table><caption>Inicio y final: signos completos. Minutos 1–5: SpO₂, FC y Borg. Recuperación: nueva toma completa.</caption><thead><tr><th>Momento</th>'+fields.map(f=>'<th>'+f[1]+'</th>').join('')+'<th>Hora de edición</th></tr></thead><tbody>'+rows.map(([key,label])=>'<tr id="monitorRow-'+key+'"><th scope="row">'+label+'</th>'+fields.map(([name,title,min,max,step])=>'<td>'+(/^m/.test(key)&&['fr','sis','dia'].includes(name)?'—':'<input id="monitor-'+key+'-'+name+'" aria-label="'+label+' · '+title+'" type="number" min="'+min+'" max="'+max+'" step="'+step+'" data-row="'+key+'">')+'</td>').join('')+'<td id="monitorStamp-'+key+'">Sin registro</td></tr>').join('')+'</tbody></table></div><p id="monitorRecovery" role="status">Recuperación: el reloj de 02:00 comienza al finalizar, incluso en una detención anticipada.</p><p class="fineprint">La fila final corresponde al momento real de detención; no inventa un minuto 6 si terminó antes. La hora indica cuándo se ingresó o editó el dato, no una medición automática. La toma a +2 min es un control adicional solicitado y no reemplaza observación hasta recuperación clínica. Descargar antes de cerrar: recargar borra los registros.</p>';
 el('walkExport').before(box);
 el('monitorSatLimit').required=true;
 function value(id) {const input=el(id);return input && input.value!=='' && input.validity.valid?Number(input.value):null;}
 function limits(){return {spo2:value('monitorSatLimit')??80,fc:value('monitorFcLimit')};}
 function data(key){return Object.fromEntries(fields.map(([name])=>[name,value('monitor-'+key+'-'+name)]));}
 function validate(){
  const invalid=[...box.querySelectorAll('input')].filter(i=>!i.validity.valid);
  const badBP=rows.filter(([key])=>{const v=data(key);return v.sis!=null&&v.dia!=null&&v.sis<=v.dia;});
  el('monitorValidation').textContent=invalid.length||badBP.length?'Revisar valores fuera de rango; TA sistólica debe superar la diastólica. No se permite exportar datos inválidos.':'';
  invalid.forEach(i=>i.setAttribute('aria-invalid','true'));
  box.querySelectorAll('input').forEach(i=>{if(i.validity.valid)i.removeAttribute('aria-invalid');});
  return !invalid.length&&!badBP.length;
 }
 function alarms(){
  const messages=[];
  for(const [key,label] of rows){const why=assess(data(key),limits());el('monitorRow-'+key).classList.toggle('has-alarm',why.length>0);if(why.length)messages.push(label+': '+why.join('; '));}
  if(symptom)messages.push('Síntoma de alarma registrado por el operador');
  el('monitorAlarm').classList.toggle('active',messages.length>0);
  el('monitorAlarm').textContent=messages.length?'ALERTA · DETENER / EVALUAR. Registros con criterio de alarma (no lectura en vivo): '+messages.join(' | '):'Sin datos de alarma ingresados. Esto no confirma seguridad clínica.';
  return messages;
 }
 function record(key){
  stamps[key]={hora:new Date().toISOString(),segundosDesdeInicio:started===null?null:Math.round((Date.now()-started)/1000),segundosDesdeFinal:ended===null?null:Math.round((Date.now()-ended)/1000)};
  el('monitorStamp-'+key).textContent=new Date().toLocaleTimeString('es-AR');
 }
 box.querySelectorAll('[data-row]').forEach(input=>input.addEventListener('input',()=>{
  const key=input.dataset.row;record(key);validate();const reasons=alarms();
  if(reasons.length)history.push({hora:new Date().toISOString(),limites:limits(),motivos:reasons});
 }));
 ['monitorSatLimit','monitorFcLimit'].forEach(id=>el(id).addEventListener('input',()=>{validate();alarms();history.push({hora:new Date().toISOString(),evento:'Cambio de límites',limites:limits()});}));
 el('monitorSymptom').onclick=()=>{symptom=true;history.push({hora:new Date().toISOString(),evento:'Síntoma de alarma'});alarms();};
 el('monitorStop').onclick=()=>{if(!el('walkStop').disabled){history.push({hora:new Date().toISOString(),evento:'Detención por seguridad',motivos:alarms()});el('walkStop').click();}};
 function tick(){
  el('monitorStop').disabled=started===null||ended!==null;
  if(started!==null&&ended===null){const minute=Math.floor((Date.now()-started)/60000);el('monitorPrompt').textContent=minute===0?'Prueba en curso · próxima toma: minuto 1.':'Recordatorio: registrar minuto '+Math.min(minute,6)+' sin detener el reloj.';}
  if(ended!==null){const left=Math.max(0,120-Math.floor((Date.now()-ended)/1000));el('monitorRecovery').textContent=left>0?'Recuperación · '+String(Math.floor(left/60)).padStart(2,'0')+':'+String(left%60).padStart(2,'0')+' hasta la toma de +2 min':'RECUPERACIÓN +2 MIN · Registrar nueva toma de SpO₂, FC, Borg, FR y TA; continuar observación según protocolo.';el('monitorRecovery').classList.toggle('due',left===0);}
 }
 window.walkMonitor={
  start(){if(!validate())return false;started=Date.now();ended=null;return true;},
  finish(time){if(ended===null){ended=time;el('monitorPrompt').textContent='Prueba finalizada · registrar toma final ahora.';}tick();},
  reset(){started=null;ended=null;stamps={};history=[];symptom=false;box.querySelectorAll('[data-row]').forEach(i=>i.value='');rows.forEach(([k])=>el('monitorStamp-'+k).textContent='Sin registro');el('monitorPrompt').textContent='Registrar condiciones iniciales tras el reposo previo.';el('monitorRecovery').textContent='Recuperación: pendiente de finalizar la prueba.';el('monitorRecovery').classList.remove('due');validate();alarms();tick();},
  report(){if(!validate())return null;return '\nCONTROL MANUAL AMPLIADO\n'+JSON.stringify({inicio:started===null?null:new Date(started).toISOString(),final:ended===null?null:new Date(ended).toISOString(),limites:limits(),registros:rows.map(([key,momento])=>({momento,datos:data(key),edicion:stamps[key]??null})),historialAlarmas:history,alertasRegistradas:alarms(),recuperacion:el('monitorRecovery').textContent},null,2);}
 };
 setInterval(tick,250);tick();
})();
