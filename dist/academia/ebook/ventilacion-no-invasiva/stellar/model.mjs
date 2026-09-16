// Educational single-compartment model. NOT ResMed firmware or a clinical calculator.
export const MODES=['CPAP','S','ST','T','PAC','iVAPS'];
export const LEVELS=['Muy baja','Baja','Media','Alta','Muy alta'];
export const TRIGGER=[15,10.2,6,4.2,2.4];
export const CYCLE=[.08,.15,.25,.35,.50];
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const defaults=()=>({mode:'ST',cpap:8,ipap:10,epap:4,rate:10,ti:2,tiMin:.3,tiMax:2,rise:150,fall:200,trigger:2,cycle:2,height:175,targetRate:15,targetVa:5.2,minPs:4,maxPs:20,autoEpap:false,minEpap:5,maxEpap:15,mask:'Full Face',ramp:0,startEpap:4,startCpap:4,learned:false,alarms:{leak:40,nonVented:1,lowMv:0,highP:0,lowP:0,highRr:0,lowRr:0,apnea:0,lowSpo2:0,lowFio2:0,highFio2:0}});
export const patientDefaults=()=>({resistance:10,compliance:50,effort:4,rate:14,leak:5,obstruction:0,weight:70,spo2:96,fio2:21,oximeter:false,oxygenSensor:false,disconnected:false,blockedVent:false});
export const scenarios={
 normal:{label:'Mecánica conservada',resistance:10,compliance:50,effort:4,rate:14,leak:5,obstruction:0},
 obstructive:{label:'Obstrucción bronquial',resistance:30,compliance:65,effort:5,rate:22,leak:5,obstruction:0},
 restrictive:{label:'Restricción',resistance:10,compliance:22,effort:5,rate:24,leak:5,obstruction:0},
 weak:{label:'Debilidad neuromuscular',resistance:10,compliance:40,effort:1,rate:12,leak:5,obstruction:0},
 apnea:{label:'Ausencia de esfuerzo',resistance:10,compliance:50,effort:0,rate:0,leak:5,obstruction:0},
 upper:{label:'Obstrucción de vía aérea superior',resistance:10,compliance:50,effort:5,rate:14,leak:5,obstruction:9},
 leak:{label:'Fuga no intencional alta',resistance:10,compliance:50,effort:4,rate:14,leak:55,obstruction:0}
};
export function preset(name){const v={normal:[11,5,200,2,.5,1.5,2,20],obstructive:[13,5,150,3,.3,1,4,20],restrictive:[11,5,300,1,.5,1.5,4,20],obesity:[15,7,300,2,.5,1.5,4,18]}[name];return {ipap:v[0],epap:v[1],rise:v[2],cycle:v[3],tiMin:v[4],tiMax:v[5],minPs:v[6],maxPs:v[7],fall:200,trigger:2};}
export function normalize(s,regional=true){
 if(!MODES.includes(s.mode))s.mode='ST';
 s.cpap=clamp(s.cpap,4,20);s.ipap=clamp(s.ipap,2,40);s.epap=clamp(s.epap,2,s.mode==='iVAPS'?25:Math.min(25,s.ipap));
 s.rate=clamp(s.rate,5,60);s.targetRate=clamp(s.targetRate,8,30);
 const limit=['T','PAC','ST'].includes(s.mode)?Math.min(4,40/s.rate):4;
 s.ti=clamp(s.ti,.2,Math.floor(limit*10)/10);s.tiMax=clamp(s.tiMax,.3,Math.floor(limit*10)/10);s.tiMin=clamp(s.tiMin,.1,s.tiMax);
 const riseLimit=Math.min(900,Math.floor((['T','PAC'].includes(s.mode)?s.ti:s.tiMax)*2000/3/50)*50);
 s.rise=s.rise===0?0:clamp(s.rise,Math.min(150,riseLimit),riseLimit);if(s.rise<150)s.rise=0;
 s.autoEpap=!!s.autoEpap&&regional&&s.mask!=='Trach';
 s.maxPs=clamp(s.maxPs,s.autoEpap?8:.2,30);s.minPs=clamp(s.minPs,0,Math.min(20,s.maxPs-.2));
 s.minEpap=clamp(s.minEpap,2,25);s.maxEpap=clamp(s.maxEpap,s.minEpap,25);
 s.startEpap=clamp(s.startEpap,2,s.epap);s.startCpap=clamp(s.startCpap,4,s.cpap);
 if(s.mask==='Trach')s.alarms.nonVented=1;
 return s;
}
export function canStart(s,p){if(p.weight<13)return 'La indicación del Stellar es para pacientes de 13 kg o más.';if(s.mode==='iVAPS'&&p.weight<30)return 'iVAPS está indicado a partir de 30 kg. Elegí otro modo para este paciente virtual.';return '';}
export function canSmartStop(s,opts,fit){return opts.smart&&!opts.confirmStop&&!fit&&!['Full Face','Trach'].includes(s.mask)&&!s.alarms.leak&&!s.alarms.lowMv;}
// Height-derived approximation, not the proprietary dead-space function.
export function deadspace(height,mask){return Math.max(.025,.15*Math.pow(height/175,2.3)-(mask==='Trach'?.05:0));}
export class Lung {
 constructor(){this.reset();}
 reset(){this.t=0;this.elapsed=0;this.running=false;this.p=0;this.flow=0;this.v=0;this.lastStart=-99;this.insp=false;this.cycleReason='En espera';this.triggerReason='—';this.ps=6;this.epap=4;this.iBr=10;this.backups=0;this.peak=0;this.vBase=0;this.vPeak=0;this.vt=0;this.rr=0;this.mv=0;this.va=0;this.tiMeasured=0;this.residual=0;this.breaths=0;this.spontaneous=0;this.alarmTimers={};this.counts={};this.alarms=[];this.history=[];this.fitRemaining=0;this.muteUntil=0;}
 start(s){this.running=true;this.elapsed=0;this.lastStart=this.t-60/s.rate;this.lastInspiration=this.t;this.apneaActive=false;this.apneaRecovery=0;this.ps=s.mode==='iVAPS'?s.minPs:s.ipap-s.epap;this.iBr=s.targetRate*2/3;this.backups=0;this.epap=s.autoEpap?s.minEpap:s.epap;this.alarmTimers={};this.counts={};this.alarms=[];}
 stop(){this.running=false;this.insp=false;this.fitRemaining=0;this.alarms=[];this.alarmTimers={};}
 step(s,p,dt=.02){
  this.t+=dt;if(!this.running){this.p=0;this.flow=0;this.v=0;return this;}
  this.elapsed+=dt;
  const ramp=s.ramp?clamp(this.elapsed/(s.ramp*60),0,1):1;
  const targetE=s.mode==='iVAPS'&&s.autoEpap?this.epap:s.epap;
  let base=s.mode==='CPAP'?s.startCpap+(s.cpap-s.startCpap)*ramp:s.startEpap+(targetE-s.startEpap)*ramp;
  const period=p.rate>0?60/p.rate:9999,phase=this.t%period,patientTi=Math.min(1.3,period*.35);
  const muscle=p.effort>0&&p.rate>0&&phase<patientTi?p.effort*Math.sin(Math.PI*phase/patientTi):0;
  const obstruction=Math.max(0,p.obstruction-base),r=p.resistance+obstruction*12,c=p.compliance/1000;
  const effortFlow=muscle/r*60;
  let started=false;
  if(!this.insp&&s.mode!=='CPAP'&&!this.fitRemaining&&this.t-this.lastStart>this.tiMeasured+.25){
   const spontaneous=s.mode!=='T'&&effortFlow>=TRIGGER[s.trigger]&&this.flow>-12&&!p.disconnected;
   const rate=s.mode==='iVAPS'?this.iBr:s.rate;
   const timed=['ST','T','PAC','iVAPS'].includes(s.mode)&&this.t-this.lastStart>=60/rate;
   if(spontaneous||timed){
    const interval=this.t-this.lastStart;this.rr=interval<30?60/interval:rate;
    this.residual=this.flow;this.insp=true;this.lastStart=this.t;this.vBase=this.v;this.vPeak=this.v;this.peak=0;this.triggerReason=spontaneous?'Paciente':'Respaldo';this.breaths++;started=true;
    if(spontaneous){this.spontaneous++;this.backups=0;}else this.backups++;
    if(s.mode==='iVAPS'){this.iBr=spontaneous?s.targetRate*2/3:Math.min(s.targetRate,s.targetRate*(2/3+this.backups/15));}
   }
  }
  const age=this.t-this.lastStart;
  if(this.insp){
   const fixed=['T','PAC'].includes(s.mode),ratio=CYCLE[s.cycle];
   let reason='';
   if(fixed&&age>=s.ti)reason='Ti programado';
   if(!fixed&&age>=s.tiMax)reason='Ti Max';
   else if(!fixed&&age>=s.tiMin&&age>Math.max(.15,s.rise/1000)&&this.peak>0&&this.flow<=this.peak*ratio)reason='Ciclo por flujo';
   if(reason){this.insp=false;this.cycleReason=reason;this.tiMeasured=age;this.expStart=this.t;this.vt=Math.max(0,this.vPeak-this.vBase)*1000;this.mv=this.vt/1000*this.rr;this.va=Math.max(0,this.vt/1000-deadspace(s.height,s.mask))*this.rr;
    if(s.mode==='iVAPS'){this.ps=clamp(this.ps+clamp((s.targetVa-this.va)*.32,-1.5,1.5),s.minPs,s.maxPs);if(s.autoEpap)this.epap=clamp(this.epap+(p.obstruction>this.epap?.35:-.08),s.minEpap,s.maxEpap);}
   }
  }
  if(s.mode!=='iVAPS')this.ps=s.ipap-s.epap;else this.ps=clamp(this.ps,s.minPs,s.maxPs);
  let support=this.ps*ramp,desired=base;
  if(this.insp)desired+=support*clamp(age/Math.max(.03,s.rise/1000),0,1);
  else if(s.mode!=='CPAP')desired+=support*(1-clamp((this.t-(this.expStart??-99))/Math.max(.03,s.fall/1000),0,1));
  if(this.fitRemaining>0){this.fitRemaining=Math.max(0,this.fitRemaining-dt);desired=Math.max(10,s.mode==='CPAP'?s.cpap:s.epap);if(this.fitRemaining===0)this.start(s);}
  if(p.disconnected)desired=0;else desired*=1-clamp((p.leak-25)/300,0,.45);
  this.p=clamp(desired,0,40);this.flow=clamp((this.p-base+muscle-this.v/c)/r*60,-180,180);if(p.disconnected)this.flow=0;
  this.v=clamp(this.v+this.flow/60*dt,-.3,3);if(this.insp){this.peak=Math.max(this.peak,this.flow);this.vPeak=Math.max(this.vPeak,this.v);}
  if(s.mode==='CPAP'){
   const pos=muscle>0;
   if(pos&&!this.wasEffort){this.vBase=this.v;this.vPeak=this.v;this.rr=p.rate;this.lastStart=this.t;this.breaths++;this.spontaneous++;this.triggerReason='Respiración espontánea';started=true;}
   if(pos)this.vPeak=Math.max(this.vPeak,this.v);
   if(!pos&&this.wasEffort){this.vt=Math.max(0,this.vPeak-this.vBase)*1000;this.mv=this.vt/1000*p.rate;this.va=Math.max(0,this.vt/1000-deadspace(s.height,s.mask))*p.rate;this.cycleReason='CPAP: sin ciclado de presión';}
   this.wasEffort=pos;
  }
  if(this.t-this.lastStart>Math.max(10,2*60/Math.max(this.rr,1))){this.rr=0;this.mv=0;this.va=0;this.vt=0;}
  if(started)this.lastInspiration=this.t;
  this.checkAlarms(s,p,dt,started);
  this.history.push({t:this.t,p:this.p,f:this.flow,v:this.v*1000,mark:started,source:this.triggerReason});if(this.history.length>1600)this.history.shift();
  return this;
 }
 checkAlarms(s,p,dt,started=false){
  const a=s.alarms,out=[];
  const timer=(key,condition,delay,label,priority='media')=>{this.alarmTimers[key]=condition?(this.alarmTimers[key]??0)+dt:0;if(condition&&this.alarmTimers[key]>=delay)out.push({key,label,priority});};
  timer('disconnect',p.disconnected||p.leak>105,15,'Circuito desconectado','alta');
  timer('nonVented',!!a.nonVented&&p.blockedVent,30,'Mascarilla sin ventilación','alta');
  timer('leak',!!a.leak&&p.leak>40,20,'Fuga alta');
  timer('lowMv',!!a.lowMv&&this.mv<a.lowMv,30,'Ventilación minuto baja');
  this.highPBreath=this.highPBreath||(a.highP>0&&this.p>a.highP);
  if(started){this.counts.highP=this.highPBreath?(this.counts.highP??0)+1:0;this.highPBreath=false;for(const key of ['highRr','lowRr']){const c=s.mode!=='T'&&a[key]>0&&(key==='highRr'?this.rr>a[key]:this.rr<a[key]);this.counts[key]=c?(this.counts[key]??0)+1:0;}}
  timer('highP',a.highP>0&&(this.p>a.highP||this.counts.highP>=2),this.counts.highP>=2?0:5,'Presión alta');
  timer('lowP',s.mode!=='iVAPS'&&a.lowP>0&&(p.disconnected||p.leak>25)&&((s.mode==='CPAP'?s.cpap:s.ipap)*(p.disconnected?1:clamp((p.leak-25)/300,0,.45))>a.lowP),18,'Presión baja');
  for(const key of ['highRr','lowRr'])if(s.mode!=='T'&&a[key]&&this.counts[key]>=4)out.push({key,label:key==='highRr'?'Frecuencia alta':'Frecuencia baja',priority:'media'});
  // Latch apnea until two consecutive inspirations, as described in the clinical guide.
  if(a.apnea&&this.t-this.lastInspiration>=a.apnea){this.apneaActive=true;this.apneaRecovery=0;}
  if(started&&this.apneaActive){this.apneaRecovery=(this.apneaRecovery??0)+1;if(this.apneaRecovery>=2)this.apneaActive=false;}
  if(a.apnea&&this.apneaActive)out.push({key:'apnea',label:'Apnea',priority:'media'});
  timer('lowSpo2',p.oximeter&&a.lowSpo2>0&&p.spo2<a.lowSpo2,5,'SpO₂ baja','baja');
  timer('lowFio2',p.oxygenSensor&&a.lowFio2>0&&p.fio2<a.lowFio2,15,'FiO₂ baja','baja');
  timer('highFio2',p.oxygenSensor&&a.highFio2>0&&p.fio2>a.highFio2,15,'FiO₂ alta','baja');
  this.alarms=out.sort((x,y)=>({alta:0,media:1,baja:2}[x.priority]-{alta:0,media:1,baja:2}[y.priority]));return out;
 }
}
