// Educational model. Device limits: ResMed 278579/1 (2018-05), pp. 67-100, 170-181.
export const MODES = ['(S)T','P(A)C','CPAP','iVAPS','(A)CV','P(A)CV','PS','P-SIMV','V-SIMV'];
export const CIRCUITS = {leak:'Rama única con fuga intencional',valve:'Rama única con válvula',double:'Doble rama con válvula',mouth:'Boquilla (sin válvula ni fuga intencional)'};
export const LABELS = {'Muy baja':1,'Baja':2,'Media':3,'Alta':4,'Muy alta':5};
export const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
export function modesFor(circuit) {return circuit==='leak'?MODES.slice(0,4):circuit==='mouth'?['(A)CV','P(A)CV','PS']:['(A)CV','P(A)CV','PS','P-SIMV','V-SIMV','CPAP'];}
export function defaults(mode='(S)T',circuit='leak',patient='adult') {
 const child=patient==='child';
 return {mode,circuit,patient,interface:circuit==='mouth'?'mouth':'mask',learned:false,rr:15,epap:5,ipap:12,peep:circuit==='mouth'?0:5,ps:7,pc:7,vt:child?100:500,ti:child?.6:1,pif:child?10:50,volumeOption:'Ti',shape:100,trigger:circuit==='mouth'?'Touch':'Media',triggerType:circuit==='double'?'Flow':'Pressure',triggerFlow:child?.5:1,rise:200,timin:mode==='iVAPS'?.5:.2,timax:child?.8:1.5,cycle:circuit==='leak'?25:'Auto',cpap:5,va:5.2,targetRate:15,height:175,autoepap:false,minEpap:5,maxEpap:15,minPs:2,maxPs:20,safetyVt:0,safetyMax:17,manual:false,magnitude:150,sigh:false,sighMagnitude:150,sighInterval:10,apnea:'Alarm',apneaDefinition:'No breath',apneaTime:child?10:20,apneaRate:15,apneaVt:child?100:500,apneaPc:7,apneaTi:child?.6:1,highP:40,lowVt:child?25:100,highVt:child?500:2500,lowMv:child?.5:3,highMv:child?10:20,lowRr:child?12:4,highRr:child?99:80,highLeak:circuit==='leak'?40:0,lowSpo2:85,highSpo2:0,lowFio2:0,highFio2:0,disconnectTime:circuit==='mouth'?15:child?8:9,disconnectTolerance:circuit==='mouth'?40:60};
}
export const isVolume=s=>['(A)CV','V-SIMV'].includes(s.mode);
export function displayedMode(s){const off=s.circuit==='double'&&s.triggerType==='Flow'?s.triggerFlow===0:s.trigger==='Off';if(off)return {'(S)T':'T','P(A)C':'PC','(A)CV':'CV','P(A)CV':'PCV'}[s.mode]||s.mode;if(s.mode==='(S)T'&&s.rr===0)return 'S';return s.mode==='iVAPS'&&s.autoepap?'iVAPS.AutoEPAP':s.mode;}
export const hasSafety=s=>['(S)T','P(A)C','P(A)CV','PS'].includes(s.mode)&&s.circuit!=='mouth';
export const hasManual=(s,model)=>model==='150'&&s.circuit!=='leak'&&s.mode!=='CPAP';
export const hasSigh=(s,model)=>hasManual(s,model)&&s.circuit!=='mouth'&&['(A)CV','P(A)CV'].includes(s.mode);
export function schema(s) {
 const child=s.patient==='child',vol=isVolume(s),leak=s.circuit==='leak';
 const f=(key,label,min,max,step,unit,help,options)=>({key,label,min,max,step,unit,help,options});
 const rr=f('rr','Frec. respiratoria',child?5:2,child?80:50,1,'/min','Frecuencia de respaldo; en SIMV, frecuencia mandatoria. 0 = Off.',s.mode.includes('SIMV')?undefined:'off');
 const trig=s.circuit==='double'&&s.triggerType==='Flow'?f('triggerFlow','Trigger de flujo',.5,15,.1,'L/min','Un umbral menor es más sensible.',['(A)CV','P(A)CV'].includes(s.mode)?'off':undefined):f('trigger','Trigger',0,0,0,'','Sensibilidad de disparo; el algoritmo del equipo no se replica.',s.circuit==='mouth'?['Baja','Media','Alta','Touch']:['(S)T','P(A)C','(A)CV','P(A)CV'].includes(s.mode)?['Off',...Object.keys(LABELS)]:Object.keys(LABELS));
 const rise=f('rise','Rise time',150,900,50,'ms','Tiempo de ascenso de presión. 0 representa Min.','off');
 const cycle=f('cycle','Cycle',5,90,5,'%','Mayor porcentaje: final de inspiración más temprano.',leak?undefined:'auto');
 const ti=f('ti','Ti',vol?.3:s.mode==='P(A)C'?.3:.2,vol?3:s.mode==='P(A)C'?4:5,.1,'s','Duración de las inspiraciones mandatorias.');
 const timing=[f('timin','Ti Min',s.mode==='PS'?.2:.1,4,.1,'s','Tiempo inspiratorio mínimo.'),f('timax','Ti Max',.3,4,.1,'s','Tiempo inspiratorio máximo.'),cycle];
 const base=leak?f('epap','EPAP',2,25,.2,'cmH₂O','Presión espiratoria.'):f('peep','PEEP',3,20,.2,'cmH₂O','Presión al final de espiración. 0 = Off.','off');
 const ps=f('ps','PS',2,50,.2,'cmH₂O','Soporte por encima de PEEP; no es presión total.');
 const pc=f('pc','P control',2,50,.2,'cmH₂O','Presión control sobre PEEP; presión total = PEEP + P control.');
 const volume=[f('vt','Vt',child?50:100,child?300:2500,child?5:10,'mL','Volumen objetivo. Pediatría: rango habitual; extensión hasta 500 mL no incluida.'),s.volumeOption==='PIF'?f('pif','PIF',child?5:10,child?60:120,1,'L/min','Flujo pico: con Vt y forma del flujo determina Ti.'):ti,f('shape','Forma de flujo',0,0,0,'%','100 = constante; 75, 50 y 25 = desacelerado.',[100,75,50,25])];
 if(s.mode==='CPAP')return [f('cpap','CPAP',3,20,.2,'cmH₂O','Presión continua: no añade respiraciones de respaldo por sí misma.'),trig];
 if(s.mode==='iVAPS')return [f('va','Va objetivo',1,30,.1,'L/min','Ventilación alveolar objetivo, no volumen corriente.'),f('targetRate','Frec. paciente objetivo',8,30,1,'/min','iBR: respaldo variable; aquí representado de forma aproximada.'),f('height','Altura paciente',110,250,1,'cm','Participa en la estimación de espacio muerto.'),f('autoepap','AutoEPAP',0,0,0,'','Solo interfaz no invasiva; algoritmo aproximado.',[false,true]),...(s.autoepap?[f('minEpap','EPAP mínima',2,25,.2,'cmH₂O','Límite inferior AutoEPAP.'),f('maxEpap','EPAP máxima',2,25,.2,'cmH₂O','Límite superior AutoEPAP.')]:[base]),f('minPs','PS mínima',0,50,.2,'cmH₂O','Límite inferior del soporte adaptativo.'),f('maxPs','PS máxima',s.autoepap?8:0,50,.2,'cmH₂O','Límite superior del soporte adaptativo.'),...timing,trig,rise];
 let out=[rr,base];
 if(['(S)T','P(A)C'].includes(s.mode))out.push(f('ipap','IPAP',4,50,.2,'cmH₂O','Presión inspiratoria total. PS = IPAP − EPAP.'));
 if(['P(A)CV','P-SIMV'].includes(s.mode))out.push(pc);
 if(['PS','P-SIMV','V-SIMV'].includes(s.mode))out.push(ps);
 if(vol)out.push(...volume); else if(['P(A)CV','P-SIMV','P(A)C'].includes(s.mode))out.push(ti);
 if(['(S)T','PS'].includes(s.mode))out.push(...timing); else if(s.mode.includes('SIMV'))out.push(cycle);
 out.push(trig); if(s.mode!=='(A)CV')out.push(rise);
 return out;
}
export function alarmSchema(s,sensors) {
 const child=s.patient==='child'; const f=(key,label,min,max,step,unit)=>({key,label,min,max,step,unit,options:key==='highP'?undefined:'off',help:'Umbral de alarma del programa. 0 = Off cuando está permitido.'});
 const out=[f('highP','Presión alta',10,80,1,'cmH₂O'),f('lowVt','Vt bajo',child?10:50,child?995:2990,child?5:10,'mL'),f('highVt','Vt alto',child?25:60,child?1000:3000,child?5:10,'mL'),f('lowMv','VM bajo',child?.2:.5,59.9,.1,'L/min'),f('highMv','VM alto',child?.3:.6,60,.1,'L/min'),f('lowRr','FR baja',child?5:2,child?98:79,1,'/min'),f('highRr','FR alta',child?6:3,child?99:80,1,'/min')];
 if(['leak','double'].includes(s.circuit))out.push(f('highLeak','Fuga alta',s.circuit==='leak'?5:20,80,1,s.circuit==='leak'?'L/min':'%'));
 if(sensors.spo2)out.push(f('lowSpo2','SpO₂ baja',50,99,1,'%'),f('highSpo2','SpO₂ alta',51,100,1,'%'));
 if(sensors.fio2)out.push(f('lowFio2','FiO₂ baja',18,99,1,'%'),f('highFio2','FiO₂ alta',19,100,1,'%'));
 out.push({key:'disconnectTime',label:'Demora desconexión',min:5,max:s.circuit==='mouth'&&!child?900:child?30:60,step:1,unit:'s',help:'Demora real de esta alarma; las demás demoras se simplifican.'},{key:'disconnectTolerance',label:'Tolerancia desconexión',min:5,max:95,step:5,unit:'%',help:'En este simulador se usa un índice de desconexión didáctico.'});
 return out;
}
export function validate(s,model='150') {
 const errors=[];
 if(!modesFor(s.circuit).includes(s.mode))errors.push('Modo incompatible con el circuito.');
 if(model==='100'&&s.circuit==='double')errors.push('Doble rama requiere Astral 150.');
 if(s.mode==='iVAPS'&&s.patient!=='adult')errors.push('iVAPS: usar el perfil adulto ≥30 kg del simulador.');
 if(s.autoepap&&s.mode==='iVAPS'&&s.interface==='invasive')errors.push('AutoEPAP no es compatible con interfaz invasiva.');
 for(const f of schema(s)){
  const v=s[f.key];
  if(Array.isArray(f.options)){if(!f.options.includes(v))errors.push(f.label+': opción inválida.');}
  else if(!(f.options==='off'&&v===0)&&!(f.options==='auto'&&v==='Auto')&&(!Number.isFinite(v)||v<f.min||v>f.max))errors.push(f.label+': fuera de rango.');
 }
 if(['(S)T','P(A)C'].includes(s.mode)&&s.ipap<s.epap+2)errors.push('IPAP debe superar EPAP al menos 2 cmH₂O.');
 if(['(S)T','PS','iVAPS'].includes(s.mode)&&s.timin>s.timax)errors.push('Ti Min no puede superar Ti Max.');
 if(s.mode==='iVAPS'&&s.minPs>s.maxPs)errors.push('PS mínima no puede superar PS máxima.');
 if(s.mode==='iVAPS'&&s.autoepap&&s.minEpap>s.maxEpap)errors.push('EPAP mínima no puede superar EPAP máxima.');
 if(s.rr===0&&(s.circuit==='double'&&s.triggerType==='Flow'?s.triggerFlow===0:s.trigger==='Off')&&s.mode!=='CPAP')errors.push('Frecuencia y trigger no pueden estar ambos Off.');
 if(['(S)T','PS'].includes(s.mode)&&s.rr>0&&s.timin>40/s.rr)errors.push('Ti Min supera 2/3 del ciclo respiratorio.');
 const ti=isVolume(s)&&s.volumeOption==='PIF'?s.vt/1000/(s.pif/60*(1+s.shape/100)/2):s.ti;
 if(s.rr>0&&['(A)CV','V-SIMV','P(A)CV','P-SIMV','P(A)C'].includes(s.mode)&&ti>40/s.rr)errors.push('Ti supera 2/3 del ciclo respiratorio.');
 if(!isVolume(s)&&s.mode!=='CPAP'&&s.rise/1000>2/3*(['PS','(S)T','iVAPS'].includes(s.mode)?s.timax:s.ti))errors.push('Rise time supera 2/3 del tiempo inspiratorio.');
 for(const [lo,hi] of [['lowVt','highVt'],['lowMv','highMv'],['lowRr','highRr'],['lowSpo2','highSpo2'],['lowFio2','highFio2']])if(s[lo]&&s[hi]&&s[lo]>=s[hi])errors.push('La alarma mínima debe ser menor que la máxima ('+lo+').');
 if(!Number.isFinite(s.highP)||s.highP<10||s.highP>80)errors.push('Presión alta: 10–80 cmH₂O.');
 return [...new Set(errors)];
}
export function pressureBase(s){return s.mode==='CPAP'?s.cpap:s.circuit==='leak'?s.epap:s.peep;}
export class Lung {
 constructor(settings){this.s=settings;this.reset();}
 reset(){this.t=0;this.v=0;this.p=0;this.q=0;this.history=[];this.breaths=[];this.phase='exp';this.start=-10;this.lastBreath=0;this.lastSpont=0;this.nextMandatory=0;this.lastSigh=0;this.lastManual=false;this.manualQueued=false;this.adaptivePs=7;this.adaptiveEp=5;this.ibr=10;this.metrics={vt:0,mv:0,rr:0,ti:0,pip:0,peep:0,spont:0,endFlow:0,va:0};this.count=0;this.spontCount=0;this.apneaRecovery=0;this.apneaBackup=false;this.disconnectedFor=0;this.pressureLimited=false;this.peakFlow=0;}
 requestBreath(){this.manualQueued=true;}
 requestSpontaneous(){this.spontQueued=true;}
 step(dt,patient){
  this.t+=dt;const s=this.s;const R=patient.resistance,C=patient.compliance/1000,tau=R*C;
  const triggerOff=s.circuit==='double'&&s.triggerType==='Flow'?s.triggerFlow===0:s.trigger==='Off';
  const sensitivity=s.circuit==='double'&&s.triggerType==='Flow'?clamp(6-s.triggerFlow/2,1,5):LABELS[s.trigger]||4;
  const canTrigger=!triggerOff&&patient.effort>=(6-sensitivity)*.32;
  const spontRate=patient.rate>0&&canTrigger?patient.rate:0;
  const apneaElapsed=this.t-(s.apneaDefinition==='No Spont'?this.lastSpont:this.lastBreath);
  this.apneaBackup=s.circuit!=='leak'&&s.circuit!=='mouth'&&['ACV','PACV'].includes(s.apnea)&&apneaElapsed>=s.apneaTime||this.apneaBackup;
  const simv=s.mode.includes('SIMV');
  let backup=s.mode==='CPAP'?0:s.mode==='iVAPS'?this.ibr:s.rr;
  if(this.apneaBackup)backup=s.apneaRate;
  const period=backup>0?60/backup:Infinity;
  const timed=simv?this.t>=this.nextMandatory:this.t-this.lastBreath>=period;
  const spontaneous=spontRate>0&&this.t-this.lastBreath>=60/spontRate;
  const cpapSpont=s.mode==='CPAP'&&patient.rate>0&&patient.effort>0&&this.t-this.lastBreath>=60/patient.rate;
  if(this.phase==='exp'&&(timed||spontaneous||cpapSpont||this.manualQueued||this.spontQueued)&&this.t-this.start>.2){
   this.metrics.endFlow=this.q*60;this.phase='insp';this.start=this.t;this.startV=this.v;this.inspV=0;this.peakFlow=0;this.peakP=0;this.pressureLimited=false;
   this.isSpont=(spontaneous||cpapSpont||this.spontQueued)&&!this.manualQueued;this.spontQueued=false;this.mandatory=!simv||timed||this.manualQueued;
   this.lastManual=this.manualQueued;this.manualQueued=false;
   this.sighNow=s.sigh&&this.t-this.lastSigh>=s.sighInterval*60;if(this.sighNow)this.lastSigh=this.t;
   if(this.isSpont){this.lastSpont=this.t;this.spontCount++;this.apneaRecovery++;if(this.apneaRecovery>=3)this.apneaBackup=false;}else this.apneaRecovery=0;
   this.lastBreath=this.t;this.count++;if(timed)this.nextMandatory=this.t+period;
  }
  let base=s.mode==='iVAPS'&&s.autoepap?this.adaptiveEp:pressureBase(s);
  const support=s.mode==='iVAPS'?this.adaptivePs:['(S)T','P(A)C'].includes(s.mode)?s.ipap-s.epap:['PS','V-SIMV'].includes(s.mode)||simv&&!this.mandatory?s.ps:s.pc;
  let ps=this.apneaBackup?s.apneaPc:hasSafety(s)&&s.safetyVt?this.adaptivePs:support;
  let magnify=this.lastManual?s.magnitude/100:this.sighNow?s.sighMagnitude/100:1;
  const volume=this.apneaBackup?s.apnea==='ACV':isVolume(s)&&this.mandatory;
  let vt=(this.apneaBackup?s.apneaVt:s.vt)/1000*magnify;
  vt=Math.min(vt,s.patient==='child'?.3:2.5);
  let ti=this.apneaBackup?s.apneaTi:s.ti;
  if(volume&&s.volumeOption==='PIF')ti=vt/(s.pif/60*(1+s.shape/100)/2);
  if(!volume&&this.mandatory&&['P(A)CV','P-SIMV'].includes(s.mode))ti*=magnify;
  const pressureLimit=Math.max(0,s.highP-(volume?0:2));base=Math.min(base,pressureLimit);
  let q=0,p=base;
  if(this.phase==='insp'){
   const elapsed=this.t-this.start;
   const effort=patient.effort*Math.sin(Math.PI*clamp(elapsed/Math.max(.3,ti),0,1));
   if(volume){q=vt/(ti*(1+s.shape/100)/2)*(1-(1-s.shape/100)*clamp(elapsed/ti,0,1));p=base+this.v/C+R*q-effort;if(p>s.highP){p=s.highP;q=Math.max(0,(p-base+effort-this.v/C)/R);this.pressureLimited=true;}}
   else {p=base+(s.mode==='CPAP'?0:ps*magnify)*clamp(elapsed/(s.rise===0?.05:s.rise/1000),0,1);p=Math.min(p,pressureLimit);q=(p-base+effort-this.v/C)/R;}
   if(patient.disconnected){p=0;q=0;}
   else if(patient.leak>0){const retained=clamp(1-patient.leak/240,.35,1);p=base+(p-base)*retained;q*=retained;}
   this.peakFlow=Math.max(q,this.peakFlow);this.peakP=Math.max(p,this.peakP);this.inspV+=Math.max(0,q)*dt;
   const cycled=['(S)T','PS','iVAPS'].includes(s.mode)||simv&&!this.mandatory;
   const maxTi=Math.min(s.timax,backup?40/backup:4);
   const threshold=s.cycle==='Auto'?.25:s.cycle/100;
   const end=cycled?(elapsed>=maxTi||elapsed>=s.timin&&elapsed>=s.rise/1000&&q<=this.peakFlow*threshold):elapsed>=ti;
   if(end){this.phase='exp';this.metrics.ti=elapsed;this.metrics.vt=this.inspV*1000;this.metrics.pip=this.peakP;this.metrics.peep=base;this.metrics.spont=this.spontCount/this.count*100;
    this.breaths.push({t:this.t,vt:this.metrics.vt});if(this.breaths.length>8)this.breaths.shift();
    const n=this.breaths.length;this.metrics.rr=n>1?60*(n-1)/(this.breaths[n-1].t-this.breaths[0].t):Math.max(backup,spontRate,cpapSpont?patient.rate:0);
    this.metrics.mv=this.metrics.vt*this.metrics.rr/1000;
    // Dead space uses a deliberately simple training relation, not ResMed's estimator.
    this.metrics.va=Math.max(0,this.metrics.vt/1000-.15*s.height/175)*this.metrics.rr;
    if(s.mode==='iVAPS'){this.adaptivePs=clamp(this.adaptivePs+clamp((s.va-this.metrics.va)*.35,-Math.min(3,.7*period),Math.min(3,.7*period)),s.minPs,s.maxPs);this.ibr=this.isSpont?s.targetRate*2/3:Math.min(s.targetRate,this.ibr+s.targetRate/15);if(s.autoepap)this.adaptiveEp=clamp(this.adaptiveEp+(patient.upperAirway?.2:-.05),s.minEpap,s.maxEpap);}
    if(hasSafety(s)&&s.safetyVt){const min=['(S)T','P(A)C'].includes(s.mode)?s.ipap-s.epap:s.mode==='PS'?s.ps:s.pc;const max=['(S)T','P(A)C'].includes(s.mode)?s.safetyMax-s.epap:s.safetyMax;this.adaptivePs=clamp(this.adaptivePs+clamp((s.safetyVt-this.metrics.vt)/100,-2,2),min,Math.max(min,max));}
   }
  }else {q=-this.v/Math.max(.025,tau);p=base;if(patient.disconnected)p=0;}
  this.v=Math.max(0,this.v+q*dt);this.q=q;this.p=p;
  this.disconnectedFor=patient.disconnected?this.disconnectedFor+dt:0;
  this.history.push({t:this.t,p,q:q*60,v:this.v*1000,phase:this.phase});if(this.history.length>1800)this.history.shift();
 }
 alarms(patient,sensors){
  const s=this.s,m=this.metrics,a=[];const add=(text,priority=3)=>a.push({text,priority});
  if(patient.disconnected&&this.disconnectedFor>=s.disconnectTime&&100>s.disconnectTolerance)add('Circuito desconectado');
  if(this.t-(s.apneaDefinition==='No Spont'?this.lastSpont:this.lastBreath)>=s.apneaTime&&s.apnea!=='Off')add(this.apneaBackup?'Apnea · ventilación de respaldo':'Apnea');
  if(this.pressureLimited)add('Presión alta');
  if(this.count>1){for(const [value,lo,hi,label] of [[m.vt,s.lowVt,s.highVt,s.circuit==='valve'||s.circuit==='mouth'?'Vti':'Vte'],[m.mv,s.lowMv,s.highMv,'VM'],[m.rr,s.lowRr,s.highRr,'FR']]){if(lo&&value<lo)add(label+' bajo');if(hi&&value>hi)add(label+' alto');}}
  const leak=s.circuit==='double'?clamp(patient.leak/120*100,0,100):patient.leak;
  if(['leak','double'].includes(s.circuit)&&s.highLeak&&leak>s.highLeak)add('Fuga alta');
  if(sensors.spo2){if(s.lowSpo2&&patient.spo2<s.lowSpo2)add('SpO₂ baja');if(s.highSpo2&&patient.spo2>s.highSpo2)add('SpO₂ alta');}
  if(sensors.fio2){if(s.lowFio2&&patient.fio2<s.lowFio2)add('FiO₂ baja');if(s.highFio2&&patient.fio2>s.highFio2)add('FiO₂ alta');}
  if(patient.power==='battery')add('Utilizando batería interna',1);
  return a.sort((x,y)=>y.priority-x.priority);
 }
}
