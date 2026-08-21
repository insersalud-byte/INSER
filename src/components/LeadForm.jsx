import React, { useState } from 'react';
import { Send, MessageCircle, CheckCircle, ArrowRight, ChevronDown } from 'lucide-react';
import { adsConversion, ADS_CONTACTO } from '../adsConversions';

/**
 * LeadForm — captación de consultas por indicación médica.
 *
 * Diseñado sobre un dato medido: la gente elige WhatsApp 31 a 0 contra el formulario.
 * Por eso esto NO es un formulario tradicional, es un acelerador de WhatsApp que
 * de paso deja el lead por email:
 *   1. pide lo mínimo (nombre, WhatsApp y qué equipo le indicaron),
 *   2. abre WhatsApp con el mensaje ya armado,
 *   3. manda el lead por email al negocio (FormSubmit, sin backend propio),
 *   4. muestra una confirmación que lleva a la página del tratamiento.
 *
 * NO se piden DNI, dirección, diagnóstico ni obra social: eso se conversa por
 * WhatsApp cuando la operación se cierra. NO se muestran precios de alquiler.
 *
 * Nota: FormSubmit necesita una activación única por email (ya hecha en 2026-06).
 */
const WA_NUMBER = '5493512065320';
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/inser.salud@gmail.com';

// Equipos que REALMENTE vendemos/alquilamos. No agregar nada que no esté en el catálogo.
// destino: a dónde se invita a la persona después de enviar la consulta.
// img: foto real del producto del catálogo (no ilustraciones ni stock).
const EQUIPOS = [
    { id: 'concentrador', label: 'Concentrador de oxígeno (para casa)', img: '/artifacts/products/concentrador_bmc_1.jpg', destino: '/oxigeno-a-domicilio-cordoba', destinoLabel: 'Ver cómo funciona la oxigenoterapia' },
    { id: 'portatil', label: 'Concentrador de oxígeno portátil', img: '/artifacts/products/f18cede5-9404-4eee-a751-01f532e715d7.jpg', destino: '/comprar-concentrador-oxigeno-portatil-argentina', destinoLabel: 'Ver los concentradores portátiles' },
    { id: 'mochila', label: 'Mochila / tubo de oxígeno', img: '/artifacts/products/c1aa3c71-a9fb-422a-82ac-222625d0bd3a.jpg', destino: '/oxigeno-a-domicilio-cordoba', destinoLabel: 'Ver cómo funciona la oxigenoterapia' },
    { id: 'cpap', label: 'CPAP', img: '/artifacts/products/1752160942319-bmcg2.2.jpg', destino: '/patologia/apnea-del-sueno', destinoLabel: 'Ver cómo se trata la apnea del sueño' },
    { id: 'autocpap', label: 'AutoCPAP', img: '/artifacts/products/fcd9a652-1366-4c5a-916d-e4321777fe9e.jpeg', destino: '/patologia/apnea-del-sueno', destinoLabel: 'Ver cómo se trata la apnea del sueño' },
    { id: 'bipap', label: 'BiPAP / VNI', img: '/artifacts/products/2cffdc89-7433-4bcb-80cd-7f2862733ec0.jpg', destino: '/bipap-cordoba', destinoLabel: 'Ver cómo funciona el BiPAP' },
    { id: 'ventilador', label: 'Ventilador domiciliario', img: '/artifacts/products/b3205a47-2021-4f73-b11a-a48ac33e29ce.jpg', destino: '/ventilador-stellar-150', destinoLabel: 'Ver el ventilador STELLAR 150' },
    { id: 'cough', label: 'Cough Assist (asistente de tos)', img: '/artifacts/products/a44d34ae-c159-4f83-8c8d-41c2fcfc4e49.jpg', destino: '/cough-assist-asistente-de-tos', destinoLabel: 'Ver cómo funciona el asistente de tos' },
    { id: 'mascara', label: 'Máscara o repuesto', img: '/artifacts/products/1751037116992-1000306910.jpg', destino: '/mascaras-cpap', destinoLabel: 'Ver la guía de máscaras' },
    { id: 'nose', label: 'No estoy seguro / otro', img: null, destino: null, destinoLabel: 'Consultar con Santi' },
];

export default function LeadForm({ contexto = 'Home', sinTitulo = false, conImagenes = false }) {
    const [form, setForm] = useState({ name: '', phone: '' });
    const [equipos, setEquipos] = useState([]);
    const [consent, setConsent] = useState(false);
    const [status, setStatus] = useState('idle'); // idle | sending | done | error
    const [listaAbierta, setListaAbierta] = useState(false);
    const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const toggleEquipo = (id) =>
        setEquipos((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

    const elegidos = EQUIPOS.filter((e) => equipos.includes(e.id));
    const textoEquipos = elegidos.map((e) => e.label).join(', ');
    // El destino lo define el primer equipo tildado (el orden de la lista es el de prioridad)
    const destino = elegidos.find((e) => e.destino) || null;

    const waLink = () => {
        const txt = `Hola INSER SALUD, soy ${form.name || ''}. Me indicaron ${textoEquipos || 'un equipo respiratorio'} y quiero la cotización.`;
        return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(txt.trim())}`;
    };

    const listo = form.name.trim() && form.phone.trim() && equipos.length > 0 && consent;

    const submit = async (e) => {
        e.preventDefault();
        if (!listo || status === 'sending') return;
        setStatus('sending');

        // WhatsApp se abre YA, dentro del click: si se abriera después del await,
        // el navegador lo bloquea como popup. Si el email falla, el flujo no se corta.
        const wa = waLink();
        window.open(wa, '_blank', 'noopener,noreferrer');

        // El listener de App.jsx solo mide los <a href="wa.me">, asi que los
        // WhatsApp que abre este formulario quedaban fuera de contact_whatsapp.
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', 'contact_whatsapp', { transport_type: 'beacon', link_url: wa, source: 'form' });
        }
        if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
            window.fbq('track', 'Contact', { method: 'whatsapp' });
        }
        adsConversion(ADS_CONTACTO); // lo que la campaña de Ads usa para pujar

        try {
            const res = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    _subject: `Nueva consulta web INSER SALUD — ${textoEquipos}`,
                    _captcha: 'false',
                    Nombre: form.name,
                    WhatsApp: form.phone,
                    'Equipo indicado': textoEquipos,
                    Pagina: contexto,
                    Consentimiento: 'Aceptó ser contactado por WhatsApp',
                }),
            });
            if (!res.ok) throw new Error('FormSubmit ' + res.status);
            // Eventos de conversión SOLO cuando el lead realmente se envió
            if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
                window.gtag('event', 'generate_lead', { context: contexto, equipo: textoEquipos });
            }
            if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
                window.fbq('track', 'Lead', { content_name: textoEquipos });
            }
        } catch {
            // El lead ya está en WhatsApp: no mostramos error, no se pierde la consulta.
        }
        setStatus('done');
    };

    const card = {
        background: '#fff', borderRadius: '1rem', padding: '1.5rem',
        boxShadow: '0 6px 24px rgba(30,64,175,0.10)', border: '1px solid #e8eef6',
        maxWidth: 460, width: '100%',
    };
    const input = {
        width: '100%', padding: '0.7rem 0.9rem', marginBottom: '0.6rem', fontSize: '0.95rem',
        border: '1.5px solid #e2e8f0', borderRadius: '0.6rem', outline: 'none', boxSizing: 'border-box',
        fontFamily: 'inherit',
    };
    const btn = {
        width: '100%', padding: '0.8rem', fontSize: '1rem', fontWeight: 700, color: '#fff',
        background: 'linear-gradient(135deg,#1e40af,#3b82f6)', border: 'none', borderRadius: '0.6rem',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
    };

    if (status === 'done') {
        return (
            <div style={card}>
                <div style={{ textAlign: 'center', color: '#0f172a' }}>
                    <CheckCircle size={40} color="#10b981" style={{ marginBottom: '0.5rem' }} />
                    <h3 style={{ margin: '0 0 0.4rem' }}>Recibimos tu consulta, {form.name.split(' ')[0]}</h3>
                    <p style={{ margin: '0 0 0.9rem', color: '#475569', fontSize: '0.95rem' }}>
                        Te escribimos <strong style={{ color: '#0f172a' }}>hoy mismo</strong> por WhatsApp con la cotización,
                        de 8 a 20 hs, desde el <strong>+54 9 351 206-5320</strong>.
                    </p>

                    {/* Diferencial de servicio: aplica tanto a alquiler como a venta */}
                    <div style={{ background: '#eff6ff', border: '1px solid #dbeafe', borderRadius: '0.7rem', padding: '0.85rem 1rem', textAlign: 'left', marginBottom: '1rem' }}>
                        <strong style={{ display: 'block', color: '#1e40af', marginBottom: '0.3rem', fontSize: '0.95rem' }}>No te entregamos una caja</strong>
                        <p style={{ margin: 0, fontSize: '0.87rem', lineHeight: 1.6, color: '#334155' }}>
                            Tu equipo llega configurado según la indicación de tu médico (presión, flujo, modo),
                            listo para usar desde la primera noche. La instalación la hace personal profesional
                            especializado, que te explica cómo usarlo, cómo limpiarlo y qué esperar los primeros días.
                        </p>
                    </div>

                    <p style={{ margin: '0 0 0.6rem', color: '#475569', fontSize: '0.88rem' }}>
                        Mientras tanto, mirá cómo funciona tu tratamiento:
                    </p>
                    {destino ? (
                        <a href={destino.destino} style={{ ...btn, textDecoration: 'none' }}>
                            {destino.destinoLabel} <ArrowRight size={17} />
                        </a>
                    ) : (
                        <button
                            style={btn}
                            onClick={() => window.dispatchEvent(new CustomEvent('open-santi', { detail: { message: 'Hola Santi, no estoy seguro de qué equipo me indicaron. ¿Me ayudás?' } }))}
                        >
                            <MessageCircle size={17} /> Consultar con Santi
                        </button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <form style={card} onSubmit={submit}>
            {!sinTitulo && (
                <>
                    <h3 style={{ margin: '0 0 0.25rem', color: '#0f172a', fontSize: '1.2rem' }}>¿Te indicaron un equipo respiratorio?</h3>
                    <p style={{ margin: '0 0 1rem', color: '#475569', fontSize: '0.88rem' }}>
                        Decinos qué te indicó tu médico y te pasamos la cotización por WhatsApp.
                    </p>
                </>
            )}

            <input style={input} type="text" placeholder="Tu nombre *" value={form.name} onChange={upd('name')} required />
            <input style={input} type="tel" placeholder="Tu WhatsApp *" value={form.phone} onChange={upd('phone')} required />

            {/* Selector desplegable: 10 casillas a la vista hacen el formulario muy largo
                en celular. Cerrado muestra lo elegido; se abre de un toque. */}
            <p style={{ margin: '0.5rem 0 0.4rem', fontSize: '0.9rem', fontWeight: 600, color: '#0f172a' }}>
                ¿Qué equipo te indicaron? <span style={{ fontWeight: 400, color: '#64748b' }}>(podés marcar más de uno)</span>
            </p>

            {/* Modo con imágenes (página de alquiler): tarjetas con la foto real del equipo */}
            {conImagenes ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(128px, 1fr))', gap: '0.6rem', marginBottom: '0.9rem' }}>
                    {EQUIPOS.map((eq) => {
                        const marcado = equipos.includes(eq.id);
                        return (
                            <label
                                key={eq.id}
                                style={{
                                    position: 'relative', cursor: 'pointer', display: 'block',
                                    background: marcado ? '#eff6ff' : '#fff',
                                    border: `2px solid ${marcado ? '#1e40af' : '#e8eef6'}`,
                                    borderRadius: '0.7rem', overflow: 'hidden', textAlign: 'center',
                                    transition: 'border-color .15s',
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={marcado}
                                    onChange={() => toggleEquipo(eq.id)}
                                    style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
                                />
                                {marcado && (
                                    <span style={{ position: 'absolute', top: 5, right: 5, background: '#1e40af', color: '#fff', borderRadius: '50%', width: 21, height: 21, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                                        <CheckCircle size={14} />
                                    </span>
                                )}
                                {eq.img ? (
                                    <img
                                        src={eq.img}
                                        alt={eq.label}
                                        loading="lazy"
                                        decoding="async"
                                        style={{ width: '100%', height: 92, objectFit: 'contain', background: '#f8fafc', padding: '0.4rem', boxSizing: 'border-box', display: 'block' }}
                                    />
                                ) : (
                                    <div style={{ height: 92, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', fontSize: '1.8rem' }} aria-hidden="true">🤔</div>
                                )}
                                <span style={{ display: 'block', padding: '0.45rem 0.4rem 0.55rem', fontSize: '0.79rem', lineHeight: 1.3, color: marcado ? '#1e40af' : '#334155', fontWeight: marcado ? 700 : 500 }}>
                                    {eq.label}
                                </span>
                            </label>
                        );
                    })}
                </div>
            ) : (
            <>
            <button
                type="button"
                onClick={() => setListaAbierta((v) => !v)}
                aria-expanded={listaAbierta}
                style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    gap: '0.5rem', padding: '0.7rem 0.9rem', fontSize: '0.95rem', fontFamily: 'inherit',
                    textAlign: 'left', cursor: 'pointer',
                    background: '#fff',
                    color: equipos.length ? '#1e40af' : '#94a3b8',
                    fontWeight: equipos.length ? 600 : 400,
                    border: `1.5px solid ${equipos.length ? '#93c5fd' : '#e2e8f0'}`,
                    borderRadius: '0.6rem',
                    marginBottom: listaAbierta ? '0.4rem' : '0.8rem',
                }}
            >
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {equipos.length ? textoEquipos : 'Elegí el equipo indicado'}
                </span>
                <ChevronDown
                    size={18}
                    style={{ flexShrink: 0, transition: 'transform .2s', transform: listaAbierta ? 'rotate(180deg)' : 'none' }}
                />
            </button>

            {listaAbierta && (
                <div style={{ display: 'grid', gap: '0.3rem', marginBottom: '0.8rem', maxHeight: 260, overflowY: 'auto', padding: '0.15rem' }}>
                    {EQUIPOS.map((eq) => {
                        const marcado = equipos.includes(eq.id);
                        return (
                            <label
                                key={eq.id}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.55rem', cursor: 'pointer',
                                    fontSize: '0.9rem', color: marcado ? '#1e40af' : '#334155',
                                    background: marcado ? '#eff6ff' : '#f8fafc',
                                    border: `1.5px solid ${marcado ? '#93c5fd' : '#e8eef6'}`,
                                    borderRadius: '0.5rem', padding: '0.5rem 0.7rem',
                                    fontWeight: marcado ? 600 : 400,
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={marcado}
                                    onChange={() => toggleEquipo(eq.id)}
                                    style={{ width: 17, height: 17, accentColor: '#1e40af', flexShrink: 0, margin: 0 }}
                                />
                                {eq.label}
                            </label>
                        );
                    })}
                </div>
            )}
            </>
            )}

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.82rem', color: '#475569', marginBottom: '0.8rem', cursor: 'pointer' }}>
                <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    style={{ width: 16, height: 16, accentColor: '#1e40af', marginTop: 2, flexShrink: 0 }}
                    required
                />
                <span>Acepto que INSER SALUD me contacte por WhatsApp para responder esta consulta.</span>
            </label>

            <button style={{ ...btn, opacity: listo ? 1 : 0.55, cursor: listo ? 'pointer' : 'not-allowed' }} type="submit" disabled={!listo || status === 'sending'}>
                <Send size={18} /> {status === 'sending' ? 'Enviando...' : 'Pedir cotización por WhatsApp'}
            </button>

            <p style={{ margin: '0.7rem 0 0', textAlign: 'center', fontSize: '0.78rem', color: '#64748b' }}>
                No pedimos DNI, dirección ni obra social para cotizar.
            </p>
        </form>
    );
}
