/**
 * waOrigen — agrega a los enlaces de WhatsApp la pagina desde la que escribe la persona.
 * Sirve para saber, al leer la conversacion, que estaba mirando quien consulta.
 * - Enlace sin texto (o con el generico): "Hola, vengo de insersalud.com/<pagina> y quiero hacer una consulta."
 * - Enlace con texto propio: se conserva y se le suma "(Vengo de insersalud.com/<pagina>)".
 * - Si el texto ya nombra el sitio (insersalud.com / INSER SALUD) no se toca.
 * Es idempotente: aplicarlo dos veces da el mismo resultado.
 */
const GENERICO = 'Hola, quiero hacer una consulta.';

export function waConOrigen(href, pathname) {
    try {
        if (!href || href.indexOf('wa.me/') === -1) return href;
        const u = new URL(href);
        const texto = (u.searchParams.get('text') || '').trim();
        if (/insersalud\.com|inser salud/i.test(texto)) return href;
        const ruta = (pathname || '/').replace(/\/+$/, '');
        const sitio = 'insersalud.com' + ruta;
        const nuevo = (!texto || texto === GENERICO)
            ? `Hola, vengo de ${sitio} y quiero hacer una consulta.`
            : `${texto} (Vengo de ${sitio})`;
        return `${u.origin}${u.pathname}?text=${encodeURIComponent(nuevo)}`;
    } catch {
        return href;
    }
}

/** Ubicacion del boton dentro de la pagina, para el evento contact_whatsapp de GA4. */
export function waUbicacion(a) {
    if (!a) return 'otro';
    if (a.dataset && a.dataset.wa) return a.dataset.wa;
    if (a.closest('footer')) return 'pie';
    if (a.closest('header')) return 'encabezado';
    if (a.closest('nav')) return 'menu';
    return 'contenido';
}
