import { rewrite, next } from '@vercel/edge';

/**
 * Edge Middleware: enruta por dominio para que inser.ar e insersalud.com
 * sirvan HTML estatico diferenciado (title/description/canonical propios) y
 * compitan por separado en Google.
 *
 * - inser.ar (y cualquier otro host): pasa sin tocar -> sirve dist/index.html
 *   y dist/patologia/<slug>/index.html (angulo venta de equipos).
 * - insersalud.com: reescribe a /insersalud/... -> sirve la variante
 *   domiciliaria generada por prerender-meta.mjs.
 * - Negociacion de contenido para agentes de IA: si el cliente pide
 *   `Accept: text/markdown` con mas peso que text/html, se sirve la version
 *   markdown de la misma pagina (dist/<slug>.md, generada por el prerender).
 *   Toda respuesta de estas rutas lleva `Vary: Accept` para que las caches no
 *   mezclen las dos representaciones.
 *
 * Solo actua sobre "/", "/patologia/*" y las landings (los assets, /api y el
 * resto no se tocan). Cualquier error cae en next() para no romper el sitio.
 */
export const config = {
    matcher: [
        '/',
        '/patologia/:path*',
        '/alquiler-equipos-respiratorios-cordoba',
        '/alquiler-cpap-cordoba',
        '/alquiler-concentrador-oxigeno-cordoba',
        '/comprar-cpap-cordoba',
        '/estudio-del-sueno-cordoba',
        '/bipap-cordoba',
        '/oxigeno-a-domicilio-cordoba',
        '/concentrador-oxigeno-portatil-cordoba',
        '/comprar-cpap-argentina',
        '/comprar-concentrador-oxigeno-argentina',
        '/concentrador-oxigeno-10-litros',
        '/mascaras-cpap',
        '/mascaras-pediatricas',
        '/equipamiento-rehabilitacion-pulmonar',
        '/comprar-concentrador-oxigeno-portatil-argentina',
        '/ventilador-stellar-150',
        '/comprar-poligrafo-argentina',
        '/cough-assist-asistente-de-tos',
    ],
};

// Peso (q) con el que el cliente acepta un tipo. 0 si no lo lista.
// "*/*" no cuenta como pedido de markdown: un navegador lo manda siempre.
function acceptQ(accept, type) {
    for (const part of accept.split(',')) {
        const [mime, ...params] = part.trim().split(';');
        if (mime.trim().toLowerCase() !== type) continue;
        const q = params.map((x) => x.trim()).find((x) => x.startsWith('q='));
        const n = q ? parseFloat(q.slice(2)) : 1;
        return Number.isFinite(n) ? n : 1;
    }
    return 0;
}

export default function middleware(request) {
    try {
        const url = new URL(request.url);
        // Las variantes .md son archivos estaticos: se sirven tal cual, sin
        // reescribir (si no, /patologia/x.md caeria en /insersalud/... y daria 404).
        if (url.pathname.endsWith('.md')) return next();

        const host = (request.headers.get('host') || '').toLowerCase();
        if (!host.includes('insersalud.com')) return next();
        if (url.pathname.startsWith('/insersalud')) return next();

        const vary = { headers: { Vary: 'Accept' } };
        const accept = request.headers.get('accept') || '';
        if (acceptQ(accept, 'text/markdown') > acceptQ(accept, 'text/html')) {
            const md = new URL(url);
            md.pathname = url.pathname === '/' ? '/index.md' : url.pathname.replace(/\/$/, '') + '.md';
            // Content-Type explicito: la cabecera de vercel.json para *.md matchea la ruta
            // PEDIDA (sin .md), no la reescrita, asi que aca hay que declararlo a mano.
            return rewrite(md, { headers: { Vary: 'Accept', 'Content-Type': 'text/markdown; charset=utf-8' } });
        }

        const target = new URL(url);
        target.pathname = '/insersalud' + (url.pathname === '/' ? '' : url.pathname);
        return rewrite(target, vary);
    } catch {
        return next();
    }
}
