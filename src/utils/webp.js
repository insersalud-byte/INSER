import { WEBP_DISPONIBLES } from './webpDisponibles';

/**
 * Devuelve la version .webp de una foto de /artifacts si existe (pesa ~40% menos que el JPG),
 * o la ruta original si no. Solo para lo que se MUESTRA en pantalla: el sitemap, el feed de
 * Merchant Center, el og:image y el HTML estatico siguen apuntando al JPG original.
 */
export function webp(src) {
    if (typeof src !== 'string' || !WEBP_DISPONIBLES.has(src)) return src;
    return src.replace(/\.(jpe?g|png)$/i, '.webp');
}
