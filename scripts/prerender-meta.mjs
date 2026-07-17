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
    desc: 'Terapias respiratorias domiciliarias en Córdoba. Alquiler y venta de CPAP, BiPAP y concentradores de oxígeno con instalación y seguimiento profesional en tu hogar. Aparatología aprobada por ANMAT. ☎ +54 9 351 206-5320.',
};
const INSER_HOME = {
    title: 'INSER SALUD – Equipos Respiratorios CPAP, BiPAP y Oxígeno | Córdoba, Argentina',
    desc: 'CPAP, AutoCPAP, BiPAP, máscaras nasales y nasobucales (DreamWear), oxigenoterapia y concentradores de oxígeno portátiles. Venta y alquiler en Córdoba.',
};

// Catalogo curado (mismo dato que llms.txt) para el contenido estatico del home
const PRODUCTS = [
    ['CPAP BMC G2S con humidificador', '$499.000', 'CPAP fijo, el más vendido'],
    ['AutoCPAP BMC G2S con humidificador', '$600.000', 'presión automática, equipo completo con bolso'],
    ['AutoCPAP BMC G2s', 'U$S 415', 'AutoCPAP económico'],
    ['AutoCPAP BMC G2S Mini', 'U$S 1.400', 'presión automática, con almohadillas nasales'],
    ['CPAP Philips DreamStation', 'U$S 579', 'CPAP fijo con humidificador y conectividad'],
    ['AutoCPAP Philips DreamStation', 'U$S 758', 'con humidificador y conectividad'],
    ['CPAP ResMed AirSense 10', '$799.000', 'oferta, equipo completo, el estándar de oro en apnea del sueño'],
    ['AutoCPAP ResMed AirSense 10', 'U$S 907', 'presión automática, app myAir'],
    ['CPAP Yuwell YH-360', 'U$S 416', 'con humidificador, silencioso'],
    ['CPAP Yamind', 'U$S 330', 'el CPAP más económico, con humidificador activo'],
    ['BiPAP BMC G3 con frecuencia respiratoria', '$1.300.000', 'para EPOC y enfermedades neuromusculares'],
    ['BiPAP Yuwell con frecuencia respiratoria', 'U$S 1.014', 'BiPAP S/T con humidificador'],
    ['Ventilador STELLAR 150 ResMed', 'U$S 7.342', 'ventilación de alta gama con batería'],
    ['Cough Assist (asistente de tos)', 'U$S 9.084', 'insuflación-exuflación para tos débil'],
    ['Concentrador de oxígeno BMC estacionario', '$999.000', 'con control remoto y medidor de O₂'],
    ['Concentrador de oxígeno YUWELL 10 litros (alto flujo)', '$2.800.000', 'hasta 10 L/min, para alta demanda de oxígeno y centros de rehabilitación pulmonar'],
    ['Concentrador estacionario Yuwell 5 L/min', 'U$S 713', 'para uso domiciliario continuo'],
    ['Concentrador portátil KINGON P2-S3', '$2.735.400', 'el más liviano, apto para vuelos'],
    ['Concentrador portátil KINGON P2-TOC', 'U$S 3.458', '9,5 hs de autonomía, continuo + pulso'],
    ['Concentrador portátil KINGON P2-E7', 'U$S 3.099', 'alto flujo continuo, batería extendida'],
    ['Concentrador portátil KINGON P2-E6', 'U$S 2.695', 'flujo continuo con batería'],
    ['Concentrador portátil KINGON P2-E', 'U$S 2.379', 'entrada a portátiles de flujo continuo'],
    ['Concentrador portátil GCE Zen-O', '$5.451.885', '2 baterías + carro, homologado para vuelos'],
    ['Concentrador portátil Philips SimplyGo', 'U$S 3.887', 'continuo + pulso, apto vuelos'],
    ['Mochila de oxígeno', 'U$S 270', 'tubo 0,415 + regulador + bolso, para traslados'],
    ['Máscara nasal DreamWear', '$223.000', 'mínimo contacto, CPAP/BiPAP'],
    ['Máscara nasal RESCOMF', '$50.000', 'la más económica, multitalle'],
    ['Máscara nasal BMC N4', 'U$S 36', 'con apoya frente, económica'],
    ['Máscara nasal BMC N5a', 'U$S 60', 'sin apoya frente, campo visual amplio'],
    ['Máscara nasal BMC multitalle', 'U$S 89,50', 'compatible CPAP/BiPAP'],
    ['Máscara nasal AirFit mínimo contacto ResMed', 'U$S 157', 'sin apoya frente'],
    ['Máscara almohadilla nasal Pillow Yuwell YP-01', 'U$S 42', 'mínima presencia facial'],
    ['Máscara nasobucal DreamWear Philips', '$229.000', 'full face, cubre nariz y boca'],
    ['Máscara nasobucal BMC F6 multitalle', '$198.000', 'tan cómoda como la DreamWear, más económica'],
    ['Máscara buconasal Yuwell con apoya frente', 'U$S 52', 'full face estándar'],
    ['Máscara buconasal Yuwell YF02', 'U$S 55', 'sin apoya frente'],
    ['Máscara buconasal BMC F5A', 'U$S 52', 'sin apoya frente'],
    ['Máscara nasobucal ResMed AirFit F20 / F30', 'U$S 189,50 / U$S 212', 'full face premium'],
    ['Máscara pediátrica NeoQ Infant', 'U$S 144', 'para recién nacidos y lactantes'],
    ['Máscara pediátrica HSINER Cirri Mini', 'U$S 105', 'nasal pediátrica XS/S/M/L'],
    ['Máscara pediátrica Jirafa Philips', 'U$S 220', 'nasal pediátrica, diseño amigable'],
    ['Infant CPAP Kit neonatal', 'U$S 97', 'tallas 00 a 5'],
    ['Polígrafo BMC YH-600B PRO', 'U$S 1.570', 'estudio del sueño domiciliario'],
    ['Tubuladura para CPAP / BiPAP', '$36.000', 'repuesto universal'],
];

// Links internos a las landing SEO locales (discovery + PageRank desde el home)
const LOCAL_LINKS = [
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
    ['/equipamiento-rehabilitacion-pulmonar', 'Equipamiento para centros de rehabilitación pulmonar'],
    ['/comprar-concentrador-oxigeno-portatil-argentina', 'Comprar concentrador de oxígeno portátil (envío a todo el país)'],
    ['/ventilador-stellar-150', 'Ventilador ResMed STELLAR 150'],
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

// Quita el bloque JSON-LD del home que contiene un @type dado (para no duplicar en subpaginas)
function removeLdBlock(html, typeName) {
    const re = new RegExp('<script type="application/ld\\+json">(?:(?!</script>)[\\s\\S])*?"' + typeName + '"(?:(?!</script>)[\\s\\S])*?</script>\\s*', '');
    return html.replace(re, '');
}

// JSON-LD MedicalWebPage + MedicalCondition + BreadcrumbList por patologia
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
    return `<script type="application/ld+json">\n${JSON.stringify(graph, null, 2)}\n</script>\n`;
}

// Convierte el texto multilinea de pathologyData en HTML (parrafos + saltos)
function textToHtml(text) {
    if (!text) return '';
    return String(text)
        .trim()
        .split(/\n\s*\n/)
        .map(block => `<p>${esc(block.trim()).replace(/\n/g, '<br>')}</p>`)
        .join('\n');
}

function applyMeta(tpl, { title, desc, url }) {
    let html = tpl;
    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${attr(title)}<\/title>`);
    html = html.replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${attr(desc)}$2`);
    html = html.replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/, `$1${attr(title)}$2`);
    html = html.replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${attr(desc)}$2`);
    html = html.replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/, `$1${attr(url)}$2`);
    html = html.replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, `$1${attr(desc)}$2`);
    if (/<link\s+rel="canonical"/.test(html)) {
        html = html.replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${attr(url)}$2`);
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

    const compare = `
<h2>CPAP vs AutoCPAP vs BiPAP</h2>
<table>
<thead><tr><th>Equipo</th><th>Cómo funciona</th><th>Para qué</th><th>Desde</th></tr></thead>
<tbody>
<tr><td>CPAP</td><td>Presión fija continua</td><td>Apnea del sueño estándar</td><td>$499.000</td></tr>
<tr><td>AutoCPAP</td><td>Presión automática</td><td>Apnea, mayor confort</td><td>U$S 415</td></tr>
<tr><td>BiPAP</td><td>Dos presiones (inhala/exhala)</td><td>EPOC, neuromusculares, apnea compleja</td><td>$1.300.000</td></tr>
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
</ul>`;

    const about = `
<h2>Sobre INSER SALUD</h2>
<p>Empresa cordobesa con más de 5 años de experiencia y más de 500 pacientes atendidos. Aparatología aprobada por ANMAT. La venta de equipos se realiza con envío a todo el país (cualquier provincia de Argentina); el alquiler está disponible en Córdoba, con entrega en 24 hs y soporte técnico continuo. Atención por WhatsApp ${esc(WA)} y asesoramiento con el agente Santi.</p>`;

    return `<div id="ssr-content"><main>
<h1>${esc(h1)}</h1>
<p>${esc(intro)}</p>
<h2>Preguntas frecuentes</h2>
${defs}
${compare}
${prods}
${services}
${serviciosLocales}
${paths}
${about}
<p>Contacto: WhatsApp ${esc(WA)} · inser.salud@gmail.com · Córdoba, Argentina</p>
</main></div>`;
}

function buildPathologyBody(p, isSalud) {
    const sufijo = isSalud ? ' — Tratamiento Domiciliario' : '';
    const secs = (p.sections || []).map(s =>
        `<section><h2>${esc(s.title)}</h2>${textToHtml(s.content)}</section>`
    ).join('\n');
    return `<div id="ssr-content"><main>
<nav><a href="/">Inicio</a> › <a href="/patologia/${esc(p.slug)}">${esc(p.title)}</a></nav>
<h1>${esc(p.title)}${esc(sufijo)}</h1>
${p.headline ? `<p><strong>${esc(p.headline)}</strong></p>` : ''}
${p.subtitle ? `<p>${esc(p.subtitle)}</p>` : ''}
${p.intro ? `<p>${esc(p.intro)}</p>` : ''}
${p.description ? `<p>${esc(p.description)}</p>` : ''}
${secs}
<p>INSER SALUD — equipos y asesoramiento para ${esc(p.title)} en Córdoba. WhatsApp ${esc(WA)}.</p>
</main></div>`;
}

// ── Landing pages SEO locales (alta intencion, Cordoba) ───────────────────────
function buildLocalBody(p) {
    const secs = (p.sections || []).map(s =>
        `<section><h2>${esc(s.title)}</h2>${textToHtml(s.content)}</section>`
    ).join('\n');
    const prods = (p.products && p.products.length)
        ? `<h2>Equipos relacionados</h2>\n<ul>\n${p.products.map(x => `<li>${esc(x.name)} — ${esc(x.price)}</li>`).join('\n')}\n</ul>`
        : '';
    const faq = (p.faq || []).map(f => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('\n');
    const rel = (p.related || []).map(r => `<li><a href="${attr(r.href)}">${esc(r.label)}</a></li>`).join('\n');
    return `<div id="ssr-content"><main>
<nav><a href="/">Inicio</a> › <span>${esc(p.h1)}</span></nav>
<h1>${esc(p.h1)}</h1>
<p>${esc(p.intro)}</p>
<p>Aparatología aprobada por ANMAT · ${p.national ? 'Envío a todo el país' : 'Entrega a domicilio 24 hs en Córdoba'} · 2 años de garantía · +500 pacientes.</p>
${secs}
${prods}
<h2>Preguntas frecuentes</h2>
${faq}
<h2>También te puede servir</h2>
<ul>
${rel}
</ul>
<p>INSER SALUD — Córdoba, Argentina. WhatsApp ${esc(WA)} · inser.salud@gmail.com</p>
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
                    acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
            },
        ],
    };
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

    // HOME inser.ar (meta ya esta en tpl; solo inyecto body)
    write(DIST, injectBody(applyMeta(tpl, { ...INSER_HOME, url: INSER + '/' }), buildHomeBody('inser')));
    count++;
    // HOME insersalud.com
    write(resolve(DIST, 'insersalud'), injectBody(applyMeta(tpl, { ...SALUD_HOME, url: SALUD + '/' }), buildHomeBody('salud')));
    count++;

    // PATOLOGIAS (inser.ar + insersalud.com)
    const buildPathologyPage = (p, base, title, desc, isSalud) => {
        let h = applyMeta(tpl, { title, desc, url: `${base}/patologia/${p.slug}` });
        h = removeLdBlock(h, 'BreadcrumbList'); // quitar breadcrumb generico del home
        h = h.replace('</head>', buildPathologySchema(p, base) + '</head>'); // schema medico propio
        h = injectBody(h, buildPathologyBody(p, isSalud)); // contenido real
        return h;
    };
    for (const p of pathologies) {
        const baseTitle = p.metaTitle || `${p.title} | INSER SALUD`;
        const desc = p.subtitle || p.intro || '';
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

    console.log(`[prerender] ${count} páginas con CONTENIDO en el body (inser.ar + insersalud.com)`);
} catch (err) {
    console.warn('[prerender] error no fatal, se omite:', err?.message);
}
process.exit(0);
