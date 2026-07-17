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
 *
 * Solo actua sobre "/" y "/patologia/*" (los assets, /api y el resto no se tocan).
 * Cualquier error cae en next() para no romper el sitio.
 */
export const config = {
    matcher: [
        '/',
        '/patologia/:path*',
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
        '/equipamiento-rehabilitacion-pulmonar',
        '/comprar-concentrador-oxigeno-portatil-argentina',
        '/ventilador-stellar-150',
    ],
};

export default function middleware(request) {
    try {
        const host = (request.headers.get('host') || '').toLowerCase();
        if (!host.includes('insersalud.com')) return next();

        const url = new URL(request.url);
        if (url.pathname.startsWith('/insersalud')) return next();

        const target = new URL(url);
        target.pathname = '/insersalud' + (url.pathname === '/' ? '' : url.pathname);
        return rewrite(target);
    } catch {
        return next();
    }
}
