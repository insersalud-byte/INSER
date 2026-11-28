/**
 * sync-precios-app.mjs
 * Pasa a la web los precios de venta que el dueño carga en la app de gestion
 * (aplicacion-beta.vercel.app, secciones "Equipos nuevos" y "Mascarillas", campo
 * "Precio en insersalud.com"). Lo corre la tarea diaria de las 10:20.
 *
 * Uso:  node scripts/sync-precios-app.mjs <entrada.json> [--aplicar]
 *   entrada.json = { "productos": [ { "slug": "...", "moneda": "ARS"|"USD", "monto": 520000, "nombreApp": "...", "confirmado": bool } ] }
 *   o filas compactas: { "productos": [ ["slug", "ARS", 520000, 0|1], ... ] }
 *   (la arma la tarea leyendo la app). Sin --aplicar solo informa que cambiaria.
 *
 * Que toca: SOLO el campo price de las fichas de ofertas[] y tienda[] de
 * src/features/landing/LandingPage.jsx (el mismo slug puede estar en los dos arrays).
 * De ese campo salen el home, las fichas /producto, el feed de Merchant y el schema,
 * asi que no hay que tocar nada mas. Los pesos de un precio en dolares los calcula el
 * build con el dolar BNA del dia (src/data/dolar.json).
 *
 * Seguridad (nunca pisa un precio a ciegas):
 * - monto vacio, cero o negativo: no se toca.
 * - el mismo producto de la web vinculado a varios registros de la app con precios
 *   distintos: no se toca (hay que dejar uno solo).
 * - salto de mas de 40% contra el precio actual (en pesos al dolar del dia): no se
 *   toca, salvo que el dueño lo haya confirmado en la app (al guardar un salto asi la
 *   app le pregunta y marca el item con confirmado: true). Suele ser un error de tipeo.
 * - precio actual de la web ilegible ("consultar", con decimales): no se toca.
 * - slug que no existe en la web: se informa.
 * Sale por consola un JSON con { cambios, sinCambios, salteados, sinVincular, otrasMenciones }.
 * otrasMenciones: el precio viejo de cada producto cambiado tambien aparece escrito a mano
 * en otros archivos (FAQ, landings, patologias, schema, Santi). La tarea diaria revisa esas
 * lineas y cambia las que hablan de ESE producto.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const LANDING = new URL('../src/features/landing/LandingPage.jsx', import.meta.url);
const DOLAR = JSON.parse(readFileSync(new URL('../src/data/dolar.json', import.meta.url), 'utf8')).bnaVenta;
const SALTO_MAX = 0.4;

const miles = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
export const formatear = (moneda, monto) => (moneda === 'USD' ? `U$S ${miles(monto)}` : `$${miles(monto)}`);

// "$520.000" -> { moneda: 'ARS', monto: 520000 } · "U$S 1.400" -> { moneda: 'USD', monto: 1400 }
export function leerPrecio(txt) {
    const s = String(txt || '').trim();
    let m = s.match(/^U\$S\s?([\d.]+)$/);
    if (m) return { moneda: 'USD', monto: Number(m[1].replace(/\./g, '')) };
    m = s.match(/^\$([\d.]+)$/);
    if (m) return { moneda: 'ARS', monto: Number(m[1].replace(/\./g, '')) };
    return null;
}
const enPesos = (p) => (p.moneda === 'USD' ? p.monto * DOLAR : p.monto);

// Fichas del catalogo: cada "slug: '...', price: '...'" de ofertas[] y tienda[].
const RE_FICHA = /slug: '([^']+)', price: '([^']*)'/g;

export function sincronizar(fuente, productos) {
    const enWeb = new Map();
    for (const m of fuente.matchAll(RE_FICHA)) {
        if (!enWeb.has(m[1])) enWeb.set(m[1], m[2]);
    }
    const res = { cambios: [], sinCambios: [], salteados: [], sinVincular: [] };
    // Agrupa por slug: varios registros de la app pueden apuntar al mismo producto web
    // (unidades con distinto N° de serie, talles de una mascara).
    const porSlug = new Map();
    for (const item of productos || []) {
        // Tambien acepta filas compactas [slug, moneda, monto, confirmado] (asi las lee la tarea).
        const p = Array.isArray(item) ? { slug: item[0], moneda: item[1], monto: item[2], confirmado: item[3] === 1 || item[3] === true } : item;
        const slug = String(p.slug || '').trim();
        if (!slug) continue;
        if (!porSlug.has(slug)) porSlug.set(slug, []);
        porSlug.get(slug).push(p);
    }
    let salida = fuente;
    for (const [slug, lista] of porSlug) {
        const nombres = [...new Set(lista.map((p) => p.nombreApp).filter(Boolean))].join(' / ');
        if (!enWeb.has(slug)) { res.salteados.push({ slug, nombreApp: nombres, motivo: 'ese producto ya no esta en la web' }); continue; }
        const validos = lista.filter((p) => (p.moneda === 'ARS' || p.moneda === 'USD') && Number(p.monto) > 0);
        if (!validos.length) { res.salteados.push({ slug, nombreApp: nombres, motivo: 'sin precio cargado en la app' }); continue; }
        const textos = [...new Set(validos.map((p) => formatear(p.moneda, Number(p.monto))))];
        if (textos.length > 1) { res.salteados.push({ slug, nombreApp: nombres, motivo: `precios distintos en la app: ${textos.join(' y ')}` }); continue; }
        const nuevo = textos[0];
        const actual = enWeb.get(slug);
        if (nuevo === actual) { res.sinCambios.push(slug); continue; }
        const pa = leerPrecio(actual);
        const pn = leerPrecio(nuevo);
        if (!pa) { res.salteados.push({ slug, nombreApp: nombres, motivo: `el precio de la web no es un numero simple (${actual}), cambiarlo a mano` }); continue; }
        const confirmado = validos.every((p) => p.confirmado === true);
        if (!confirmado && Math.abs(enPesos(pn) / enPesos(pa) - 1) > SALTO_MAX) {
            res.salteados.push({ slug, nombreApp: nombres, motivo: `salto de mas de ${SALTO_MAX * 100}%: ${actual} -> ${nuevo}; si es correcto, volver a guardarlo en la app y confirmar el aviso` });
            continue;
        }
        const esc = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        salida = salida.replace(new RegExp(`(slug: '${esc}', price: ')[^']*(')`, 'g'), (m0, a, b) => a + nuevo + b);
        res.cambios.push({ slug, nombreApp: nombres, antes: actual, ahora: nuevo });
    }
    for (const slug of enWeb.keys()) if (!porSlug.has(slug)) res.sinVincular.push(slug);
    return { salida, res };
}

// Archivos donde los precios tambien estan escritos a mano.
const OTROS = ['src/features/landing/LandingPage.jsx', 'src/features/landing/homeFaq.js', 'src/features/seo/localPages.js',
    'src/features/pathologies/pathologyData.js', 'scripts/prerender-meta.mjs', 'scripts/merchant-feed.mjs', 'api/chat.js', 'api/messenger.js',
    'index.html', 'public/llms.txt', 'server/index.js'];
const esc = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// Importes que salen del precio y tambien estan escritos (cuotas del prompt de Santi y de la web):
// 3 cuotas x1,17 · 6 x1,29 · 9 x1,44, y 6 sin interes. Se buscan cuota y total.
function derivados(p) {
    if (p.moneda !== 'ARS') return [];
    const out = [p.monto / 6];
    for (const [n, k] of [[3, 1.17], [6, 1.29], [9, 1.44]]) out.push((p.monto * k) / n, p.monto * k);
    return out.map((v) => '$' + miles(v));
}
export function buscarMenciones(cambios, leer) {
    const out = [];
    for (const c of cambios) {
        const p = leerPrecio(c.antes);
        if (!p) continue;
        // "$520.000", "U$S 3.747", el numero crudo (priceARS: 520000) y los importes de cuotas,
        // como palabra entera ("U$S 35" no es "U$S 350" ni el 35 de un telefono 351...).
        const fin = '(?!\\d|[.,]\\d)';
        const partes = [c.antes, ...derivados(p)].map((t) => `(?<![\\d.$])${esc(t)}${fin}`);
        if (p.monto >= 1000) partes.push(`(?<![\\d.$])${p.monto}${fin}`);
        const re = new RegExp(partes.join('|'));
        for (const archivo of OTROS) {
            let fuente;
            try { fuente = leer(archivo); } catch { continue; }
            fuente.split('\n').forEach((linea, i) => {
                // en LandingPage el campo price de las fichas ya lo cambio el script; el resto de la
                // linea (note, review) se revisa igual
                const revisar = archivo.endsWith('LandingPage.jsx') ? linea.replace(/(slug: '[^']+', price: ')[^']*'/g, "$1'") : linea;
                if (!re.test(revisar)) return;
                out.push({ slug: c.slug, archivo, linea: i + 1, texto: linea.trim().slice(0, 160) });
            });
        }
    }
    return out;
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
    const [entrada, flag] = process.argv.slice(2);
    if (!entrada) { console.error('Uso: node scripts/sync-precios-app.mjs <entrada.json> [--aplicar]'); process.exit(2); }
    const datos = JSON.parse(readFileSync(entrada, 'utf8'));
    const fuente = readFileSync(LANDING, 'utf8');
    const { salida, res } = sincronizar(fuente, datos.productos);
    res.otrasMenciones = buscarMenciones(res.cambios, (f) => readFileSync(new URL(`../${f}`, import.meta.url), 'utf8'));
    if (flag === '--aplicar' && salida !== fuente) writeFileSync(LANDING, salida);
    console.log(JSON.stringify(res, null, 2));
}
