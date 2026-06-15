/**
 * prerender-meta.mjs
 * Post-build: genera HTML estatico con meta propio por pagina Y por dominio.
 *
 * - inser.ar  -> venta de equipos (titulos originales)
 *   · home: dist/index.html (tal cual sale de vite)
 *   · patologias: dist/patologia/<slug>/index.html
 * - insersalud.com -> terapias domiciliarias + alquiler (variante propia)
 *   · home: dist/insersalud/index.html
 *   · patologias: dist/insersalud/patologia/<slug>/index.html
 *   El middleware (middleware.js) enruta insersalud.com -> /insersalud/...
 *
 * Asi cada dominio sirve su title/description/canonical correctos en el HTML
 * mismo (no solo por JS), para que compitan por separado en Google.
 *
 * A prueba de fallos: ante cualquier error sale con codigo 0 para no romper
 * el build de Vercel (en el peor caso, no prerenderiza y sirve el base).
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, '..', 'dist');

const INSER = 'https://inser.ar';
const SALUD = 'https://insersalud.com';

// Home de insersalud.com (mismo angulo que el script inline: domiciliario)
const SALUD_HOME = {
    title: 'INSER SALUD – Terapias Respiratorias Domiciliarias | Alquiler y Venta CPAP, BiPAP y Oxígeno | Córdoba',
    desc: 'Terapias respiratorias domiciliarias en Córdoba. Alquiler y venta de CPAP, BiPAP y concentradores de oxígeno con instalación y seguimiento profesional en tu hogar. Aparatología aprobada por ANMAT. ☎ +54 9 351 206-5320.',
};

const PAGES = [
    { slug: 'apnea-del-sueno', title: 'APNEA DEL SUEÑO | INSER SALUD', desc: 'Si roncás fuerte, te despertás varias veces en la noche o te sentís agotado durante el día, podés estar sufriendo apnea del sueño sin saberlo. CPAP y diagnóstico en Córdoba.' },
    { slug: 'epoc', title: 'EPOC | INSER SALUD', desc: 'Información, aparatología aprobada por ANMAT y asesoramiento personalizado para que los pacientes con EPOC recuperen su calidad de vida. Córdoba, Argentina.' },
    { slug: 'fibrosis-pulmonar', title: 'FIBROSIS PULMONAR | INSER SALUD', desc: 'Concentradores estacionarios, concentradores portátiles, mochilas de oxígeno y oxígeno líquido. Entrega en Córdoba con asesoramiento profesional.' },
    { slug: 'esclerosis-lateral-amiotrofica', title: 'Información sobre la enfermedad ELA | INSER SALUD', desc: 'En la ELA, mantener una tos efectiva y una ventilación adecuada puede ser la diferencia. Equipamos y acompañamos a pacientes y familias desde el primer día.' },
    { slug: 'atrofia-muscular-espinal', title: 'ATROFIA MUSCULAR ESPINAL | INSER SALUD', desc: 'BiPAP, asistentes de tos y máscaras pediátricas y de adultos. Seguimiento profesional para cada tipo y etapa de la enfermedad.' },
    { slug: 'paralisis-cerebral', title: 'Información para Pacientes sobre Parálisis Cerebral | INSER SALUD', desc: 'Gran variedad de máscaras para BiPAP en todos los talles. Ventilación no invasiva con acompañamiento personalizado y respeto en cada paso.' },
];

const attr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');

// Aplica title/description/canonical/OG sobre una plantilla HTML
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

function write(dir, html) {
    mkdirSync(dir, { recursive: true });
    writeFileSync(resolve(dir, 'index.html'), html, 'utf8');
}

try {
    const indexPath = resolve(DIST, 'index.html');
    if (!existsSync(indexPath)) {
        console.warn('[prerender] dist/index.html no existe, se omite prerender.');
        process.exit(0);
    }
    const tpl = readFileSync(indexPath, 'utf8');
    let count = 0;

    // 1) Home de insersalud.com (variante domiciliaria)
    write(resolve(DIST, 'insersalud'), applyMeta(tpl, { ...SALUD_HOME, url: SALUD + '/' }));
    count++;

    // 2) Patologias: variante inser.ar y variante insersalud.com
    for (const p of PAGES) {
        // inser.ar
        write(
            resolve(DIST, 'patologia', p.slug),
            applyMeta(tpl, { title: p.title, desc: p.desc, url: `${INSER}/patologia/${p.slug}` })
        );
        count++;
        // insersalud.com (sufijo domiciliario + canonical propio)
        const saludTitle = p.title.replace('| INSER SALUD', '· Tratamiento Domiciliario | INSER SALUD');
        write(
            resolve(DIST, 'insersalud', 'patologia', p.slug),
            applyMeta(tpl, { title: saludTitle, desc: p.desc, url: `${SALUD}/patologia/${p.slug}` })
        );
        count++;
    }

    console.log(`[prerender] ${count} páginas estáticas generadas (inser.ar + insersalud.com)`);
} catch (err) {
    console.warn('[prerender] error no fatal, se omite prerender:', err?.message);
}
process.exit(0);
