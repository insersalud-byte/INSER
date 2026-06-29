import React, { useState } from 'react';
import { Send, MessageCircle, CheckCircle } from 'lucide-react';

/**
 * LeadForm — formulario de captación de leads.
 * Captura al visitante que NO escribe por WhatsApp (de noche, con miedo a llamar,
 * comparando proveedores). Al enviar:
 *  - manda el lead por EMAIL al negocio (vía FormSubmit, sin backend propio), y
 *  - ofrece continuar por WhatsApp con los datos precargados.
 *  - registra el evento generate_lead en GA4.
 *
 * Nota: la primera vez, FormSubmit envía un email de confirmación a
 * inser.salud@gmail.com que hay que aceptar una sola vez para activar el envío.
 */
const WA_NUMBER = '5493512065320';
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/inser.salud@gmail.com';

export default function LeadForm({ contexto = 'Home' }) {
    const [form, setForm] = useState({ name: '', phone: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle | sending | done | error
    const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const waLink = () => {
        const txt = `Hola, soy ${form.name || ''} (tel: ${form.phone || ''}). ${form.message || 'Quiero hacer una consulta.'}${contexto && contexto !== 'Home' ? ` [${contexto}]` : ''}`;
        return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(txt.trim())}`;
    };

    const submit = async (e) => {
        e.preventDefault();
        if (!form.name.trim() || !form.phone.trim() || status === 'sending') return;
        setStatus('sending');
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', 'generate_lead', { context: contexto });
        }
        if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
            window.fbq('track', 'Lead', { content_name: contexto });
        }
        try {
            await fetch(FORM_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    _subject: `Nueva consulta web INSER SALUD${contexto && contexto !== 'Home' ? ` — ${contexto}` : ''}`,
                    _captcha: 'false',
                    Nombre: form.name,
                    Telefono: form.phone,
                    Mensaje: form.message || '(sin mensaje)',
                    Pagina: contexto,
                }),
            });
            setStatus('done');
        } catch {
            setStatus('error');
        }
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
                    <h3 style={{ margin: '0 0 0.4rem' }}>¡Gracias! Recibimos tu consulta</h3>
                    <p style={{ margin: '0 0 1rem', color: '#475569', fontSize: '0.92rem' }}>Te vamos a contactar a la brevedad. Si querés, escribinos ahora por WhatsApp:</p>
                    <a href={waLink()} target="_blank" rel="noopener noreferrer" style={{ ...btn, textDecoration: 'none', background: '#25d366' }}>
                        <MessageCircle size={18} /> Continuar por WhatsApp
                    </a>
                </div>
            </div>
        );
    }

    return (
        <form style={card} onSubmit={submit}>
            <h3 style={{ margin: '0 0 0.25rem', color: '#0f172a' }}>Dejanos tu consulta</h3>
            <p style={{ margin: '0 0 1rem', color: '#475569', fontSize: '0.88rem' }}>Te contactamos a la brevedad. Sin compromiso.</p>
            <input style={input} type="text" placeholder="Tu nombre *" value={form.name} onChange={upd('name')} required />
            <input style={input} type="tel" placeholder="Tu teléfono / WhatsApp *" value={form.phone} onChange={upd('phone')} required />
            <textarea style={{ ...input, minHeight: 80, resize: 'vertical' }} placeholder="¿En qué te podemos ayudar? (equipo, patología, alquiler...)" value={form.message} onChange={upd('message')} />
            <button style={btn} type="submit" disabled={status === 'sending'}>
                <Send size={18} /> {status === 'sending' ? 'Enviando...' : 'Enviar consulta'}
            </button>
            {status === 'error' && (
                <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.6rem', textAlign: 'center' }}>
                    No se pudo enviar. Escribinos por <a href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp</a>.
                </p>
            )}
            <p style={{ margin: '0.75rem 0 0', textAlign: 'center', fontSize: '0.82rem' }}>
                o <a href={waLink()} target="_blank" rel="noopener noreferrer" style={{ color: '#1e40af', fontWeight: 600 }}>escribinos por WhatsApp</a>
            </p>
        </form>
    );
}
