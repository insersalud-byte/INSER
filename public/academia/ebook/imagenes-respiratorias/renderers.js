(function (root) {
  'use strict';
  const text = (x, y, value, color = '#9ac5ce', size = 15) => '<text x="'+x+'" y="'+y+'" fill="'+color+'" font-size="'+size+'" font-family="system-ui,sans-serif">'+value+'</text>';
  const line = (x1,y1,x2,y2,color='#78919c',width=2) => '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+color+'" stroke-width="'+width+'"/>';
  const circle = (x,y,r,fill,stroke='none') => '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="3"/>';
  const ellipse = (x,y,rx,ry,fill,stroke='none') => '<ellipse cx="'+x+'" cy="'+y+'" rx="'+rx+'" ry="'+ry+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="2"/>';
  const path = (d,fill,stroke='none',width=2) => '<path d="'+d+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+width+'"/>';
  function chest(pattern, hints) {
    let out = ellipse(360,264,215,216,'#263640','#5c6e76');
    const inflated = pattern === 'hyperinflation';
    out += path('M310 65 C235 33 171 155 179 354 Q228 '+(inflated?448:411)+' 302 380 Q341 290 321 173Z','#080f15','#a1b4bc');
    out += path('M410 65 C485 33 549 155 541 354 Q490 '+(inflated?448:411)+' 418 380 Q379 290 399 173Z','#080f15','#a1b4bc');
    for(let i=0;i<8;i++) {
      const y=92+i*35;
      out+=path('M174 '+y+' Q250 '+(y+48)+' 324 '+(y+18),'none','#56707c',2);
      out+=path('M546 '+y+' Q470 '+(y+48)+' 396 '+(y+18),'none','#56707c',2);
    }
    out += path('M338 45 L339 177 L310 220 M379 45 L378 177 L410 220','none','#b9c9cc',9);
    out += path('M351 201 C398 169 458 222 452 324 Q419 376 328 350 Q299 280 351 201','#677981','#b9c9cc');
    for (const side of [-1,1]) for(let i=0;i<5;i++) out+=path('M'+(360+side*54)+' 221 Q'+(360+side*104)+' '+(140+i*45)+' '+(360+side*147)+' '+(128+i*49),'none','#67808c',3);
    if(pattern==='consolidation') {
      out+=path('M188 152 Q220 76 280 113 L306 221 Q250 246 187 218Z','#d2dce0');
      out+=path('M266 170 L216 153 M252 173 L239 206 M255 173 L290 207','none','#203540',5);
    }
    if(pattern==='atelectasis') out+=path('M311 267 L318 377 L188 383Z','#becbd0','#edf4f3');
    if(pattern==='effusion') out+=path('M178 298 Q209 379 314 377 L313 423 L178 403Z','#becbd0');
    if(pattern==='pneumothorax') {
      out+=path('M206 105 Q162 210 180 359 L220 377 Q193 224 244 104Z','#010407');
      out+=path('M244 104 Q193 224 220 377','none','#e6eee9',3);
    }
    if(pattern==='edema') for(let i=0;i<10;i++) out+=ellipse(280+(i%2)*159,190+Math.floor(i/2)*30,35,25,'#91a8b0a0');
    if(pattern==='nodule') out+=circle(254,151,20,'#d9e3e2');
    out+=text(144,43,'D');out+=text(563,43,'I');
    if(hints) {out+=text(324,28,'Tráquea','#73e0c5');out+=text(352,303,'Corazón','#73e0c5');out+=text(190,454,'Diafragma / bases','#73e0c5');}
    return out;
  }
  function ct(pattern, level, hints, view) {
    const base=level===2, top=level===0, tissue=view==='mediastino';
    let out=ellipse(360,244,259,185,'#83939a','#d3dce0');
    const lungColor=tissue?'#142129':'#081015';
    out+=ellipse(237,239,top?85:103,base?114:133,lungColor,'#a7bac2');
    out+=ellipse(484,239,top?85:103,base?114:133,lungColor,'#a7bac2');
    out+=ellipse(360,383,37,28,'#e1e8e4','#5d737c');
    out+=ellipse(360,238,top?35:61,base?101:80,tissue?'#aabcbd':'#677d85');
    if(top)out+=circle(356,169,20,'#0a1118','#c6d4d5');
    else {out+=circle(331,164,17,'#09151d','#c6d4d5');out+=circle(393,164,17,'#09151d','#c6d4d5');}
    for(let i=0;i<8;i++) {
      const a=i*Math.PI/4;
      out+=circle(360+Math.cos(a)*241,243+Math.sin(a)*163,8,'#e6efeb');
    }
    for(const side of [-1,1]) for(let i=0;i<5;i++) {
      out+=path('M'+(360+side*69)+' 225 Q'+(360+side*110)+' '+(137+i*40)+' '+(360+side*(163-i*7))+' '+(115+i*47),'none',tissue?'#334550':'#789aa7',3);
    }
    if(pattern==='consolidation') {
      out+=path('M160 188 Q181 139 235 122 L272 251 Q216 290 166 266Z','#ccd8d7');
      out+=path('M255 221 L182 194 M217 207 L197 247','none','#25414b',5);
    }
    if(pattern==='atelectasis') out+=path('M145 303 L310 287 L292 352 Q203 382 145 303Z','#c9d6d8');
    if(pattern==='emphysema') [[185,180,24],[260,150,29],[200,300,20],[467,192,31],[510,284,23]].forEach(([x,y,r])=>{out+=circle(x,y,r,'#000408','#354851');});
    if(pattern==='bronchiectasis') [[187,210],[243,289],[459,240],[512,182]].forEach(([x,y])=>{out+=circle(x,y,16,'#061016','#cbdad7')+circle(x+25,y-9,8,'#a7c0c3');});
    if(pattern==='fibrosis') {
      for(let i=0;i<8;i++)out+=circle(170+i*15,312+Math.sin(i)*16,11,'#142b34','#b8cecd');
      for(let i=0;i<7;i++)out+=circle(445+i*15,312+Math.cos(i)*16,10,'#142b34','#b8cecd');
      out+=path('M161 280 L179 315 L211 280 L230 329 L260 295 L291 342','none','#b5c8cb',3);
    }
    if(pattern==='groundglass') {out+=ellipse(215,206,56,81,'#adc2c35e');out+=path('M280 225 L187 170 M233 193 L181 244','none','#98b9c5',3);}
    if(pattern==='nodule')out+=circle(226,182,19,'#e3eeea');
    if(pattern==='embolism') {
      out+=path('M359 226 L305 196 L274 199 M359 226 L415 190 L457 209','none','#e4e5c7',24);
      out+=ellipse(305,197,15,8,'#425963');
    }
    if(base)out+=path('M169 361 Q225 350 283 375 M433 375 Q495 353 549 363','none','#c5d4d2',5);
    out+=text(76,244,'D')+text(628,244,'I')+text(351,31,'A')+text(351,455,'P');
    out+=text(21,463,['Nivel alto · esquema','Nivel hiliar · esquema','Nivel basal · esquema'][level],'#8fb6c0',12);
    if(hints)out+=text(173,225,'Pulmón D','#78e5c8')+text(450,225,'Pulmón I','#78e5c8')+text(293,108,'Mediastino','#78e5c8');
    return out;
  }
  function us(pattern, phase, hints, mode) {
    const stationary=pattern==='pneumothorax';
    const shift=stationary?0:Math.sin(phase*Math.PI*2)*8;
    let out='<rect x="83" y="52" width="554" height="365" fill="#050b11" stroke="#677d87"/>';
    for(let i=0;i<12;i++)out+=line(91,58+i*4,631,58+i*4,'#293c46',1);
    if(mode==='m') {
      for(let i=0;i<40;i++) {
        const y=116+i*7;
        if(stationary)out+=line(95,y,626,y,'#70858b',1);
        else for(let j=0;j<47;j++)out+=circle(97+j*11+((i*7+j*3)%6),y+Math.sin(i+j)*3,1.1+(j%2),['#273b44','#90a6a9','#536f79'][(i+j)%3]);
      }
      out+=line(95,113,625,113,'#e4edeb',4);
      out+=line(97+phase*525,105,97+phase*525,395,'#79e2c5',2);
      out+=text(100,449,'Modo M conceptual · tiempo →');
    } else {
      out+=ellipse(159,85,34,22,'#647984')+ellipse(559,85,34,22,'#647984');
      out+='<path d="M126 92 L196 92 L230 417 L95 417Z M526 92 L592 92 L627 417 L490 417Z" fill="#000408" opacity=".75"/>';
      out+=line(185,113,534,113,'#d7e5e2',5);
      for(let i=0;i<30;i++)out+=circle(189+i*11+shift,113,1.8,'#ffffff');
      if(['normal','pneumothorax','blines'].includes(pattern))for(let y=182;y<404;y+=69)out+=line(202,y,518,y,'#839b9e',2);
      if(pattern==='blines')for(const x of [229,300,382,461])out+=path('M'+(x+shift)+' 113 L'+(x-12+shift)+' 411 L'+(x+17+shift)+' 411Z','#d4e9dfb0');
      if(['consolidation','atelectasis'].includes(pattern)) {
        out+=path('M195 113 L527 113 L486 308 Q360 359 233 312Z','#697b80','#9eb7be');
        for(let i=0;i<6;i++)out+=line(257+i*34,160+i%2*28,272+i*34+(pattern==='consolidation'?shift:0),240+i%2*23,'#e1eeea',6);
      }
      if(['effusion','complex'].includes(pattern)) {
        out+=ellipse(362,259,148,121,'#020609','#9bbcc2');
        out+=path('M250 148 Q324 '+(255+shift)+' 398 145 L449 133Z','#8ea3a9');
        out+=path('M204 367 Q372 410 523 357','none','#e0e4cb',8);
        if(pattern==='complex')for(let i=0;i<5;i++)out+=path('M'+(237+i*44)+' 184 Q'+(280+i*22)+' 286 '+(260+i*44)+' 355','none','#b6cac6',2);
      }
      out+=text(100,449,'Modo B conceptual · profundidad ↓');
    }
    if(hints)out+=text(284,96,'Línea pleural','#79e2c5');
    return out;
  }
  function diaphragm(pattern, phase, hints) {
    const amplitude=pattern==='reduced'?8:pattern==='absent'?0:30;
    const polarity=pattern==='paradoxical'?-1:1;
    const dy=(1-Math.cos(phase*Math.PI*2))/2*amplitude*polarity;
    let out=ellipse(360,210,236,150,'#192b35','#6d8c98');
    out+=path('M138 282 Q360 '+(118+dy)+' 582 282 L582 337 L138 337Z','#756f53','#c6c7a6');
    out+=path('M138 282 Q360 '+(118+dy)+' 582 282','none','#e7e7ce',7);
    if(pattern==='poor') {
      for(let i=0;i<16;i++)out+=line(132+i*28,95,199+i*23,332,'#273e49',12);
      out+=text(195,233,'Ventana no interpretable','#ffcf87',21);
    }
    out+=text(160,75,'Cúpula · desplazamiento relativo')+text(444,343,'Abdomen','#bdbd9f',13);
    out+=text(170,102,phase<.5?'Fase inspiratoria ilustrada':'Fase espiratoria ilustrada','#f9cc89',14);
    out+=line(125,414,610,414,'#406370',1);
    let points='';
    for(let i=0;i<97;i++){const y=411-(1-Math.cos(i/96*Math.PI*2))/2*amplitude*polarity;points+=(130+i*5)+','+y+' ';}
    out+='<polyline points="'+points+'" fill="none" stroke="'+(pattern==='poor'?'#557786':'#79dfc4')+'" stroke-width="3"/>';
    out+=line(130+phase*480,367,130+phase*480,460,'#f9cc89',2);
    out+=text(138,477,'Trazo temporal conceptual · no escala en cm','#91b6c0',12);
    if(hints)out+=text(185,318,'No medir fuerza a partir de este movimiento','#79e2c5',14);
    return out;
  }
  function other(mod, pattern, hints) {
    if(mod==='vq') {
      let out='';
      for(const [x,label] of [[185,'VENTILACIÓN'],[535,'PERFUSIÓN']]) {
        out+=text(x-63,75,label,'#b3cdd2',15);
        out+=ellipse(x-43,234,50,123,'#4fa89b','#86ded1')+ellipse(x+43,234,50,123,'#4fa89b','#86ded1');
        for(let i=0;i<12;i++)out+=circle(x-67+(i%4)*44,154+Math.floor(i/4)*68,5,'#e1d286');
        if(pattern==='matched'||(pattern==='mismatch'&&label==='PERFUSIÓN'))out+=path('M'+(x-91)+' 252 L'+(x-18)+' 307 L'+(x-62)+' 352 Q'+(x-98)+' 321 '+(x-91)+' 252Z','#0b2633','#87aaa9');
      }
      return out+text(196,432,'Mapa esquemático · sin escala de actividad');
    }
    let out=ct('normal',1,false,mod==='mr'?'mediastino':'pulmon');
    if(mod==='mr'){
      if(pattern==='mass')out+=ellipse(363,170,47,37,'#ccad92','#f5dec3');
      if(pattern==='wall')out+=ellipse(139,253,40,51,'#ccad92','#f5dec3');
    } else {
      out+=ellipse(373,233,35,49,'#f4c95c99')+circle(400,340,21,'#d59b4770');
      if(pattern==='avid')out+=circle(214,199,26,'#fb6549')+circle(214,199,12,'#ffeab1');
      if(pattern==='inflammation')for(const x of [204,498])out+=ellipse(x,263,35,58,'#e8a856b0');
    }
    if(hints)out+=text(170,449,mod==='mr'?'Localización ≠ histología':'Captación ≠ malignidad','#79e2c5');
    return out;
  }
  function render(modality, pattern, options = {}) {
    const phase=Math.max(0,Math.min(1,Number(options.phase)||0));
    const hints=Boolean(options.hints);
    const level=Math.max(0,Math.min(2,Number(options.level)||0));
    let body='';
    if(modality==='rx')body=chest(pattern,hints);
    else if(modality==='ct')body=ct(pattern,level,hints,options.view);
    else if(modality==='us')body=us(pattern,phase,hints,options.view);
    else if(modality==='dia')body=diaphragm(pattern,phase,hints);
    else body=other(modality,pattern,hints);
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 500" role="img" aria-label="Esquema educativo de '+modality.toUpperCase()+', no estudio clínico"><rect width="720" height="500" fill="#07151f"/>'+body+'<text x="20" y="491" fill="#809aa5" font-family="system-ui" font-size="10">ESQUEMA DIDÁCTICO · NO DIAGNÓSTICO · SIN CALIBRACIÓN CLÍNICA</text></svg>';
  }
  root.ImagingRender = { render };
})(typeof window !== 'undefined' ? window : globalThis);
