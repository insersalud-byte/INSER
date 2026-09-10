(()=>{
 'use strict';
 const el=id=>document.getElementById(id),lab=el('walkLab'),monitor=el('walkMonitor');
 function node(tag,text,parent){const e=document.createElement(tag);if(text)e.textContent=text;if(parent)parent.appendChild(e);return e;}
 function details(title,parent){const d=node('details','',parent);node('summary',title,d);return d;}
 const guide=node('section');guide.id='walkInstructions';guide.className='walk-instructions';lab.before(guide);
 node('h3','Cómo usar el registro de marcha',guide);
 const steps=node('ol','',guide);['Cargá paciente y revisá tramo y límites de alarma. Tocá «Datos listos» para entrar en la vista práctica.','Inicio activa seis minutos. «+ vuelta» suma una ida y vuelta (dos tramos); con tramo de 30 m suma 60 m. Si termina sólo una ida, ajustá un tramo en el contador.','Detención registra una pausa sin detener el reloj; el mismo botón permite reanudar. Finalizar cierra la prueba antes de tiempo. Reiniciar pide confirmación si ya comenzó.','Elegí la toma y cargá los signos. Al finalizar, registrá el resto de metros, la toma final y la recuperación a +2 minutos.','Revisá observaciones y resultado, y prepará el informe para Guardar como PDF. Los datos se pierden al recargar: descargá antes.'].forEach(t=>node('li',t,steps));
 const reference=details('Criterios, seguridad y explicación de los cálculos',guide);
 for(const p of [...lab.querySelectorAll(':scope > p:not([role])'),...monitor.querySelectorAll(':scope > p:not([role])')])reference.appendChild(p);
 const patient=el('walkPatient');for(const e of [...patient.querySelectorAll(':scope > details,:scope > .fineprint')])reference.appendChild(e);
 const patientFold=details('Paciente y preparación');patient.before(patientFold);patientFold.appendChild(patient);patientFold.open=true;patientFold.id='walkPatientFold';
 const ready=node('button','Datos listos · abrir controles',patient);ready.id='walkReady';ready.type='button';
 const grid=lab.querySelector('.lab-grid'),clock=grid.querySelector('.clock-panel'),config=grid.children[0],notes=grid.children[2];
 const setup=details('Ajustar tramo, contador y metros finales',patient);setup.appendChild(config);
 const actions=clock.querySelector('.button-row');actions.id='walkQuickActions';
 actions.appendChild(el('lapAdd'));actions.appendChild(el('lapUndo'));
 ['walkStart','lapAdd','walkRest','walkStop','lapUndo','walkReset'].forEach(id=>actions.appendChild(el(id)));
 el('walkStart').textContent='Inicio';el('walkStop').textContent='Finalizar';el('walkReset').textContent='Reiniciar';el('lapUndo').textContent='Deshacer vuelta';
 grid.replaceChildren(clock);clock.id='walkConsole';
 const exit=node('button','Editar paciente / salir',clock);exit.type='button';exit.id='walkExit';
 ready.onclick=()=>{patientFold.open=false;document.body.classList.add('walk-practical');clock.scrollIntoView({block:'start'});};
 exit.onclick=()=>{document.body.classList.remove('walk-practical');patientFold.open=true;patientFold.scrollIntoView({block:'start'});};
 const notesFold=details('Observaciones');notesFold.appendChild(notes);monitor.after(notesFold);
 monitor.querySelector('h3').textContent='Signos · elegir toma';
 const limits=details('Límites de alarma',monitor);limits.appendChild(monitor.querySelector('.planner'));monitor.querySelector('h3').after(limits);
 const selector=node('label','Toma ');selector.className='walk-moment-label';const select=node('select','',selector);select.id='walkMoment';
 const stages=[['base','Inicio'],['m1','Minuto 1'],['m2','Minuto 2'],['m3','Minuto 3'],['m4','Minuto 4'],['m5','Minuto 5'],['end','Final'],['recovery','Recuperación +2 min']];
 stages.forEach(([v,t])=>{const o=node('option',t,select);o.value=v;});monitor.querySelector('.table-wrap').before(selector);
 const cols=[...monitor.querySelectorAll('thead th')].map(e=>e.textContent);
 for(const row of monitor.querySelectorAll('tbody tr'))[...row.children].forEach((cell,i)=>{cell.dataset.label=cols[i];if(!cell.querySelector('input')&&i>0&&i<cols.length-1)cell.classList.add('not-applicable');});
 const caption=monitor.querySelector('caption');node('p',caption.textContent,reference);caption.remove();
 function showMoment(){monitor.querySelectorAll('tbody tr').forEach(row=>row.hidden=row.id!=='monitorRow-'+select.value);}
 select.onchange=showMoment;showMoment();
 const all=details('Ver todas las tomas',monitor);const allButton=node('button','Mostrar / ocultar tabla completa',all);allButton.type='button';
 allButton.onclick=()=>{const active=monitor.classList.toggle('show-all');if(active)monitor.querySelectorAll('tbody tr').forEach(row=>row.hidden=false);else showMoment();};
 select.addEventListener('change',()=>monitor.classList.remove('show-all'));
 el('lapAdd').onclick=()=>{const n=numeric('walkLaps',0,100,true);if(n!==null&&n<=98){el('walkLaps').value=n+2;walkInputs();window.walkReport?.update();}};
 el('lapUndo').onclick=()=>{const n=numeric('walkLaps',0,100,true);if(n!==null){el('walkLaps').value=Math.max(0,n-2);walkInputs();window.walkReport?.update();}};
 function refresh(){const length=numeric('walkLength',1,100,true);el('lapAdd').textContent='+ vuelta'+(length===null?'':' · '+(length*2)+' m');el('lapAdd').disabled=numeric('walkLaps',0,100,true)>98;}
 el('walkLength').addEventListener('input',refresh);setInterval(refresh,300);refresh();
 const previousReset=window.walkReport.reset;window.walkReport.reset=()=>{previousReset();select.value='base';monitor.classList.remove('show-all');showMoment();patientFold.open=true;document.body.classList.remove('walk-practical');};
})();
