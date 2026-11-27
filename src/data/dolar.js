import datos from './dolar.json';
import { crearConversor } from './pesos.js';

export const DOLAR = datos.bnaVenta;
export const DOLAR_FECHA = datos.fecha;
export const { pesos, conPesos, dolarTxt } = crearConversor(DOLAR);

// Copia de un objeto de datos (paginas, patologias) con los "U$S N" de los textos visibles
// pasados a "U$S N (≈ $pesos)". No toca titulos/meta (no cambian todos los dias), slugs ni urls.
const SIN_PESOS = new Set(['metaTitle', 'metaTitleSalud', 'description', 'slug', 'img', 'images', 'heroImg', 'ficha', 'href', 'url', 'link', 'id']);
const cache = new WeakMap();
export function pesificar(obj) {
    if (typeof obj === 'string') return conPesos(obj);
    if (!obj || typeof obj !== 'object' || typeof obj.$$typeof === 'symbol' || typeof obj === 'function') return obj;
    if (cache.has(obj)) return cache.get(obj);
    let out;
    if (Array.isArray(obj)) out = obj.map(pesificar);
    else if (Object.getPrototypeOf(obj) !== Object.prototype) out = obj;
    else {
        out = {};
        for (const [k, v] of Object.entries(obj)) out[k] = SIN_PESOS.has(k) ? v : pesificar(v);
    }
    cache.set(obj, out);
    return out;
}
