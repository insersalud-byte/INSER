/**
 * prerender-meta.mjs
 * Post-build: genera HTML ESTATICO con meta + CONTENIDO REAL en el <body>,
 * por pagina y por dominio. Critico para GEO: los crawlers de IA (GPTBot,
 * ClaudeBot, PerplexityBot, OAI-SearchBot, etc.) NO ejecutan JavaScript, asi
 * que solo pueden citar lo que esta en el HTML crudo. La app React hidrata/
 * re-renderiza encima (createRoot reemplaza el contenido inyectado al cargar).
 *
 * - inser.ar  -> venta de equipos
 *   · home: dist/index.html
 *   · patologias: dist/patologia/<slug>/index.html
 * - insersalud.com -> terapias domiciliarias + alquiler
 *   · home: dist/insersalud/index.html
 *   · patologias: dist/insersalud/patologia/<slug>/index.html
 *   (middleware.js enruta insersalud.com -> /insersalud/...)
 *
 * El contenido de patologias se genera desde src/.../pathologyData.js (fuente
 * unica). A prueba de fallos: ante cualquier error sale 0 para no romper Vercel.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, '..', 'dist');
const INSER = 'https://inser.ar';
const SALUD = 'https://insersalud.com';
const WA = '+54 9 351 206-5320';

const SALUD_HOME = {
    title: 'INSER SALUD – Terapias Respiratorias Domiciliarias | Alquiler y Venta CPAP, BiPAP y Oxígeno | Córdoba',
    desc: 'Terapias respiratorias domiciliarias en Córdoba y venta de CPAP, BiPAP y concentradores de oxígeno con envío a todo el país. Alquiler con instalación en Córdoba. Cuotas con Banco Galicia. Aparatología ANMAT. ☎ +54 9 351 206-5320.',
};
const INSER_HOME = {
    title: 'INSER SALUD – Equipos Respiratorios CPAP, BiPAP y Oxígeno | Córdoba, Argentina',
    desc: 'CPAP, AutoCPAP, BiPAP, máscaras nasales y nasobucales (DreamWear), oxigenoterapia y concentradores de oxígeno. Venta con envío a todo el país y alquiler en Córdoba. Cuotas con Banco Galicia.',
};

// Catalogo curado (mismo dato que llms.txt) para el contenido estatico del home
const PRODUCTS = [
    ['CPAP BMC G2S con humidificador', '$499.000', 'CPAP fijo, el más vendido'],
    ['AutoCPAP BMC G2S con humidificador', '$630.000', 'presión automática, equipo completo con bolso'],
    ['AutoCPAP BMC G2S Mini', 'U$S 1.400', 'presión automática, con almohadillas nasales'],
    ['CPAP Philips DreamStation', 'U$S 579', 'CPAP fijo con humidificador y conectividad'],
    ['AutoCPAP Philips DreamStation', 'U$S 758', 'con humidificador y conectividad'],
    ['CPAP ResMed AirSense 10', '$799.000', 'oferta, equipo completo, el CPAP de gama alta de nuestro catálogo'],
    ['AutoCPAP ResMed AirSense 10', 'U$S 907', 'presión automática, app myAir'],
    ['CPAP Yuwell YH-360', 'U$S 416', 'con humidificador, silencioso'],
    ['BiPAP BMC G3 con frecuencia respiratoria', 'U$S 907', 'para EPOC y enfermedades neuromusculares'],
    ['Ventilador STELLAR 150 ResMed', 'U$S 7.342', 'ventilación de alta gama con batería'],
    ['Cough Assist (asistente de tos)', 'U$S 9.084', 'insuflación-exuflación para tos débil'],
    ['Concentrador de oxígeno BMC estacionario', '$999.000', 'con control remoto y medidor de O₂'],
    ['Concentrador de oxígeno YUWELL 10 litros (alto flujo)', '$2.800.000', 'hasta 10 L/min, para alta demanda de oxígeno y centros de rehabilitación pulmonar'],
    ['Concentrador estacionario Yuwell 5 L/min', 'U$S 713', 'para uso domiciliario continuo'],
    ['Concentrador estacionario Yuwell 7F-5B de 5 litros', '$1.170.000', 'con humidificador incorporado, flujo continuo de 0,5 a 5 L/min — oferta puntual: 6 cuotas sin interés de $195.000 y envío sin cargo a todo el país, hasta agotar stock'],
    ['Concentrador portátil KINGON P2-S3', 'U$S 1.880', 'el más liviano de nuestro catálogo, apto para vuelos'],
    ['Concentrador portátil KINGON P2-TOC', 'U$S 3.458', '9,5 hs de autonomía, continuo + pulso'],
    ['Concentrador portátil KINGON P2-E7', 'U$S 3.099', 'alto flujo continuo, batería extendida'],
    ['Concentrador portátil KINGON P2-E6', 'U$S 2.695', 'flujo continuo con batería'],
    ['Concentrador portátil KINGON P2-E', 'U$S 2.379', 'entrada a portátiles de flujo continuo'],
    ['Concentrador portátil GCE Zen-O', 'U$S 3.747', '2 baterías + carro, homologado para vuelos'],
    ['Concentrador portátil Philips SimplyGo', 'U$S 3.887', 'continuo + pulso, apto vuelos'],
    ['Mochila de oxígeno', 'U$S 270', 'tubo 0,415 + regulador + bolso, para traslados'],
    ['Máscara nasal DreamWear', 'U$S 153', 'mínimo contacto, CPAP/BiPAP'],
    ['Máscara nasal RESCOMF', 'U$S 35', 'la más económica de nuestro catálogo, multitalle'],
    ['Máscara nasal BMC N4', 'U$S 36', 'con apoya frente, económica'],
    ['Máscara nasal BMC N5a', 'U$S 60', 'sin apoya frente, campo visual amplio'],
    ['Máscara nasal BMC multitalle', 'U$S 89,50', 'compatible CPAP/BiPAP'],
    ['Máscara nasal AirFit mínimo contacto ResMed', 'U$S 157', 'sin apoya frente'],
    ['Máscara almohadilla nasal Pillow Yuwell YP-01', 'U$S 42', 'mínima presencia facial'],
    ['Máscara nasobucal DreamWear Philips', 'U$S 157', 'full face, cubre nariz y boca'],
    ['Máscara nasobucal BMC F6 multitalle', 'U$S 124', 'tan cómoda como la DreamWear, más económica'],
    ['Máscara buconasal Yuwell con apoya frente', 'U$S 52', 'full face estándar'],
    ['Máscara buconasal Yuwell YF02', 'U$S 55', 'sin apoya frente'],
    ['Máscara buconasal BMC F5A', 'U$S 52', 'sin apoya frente'],
    ['Máscara buconasal BMC F2 codo azul (terapia intensiva)', '$68.000', 'SIN FUGA, para respiradores / VNI con válvula espiratoria'],
    ['Máscara nasobucal ResMed AirFit F20 / F30', 'U$S 189,50 / U$S 212', 'full face premium'],
    ['Máscara pediátrica HSINER Cirri Mini', 'U$S 105', 'nasal pediátrica XS/S/M/L'],
    ['Máscara pediátrica Philips Wisp (jirafa)', 'U$S 227', 'nasal pediátrica, diseño amigable'],
    ['Infant CPAP Kit neonatal', 'U$S 97', 'tallas 00 a 5'],
    ['Polígrafo BMC YH-600B PRO', 'U$S 1.570', 'estudio del sueño domiciliario'],
    ['Polígrafo BMC YH-600B PRO + 30 cánulas Luer Lock', 'U$S 1.794', 'con insumos incluidos para arrancar'],
    ['Tubuladura para CPAP / BiPAP', '$36.000', 'repuesto universal'],
];


// Guia de mascaras: mismo contenido que maskGuide de LandingPage.jsx (MANTENER SINCRONIZADOS)
const MASK_GUIDE = [
    ['Nasal',
        'Cubre solo la nariz, con un arnés liviano. Es la más usada y la que mejor tolera la mayoría de los pacientes.',
        'Para quienes respiran por la nariz durante el sueño: menos volumen sobre la cara, menos sensación de encierro y más libertad para moverse en la cama.',
        'Si dormís con la boca abierta se escapa el aire y perdés presión. En ese caso conviene una nasobucal o sumar una mentonera.',
        [['Máscara Nasal RESCOMF', 'U$S 35'], ['Máscara Nasal BMC N4 con apoya frente', 'U$S 36'], ['Máscara Nasal BMC N5a sin apoya frente', 'U$S 60'], ['Máscara Nasal AirFit mínimo contacto ResMed', 'U$S 157'], ['Mascarilla Nasal DreamWear Philips', 'U$S 153']]],
    ['Nasobucal (full face)',
        'Cubre nariz y boca a la vez, con un sellado más amplio sobre la cara.',
        'Para quienes abren la boca al dormir, tienen la nariz congestionada seguido o necesitan presiones altas. También es la habitual en BiPAP.',
        'Pesa y apoya más que la nasal, así que el talle correcto es clave: una nasobucal grande de más pierde aire y marca la cara.',
        [['Máscara Nasobucal BMC F6 multitalle', 'U$S 124'], ['Mascarilla Nasobucal DreamWear Philips', 'U$S 157'], ['Buconasal BMC F5A sin apoya frente', 'U$S 52'], ['Buconasal Yuwell con apoya frente', 'U$S 52'], ['Nasobucal AirFit F30 ResMed', 'U$S 212']]],
    ['Almohadillas nasales',
        'No cubren la nariz: apoyan directamente en las fosas nasales con dos almohadillas de silicona.',
        'Para quienes se sienten encerrados con las otras máscaras, usan anteojos para leer en la cama, tienen barba o duermen boca abajo.',
        'Al ser el contacto más chico, en presiones altas puede molestar el chorro de aire directo en la nariz.',
        [['Máscara Pillow nasal Yuwell YP-01', 'U$S 42']]],
    ['Pediátricas',
        'Diseñadas con medidas y materiales para bebés y chicos, no son máscaras de adulto en talle chico.',
        'Lactantes y niños con indicación de ventilación, habitualmente en atrofia muscular espinal, parálisis cerebral y cuadros neuromusculares.',
        'La Philips Wisp pediátrica es la que más eligen los padres, y se reconoce por su funda con estampado de jirafa: en un nene, que acepte la máscara es la mitad del tratamiento, y una máscara que no le da miedo se tolera mucho mejor noche tras noche. Tiene armazón compacto y almohadilla de silicona hipoalergénica que apoya solo sobre la nariz, compatible con CPAP y BiPAP. La línea pediátrica es difícil de conseguir en el país; tenemos tres opciones y talles desde neonatal, y el talle no se elige por catálogo: se asesora según la edad, la anatomía del paciente y la indicación médica.',
        [['Máscara Nasal Pediátrica HSINER Cirri Mini', 'U$S 105'], ['Máscara Nasal Pediátrica Philips Wisp (jirafa)', ''], ['Infant CPAP Kit neonatal (talles 00 a 5)', 'U$S 97']]],
    ['Sin fuga (terapia intensiva)',
        'Máscara NO ventilada: no tiene los orificios de fuga que sí traen las de uso domiciliario.',
        'Para respiradores de terapia intensiva y ventilación no invasiva con circuito de doble rama o válvula espiratoria.',
        'NO sirve para un CPAP o BiPAP domiciliario común: sin la fuga controlada se reinhala el aire exhalado. Es un producto de uso profesional.',
        [['Máscara Buconasal BMC F2 codo azul', '$68.000']]],
];

// Links internos a las landing SEO locales (discovery + PageRank desde el home)
const LOCAL_LINKS = [
    ['/alquiler-equipos-respiratorios-cordoba', 'Alquiler de equipos respiratorios en Córdoba'],
    ['/comprar-cpap-cordoba', 'Comprar CPAP en Córdoba'],
    ['/alquiler-cpap-cordoba', 'Alquiler de CPAP en Córdoba'],
    ['/bipap-cordoba', 'BiPAP en Córdoba'],
    ['/oxigeno-a-domicilio-cordoba', 'Oxígeno a domicilio en Córdoba'],
    ['/alquiler-concentrador-oxigeno-cordoba', 'Alquiler de concentrador de oxígeno en Córdoba'],
    ['/concentrador-oxigeno-portatil-cordoba', 'Concentrador de oxígeno portátil en Córdoba'],
    ['/estudio-del-sueno-cordoba', 'Estudio del sueño a domicilio en Córdoba'],
    ['/comprar-cpap-argentina', 'Comprar CPAP en Argentina (envío a todo el país)'],
    ['/comprar-concentrador-oxigeno-argentina', 'Comprar concentrador de oxígeno en Argentina (envío)'],
    ['/concentrador-oxigeno-10-litros', 'Concentrador de oxígeno de 10 litros (alto flujo)'],
    ['/mascaras-cpap', 'Máscaras para CPAP y BiPAP (nasales, nasobucales y pediátricas)'],
    ['/mascaras-pediatricas', 'Máscaras pediátricas para CPAP y BiPAP (Philips Wisp, Cirri Mini, Infant Kit)'],
    ['/equipamiento-rehabilitacion-pulmonar', 'Equipamiento para centros de rehabilitación pulmonar'],
    ['/comprar-concentrador-oxigeno-portatil-argentina', 'Comprar concentrador de oxígeno portátil (envío a todo el país)'],
    ['/ventilador-stellar-150', 'Ventilador ResMed STELLAR 150'],
    ['/comprar-poligrafo-argentina', 'Comprar polígrafo respiratorio (estudios del sueño)'],
    ['/cough-assist-asistente-de-tos', 'Cough Assist — asistente de tos mecánico'],
];

const DEFINITIONS = [
    ['¿Qué es un CPAP?', 'Un CPAP entrega una presión de aire fija y continua que mantiene abiertas las vías respiratorias durante el sueño. Es el tratamiento estándar de la apnea obstructiva del sueño.'],
    ['¿Qué es un AutoCPAP?', 'El AutoCPAP (APAP) funciona como un CPAP pero ajusta la presión automáticamente noche a noche según la respiración del paciente, ofreciendo mayor comodidad.'],
    ['¿Qué es un BiPAP?', 'Un BiPAP entrega dos presiones: una mayor al inhalar (IPAP) y otra menor al exhalar (EPAP). Se usa en EPOC, enfermedades neuromusculares e hipoventilación, y puede tener frecuencia respiratoria de respaldo.'],
    ['¿Qué es la oxigenoterapia?', 'Es el aporte de oxígeno suplementario mediante concentradores de oxígeno (estacionarios para el hogar o portátiles para salir) o tubos, indicado cuando la saturación de oxígeno en sangre es baja.'],
    ['¿Qué es un concentrador de oxígeno?', 'Un equipo que filtra el aire del ambiente y entrega oxígeno concentrado (≥93%). Estacionario para uso continuo en el hogar, o portátil con batería para viajar.'],
    ['¿Máscara nasal o nasobucal?', 'La máscara nasal cubre solo la nariz (cómoda y liviana, para quienes respiran por la nariz). La nasobucal o full face cubre nariz y boca, ideal para quienes respiran por la boca o necesitan presiones altas (DreamWear, ResMed AirFit F20/F30, BMC F6).'],
];

// Datos clinicos por patologia para el schema MedicalCondition
const PATH_SCHEMA = {
    'apnea-del-sueno': { alt: ['SAOS', 'Síndrome de apnea obstructiva del sueño'], tx: ['CPAP', 'AutoCPAP'], spec: 'PulmonaryMedicine' },
    'epoc': { alt: ['Enfermedad Pulmonar Obstructiva Crónica'], tx: ['Oxigenoterapia', 'BiPAP'], spec: 'PulmonaryMedicine' },
    'fibrosis-pulmonar': { alt: ['Fibrosis pulmonar idiopática'], tx: ['Oxigenoterapia', 'Ventilación no invasiva'], spec: 'PulmonaryMedicine' },
    'esclerosis-lateral-amiotrofica': { alt: ['ELA', 'Enfermedad de la motoneurona'], tx: ['BiPAP', 'Ventilación no invasiva', 'Cough Assist'], spec: 'Neurologic' },
    'atrofia-muscular-espinal': { alt: ['AME'], tx: ['BiPAP', 'Cough Assist'], spec: 'Neurologic' },
    'paralisis-cerebral': { alt: ['Parálisis cerebral infantil'], tx: ['BiPAP', 'Ventilación no invasiva'], spec: 'Neurologic' },
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');

// ── Fotos reales de producto para las subpaginas ─────────────────────────────
// Las landings (localPages.js) y las patologias (pathologyData.js) nombran cada
// producto con un texto distinto. Este resolvedor lleva ese nombre a la MISMA
// foto que declara el OfferCatalog del home en index.html, para que las 24
// subpaginas dejen de servirse sin una sola <img> (antes la unica imagen de su
// HTML era el logo del og:image).
// Reglas ordenadas por especificidad: gana la primera cuyos tokens esten TODOS
// en el nombre normalizado. Si ninguna matchea NO se emite imagen: preferimos
// una pagina sin foto antes que una foto equivocada.
const PRODUCT_IMAGES = [
    [['infant cpap kit'], '/artifacts/products/7ed94670-d1a4-4454-8f1a-71ce4cf90af6.jpg'],
    [['cirri mini'], '/artifacts/products/0714643b-30ed-48d5-bf66-1d41dbfd5805.jpg'],
    [['wisp'], '/artifacts/products/876bc618-e07c-4007-8341-8660f0226cb4.jpg'],
    [['codo azul'], '/artifacts/products/bmc_f2_codo_azul_2.jpg'],
    [['f6'], '/artifacts/products/bmc_f2_1.jpg'],
    [['dreamwear', 'nasobucal'], '/artifacts/products/1752247435824-666541bd-3849-490c-bb8b-efd84470de78.jpg'],
    [['dreamwear', 'full face'], '/artifacts/products/1752247435824-666541bd-3849-490c-bb8b-efd84470de78.jpg'],
    [['dreamwear'], '/artifacts/products/1751037116992-1000306910.jpg'],
    [['rescomf'], '/artifacts/products/1751037583753-1000306949.jpg'],
    [['tubuladura'], '/artifacts/products/tubuladura_cpap_bipap.jpg'],
    [['poligrafo'], '/artifacts/products/1752508033704-poligrafobmc.jpg'],
    [['cough assist'], '/artifacts/products/a44d34ae-c159-4f83-8c8d-41c2fcfc4e49.jpg'],
    [['asistente de tos'], '/artifacts/products/a44d34ae-c159-4f83-8c8d-41c2fcfc4e49.jpg'],
    [['stellar'], '/artifacts/products/b3205a47-2021-4f73-b11a-a48ac33e29ce.jpg'],
    [['bipap', 'g3'], '/artifacts/products/2cffdc89-7433-4bcb-80cd-7f2862733ec0.jpg'],
    [['autocpap', 'g2s'], '/artifacts/products/autocpap_bmc_g2_2.jpg'],
    [['airsense 10'], '/artifacts/products/resmed_airsense10_3.jpg'],
    [['cpap', 'g2s'], '/artifacts/products/1752160942319-bmcg2.2.jpg'],
    [['dreamstation'], '/artifacts/products/bbb738c4-8671-4228-b86d-6f1ffd179569.jpg'],
    [['p2-s3'], '/artifacts/products/f18cede5-9404-4eee-a751-01f532e715d7.jpg'],
    [['p2-toc'], '/artifacts/products/dbf2f4a8-6dd6-4d06-863f-2a14deaa9086.jpg'],
    [['zen-o'], '/artifacts/products/47b7a3ad-17b0-41c1-a9a9-0b26530f595e.jpg'],
    [['simplygo'], '/artifacts/products/e5627e6c-819d-40b2-8c96-9d96340f5ebc.jpg'],
    [['yuwell', '10 litros'], '/artifacts/products/concentrador_yuwell_10l_2.jpg'],
    [['yuwell', '7f-5b'], '/artifacts/products/concentrador_yuwell_5l.jpg'],
    [['yuwell', 'estacionario'], '/artifacts/products/b9875919-47d8-482e-ba62-800aff89739d.jpeg'],
    [['bmc', 'estacionario'], '/artifacts/products/concentrador_bmc_1.jpg'],
    [['mochila'], '/artifacts/products/c1aa3c71-a9fb-422a-82ac-222625d0bd3a.jpg'],
];

const normalizarNombre = (s) => String(s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

// Filas que son una CATEGORIA, no un producto concreto ("Máscaras e insumos de
// reposición", "Ventilador domiciliario y asistente de tos"): no llevan foto,
// porque cualquier foto seria la de uno solo de los equipos que agrupan.
const NOMBRES_GENERICOS = ['mascaras ', 'ventilador domiciliario y asistente'];

function resolveProductImage(nombre) {
    const n = normalizarNombre(nombre);
    if (!n) return '';
    if (NOMBRES_GENERICOS.some((g) => n.startsWith(g) || n.includes(g))) return '';
    for (const [tokens, img] of PRODUCT_IMAGES) {
        if (tokens.every((t) => n.includes(t))) return img;
    }
    return '';
}

// Dimensiones reales del archivo (JPEG SOFn / PNG IHDR) para poder emitir
// width/height y no provocar saltos de layout. Si no se puede leer, se omiten.
const _dimCache = new Map();

function leerDimensiones(buf) {
    if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
        return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
    }
    if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
        let i = 2;
        while (i + 9 < buf.length) {
            if (buf[i] !== 0xff) { i++; continue; }
            const marker = buf[i + 1];
            if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) { i += 2; continue; }
            const len = buf.readUInt16BE(i + 2);
            if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
                return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
            }
            if (len < 2) break;
            i += 2 + len;
        }
    }
    return null;
}

function imageSize(src) {
    if (_dimCache.has(src)) return _dimCache.get(src);
    let out = null;
    for (const dir of [DIST, resolve(__dirname, '..', 'public')]) {
        try {
            const buf = readFileSync(resolve(dir, src.replace(/^\//, '')));
            out = leerDimensiones(buf);
            if (out) break;
        } catch { /* probar el siguiente directorio */ }
    }
    _dimCache.set(src, out);
    return out;
}

function imgTag(src, alt) {
    if (!src) return '';
    const d = imageSize(src);
    const dim = d ? ` width="${d.w}" height="${d.h}"` : '';
    return `<img src="${attr(src)}" alt="${attr(alt)}"${dim} loading="lazy" decoding="async">`;
}

// Convierte el precio VISIBLE de la pagina en price + priceCurrency.
// Solo un precio limpio genera Offer: "consultar", "consultar alquiler",
// "desde U$S 97" y cualquier rango devuelven null. Un precio en el schema que no
// coincide con el que se ve en pantalla es peor que no declarar schema.
function parsePrice(raw) {
    const s = String(raw || '').trim();
    const m = s.match(/^(?:también en venta\s+)?(?:U\$S\s*([\d.,]+)|\$\s*([\d.]+))$/i);
    if (!m) return null;
    if (m[1]) {
        const n = m[1].replace(/\./g, '').replace(',', '.');
        return /^\d+(\.\d+)?$/.test(n) ? { price: n, currency: 'USD' } : null;
    }
    const n = m[2].replace(/\./g, '');
    return /^\d+$/.test(n) ? { price: n, currency: 'ARS' } : null;
}

// ItemList corto con SOLO los productos que la pagina muestra en pantalla.
// NO es el OfferCatalog de 44 productos del home (ese se saco a proposito de las
// subpaginas con stripOfferCatalog porque repetia ~38 KB identicos en cada URL).
function buildProductItemList(items, pageUrl, listName) {
    if (!items.length) return null;
    return {
        '@type': 'ItemList',
        '@id': `${pageUrl}#equipos`,
        name: listName,
        numberOfItems: items.length,
        itemListElement: items.map((it, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
                '@type': 'Product',
                name: it.name,
                image: SALUD + it.img,
                url: `${pageUrl}#equipos`,
                offers: {
                    '@type': 'Offer',
                    price: it.price,
                    priceCurrency: it.currency,
                    availability: 'https://schema.org/InStock',
                    url: pageUrl,
                    seller: { '@id': 'https://insersalud.com/#organization' },
                },
            },
        })),
    };
}

// Productos "declarables" de una landing: los que tienen precio limpio Y foto real.
function productosLanding(p) {
    return (p.products || []).map((x) => {
        const pr = parsePrice(x.price);
        if (!pr) return null;
        const img = resolveProductImage(x.name);
        if (!img) return null;
        return { name: x.name, img, price: pr.price, currency: pr.currency };
    }).filter(Boolean);
}

// Idem para patologias (pathologyData usa priceARS / priceUSD y trae su propio img).
function productosPatologia(p) {
    return (p.products || []).map((x) => {
        const pr = parsePrice(x.priceARS || x.priceUSD);
        if (!pr) return null;
        // El resolvedor manda sobre x.img para no repetir fotos cruzadas del origen.
        const img = resolveProductImage(x.name) || x.img || '';
        if (!img) return null;
        return { name: x.name, img, price: pr.price, currency: pr.currency };
    }).filter(Boolean);
}

// Quita hasOfferCatalog (los 45 productos, ~38 KB) del bloque de negocio en las SUBPAGINAS.
// El catalogo completo pertenece al home; repetirlo en las 23 URLs gastaba casi 1 MB del
// presupuesto de rastreo de Google en contenido identico. Los datos del negocio (nombre,
// telefono, direccion, areaServed, sameAs) se conservan en todas las paginas.
function stripOfferCatalog(html) {
    const re = /<script type="application\/ld\+json">((?:(?!<\/script>)[\s\S])*?"hasOfferCatalog"(?:(?!<\/script>)[\s\S])*?)<\/script>/;
    const m = html.match(re);
    if (!m) return html;
    let obj;
    try {
        obj = JSON.parse(m[1]);
    } catch {
        return html; // ante la duda, dejar el bloque intacto
    }
    delete obj.hasOfferCatalog;
    const nuevo = '<script type="application/ld+json">\n' + JSON.stringify(obj, null, 2) + '\n</script>';
    return html.replace(re, () => nuevo);
}

// Quita el bloque JSON-LD del home que contiene un @type dado (para no duplicar en subpaginas)
function removeLdBlock(html, typeName) {
    const re = new RegExp('<script type="application/ld\\+json">(?:(?!</script>)[\\s\\S])*?"' + typeName + '"(?:(?!</script>)[\\s\\S])*?</script>\\s*', '');
    return html.replace(re, '');
}

// JSON-LD MedicalWebPage + MedicalCondition + BreadcrumbList por patologia
// Fecha de ultima revision clinica del contenido de patologias.
// Actualizar cuando un profesional matriculado vuelva a revisar los textos.
const REVISION_CLINICA = '2026-08-21';

function buildPathologySchema(p, base) {
    const cfg = PATH_SCHEMA[p.slug] || { alt: [], tx: ['CPAP', 'BiPAP', 'Oxigenoterapia'], spec: 'PulmonaryMedicine' };
    const url = `${base}/patologia/${p.slug}`;
    const graph = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'MedicalWebPage',
                '@id': `${url}#webpage`,
                url,
                name: p.metaTitle || `${p.title} | INSER SALUD`,
                description: p.description || p.subtitle || '',
                inLanguage: 'es-AR',
                isPartOf: { '@id': 'https://insersalud.com/#website' },
                about: { '@id': `${url}#condition` },
                publisher: { '@id': 'https://insersalud.com/#organization' },
                // E-E-A-T: la salud es YMYL y Google pide autor identificable.
                // El Person con la matricula 2123 vive en index.html (#sergiogiorda).
                author: { '@id': 'https://insersalud.com/#sergiogiorda' },
                reviewedBy: { '@id': 'https://insersalud.com/#sergiogiorda' },
                lastReviewed: REVISION_CLINICA,
            },
            {
                '@type': 'MedicalCondition',
                '@id': `${url}#condition`,
                name: p.title,
                alternateName: cfg.alt,
                description: p.description || p.subtitle || '',
                relevantSpecialty: cfg.spec,
                possibleTreatment: cfg.tx.map(t => ({ '@type': 'MedicalTherapy', name: t })),
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${base}/` },
                    { '@type': 'ListItem', position: 2, name: 'Patologías', item: `${base}/#patologias` },
                    { '@type': 'ListItem', position: 3, name: p.title, item: url },
                ],
            },
        ],
    };
    // FAQ propia de la patologia (reemplaza a la del home, que era sobre comprar CPAP en Cordoba)
    if (p.faq && p.faq.length) {
        graph['@graph'].push({
            '@type': 'FAQPage',
            '@id': `${url}#faq`,
            mainEntity: p.faq.map(f => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: sinMarkdown(f.a) },
            })),
        });
    }
    // Product/Offer de los equipos que la patologia muestra, con su precio visible.
    const lista = buildProductItemList(productosPatologia(p), url, `Equipos para ${p.title}`);
    if (lista) graph['@graph'].push(lista);
    return `<script type="application/ld+json">\n${JSON.stringify(graph, null, 2)}\n</script>\n`;
}

// Enlaces internos inline estilo markdown: [texto](/ruta) -> <a href="/ruta">texto</a>
// Se aplica DESPUES de esc() para no escapar las etiquetas que generamos.
// OJO: funcion de reemplazo, nunca template string (ver regla de $1/$2 en applyMeta).
// Quita la sintaxis [texto](/ruta) para textos que van en atributos (meta, title)
function sinMarkdown(s) {
    return String(s || '').replace(/\[([^\]]+)\]\(\/[^)\s]*\)/g, (m, texto) => texto);
}

function inlineLinks(htmlEscapado) {
    return htmlEscapado.replace(
        /\[([^\]]+)\]\((\/[^)\s]*)\)/g,
        (m, texto, href) => '<a href="' + href + '">' + texto + '</a>'
    );
}

// Convierte el texto multilinea de pathologyData en HTML (parrafos + saltos)
function textToHtml(text) {
    if (!text) return '';
    return String(text)
        .trim()
        .split(/\n\s*\n/)
        .map(block => `<p>${inlineLinks(esc(block.trim())).replace(/\n/g, '<br>')}</p>`)
        .join('\n');
}

function applyMeta(tpl, { title, desc, url }) {
    let html = tpl;
    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${attr(title)}<\/title>`);
    // OJO: usar SIEMPRE funcion de reemplazo, nunca template string. Con `$1${desc}$2` cualquier
    // precio que empiece con $1 o $2 ($223.000, $2.800.000) se interpreta como grupo de captura
    // y corta el atributo a la mitad. Rompio 3 meta descriptions hasta jul 2026.
    html = html.replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, (m, a, b) => a + attr(desc) + b);
    html = html.replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/, (m, a, b) => a + attr(title) + b);
    html = html.replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/, (m, a, b) => a + attr(desc) + b);
    html = html.replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/, (m, a, b) => a + attr(url) + b);
    html = html.replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, (m, a, b) => a + attr(desc) + b);
    if (/<link\s+rel="canonical"/.test(html)) {
        html = html.replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, (m, a, b) => a + attr(url) + b);
    } else {
        html = html.replace(/<\/head>/, `  <link rel="canonical" href="${attr(url)}" />\n</head>`);
    }
    return html;
}

// Inyecta contenido real dentro de <div id="root"> (React lo reemplaza al montar)
function injectBody(html, contentHtml) {
    return html.replace(/<div id="root">\s*<\/div>/, `<div id="root">${contentHtml}</div>`);
}

function write(dir, html) {
    mkdirSync(dir, { recursive: true });
    writeFileSync(resolve(dir, 'index.html'), html, 'utf8');
}

function buildHomeBody(variant) {
    const isSalud = variant === 'salud';
    const h1 = isSalud
        ? 'INSER SALUD — Terapias respiratorias domiciliarias en Córdoba'
        : 'INSER SALUD — Equipos respiratorios CPAP, BiPAP y oxígeno en Córdoba';
    const intro = isSalud
        ? 'Alquiler y venta de equipos de terapia respiratoria con instalación y seguimiento profesional a domicilio en Córdoba, Argentina. CPAP, BiPAP y oxigenoterapia. Aparatología aprobada por ANMAT.'
        : 'Venta y alquiler de equipos respiratorios en Córdoba, Argentina: CPAP, AutoCPAP, BiPAP, máscaras, oxigenoterapia y concentradores de oxígeno. Aparatología aprobada por ANMAT.';

    const defs = DEFINITIONS.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('\n');


    const mascaras = `
<h2>Guía de máscaras para CPAP y BiPAP: cuál te corresponde</h2>
<p>La máscara es donde más pacientes abandonan el tratamiento, y casi siempre es por una máscara mal elegida, no por el equipo. Estos son los 5 tipos que vendemos, para quién es cada uno y a qué precio.</p>
${MASK_GUIDE.map(([tipo, queEs, paraQuien, ojo, modelos]) => `<h3>Máscara ${esc(tipo)}</h3><p>${esc(queEs)}</p><p><strong>Para quién:</strong> ${esc(paraQuien)}</p><p><strong>A tener en cuenta:</strong> ${esc(ojo)}</p><ul>${modelos.map(([n, pr]) => `<li>${esc(n)}${pr ? ' — ' + esc(pr) : ''}</li>`).join('')}</ul>`).join('\n')}
<p>El talle importa tanto como el tipo: una máscara del talle equivocado pierde aire y te despierta. Ver todas en <a href="/mascaras-cpap">máscaras para CPAP y BiPAP</a>.</p>`;



    const equipo = `
<h2>Quiénes estamos detrás de INSER SALUD</h2>
<h3>Lic. Sergio Giorda</h3>
<p>Kinesiólogo y Fisioterapeuta · Matrícula Profesional 2123 · Director de INSER SALUD.</p>
<ul>
<li>Jefe del Servicio de Kinesiología y Fisioterapia del Hospital Rawson, con 25 años de trabajo en su Servicio de Terapia Intensiva.</li>
<li>Director y docente del Curso de Postgrado en Terapia Intensiva y Rehabilitación Pulmonar del Colegio Profesional de Kinesiólogos de Córdoba junto al Hospital Rawson (2007-2018).</li>
<li>Asesor en ventilación mecánica y ventilación no invasiva del Instituto de Rehabilitación Neurológica Rita Bianchi.</li>
<li>Instructor docente en la Escuela de Kinesiología y Fisioterapia de la Universidad Nacional de Córdoba.</li>
<li>Autor de trabajos sobre rehabilitación respiratoria en EPOC presentados en el Congreso Argentino de Medicina Respiratoria, y primer premio en las Jornadas Integrales de Kinesiología del Centro del País.</li>
</ul>
<p>Por eso cuando decimos que el equipo se entrega configurado según la indicación de tu médico, hay alguien que sabe leer esa indicación.</p>`;

    const servicio = `
<h2>No te entregamos una caja</h2>
<p>Tu equipo llega configurado según la indicación de tu médico (presión, flujo, modo), listo para usar desde la primera noche. No tenés que aprender a programarlo ni adivinar valores.</p>
<p>La instalación la hace personal profesional especializado, que te explica cómo usarlo, cómo limpiarlo y qué esperar los primeros días. Te quedás con el equipo funcionando y sabiendo usarlo, no con un manual.</p>
<p>En Córdoba la instalación la hace personal profesional en tu domicilio. Al resto del país el equipo llega ya configurado según tu indicación médica y te guiamos la puesta en marcha por WhatsApp.</p>
<p>Esto vale tanto si comprás como si alquilás. Es la diferencia entre recibir un aparato y empezar un tratamiento.</p>
<p>Y si dudás entre alquilar y comprar: alquilá un CPAP o AutoCPAP, probalo en tu casa, y si después lo comprás te descontamos ese primer mes del precio de venta.</p>`;

    const compare = `
<h2>CPAP vs AutoCPAP vs BiPAP</h2>
<table>
<thead><tr><th>Equipo</th><th>Cómo funciona</th><th>Para qué</th><th>Desde</th></tr></thead>
<tbody>
<tr><td>CPAP</td><td>Presión fija continua</td><td>Apnea del sueño estándar</td><td>$499.000</td></tr>
<tr><td>AutoCPAP</td><td>Presión automática</td><td>Apnea, mayor confort</td><td>$630.000</td></tr>
<tr><td>BiPAP</td><td>Dos presiones (inhala/exhala)</td><td>EPOC, neuromusculares, apnea compleja</td><td>U$S 907</td></tr>
</tbody>
</table>`;

    const prods = `
<h2>Productos destacados (precios de referencia)</h2>
<ul>
${PRODUCTS.map(([n, p, d]) => `<li><strong>${esc(n)}</strong> — ${esc(p)} — ${esc(d)}</li>`).join('\n')}
</ul>`;

    const services = `
<h2>Servicios</h2>
<ul>
<li>Venta de equipos respiratorios aprobados por ANMAT, con envío a todo el país</li>
<li>Alquiler de CPAP, BiPAP y concentradores de oxígeno (en Córdoba)</li>
<li>Oxigenoterapia domiciliaria con instalación y seguimiento</li>
<li>Adaptación y seguimiento de equipos con profesionales</li>
<li>Servicio técnico de equipos respiratorios</li>
<li>Presupuesto formal y factura oficial para gestionar el reintegro con tu obra social o prepaga (venta particular)</li>
<li>Financiación: 3 cuotas sin interés con Banco Galicia (miércoles y viernes) y planes de 3, 6 y 9 cuotas</li>
</ul>`;

    const paths = `
<h2>Patologías que tratamos</h2>
<ul>
<li><a href="/patologia/apnea-del-sueno">Apnea del sueño</a></li>
<li><a href="/patologia/epoc">EPOC</a></li>
<li><a href="/patologia/fibrosis-pulmonar">Fibrosis pulmonar</a></li>
<li><a href="/patologia/esclerosis-lateral-amiotrofica">ELA (Esclerosis Lateral Amiotrófica)</a></li>
<li><a href="/patologia/atrofia-muscular-espinal">Atrofia Muscular Espinal</a></li>
<li><a href="/patologia/paralisis-cerebral">Parálisis cerebral</a></li>
</ul>`;

    const serviciosLocales = `
<h2>Servicios en Córdoba</h2>
<ul>
${LOCAL_LINKS.map(([href, label]) => `<li><a href="${href}">${esc(label)}</a></li>`).join('\n')}
</ul>
<p><a href="/politica-de-privacidad">Política de privacidad</a> · <a href="/tarjeta">Tarjeta digital de contacto</a></p>`;

    const proceso = `
<h2>Cómo trabajamos</h2>
<ol>
<li><strong>Nos contactás</strong>: por WhatsApp, teléfono, formulario o con Santi. Respondemos consultas por WhatsApp todos los días, también fines de semana y fuera del horario comercial.</li>
<li><strong>Te asesoramos</strong>: elegimos el equipo correcto según tu prescripción médica y tu presupuesto.</li>
<li><strong>Entregamos e instalamos</strong>: en Córdoba a domicilio en el día; al resto del país, envío con puesta en marcha guiada.</li>
<li><strong>Te acompañamos</strong>: adaptación, soporte técnico, repuestos y factura con presupuesto formal para el reintegro de tu obra social.</li>
</ol>`;

    const about = `
<h2>Sobre INSER SALUD</h2>
<p>Empresa cordobesa con más de 5 años de experiencia y más de 500 pacientes atendidos. Aparatología aprobada por ANMAT. La venta de equipos se realiza con envío a todo el país (cualquier provincia de Argentina); el alquiler está disponible en Córdoba, con entrega en el día y soporte técnico continuo. Atención por WhatsApp ${esc(WA)} y asesoramiento con el agente Santi.</p>`;

    return `<div id="ssr-content"><main>
<h1>${esc(h1)}</h1>
<p>${esc(intro)}</p>
<h2>Preguntas frecuentes</h2>
${servicio}
${equipo}
${defs}
${compare}
${mascaras}
${prods}
${services}
${serviciosLocales}
${proceso}
${paths}
${about}
<p>Contacto: <a href="https://wa.me/5493512065320">WhatsApp ${esc(WA)}</a> · <a href="tel:+5493512065320">Llamar</a> · inser.salud@gmail.com · Córdoba, Argentina</p>
</main></div>`;
}

function buildPathologyBody(p, isSalud) {
    const sufijo = isSalud ? ' — Tratamiento Domiciliario' : '';
    const secs = (p.sections || []).map(s =>
        `<section><h2>${esc(s.title)}</h2>${textToHtml(s.content)}</section>`
    ).join('\n');
    const faqs = (p.faq && p.faq.length)
        ? `<section><h2>Preguntas frecuentes sobre ${esc(p.title)}</h2>\n` +
          p.faq.map(f => `<h3>${esc(f.q)}</h3><p>${inlineLinks(esc(f.a))}</p>`).join('\n') +
          `\n</section>`
        : '';
    // Equipos con FOTO REAL y precio visible: hasta agosto de 2026 el HTML estatico
    // de las patologias no traia ni una <img> ni un solo precio de producto.
    const equipos = (p.products && p.products.length)
        ? `<section><h2 id="equipos">Equipos para ${esc(p.title)}</h2>\n<ul>\n` +
          p.products.map(x => {
              const precio = x.priceARS || x.priceUSD || '';
              const foto = resolveProductImage(x.name) || x.img || '';
              return `<li>${foto ? imgTag(foto, x.name) + ' ' : ''}${esc(x.name)}${precio ? ' — ' + esc(precio) : ''}</li>`;
          }).join('\n') +
          `\n</ul>\n</section>`
        : '';
    return `<div id="ssr-content"><main>
<nav><a href="/">Inicio</a> › <a href="/patologia/${esc(p.slug)}">${esc(p.title)}</a></nav>
<h1>${esc(p.title)}${esc(sufijo)}</h1>
${p.headline ? `<p><strong>${esc(p.headline)}</strong></p>` : ''}
${p.subtitle ? `<p>${esc(p.subtitle)}</p>` : ''}
${p.intro ? `<p>${inlineLinks(esc(p.intro))}</p>` : ''}
${p.description ? `<p>${esc(p.description)}</p>` : ''}
${secs}
${equipos}
${faqs}
<section><h2>Revisión profesional</h2>
<p>Contenido revisado por el <strong>Lic. Sergio Giorda</strong>, kinesiólogo y fisioterapeuta, Matrícula Profesional 2123, director de INSER SALUD y Jefe del Servicio de Kinesiología y Fisioterapia del Hospital Rawson.</p>
<p>Última revisión: ${REVISION_CLINICA}.</p>
<p>Esta información es orientativa y no reemplaza la consulta médica. El equipo y los parámetros de uso los indica tu médico tratante.</p>
</section>
<p>INSER SALUD — equipos y asesoramiento para ${esc(p.title)} en Córdoba. <a href="https://wa.me/5493512065320">WhatsApp ${esc(WA)}</a> · <a href="tel:+5493512065320">Llamar</a>.</p>
</main></div>`;
}

// ── Landing pages SEO locales (alta intencion, Cordoba) ───────────────────────
function buildLocalBody(p) {
    const secs = (p.sections || []).map(s =>
        `<section><h2>${esc(s.title)}</h2>${textToHtml(s.content)}</section>`
    ).join('\n');
    // Foto real por producto. La imagen NO depende del precio: una landing cuyos
    // equipos se cotizan ("consultar") igual tiene que mostrar el equipo.
    const prods = (p.products && p.products.length)
        ? `<h2 id="equipos">Equipos relacionados</h2>\n<ul>\n${p.products.map(x => {
            const foto = resolveProductImage(x.name);
            return `<li>${foto ? imgTag(foto, x.name) + ' ' : ''}${esc(x.name)} — ${esc(x.price)}</li>`;
        }).join('\n')}\n</ul>`
        : '';
    const faq = (p.faq || []).map(f => `<h3>${esc(f.q)}</h3><p>${inlineLinks(esc(f.a))}</p>`).join('\n');
    const rel = (p.related || []).map(r => `<li><a href="${attr(r.href)}">${esc(r.label)}</a></li>`).join('\n');
    return `<div id="ssr-content"><main>
<nav><a href="/">Inicio</a> › <span>${esc(p.h1)}</span></nav>
<h1>${esc(p.h1)}</h1>
<p>${inlineLinks(esc(p.intro))}</p>
<p>Aparatología aprobada por ANMAT · ${p.national ? 'Envío a todo el país' : 'Entrega a domicilio en el día en Córdoba'}${p.garantia ? ' · ' + esc(p.garantia) : ''} · +500 pacientes.</p>
${secs}
${prods}
<h2>Preguntas frecuentes</h2>
${faq}
<h2>También te puede servir</h2>
<ul>
${rel}
</ul>
<p>INSER SALUD — Córdoba, Argentina. <a href="https://wa.me/5493512065320">WhatsApp ${esc(WA)}</a> · <a href="tel:+5493512065320">Llamar</a> · inser.salud@gmail.com</p>
</main></div>`;
}

// JSON-LD WebPage + BreadcrumbList + FAQPage por landing local
function buildLocalSchema(p, base) {
    const url = `${base}/${p.slug}`;
    const graph = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                '@id': `${url}#webpage`,
                url,
                name: p.metaTitle,
                description: p.description,
                inLanguage: 'es-AR',
                isPartOf: { '@id': 'https://insersalud.com/#website' },
                publisher: { '@id': 'https://insersalud.com/#organization' },
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${base}/` },
                    { '@type': 'ListItem', position: 2, name: p.h1, item: url },
                ],
            },
            {
                '@type': 'FAQPage',
                '@id': `${url}#faq`,
                mainEntity: (p.faq || []).map(f => ({
                    '@type': 'Question',
                    name: f.q,
                    acceptedAnswer: { '@type': 'Answer', text: sinMarkdown(f.a) },
                })),
            },
        ],
    };
    // Product/Offer SOLO de los equipos que esta landing muestra en pantalla, con
    // el precio EXACTO que se ve en el texto. Las landings no declaraban ninguno.
    const lista = buildProductItemList(productosLanding(p), url, `Equipos en ${p.h1}`);
    if (lista) graph['@graph'].push(lista);
    return `<script type="application/ld+json">\n${JSON.stringify(graph, null, 2)}\n</script>\n`;
}

try {
    const indexPath = resolve(DIST, 'index.html');
    if (!existsSync(indexPath)) {
        console.warn('[prerender] dist/index.html no existe, se omite.');
        process.exit(0);
    }
    const tpl = readFileSync(indexPath, 'utf8');

    let pathologies = [];
    try {
        const mod = await import(pathToFileURL(resolve(__dirname, '..', 'src', 'features', 'pathologies', 'pathologyData.js')).href);
        pathologies = mod.pathologies || [];
    } catch (e) {
        console.warn('[prerender] no pude importar pathologyData.js:', e?.message);
    }

    let localPages = [];
    try {
        const mod = await import(pathToFileURL(resolve(__dirname, '..', 'src', 'features', 'seo', 'localPages.js')).href);
        localPages = mod.localPages || [];
    } catch (e) {
        console.warn('[prerender] no pude importar localPages.js:', e?.message);
    }

    let count = 0;

    // dist/index.html: ademas de la variante inser.ar (dormida, el dominio redirige 308), este archivo
    // es el que Vercel sirve como fallback para CUALQUIER URL inexistente. Por eso su canonical debe
    // apuntar a insersalud.com: asi los soft-404 se consolidan en el home real y no en un dominio que redirige.
    write(DIST, injectBody(applyMeta(tpl, { ...INSER_HOME, url: SALUD + '/' }), buildHomeBody('inser')));
    count++;
    // HOME insersalud.com
    write(resolve(DIST, 'insersalud'), injectBody(applyMeta(tpl, { ...SALUD_HOME, url: SALUD + '/' }), buildHomeBody('salud')));
    count++;

    // PATOLOGIAS (inser.ar + insersalud.com)
    const buildPathologyPage = (p, base, title, desc, isSalud) => {
        let h = applyMeta(tpl, { title, desc, url: `${base}/patologia/${p.slug}` });
        h = removeLdBlock(h, 'BreadcrumbList'); // quitar breadcrumb generico del home
        h = removeLdBlock(h, 'FAQPage');        // la FAQ del home es sobre comprar CPAP, no sobre la patologia
        h = stripOfferCatalog(h);               // el catalogo de 45 productos va solo en el home
        h = h.replace('</head>', buildPathologySchema(p, base) + '</head>'); // schema medico propio
        h = injectBody(h, buildPathologyBody(p, isSalud)); // contenido real
        return h;
    };
    for (const p of pathologies) {
        const baseTitle = p.metaTitle || `${p.title} | INSER SALUD`;
        const desc = sinMarkdown(p.subtitle || p.intro || '');
        // inser.ar
        write(resolve(DIST, 'patologia', p.slug), buildPathologyPage(p, INSER, baseTitle, desc, false));
        count++;
        // insersalud.com
        const saludTitle = baseTitle.replace('| INSER SALUD', '· Tratamiento Domiciliario | INSER SALUD');
        write(resolve(DIST, 'insersalud', 'patologia', p.slug), buildPathologyPage(p, SALUD, saludTitle, desc, true));
        count++;
    }

    // LANDING SEO LOCALES (inser.ar + insersalud.com)
    const buildLocalPage = (p, base, title) => {
        let h = applyMeta(tpl, { title, desc: p.description, url: `${base}/${p.slug}` });
        h = removeLdBlock(h, 'BreadcrumbList');   // quitar breadcrumb generico del home
        h = removeLdBlock(h, 'FAQPage');          // reemplazar FAQ del home por la de la pagina
        h = stripOfferCatalog(h);                 // el catalogo de 45 productos va solo en el home
        h = h.replace('</head>', buildLocalSchema(p, base) + '</head>');
        h = injectBody(h, buildLocalBody(p));
        return h;
    };
    for (const p of localPages) {
        // inser.ar
        write(resolve(DIST, p.slug), buildLocalPage(p, INSER, p.metaTitle));
        count++;
        // insersalud.com
        write(resolve(DIST, 'insersalud', p.slug), buildLocalPage(p, SALUD, p.metaTitleSalud || p.metaTitle));
        count++;
    }

    // SITEMAPS generados desde la MISMA fuente que las paginas (localPages.js y
    // pathologyData.js). Antes eran dos archivos estaticos editados a mano y se
    // desincronizaron: la misma URL declaraba dos lastmod distintos y ninguna
    // pagina nueva entraba si te olvidabas de tocar los dos archivos.
    //
    // No se emite <lastmod> a proposito: Google ignora un lastmod en el que no
    // confia, y uno que se contradice a si mismo es peor que no ponerlo. Como el
    // build no puede saber cuando cambio de verdad cada pagina (en un clon limpio
    // todas las fechas son la del checkout), omitirlo es la opcion honesta.
    // <changefreq> tampoco va: Google declaro publicamente que lo ignora.
    const buildSitemap = () => {
        // Cada <url> declara ademas SUS imagenes con la extension de Google.
        // Sin esto Google Images no puede asociar las fotos de producto con la
        // pagina donde estan, y las busquedas por imagen de equipos no nos
        // encuentran. Solo se declaran fotos que la pagina REALMENTE muestra
        // (las mismas que emite imgTag): una imagen de sitemap que no esta en
        // la pagina, Google la ignora.
        // El home va sin imagenes a proposito: su HTML estatico no tiene <img>.
        const escXml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
            .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        const imgs = (lista) => lista.slice(0, 20).map((it) =>
            `    <image:image>\n      <image:loc>${escXml(SALUD + it.img)}</image:loc>\n      <image:title>${escXml(it.name)}</image:title>\n    </image:image>`
        ).join('\n');
        const u = (loc, priority, lista) => {
            const bloque = (lista && lista.length) ? '\n' + imgs(lista) : '';
            return `  <url>\n    <loc>${loc}</loc>\n    <priority>${priority}</priority>${bloque}\n  </url>`;
        };
        const items = [
            u(`${SALUD}/`, '1.0'),
            ...localPages.map((p) => u(`${SALUD}/${p.slug}`, '0.9', productosLanding(p))),
            ...pathologies.map((p) => u(`${SALUD}/patologia/${p.slug}`, '0.8', productosPatologia(p))),
            u(`${SALUD}/tarjeta`, '0.3'),
            u(`${SALUD}/politica-de-privacidad`, '0.2'),
        ];
        return `<?xml version="1.0" encoding="UTF-8"?>\n`
            + `<!-- Generado por scripts/prerender-meta.mjs. NO editar a mano: se reescribe en cada build. -->\n`
            + `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${items.join('\n')}\n</urlset>\n`;
    };
    const sitemapXml = buildSitemap();
    const nUrls = (sitemapXml.match(/<loc>/g) || []).length;
    // Los dos nombres llevan el MISMO contenido: ambos estan enviados a Search
    // Console y borrar uno romperia esa propiedad. Ahora no pueden divergir.
    // Se escriben en dist/ (lo que se sirve) y en public/ (la copia del repo),
    // para que el archivo commiteado sea siempre igual al publicado.
    for (const dir of [DIST, resolve(__dirname, '..', 'public')]) {
        for (const name of ['sitemap.xml', 'sitemap-insersalud.xml']) {
            try { writeFileSync(resolve(dir, name), sitemapXml, 'utf8'); } catch { /* no romper el build */ }
        }
    }

    console.log(`[prerender] ${count} páginas con CONTENIDO en el body (inser.ar + insersalud.com)`);
    console.log(`[prerender] sitemaps regenerados: ${nUrls} URLs`);
} catch (err) {
    console.warn('[prerender] error no fatal, se omite:', err?.message);
}
process.exit(0);
