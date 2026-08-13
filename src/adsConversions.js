// Conversiones NATIVAS de Google Ads (cuenta inser salud 231-362-9293).
//
// Son las que la campaña usa para pujar. No confundir con los eventos de GA4:
// GA4 mide para analizar, esto le avisa a Ads que el clic que pagó terminó en
// una consulta. Se disparan en los MISMOS puntos que contact_whatsapp,
// contact_phone y generate_lead, para que nunca se desincronicen.
//
// El tag AW-18383657900 ya carga en el sitio como destino de la etiqueta de
// Google (configuración del lado de Google, no hay que agregar nada al <head>).
//
// El value 1 ARS es NOMINAL a propósito: cuenta la conversión sin inventar
// ingresos. El negocio cierra por WhatsApp y no hay monto conocido por consulta.
export const ADS_CONTACTO = 'AW-18383657900/2leGCIadkeEcEKy3gb5E';

export function adsConversion(sendTo) {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function' || !sendTo) return;
    window.gtag('event', 'conversion', { send_to: sendTo, value: 1.0, currency: 'ARS' });
}
