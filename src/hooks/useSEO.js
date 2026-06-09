import { useEffect } from 'react';

/**
 * useSEO — actualiza title, meta description y canonical por página (client-side).
 * Googlebot ejecuta JS y toma estos valores. Para crawlers sin JS (WhatsApp/FB)
 * se complementa con prerender en el build.
 *
 * @param {Object} opts
 * @param {string} opts.title       Título de la pestaña / SERP
 * @param {string} [opts.description] Meta description
 * @param {string} [opts.canonical] URL canónica absoluta
 */
export function useSEO({ title, description, canonical }) {
    useEffect(() => {
        const prevTitle = document.title;
        if (title) document.title = title;

        const setMeta = (selector, attr, value) => {
            if (!value) return null;
            let el = document.head.querySelector(selector);
            const created = !el;
            if (!el) {
                el = document.createElement('meta');
                const [k, v] = attr;
                el.setAttribute(k, v);
                document.head.appendChild(el);
            }
            el.setAttribute('content', value);
            return { el, created };
        };

        const descRef = setMeta('meta[name="description"]', ['name', 'description'], description);
        const ogTitleRef = setMeta('meta[property="og:title"]', ['property', 'og:title'], title);
        const ogDescRef = setMeta('meta[property="og:description"]', ['property', 'og:description'], description);

        let canonEl = null;
        let canonCreated = false;
        let prevCanonHref = null;
        if (canonical) {
            canonEl = document.head.querySelector('link[rel="canonical"]');
            if (!canonEl) {
                canonEl = document.createElement('link');
                canonEl.setAttribute('rel', 'canonical');
                document.head.appendChild(canonEl);
                canonCreated = true;
            } else {
                prevCanonHref = canonEl.getAttribute('href');
            }
            canonEl.setAttribute('href', canonical);
        }

        return () => {
            document.title = prevTitle;
            // Limpiar/restaurar elementos creados para no contaminar otras rutas
            [descRef, ogTitleRef, ogDescRef].forEach(ref => {
                if (ref?.created && ref.el?.parentNode) ref.el.parentNode.removeChild(ref.el);
            });
            if (canonEl) {
                if (canonCreated && canonEl.parentNode) canonEl.parentNode.removeChild(canonEl);
                else if (prevCanonHref) canonEl.setAttribute('href', prevCanonHref);
            }
        };
    }, [title, description, canonical]);
}

export default useSEO;
