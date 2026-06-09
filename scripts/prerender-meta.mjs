/**
 * prerender-meta.mjs
 * Post-build: genera un index.html por página de patología con su <title>,
 * meta description, canonical y Open Graph propios, partiendo de dist/index.html.
 *
 * Por qué: la app es CSR (BrowserRouter). Googlebot ejecuta JS y toma el SEO
 * del hook useSEO, pero los crawlers SIN JS (WhatsApp, Facebook, etc.) solo leen
 * el HTML estático. Esto les entrega el meta correcto por URL para los previews
 * y acelera el indexado. El bundle React sigue cargando igual (misma app).
 *
 * Es deliberadamente a prueba de fallos: ante cualquier error sale con código 0
 * para no romper el build de Vercel (en el peor caso, simplemente no prerenderiza).
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, '..', 'dist');
const BASE = 'https://inser.ar';

const PAGES = [
    { slug: 'apnea-del-sueno', title: 'APNEA DEL SUEÑO | INSER SALUD', desc: 'Si roncás fuerte, te despertás varias veces en la noche o te sentís agotado durante el día, podés estar sufriendo apnea del sueño sin saberlo. CPAP y diagnóstico en Córdoba.' },
    { slug: 'epoc', title: 'EPOC | INSER SALUD', desc: 'Información, aparatología aprobada por ANMAT y asesoramiento personalizado para que los pacientes con EPOC recuperen su calidad de vida. Córdoba, Argentina.' },
    { slug: 'fibrosis-pulmonar', title: 'FIBROSIS PULMONAR | INSER SALUD', desc: 'Concentradores estacionarios, concentradores portátiles, mochilas de oxígeno y oxígeno líquido. Entrega en Córdoba con asesoramiento profesional.' },
    { slug: 'esclerosis-lateral-amiotrofica', title: 'Información sobre la enfermedad ELA | INSER SALUD', desc: 'En la ELA, mantener una tos efectiva y una ventilación adecuada puede ser la diferencia. Equipamos y acompañamos a pacientes y familias desde el primer día.' },
    { slug: 'atrofia-muscular-espinal', title: 'ATROFIA MUSCULAR ESPINAL | INSER SALUD', desc: 'BiPAP, asistentes de tos y máscaras pediátricas y de adultos. Seguimiento profesional para cada tipo y etapa de la enfermedad.' },
    { slug: 'paralisis-cerebral', title: 'Información para Pacientes sobre Parálisis Cerebral | INSER SALUD', desc: 'Gran variedad de máscaras para BiPAP en todos los talles. Ventilación no invasiva con acompañamiento personalizado y respeto en cada paso.' },
];

const attr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');

try {
    const indexPath = resolve(DIST, 'index.html');
    if (!existsSync(indexPath)) {
        console.warn('[prerender] dist/index.html no existe, se omite prerender.');
        process.exit(0);
    }
    const tpl = readFileSync(indexPath, 'utf8');
    let count = 0;

    for (const p of PAGES) {
        const url = `${BASE}/patologia/${p.slug}`;
        let html = tpl;

        html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${attr(p.title)}<\/title>`);
        html = html.replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${attr(p.desc)}$2`);
        html = html.replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/, `$1${attr(p.title)}$2`);
        html = html.replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${attr(p.desc)}$2`);
        html = html.replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/, `$1${attr(url)}$2`);
        html = html.replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, `$1${attr(p.desc)}$2`);
        if (/<link\s+rel="canonical"/.test(html)) {
            html = html.replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${attr(url)}$2`);
        } else {
            html = html.replace(/<\/head>/, `  <link rel="canonical" href="${attr(url)}" />\n</head>`);
        }

        const outDir = resolve(DIST, 'patologia', p.slug);
        mkdirSync(outDir, { recursive: true });
        writeFileSync(resolve(outDir, 'index.html'), html, 'utf8');
        count++;
    }

    console.log(`[prerender] ${count} páginas de patología generadas en dist/patologia/`);
} catch (err) {
    console.warn('[prerender] error no fatal, se omite prerender:', err?.message);
}
process.exit(0);
