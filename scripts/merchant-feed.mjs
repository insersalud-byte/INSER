/**
 * merchant-feed.mjs
 * Feed de Google Merchant Center (TSV) con los productos en venta del sitio.
 * Lo genera scripts/prerender-meta.mjs en cada build y se publica en
 * https://insersalud.com/merchant-center-feed.tsv, de donde Merchant Center
 * (cuenta 5859465950) lo lee solo una vez por dia.
 *
 * QUE SALE DE ACA Y QUE SALE DEL SITIO
 * - De esta tabla: id, titulo, descripcion neutra (sin envio, cuotas, oferta ni
 *   superlativos), link, fotos, marca, categoria de Google y tipo. Son datos
 *   para Google que no viven en ninguna pagina con esa forma.
 * - Del sitio, en cada build: el PRECIO y la moneda, del catalogo de
 *   LandingPage.jsx (arrays ofertas[] y tienda[], los mismos que arman el home)
 *   o, si el producto no tiene ficha propia, de los products[] de localPages.js
 *   de la pagina del link. Y el shipping_label, de la nota de la ficha: si dice
 *   "envio sin cargo" o "envio gratis" va envio-sin-cargo, si no envio-a-cotizar.
 *   O sea: un cambio de precio en el sitio cambia el feed solo.
 *
 * CONTROLES (un producto que no los pasa NO entra al feed, con un aviso en el
 * log del build; es preferible que falte a que Google lo rechace por precio):
 * - el precio tiene que estar en el texto VISIBLE de la pagina del link, con el
 *   modelo (tok) a menos de 400 caracteres antes: es lo que Merchant compara;
 * - si el producto figura dos veces en el catalogo con precios distintos;
 * - foto principal que no existe en el build; las adicionales faltantes se sacan;
 * - limites de Google: id <= 50, titulo <= 150, descripcion <= 5000.
 * Si quedan menos del 80% de los productos, el feed NO se reescribe (queda el
 * del build anterior) para no vaciar Merchant Center por un error de datos.
 *
 * Para agregar un producto: sumar una fila a FEED con el slug de su ficha en
 * LandingPage.jsx (o `nombre` si la ficha no tiene slug). Para sacarlo: borrar
 * la fila. Para verificar contra el sitio en vivo:
 * INSER SITIO NUEVO/merchant-center/verificar-feed.cjs.
 */
import vm from 'node:vm';

const S = 'https://insersalud.com';
const A = (p) => S + '/artifacts/products/' + p;

const ANMAT = 'Aparatología aprobada por ANMAT.';
const MED_PRESION = 'La presión de trabajo la define el médico tratante.';
const MED_RANGO = 'El rango de presión lo define el médico tratante.';
const MED_FLUJO = 'El flujo lo define el médico tratante.';
const PULSO = 'Suministra oxígeno a pulso: no reemplaza a un equipo de flujo continuo cuando el médico indica flujo continuo.';
const COMPAT = 'Compatible con CPAP, AutoCPAP y BiPAP.';

// Origen del precio: `slug` = ficha de LandingPage.jsx; `nombre` = ficha sin slug (regex
// sobre el name); `pag` = products[] de localPages.js de la pagina del link (regex sobre
// el name), para opciones que no tienen ficha propia.
// cat (google_product_category): 7317 PAP Machines · 7316 PAP Masks · 4551 Respiratory Care
// · 499692 Oxygen Tanks · 3477 Medical Equipment
// tok: modelo que tiene que aparecer cerca del precio en la pagina del link.
export const FEED = [
    // ---- CPAP / AutoCPAP ----
    { id: 'cpap-bmc-g2s', slug: 'cpap-bmc-g2s', title: 'BMC G2S CPAP fijo con humidificador calefactado integrado, presión 4-20 cm H2O',
        desc: 'CPAP fijo BMC G2S (BMC Medical) con humidificador calefactado integrado. Mantiene una presión constante, ajustable en un rango de 4 a 20 cm H2O, con rampa de 0 a 60 minutos y presión inicial de 4 cm H2O. Pantalla LCD color táctil, nivel sonoro menor a 30 dB, tarjeta SD para registro de uso y peso de 1,3 kg con humidificador. Aparatología aprobada por ANMAT. Garantía oficial del fabricante: 2 años. La presión de trabajo la define el médico tratante.',
        link: '/comprar-cpap-argentina', img: A('1752160942319-bmcg2.2.jpg'), add: [A('1752160942320-bmcg2.jpg')],
        brand: 'BMC Medical', cat: 7317, type: 'Equipos respiratorios > CPAP y AutoCPAP', tok: /G2S/ },
    { id: 'autocpap-bmc-g2s', slug: 'autocpap-bmc-g2s', title: 'BMC G2S AutoCPAP con humidificador calefactado, presión automática 4-20 cm H2O, con bolso de transporte',
        desc: 'AutoCPAP BMC G2S (BMC Medical) con humidificador calefactado integrado. Ajusta la presión de forma automática dentro de un rango de 4 a 20 cm H2O, con rampa automática y presión inicial reducida. Pantalla LCD color y tarjeta SD para registro de uso. Incluye equipo, humidificador, tubuladura, fuente y bolso de transporte. Aparatología aprobada por ANMAT. Garantía oficial del fabricante: 2 años. El rango de presión lo define el médico tratante.',
        link: '/comprar-cpap-argentina', img: A('autocpap_bmc_g2_2.jpg'), add: [A('autocpap_bmc_g2_1.jpg'), A('autocpap_bmc_g2_3.jpg')],
        brand: 'BMC Medical', cat: 7317, type: 'Equipos respiratorios > CPAP y AutoCPAP', tok: /AutoCPAP/ },
    { id: 'cpap-resmed-airsense-10', slug: 'cpap-resmed-airsense-10', title: 'ResMed AirSense 10 CPAP con humidificador HumidAir, equipo completo con tubuladura y bolso',
        desc: 'CPAP ResMed AirSense 10 con humidificador HumidAir calefactado integrado, alivio espiratorio EPR, AutoRamp y app myAir. Rango de presión de 4 a 20 cm H2O. Equipo completo: humidificador, tubuladura, fuente, tarjeta SD y bolso. ' + ANMAT + ' Garantía oficial del fabricante: 2 años. ' + MED_PRESION,
        link: '/comprar-cpap-argentina', img: A('resmed_airsense10_3.jpg'), add: [A('resmed_airsense10_4.jpg'), A('resmed_airsense10_2.jpg'), A('resmed_airsense10_5.jpg')],
        brand: 'ResMed', cat: 7317, type: 'Equipos respiratorios > CPAP y AutoCPAP', tok: /AirSense 10/ },
    { id: 'autocpap-bmc-g2s-mini', slug: 'oferta-autocpap-bmc-g2s-m1-mini-con-almohadillas-nasales-con-humidificador-p2h-', title: 'BMC G2S Mini AutoCPAP con humidificador p2H y almohadillas nasales',
        desc: 'AutoCPAP BMC G2S Mini (BMC Medical) de presión automática, con rango autoajustable de 4 a 20 cm H2O. Incluye humidificador calefactado p2H y almohadillas nasales. Peso 0,9 kg. ' + MED_RANGO,
        link: '/', img: A('fcd9a652-1366-4c5a-916d-e4321777fe9e.jpeg'), add: [],
        brand: 'BMC Medical', cat: 7317, type: 'Equipos respiratorios > CPAP y AutoCPAP', tok: /Mini/ },
    { id: 'autocpap-philips-dreamstation', slug: 'autocpap-philips-dreamstation-con-humidificador-y-conectividad-', title: 'Philips DreamStation AutoCPAP con humidificador y conectividad WiFi y Bluetooth',
        desc: 'AutoCPAP Philips Respironics DreamStation con humidificador calefactado integrado y conectividad WiFi y Bluetooth (app DreamMapper). Ajusta la presión de forma automática entre 4 y 20 cm H2O. ' + MED_RANGO,
        link: '/patologia/apnea-del-sueno', img: A('bbb738c4-8671-4228-b86d-6f1ffd179569.jpg'), add: [A('6d89b2a1-bd39-4573-9f17-9ce7012890b2.jpg'), A('79192c9f-2295-4fc4-ab6e-b2e11b4abab4.jpg')],
        brand: 'Philips Respironics', cat: 7317, type: 'Equipos respiratorios > CPAP y AutoCPAP', tok: /DreamStation/i },
    { id: 'cpap-philips-dreamstation', slug: 'cpap-philips-dreamstation-con-humidificador-y-conectividad-', title: 'Philips DreamStation CPAP fijo con humidificador y conectividad WiFi y Bluetooth',
        desc: 'CPAP fijo Philips Respironics DreamStation con humidificador calefactado y conectividad WiFi y Bluetooth. Rango de presión de 4 a 20 cm H2O. ' + MED_PRESION,
        link: '/', img: A('64719ec9-c027-4d35-8280-ffa4ac3d291e.jpg'), add: [A('b65f2a23-b2dc-47b2-8d63-fce4acb39d24.jpg'), A('b9e94ded-dd5a-4371-b4a7-45717f0a677c.jpg')],
        brand: 'Philips Respironics', cat: 7317, type: 'Equipos respiratorios > CPAP y AutoCPAP', tok: /DreamStation/i },
    { id: 'autocpap-resmed-airsense-10', slug: 'autocpap-resmed-airsense-10-con-nube', title: 'ResMed AirSense 10 AutoSet AutoCPAP con humidificador HumidAir y conectividad',
        desc: 'AutoCPAP ResMed AirSense 10 AutoSet con ajuste automático de presión entre 4 y 20 cm H2O, humidificador HumidAir calefactado y conectividad con AirView y la app myAir. ' + MED_RANGO,
        link: '/', img: A('38e665d6-2c44-4e1b-8c1d-7578f26aea9d.jpg'), add: [A('bc061f01-a199-4fde-851c-f3b7bcfe5281.jpg'), A('6f382fda-e690-4676-b569-a3967a381f9b.jpg')],
        brand: 'ResMed', cat: 7317, type: 'Equipos respiratorios > CPAP y AutoCPAP', tok: /AirSense 10/i },
    { id: 'cpap-yuwell-yh-360', slug: 'cpap-yuwell-yh-360-con-humidificador', title: 'Yuwell YH-360 CPAP fijo con humidificador',
        desc: 'CPAP fijo Yuwell YH-360 con humidificador, de funcionamiento silencioso. ' + MED_PRESION,
        link: '/', img: A('1752269565561-269d4b6c-772c-4dcb-b8f1-0bcc3244be73.jpg'), add: [A('1752269581367-ea3fc8ca-bf2c-45b0-932e-e15cab69b8c1.jpg')],
        brand: 'Yuwell', cat: 7317, type: 'Equipos respiratorios > CPAP y AutoCPAP', tok: /YH-360/i },
    // ---- BiPAP / ventilacion ----
    { id: 'bipap-bmc-g3', slug: 'bipap-bmc-g2-con-frecuencia-respiratoria-y-humidificador', title: 'BMC G3 BiPAP S/T con frecuencia respiratoria de respaldo y humidificador calefactado',
        desc: 'BiPAP BMC G3 (BMC Medical) S/T con frecuencia respiratoria de respaldo y humidificador calefactado integrado. Modos CPAP, S, T y S/T. IPAP de 4 a 25 cm H2O, EPAP de 4 a 20 cm H2O y frecuencia respiratoria de respaldo de 4 a 40 rpm. Pantalla LCD color. Aparatología aprobada por ANMAT. Garantía oficial del fabricante: 2 años. El modo y las presiones los define el médico tratante.',
        link: '/comprar-bipap-argentina', img: A('2cffdc89-7433-4bcb-80cd-7f2862733ec0.jpg'), add: [A('5c40b7f2-d546-4b63-85d2-73c4716b0e41.jpg'), A('27daf6d0-866d-42b2-ade8-6afd13439602.jpg'), A('b2c8c9fc-33a8-4d82-a003-1c7219ce0ff3.jpg')],
        brand: 'BMC Medical', cat: 7317, type: 'Equipos respiratorios > BiPAP', tok: /G3/ },
    { id: 'ventilador-resmed-stellar-150', slug: 'stellar-50-resmed-con-humidificador-y-bateria', title: 'ResMed STELLAR 150 ventilador con humidificador H4i y batería interna',
        desc: 'Ventilador ResMed STELLAR 150 con humidificador H4i integrado y batería interna de hasta 2 horas. Modos CPAP, S, ST, T, PAC e iVAPS, con rango de presión de 2 a 40 cm H2O. ' + ANMAT + ' Garantía oficial del fabricante: 2 años. El modo y los parámetros los define el médico tratante.',
        link: '/ventilador-stellar-150', img: A('b3205a47-2021-4f73-b11a-a48ac33e29ce.jpg'), add: [],
        brand: 'ResMed', cat: 4551, type: 'Equipos respiratorios > Ventiladores', tok: /STELLAR/i },
    { id: 'cough-assist-asistente-de-tos', slug: 'cough-asisst-asistente-tos', title: 'Cough Assist asistente de tos, insuflador-exsuflador mecánico',
        desc: 'Asistente de tos: insuflador-exsuflador mecánico que simula la tos para movilizar secreciones en pacientes con tos débil. Presión positiva y negativa de hasta 70 cm H2O, modos manual y automático, para uso adulto y pediátrico. Se usa en enfermedades neuromusculares como ELA, AME y Duchenne. Los parámetros los define el médico tratante.',
        link: '/cough-assist-asistente-de-tos', img: A('a44d34ae-c159-4f83-8c8d-41c2fcfc4e49.jpg'), add: [A('99f8b1d2-f5af-423c-92d3-63ccddb2b554.jpg'), A('19a2850b-34e9-46c0-b7db-f02dc9093fbb.jpg'), A('3f5ad476-464f-4918-846f-0c1cf4b38a20.jpg')],
        brand: '', cat: 4551, type: 'Equipos respiratorios > Asistente de tos', tok: /Cough Assist/i },
    // ---- Concentradores estacionarios ----
    { id: 'concentrador-de-oxigeno-bmc-estacionario', slug: 'concentrador-de-oxigeno-bmc-estacionario', title: 'BMC concentrador de oxígeno estacionario 0,5-5 L/min con control remoto y medidor de O2',
        desc: 'Concentrador de oxígeno estacionario BMC (BMC Medical) para uso domiciliario continuo las 24 horas. Flujo regulable de 0,5 a 5 L/min y pureza de oxígeno igual o mayor al 93%. Control remoto para manejo a distancia, medidor de pureza de oxígeno integrado y display digital de pureza, flujo y horas de uso. Aparatología aprobada por ANMAT. Garantía oficial del fabricante: 2 años. El flujo lo define el médico tratante.',
        link: '/comprar-concentrador-oxigeno-argentina', img: A('concentrador_bmc_2.jpg'), add: [],
        brand: 'BMC Medical', cat: 4551, type: 'Equipos respiratorios > Concentradores de oxígeno', tok: /BMC/ },
    { id: 'concentrador-de-oxigeno-yuwell-7f-5b', slug: 'concentrador-de-oxigeno-yuwell-7f-5b', title: 'Yuwell 7F-5B concentrador de oxígeno estacionario 5 L/min con humidificador incorporado',
        desc: 'Concentrador de oxígeno estacionario Yuwell 7F-5B para uso domiciliario. Flujo continuo regulable de 0,5 a 5 L/min, humidificador incorporado y bajo nivel de ruido. Funciona enchufado a la red eléctrica y produce oxígeno a partir del aire ambiente, sin recarga. Aparatología aprobada por ANMAT. Garantía oficial del fabricante y servicio técnico. El flujo y las horas de uso los define el médico tratante.',
        link: '/comprar-concentrador-oxigeno-argentina', img: A('concentrador_yuwell_5l.jpg'), add: [],
        brand: 'Yuwell', cat: 4551, type: 'Equipos respiratorios > Concentradores de oxígeno', tok: /7F-5B/ },
    { id: 'concentrador-de-oxigeno-yuwell-10-litros', slug: 'concentrador-de-oxigeno-yuwell-10-litros', title: 'Yuwell concentrador de oxígeno estacionario de alto flujo 1-10 L/min, uso continuo 24 hs',
        desc: 'Concentrador de oxígeno estacionario Yuwell de alto flujo, regulable de 1 a 10 L/min, para uso continuo las 24 horas. Para alta demanda de oxígeno y centros de rehabilitación pulmonar. Display digital de flujo, alarmas de seguridad por corte de energía y por baja concentración, y ruedas para traslado. Aparatología aprobada por ANMAT. Garantía oficial del fabricante: 1 año. El flujo lo define el médico tratante.',
        link: '/concentrador-oxigeno-10-litros', img: A('concentrador_yuwell_10l_2.jpg'), add: [A('concentrador_yuwell_10l_1.jpg')],
        brand: 'Yuwell', cat: 4551, type: 'Equipos respiratorios > Concentradores de oxígeno', tok: /10 (L|litros)/i },
    { id: 'concentrador-yuwell-estacionario-5l', slug: 'concentrador-de-oxigeno-estacionario1', title: 'Yuwell concentrador de oxígeno estacionario 0,5-5 L/min, con ruedas',
        desc: 'Concentrador de oxígeno estacionario Yuwell para uso domiciliario continuo. Flujo de 0,5 a 5 L/min, pureza de oxígeno del 93% ± 3%, nivel sonoro menor a 45 dB y ruedas para traslado (14 kg). ' + MED_FLUJO,
        link: '/patologia/epoc', img: A('b9875919-47d8-482e-ba62-800aff89739d.jpeg'), add: [A('2a8114b7-8c86-49d7-ab6b-6e15a9c48fad.jpeg'), A('aaddd83f-e98e-45d7-9f16-43fa6a7e2e7c.jpeg')],
        brand: 'Yuwell', cat: 4551, type: 'Equipos respiratorios > Concentradores de oxígeno', tok: /YUWELL/i },
    // ---- Concentradores portatiles ----
    { id: 'kingon-p2-s3', slug: 'concentrador-de-oxigeno-portatil-kingon-p2-s3-el-mas-liviano-y-economico', title: 'KINGON P2-S3 concentrador de oxígeno portátil a pulso, 2,3 kg, apto vuelos',
        desc: 'Concentrador de oxígeno portátil KINGON P2-S3 con 5 niveles de ajuste a pulso. Peso 2,3 kg, autonomía de 4 a 5 horas y nivel sonoro menor a 43 dB. Apto para vuelos (FAA). Garantía oficial del fabricante: 1 año. ' + PULSO + ' ' + MED_FLUJO,
        link: '/comprar-concentrador-oxigeno-portatil-argentina', img: A('f18cede5-9404-4eee-a751-01f532e715d7.jpg'), add: [],
        brand: 'KINGON', cat: 4551, type: 'Equipos respiratorios > Concentradores portátiles', tok: /P2-S3/ },
    { id: 'kingon-p2-toc', slug: 'concentrador-de-oxigeno-portatil-kingon-p2-toc', title: 'KINGON P2-TOC concentrador de oxígeno portátil con batería de hasta 9,5 horas',
        desc: 'Concentrador de oxígeno portátil KINGON P2-TOC con batería de autonomía extendida: hasta 9,5 horas. 5 niveles de ajuste y peso de 2,8 kg con batería. Apto para vuelos (FAA). Garantía oficial del fabricante: 1 año. ' + MED_FLUJO,
        link: '/comprar-concentrador-oxigeno-portatil-argentina', img: A('dbf2f4a8-6dd6-4d06-863f-2a14deaa9086.jpg'), add: [A('f5368f6e-9047-4b59-a210-04ceb1d3d6d2.jpg'), A('a5e844ea-11ff-4b05-8c27-f2a3bb89d2ca.jpg')],
        brand: 'KINGON', cat: 4551, type: 'Equipos respiratorios > Concentradores portátiles', tok: /P2-TOC/ },
    { id: 'kingon-p2-e7', slug: 'concentrador-de-oxigeno-portatil-kingon-p2-e7', title: 'KINGON P2-E7 concentrador de oxígeno portátil de flujo continuo con batería extendida',
        desc: 'Concentrador de oxígeno portátil KINGON P2-E7 de flujo continuo, con batería de autonomía extendida. Garantía oficial del fabricante: 1 año. ' + MED_FLUJO,
        link: '/comprar-concentrador-oxigeno-portatil-argentina', img: A('1748964279808-p2-e7.jpg'), add: [],
        brand: 'KINGON', cat: 4551, type: 'Equipos respiratorios > Concentradores portátiles', tok: /P2-E7/ },
    { id: 'kingon-p2-e6', slug: 'concentrador-de-oxigeno-portatil-kingon-p2-e6', title: 'KINGON P2-E6 concentrador de oxígeno portátil de flujo continuo con batería',
        desc: 'Concentrador de oxígeno portátil KINGON P2-E6 de flujo continuo, con batería. Garantía oficial del fabricante: 1 año. ' + MED_FLUJO,
        link: '/comprar-concentrador-oxigeno-portatil-argentina', img: A('1748963802989-kingonp2.png'), add: [],
        brand: 'KINGON', cat: 4551, type: 'Equipos respiratorios > Concentradores portátiles', tok: /P2-E6/ },
    { id: 'kingon-p2-e', slug: 'concentrador-de-oxigeno-portatil', title: 'KINGON P2-E concentrador de oxígeno portátil de flujo continuo',
        desc: 'Concentrador de oxígeno portátil KINGON P2-E de flujo continuo, modelo de entrada de la línea KINGON. Garantía oficial del fabricante: 1 año. ' + MED_FLUJO,
        link: '/comprar-concentrador-oxigeno-portatil-argentina', img: A('880a332c-b080-4b38-9ab2-059aba2ea797.jpg'), add: [A('9a97a311-8305-404b-a93e-e2c073ba1479.jpg')],
        brand: 'KINGON', cat: 4551, type: 'Equipos respiratorios > Concentradores portátiles', tok: /P2-E\b/ },
    { id: 'gce-zen-o', slug: 'concentrador-portatil-gce-zen-o-con-carrito-y-2-baterias', title: 'GCE Zen-O concentrador de oxígeno portátil con 2 baterías y carro, apto vuelos',
        desc: 'Concentrador de oxígeno portátil GCE Zen-O (GCE Healthcare) con 5 niveles de ajuste a pulso. Incluye carro, 2 baterías y cargadores, con autonomía de hasta 8 horas. Peso 4,66 kg con las 2 baterías. Homologado para vuelos (FAA). Garantía oficial del fabricante: 3 años. ' + PULSO + ' ' + MED_FLUJO,
        link: '/comprar-concentrador-oxigeno-portatil-argentina', img: A('47b7a3ad-17b0-41c1-a9a9-0b26530f595e.jpg'), add: [A('731923be-19f2-4856-a0e1-5cfbe1ef831a.jpg'), A('c1223981-5f7b-44d4-8c72-ba979f43f504.jpg')],
        brand: 'GCE Healthcare', cat: 4551, type: 'Equipos respiratorios > Concentradores portátiles', tok: /Zen-?O/i },
    { id: 'philips-simplygo', slug: 'concentrador-de-oxigeno-portatil-simplygo', title: 'Philips SimplyGo concentrador de oxígeno portátil, flujo continuo y pulso, apto vuelos',
        desc: 'Concentrador de oxígeno portátil Philips Respironics SimplyGo con flujo continuo y modo pulso. Apto para vuelos. Garantía oficial del fabricante: 3 años. ' + MED_FLUJO,
        link: '/comprar-concentrador-oxigeno-portatil-argentina', img: A('e5627e6c-819d-40b2-8c96-9d96340f5ebc.jpg'), add: [A('33c3e5ab-69f8-4dba-8d6a-0b348062e6aa.jpg'), A('c6795dd4-d5eb-43ad-9437-6c3fe4260c88.jpg')],
        brand: 'Philips Respironics', cat: 4551, type: 'Equipos respiratorios > Concentradores portátiles', tok: /SimplyGo/i },
    { id: 'mochila-de-oxigeno', slug: 'mochila-de-oxigeno-tubo-de0415-regulador-bolso-carga', title: 'Mochila de oxígeno: tubo 0,415 con regulador y bolso de transporte',
        desc: 'Tubo de oxígeno 0,415 con regulador y bolso tipo mochila para llevarlo en salidas fuera de casa. Incluye recarga. ' + MED_FLUJO,
        link: '/comprar-concentrador-oxigeno-portatil-argentina', img: A('c1aa3c71-a9fb-422a-82ac-222625d0bd3a.jpg'), add: [],
        brand: '', cat: 499692, type: 'Equipos respiratorios > Oxígeno portátil', tok: /Mochila/i },
    // ---- Diagnostico ----
    { id: 'poligrafo-bmc-yh-600b-pro', slug: 'poligrafo-bmc-yh-600b-pro-', title: 'BMC YH-600B PRO polígrafo respiratorio de 4 canales con software, para profesionales',
        desc: 'Polígrafo respiratorio BMC YH-600B PRO (BMC Medical) de 4 canales con software, para hacer estudios de poligrafía respiratoria domiciliaria. Es un equipo para profesionales y centros de salud. Aprobado por ANMAT.',
        link: '/comprar-poligrafo-argentina', img: A('1752508033704-poligrafobmc.jpg'), add: [],
        brand: 'BMC Medical', cat: 3477, type: 'Diagnóstico > Polígrafos respiratorios', tok: /YH-600B/ },
    // Opcion del mismo equipo: no tiene ficha propia, el precio sale de la landing del poligrafo.
    { id: 'poligrafo-bmc-yh-600b-pro-30-canulas', slug: 'poligrafo-bmc-yh-600b-pro-', pag: /30 c[áa]nulas/i, title: 'BMC YH-600B PRO polígrafo respiratorio con 30 cánulas Luer Lock incluidas',
        desc: 'Polígrafo respiratorio BMC YH-600B PRO (BMC Medical) con 30 cánulas Luer Lock incluidas. La cánula es el insumo descartable de cada estudio, así que esta opción permite empezar a hacer poligrafías sin comprar los insumos por separado. Equipo para profesionales y centros de salud. Aprobado por ANMAT.',
        link: '/comprar-poligrafo-argentina', img: A('1752508033704-poligrafobmc.jpg'), add: [],
        brand: 'BMC Medical', cat: 3477, type: 'Diagnóstico > Polígrafos respiratorios', bundle: true, tok: /c[áa]nulas/i },
    // ---- Mascaras adulto ----
    { id: 'mascara-nasal-philips-dreamwear', slug: 'mascarilla-nasal-cpap', title: 'Philips DreamWear máscara nasal de mínimo contacto para CPAP y BiPAP, talles S/M/L',
        desc: 'Máscara nasal Philips Respironics DreamWear de mínimo contacto, en silicona hipoalergénica. Talles S, M y L. ' + COMPAT,
        link: '/mascaras-cpap', img: A('1751037116992-1000306910.jpg'), add: [A('1751037116992-1000306912.jpg'), A('1751037116992-1000306914.jpg')],
        brand: 'Philips Respironics', cat: 7316, type: 'Máscaras CPAP y BiPAP > Nasales', tok: /DreamWear/i },
    { id: 'mascara-nasobucal-philips-dreamwear', slug: 'mascarilla-nasobucal-dreamwear-philips-cpap', title: 'Philips DreamWear Full Face máscara nasobucal para CPAP y BiPAP',
        desc: 'Máscara nasobucal (full face) Philips Respironics DreamWear: cubre nariz y boca con mínimo contacto. ' + COMPAT,
        link: '/mascaras-cpap', img: A('1752247435824-666541bd-3849-490c-bb8b-efd84470de78.jpg'), add: [],
        brand: 'Philips Respironics', cat: 7316, type: 'Máscaras CPAP y BiPAP > Nasobucales', tok: /DreamWear/i },
    { id: 'mascara-nasal-rescomf', slug: 'mascara-nasal-para-cpap-y-bipap', title: 'RESCOMF máscara nasal con apoya frente para CPAP y BiPAP, talles S/M/L',
        desc: 'Máscara nasal RESCOMF con apoya frente y arnés de 4 puntos de fijación. Talles S, M y L. ' + COMPAT,
        link: '/mascaras-cpap', img: A('1751037583753-1000306949.jpg'), add: [],
        brand: 'RESCOMF', cat: 7316, type: 'Máscaras CPAP y BiPAP > Nasales', tok: /RESCOMF/i },
    { id: 'mascara-nasobucal-bmc-f6', slug: 'mascara-cpap-bipap-bmc-f6-nasobucal-con-apoya-frontal-', title: 'BMC F6 máscara nasobucal con apoya frente para CPAP y BiPAP, talles S/M/L',
        desc: 'Máscara nasobucal (full face) BMC F6 (BMC Medical) con apoya frente. Talles S, M y L. ' + COMPAT,
        link: '/mascaras-cpap', img: A('bmc_f2_1.jpg'), add: [A('bmc_f2_2.jpg'), A('bmc_f2_3.jpg')],
        brand: 'BMC Medical', cat: 7316, type: 'Máscaras CPAP y BiPAP > Nasobucales', tok: /F6/ },
    { id: 'mascara-nasal-bmc-n4', slug: 'nascara-nasal-con-apoya-frente-bmc-n4-talle-m-l', title: 'BMC N4 máscara nasal con apoya frente para CPAP y BiPAP, talles M/L',
        desc: 'Máscara nasal BMC N4 (BMC Medical) con apoya frente y almohadilla de gel suave. Talles M y L. ' + COMPAT,
        link: '/mascaras-cpap', img: A('231e89f7-3ea1-4155-84ba-d67de27ddf8d.jpg'), add: [],
        brand: 'BMC Medical', cat: 7316, type: 'Máscaras CPAP y BiPAP > Nasales', tok: /N4/ },
    { id: 'mascara-nasal-bmc-n5a', slug: 'nascara-nasal-sin-apoya-frente-bmc-n5a-talles-swsm-', title: 'BMC N5a máscara nasal sin apoya frente para CPAP y BiPAP, talles SW/S/M',
        desc: 'Máscara nasal BMC N5a (BMC Medical) sin apoya frente, que deja un amplio campo visual. Talles SW, S y M. ' + COMPAT,
        link: '/mascaras-cpap', img: A('7e6ce401-57fd-4b1c-81d6-2bebf2d3cd3d.jpg'), add: [],
        brand: 'BMC Medical', cat: 7316, type: 'Máscaras CPAP y BiPAP > Nasales', tok: /N5a?/i },
    { id: 'mascara-nasal-bmc-multitalle', nombre: /^Máscara Nasal BMC Multitalle/i, title: 'BMC máscara nasal multitalle para CPAP y BiPAP',
        desc: 'Máscara nasal multitalle BMC Medical que se adapta a distintas morfologías faciales. ' + COMPAT,
        link: '/mascaras-cpap', img: A('1752271357751-2ef748a6-b33f-49c3-8995-b61e60435185.jpg'), add: [A('1752271365875-22722f04-6917-404f-8ac2-cc113ec5c474.jpg'), A('1752271376852-aebb48d6-c7f1-4c86-989c-f603caf88de51.jpg')],
        brand: 'BMC Medical', cat: 7316, type: 'Máscaras CPAP y BiPAP > Nasales', tok: /Multitalle/i },
    { id: 'mascara-nasal-resmed-airfit-minimo-contacto', slug: '-mascara-nasal-airfit-mimimo-contacto-talles-swsm-resmed', title: 'ResMed AirFit máscara nasal de mínimo contacto sin apoya frente, talles SW/S/M',
        desc: 'Máscara nasal ResMed AirFit de mínimo contacto, sin apoya frente. Talles SW, S y M. ' + COMPAT,
        link: '/mascaras-cpap', img: A('d34cfe5d-2be4-4768-9901-57d4651d2380.jpg'), add: [A('1c3fee16-c120-4ef1-af2f-e00dada4e300.jpg'), A('0a7b8e0a-0709-4114-8c50-92efa366a907.jpg')],
        brand: 'ResMed', cat: 7316, type: 'Máscaras CPAP y BiPAP > Nasales', tok: /AirFit/i },
    { id: 'mascara-almohadillas-yuwell-yp-01', slug: 'mascara-nasal-yuwell-pillow-l-o-m-yp-01-para-cpap-y-bipap', title: 'Yuwell YP-01 máscara de almohadillas nasales (pillow) para CPAP y BiPAP, talles M/L',
        desc: 'Máscara de almohadillas nasales (pillow) Yuwell YP-01, de mínima presencia facial. Talles M y L. ' + COMPAT,
        link: '/mascaras-cpap', img: A('1752270243027-43fec688-2e01-4f0b-9f5f-76e8fa11db9d.jpg'), add: [A('1752270250486-27f0a250-eef9-4dcc-b47b-76ffe6cb87b1.jpg'), A('1752270260092-219626ea-994c-4bcf-a56c-5e53d48b876a.jpg')],
        brand: 'Yuwell', cat: 7316, type: 'Máscaras CPAP y BiPAP > Almohadillas nasales', tok: /YP-01|Pillow/i },
    { id: 'mascara-buconasal-yuwell-apoya-frente', slug: 'buconasal-con-apoya-frente-yuwell-cpapbpap', title: 'Yuwell máscara buconasal con apoya frente para CPAP y BiPAP, talles S/M/L',
        desc: 'Máscara buconasal (full face) Yuwell con apoya frente. Talles S, M y L. ' + COMPAT,
        link: '/mascaras-cpap', img: A('7c70e16b-1955-44ed-9297-3088a17005e5.jpg'), add: [],
        brand: 'Yuwell', cat: 7316, type: 'Máscaras CPAP y BiPAP > Nasobucales', tok: /Yuwell/i },
    { id: 'mascara-buconasal-yuwell-yf02', slug: 'buconasal-sin-apoya-frente-yuwell-yf02-cpapbpap', title: 'Yuwell YF02 máscara buconasal sin apoya frente para CPAP y BiPAP, talles S/M/L',
        desc: 'Máscara buconasal (full face) Yuwell YF02 sin apoya frente, con campo visual amplio. Talles S, M y L. ' + COMPAT,
        link: '/mascaras-cpap', img: A('bdaf0580-27be-4e1b-86d4-bc5216e7b94f.jpg'), add: [A('8fab2d3a-a457-4f5a-b5a9-0dae668ffe65.jpg'), A('d7d319c2-95ba-4615-be8e-7dc834f0cb12.jpg')],
        brand: 'Yuwell', cat: 7316, type: 'Máscaras CPAP y BiPAP > Nasobucales', tok: /YF02/i },
    { id: 'mascara-buconasal-bmc-f5a', slug: 'buconasal-sin-apoya-frente-bmc-sml-f5a-cpapbpap', title: 'BMC F5A máscara buconasal sin apoya frente para CPAP y BiPAP, talles S/M/L',
        desc: 'Máscara buconasal (full face) BMC F5A (BMC Medical) sin apoya frente, con amplia visión. Talles S, M y L. ' + COMPAT,
        link: '/mascaras-cpap', img: A('a1504e31-1c48-4f61-b0d8-f7bb5bc03c78.jpg'), add: [A('9c8b493f-6264-4cf3-910e-0c3526053f61.jpg')],
        brand: 'BMC Medical', cat: 7316, type: 'Máscaras CPAP y BiPAP > Nasobucales', tok: /F5A/i },
    { id: 'mascara-nasobucal-resmed-airfit-f20', nombre: /AirFit F20/i, title: 'ResMed AirFit F20 máscara nasobucal para CPAP y BiPAP, talles S/M/L',
        desc: 'Máscara nasobucal (full face) ResMed AirFit F20, de sellado amplio. Talles S, M y L. ' + COMPAT,
        link: '/mascaras-cpap', img: S + '/artifacts/airfit_f20.jpg', add: [S + '/artifacts/airfit_f20_lifestyle1.jpg', S + '/artifacts/airfit_f20_uso.jpg'],
        brand: 'ResMed', cat: 7316, type: 'Máscaras CPAP y BiPAP > Nasobucales', tok: /F20/ },
    { id: 'mascara-nasobucal-resmed-airfit-f30', slug: 'mascarilla-nasobucal-airfit-f30-resmed-cpapbpap', title: 'ResMed AirFit F30 máscara nasobucal de bajo perfil para CPAP y BiPAP',
        desc: 'Máscara nasobucal (full face) ResMed AirFit F30 de contacto mínimo y bajo perfil: apoya por debajo de la nariz. ' + COMPAT,
        link: '/mascaras-cpap', img: A('3b1f7377-109b-4572-a96c-9a2727df3d4f.jpg'), add: [],
        brand: 'ResMed', cat: 7316, type: 'Máscaras CPAP y BiPAP > Nasobucales', tok: /F30/ },
    { id: 'mascara-buconasal-bmc-f2-codo-azul', slug: 'mascara-buconasal-bmc-f2-codo-azul', title: 'BMC F2 máscara buconasal no ventilada con codo azul, para respiradores de terapia intensiva',
        desc: 'Máscara buconasal (full face) BMC F2 (BMC Medical) no ventilada, con codo azul y sin puertos de exhalación: para respiradores de terapia intensiva y VNI con válvula espiratoria. No es para CPAP ni BiPAP domiciliario. Silicona médica, conexión estándar de 22 mm. Aprobada por ANMAT.',
        link: '/mascaras-cpap', img: A('bmc_f2_codo_azul_2.jpg'), add: [A('bmc_f2_codo_azul_1.jpg')],
        brand: 'BMC Medical', cat: 7316, type: 'Máscaras CPAP y BiPAP > Terapia intensiva', tok: /F2/ },
    // ---- Pediatricas ----
    { id: 'mascara-pediatrica-hsiner-cirri-mini', slug: 'nascara-nasal-pediatrica-nasal-hsiner-cirri-mini-s-m-l-xs', title: 'HSINER Cirri Mini máscara nasal pediátrica para CPAP y BiPAP, talles XS/S/M/L',
        desc: 'Máscara nasal pediátrica HSINER Cirri Mini para CPAP y BiPAP. Talles XS, S, M y L. El tipo y el talle de máscara se eligen según la indicación del médico tratante.',
        link: '/mascaras-pediatricas', img: A('0714643b-30ed-48d5-bf66-1d41dbfd5805.jpg'), add: [],
        brand: 'HSINER', cat: 7316, type: 'Máscaras CPAP y BiPAP > Pediátricas', tok: /Cirri/i },
    { id: 'mascara-pediatrica-philips-wisp', slug: 'nascara-nasal-peditrica-jirafa-philips-respironics', title: 'Philips Wisp máscara nasal pediátrica (jirafa) para CPAP y BiPAP',
        desc: 'Máscara nasal pediátrica Philips Respironics Wisp, con funda de diseño de jirafa. Para CPAP y BiPAP. El tipo y el talle de máscara se eligen según la indicación del médico tratante.',
        link: '/mascaras-pediatricas', img: A('876bc618-e07c-4007-8341-8660f0226cb4.jpg'), add: [],
        brand: 'Philips Respironics', cat: 7316, type: 'Máscaras CPAP y BiPAP > Pediátricas', tok: /Wisp/i },
    { id: 'infant-cpap-kit-neonatal', slug: 'nascara-nasal-pediatrica-infant-cpap-kit-00-0-1-2-3-4-5', title: 'Infant CPAP Kit neonatal, tallas 00 a 5',
        desc: 'Kit de CPAP neonatal con tallas 00, 0, 1, 2, 3, 4 y 5. El tipo y el talle de interfaz se eligen según la indicación del médico tratante.',
        link: '/mascaras-pediatricas', img: A('7ed94670-d1a4-4454-8f1a-71ce4cf90af6.jpg'), add: [],
        brand: '', cat: 7316, type: 'Máscaras CPAP y BiPAP > Pediátricas', tok: /Infant/i },
    // ---- Insumos ----
    { id: 'tubuladura-cpap-bipap', slug: 'tubuladura-para-cpap-bipap', title: 'Tubuladura para CPAP y BiPAP, 22 mm de diámetro, 1,8 m',
        desc: 'Tubuladura de repuesto para equipos CPAP, AutoCPAP y BiPAP, de 22 mm de diámetro estándar y 1,8 m de largo aproximado.',
        link: '/mascaras-cpap', img: A('tubuladura_cpap_bipap.jpg'), add: [],
        brand: '', cat: 4551, type: 'Insumos > Tubuladuras', tok: /Tubuladura/i },
];

// Catalogo del home: los arrays ofertas[] y tienda[] de LandingPage.jsx son datos planos
// (strings, numeros, arrays) dentro de un .jsx que node no puede importar, asi que se
// recortan del texto y se evaluan en un contexto vacio, sin acceso a nada del proceso.
export function leerCatalogo(jsx) {
    const leer = (nombre) => {
        const ini = jsx.indexOf(`const ${nombre} = [`);
        if (ini < 0) throw new Error(`no encontre "const ${nombre} = [" en LandingPage.jsx`);
        const fin = jsx.indexOf('\n];', ini);
        if (fin < 0) throw new Error(`no encontre el cierre de ${nombre}[] en LandingPage.jsx`);
        const arr = vm.runInNewContext('(' + jsx.slice(ini + `const ${nombre} = `.length, fin + 2) + ')', {}, { timeout: 1000 });
        if (!Array.isArray(arr)) throw new Error(`${nombre} no es un array`);
        return arr;
    };
    return [...leer('ofertas'), ...leer('tienda')];
}

// Mismo criterio que parsePrice del prerender: solo un precio limpio ("$499.000",
// "U$S 89,50") es un precio; "consultar", "desde..." o rangos devuelven null.
function precioLimpio(raw) {
    const m = String(raw || '').trim().match(/^(?:U\$S\s*([\d.,]+)|\$\s*([\d.]+))$/i);
    if (!m) return null;
    if (m[1]) {
        const n = m[1].replace(/\./g, '').replace(',', '.');
        return /^\d+(\.\d+)?$/.test(n) ? { valor: Number(n), moneda: 'USD' } : null;
    }
    const n = m[2].replace(/\./g, '');
    return /^\d+$/.test(n) ? { valor: Number(n), moneda: 'ARS' } : null;
}

// Como se ve ese precio escrito en el sitio ("$1.300.000", "U$S 1.880", "U$S 89,50").
function precioEscrito({ valor, moneda }) {
    const miles = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    if (moneda === 'ARS') return '$' + miles(valor);
    const ent = Math.trunc(valor);
    const cent = Math.round((valor - ent) * 100);
    return 'U$S ' + miles(ent) + (cent ? ',' + String(cent).padStart(2, '0') : '');
}

const textoVisible = (h) => h.replace(/<head[\s\S]*?<\/head>/gi, ' ').replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');

// El precio tiene que figurar en la pagina con el modelo a menos de 400 caracteres antes
// (mismo chequeo que verificar-feed.cjs hace contra el sitio en vivo).
function precioVisible(texto, escrito, tok) {
    let k = texto.indexOf(escrito);
    while (k >= 0) {
        const corta = !/[0-9]/.test(texto[k + escrito.length] || '');
        if (corta && tok.test(texto.slice(Math.max(0, k - 400), k + 50))) return true;
        k = texto.indexOf(escrito, k + 1);
    }
    return false;
}

const ENVIO_SIN_CARGO = /env[íi]o (sin cargo|gratis)/i;
const PROHIBIDO = /(m[áa]s barat|econ[óo]mic|\bmejor\b|\boferta|env[íi]o|gratis|sin cargo|cuota|entrega|inmediat|garant[íi]a (del? )?ANMAT|ANMAT[^.]{0,15}garant|premium|ideal|\bel m[áa]s\b|\bla m[áa]s\b|stock)/i;

/**
 * @param catalogo     fichas de LandingPage.jsx (leerCatalogo)
 * @param localPages   src/features/seo/localPages.js
 * @param cuerpoDe     (ruta) => HTML del body estatico que sirve esa ruta, o '' si no existe
 * @param existeArchivo (ruta publica, ej. "/artifacts/x.jpg") => boolean
 * @returns { tsv, incluidos, total, omitidos: [{ id, motivo }], avisos: [] }
 */
export function generarFeed({ catalogo, localPages, cuerpoDe, existeArchivo }) {
    const omitidos = [];
    const avisos = [];
    const filas = [];
    const textos = new Map();
    const textoDe = (ruta) => {
        if (!textos.has(ruta)) textos.set(ruta, textoVisible(cuerpoDe(ruta) || ''));
        return textos.get(ruta);
    };
    const ids = new Set();

    for (const p of FEED) {
        const fichas = p.slug ? catalogo.filter((f) => f.slug === p.slug)
            : p.nombre ? catalogo.filter((f) => !f.slug && p.nombre.test(f.name || '')) : [];
        if (!fichas.length) { omitidos.push({ id: p.id, motivo: `sin ficha en LandingPage.jsx (${p.slug || p.nombre})` }); continue; }

        let precio;
        if (p.pag) {
            const pagina = localPages.find((x) => '/' + x.slug === p.link);
            const prod = (pagina?.products || []).find((x) => p.pag.test(x.name));
            precio = prod && precioLimpio(prod.price);
            if (!precio) { omitidos.push({ id: p.id, motivo: `sin precio limpio en products[] de ${p.link} (${p.pag})` }); continue; }
        } else {
            const precios = [...new Set(fichas.map((f) => f.price))];
            if (precios.length > 1) { omitidos.push({ id: p.id, motivo: `la ficha figura con dos precios: ${precios.join(' / ')}` }); continue; }
            precio = precioLimpio(precios[0]);
            if (!precio) { omitidos.push({ id: p.id, motivo: `precio de la ficha no es un importe: "${precios[0]}"` }); continue; }
        }

        const texto = textoDe(p.link);
        if (!texto) { omitidos.push({ id: p.id, motivo: `no hay pagina estatica para ${p.link}` }); continue; }
        const escrito = precioEscrito(precio);
        if (!precioVisible(texto, escrito, p.tok)) {
            omitidos.push({ id: p.id, motivo: `${escrito} no se ve junto a ${p.tok} en ${p.link}` });
            continue;
        }

        const ruta = (url) => url.startsWith(S) ? url.slice(S.length) : url;
        if (!existeArchivo(ruta(p.img))) { omitidos.push({ id: p.id, motivo: `no existe la foto ${ruta(p.img)}` }); continue; }
        const adicionales = p.add.filter((u) => {
            const ok = existeArchivo(ruta(u));
            if (!ok) avisos.push(`${p.id}: se saco la foto adicional ${ruta(u)} (no existe)`);
            return ok;
        });

        if (ids.has(p.id)) { omitidos.push({ id: p.id, motivo: 'id duplicado' }); continue; }
        if (p.id.length > 50 || p.title.length > 150 || p.desc.length > 5000) {
            omitidos.push({ id: p.id, motivo: 'supera un limite de Google (id 50, title 150, description 5000)' });
            continue;
        }
        const prohibido = (p.title + ' ' + p.desc).match(PROHIBIDO);
        if (prohibido) avisos.push(`${p.id}: el texto dice "${prohibido[0]}" (el feed va sin envio, cuotas, oferta ni superlativos)`);
        ids.add(p.id);

        const envio = fichas.some((f) => ENVIO_SIN_CARGO.test(f.note || '')) ? 'envio-sin-cargo' : 'envio-a-cotizar';
        filas.push([p.id, p.title, p.desc, S + p.link, p.img, adicionales.join(','), 'in_stock',
            precio.valor.toFixed(2) + ' ' + precio.moneda, 'new', p.brand, 'no', p.cat, p.type, envio, p.bundle ? 'yes' : '']);
    }

    const columnas = ['id', 'title', 'description', 'link', 'image_link', 'additional_image_link', 'availability', 'price', 'condition',
        'brand', 'identifier_exists', 'google_product_category', 'product_type', 'shipping_label', 'is_bundle'];
    const limpio = (s) => String(s).replace(/[\t\r\n]+/g, ' ').trim();
    // Con BOM: es el formato con el que Merchant Center proceso el archivo manual del 15-oct-2026.
    const tsv = '﻿' + [columnas.join('\t'), ...filas.map((f) => f.map(limpio).join('\t'))].join('\n') + '\n';
    return { tsv, incluidos: filas.length, total: FEED.length, omitidos, avisos };
}
