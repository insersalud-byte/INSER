import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Phone, ChevronRight, CheckCircle, ShieldCheck, Truck, Clock, Star } from 'lucide-react';
import { getLocalPageBySlug, localPages } from './localPages';
import { useSEO } from '../../hooks/useSEO';
import LeadForm from '../../components/LeadForm';

import { webp } from '../../utils/webp';
const openSanti = (message) => {
    window.dispatchEvent(new CustomEvent('open-santi', { detail: { message } }));
};

const WA = 'https://wa.me/5493512065320';
const waCtx = (h1) => `${WA}?text=${encodeURIComponent(`Hola, estoy viendo "${h1}" en insersalud.com y quiero hacer una consulta.`)}`;
// Mensaje precargado por equipo: llega a WhatsApp diciendo QUE quiere comprar.
const waProducto = (p) => `${WA}?text=${encodeURIComponent(`Hola, quiero comprar el ${p.name} (${p.price}) con envío a mi provincia. ¿Me pasan disponibilidad y formas de pago?`)}`;

/**
 * Enlaces internos inline estilo markdown dentro del texto de las secciones: [texto](/ruta).
 * Tiene que coincidir con la funcion inlineLinks() de scripts/prerender-meta.mjs para que
 * el HTML estatico y el render de React muestren lo mismo.
 */
const LINK_RE = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;
const conEnlaces = (texto) => {
    if (!texto || !texto.includes('](/')) return texto;
    const partes = [];
    let ultimo = 0;
    for (const m of String(texto).matchAll(LINK_RE)) {
        if (m.index > ultimo) partes.push(texto.slice(ultimo, m.index));
        partes.push(
            <Link key={m.index} to={m[2]} style={{ color: '#1e40af', textDecoration: 'underline' }}>
                {m[1]}
            </Link>
        );
        ultimo = m.index + m[0].length;
    }
    if (ultimo < texto.length) partes.push(texto.slice(ultimo));
    return partes;
};

/**
 * LocalPage — landing SEO local (alta intención, Córdoba). Render por slug.
 * Cada dominio se indexa con angulo propio (inser.ar venta / insersalud.com domiciliario).
 * El HTML estático para crawlers lo genera scripts/prerender-meta.mjs desde localPages.js.
 */
const LocalPage = ({ slug }) => {
    const data = getLocalPageBySlug(slug);

    const isInsersaludHost = typeof window !== 'undefined' && window.location.hostname.includes('insersalud.com');
    const seoBase = isInsersaludHost ? 'https://insersalud.com' : 'https://inser.ar';
    useSEO({
        title: isInsersaludHost && data?.metaTitleSalud ? data.metaTitleSalud : data?.metaTitle,
        description: data?.description,
        canonical: data ? `${seoBase}/${data.slug}` : undefined,
    });

    if (!data) return null;

    const others = localPages.filter((p) => p.slug !== slug);

    const c = {
        page: { fontFamily: 'inherit', color: '#0f172a', background: '#f8fafc' },
        nav: { position: 'sticky', top: 0, zIndex: 50, background: '#fff', borderBottom: '1px solid #e8eef6', boxShadow: '0 1px 8px rgba(30,64,175,0.05)' },
        navInner: { maxWidth: 1100, margin: '0 auto', padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
        waBtn: { display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#108043', color: '#fff', textDecoration: 'none', fontWeight: 700, padding: '0.5rem 0.9rem', borderRadius: '0.6rem', fontSize: '0.9rem' },
        hero: { maxWidth: 1100, margin: '0 auto', padding: '2rem 1rem 1rem', display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' },
        crumb: { display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem' },
        h1: { fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', lineHeight: 1.15, margin: '0 0 0.75rem', color: '#0f172a' },
        intro: { fontSize: '1.05rem', lineHeight: 1.6, color: '#334155', margin: '0 0 1.25rem', maxWidth: 760 },
        ctas: { display: 'flex', flexWrap: 'wrap', gap: '0.6rem' },
        ctaPrimary: { background: 'linear-gradient(135deg,#1e40af,#3b82f6)', color: '#fff', border: 'none', fontWeight: 700, padding: '0.8rem 1.3rem', borderRadius: '0.7rem', cursor: 'pointer', fontSize: '1rem' },
        ctaWa: { display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#108043', color: '#fff', textDecoration: 'none', fontWeight: 700, padding: '0.8rem 1.3rem', borderRadius: '0.7rem', fontSize: '1rem' },
        heroImg: { width: '100%', maxWidth: 640, borderRadius: '1rem', boxShadow: '0 10px 30px rgba(30,64,175,0.12)', objectFit: 'cover' },
        trust: { background: '#eff6ff', borderTop: '1px solid #dbeafe', borderBottom: '1px solid #dbeafe' },
        trustInner: { maxWidth: 1100, margin: '0 auto', padding: '0.9rem 1rem', display: 'flex', flexWrap: 'wrap', gap: '1.2rem', justifyContent: 'center', color: '#1e40af', fontWeight: 600, fontSize: '0.9rem' },
        trustItem: { display: 'inline-flex', alignItems: 'center', gap: '0.4rem' },
        section: { maxWidth: 860, margin: '0 auto', padding: '1.5rem 1rem' },
        h2: { fontSize: '1.35rem', color: '#0f172a', margin: '1.5rem 0 0.6rem' },
        secImg: { display: 'block', width: '100%', height: 'auto', aspectRatio: '3 / 2', objectFit: 'cover', borderRadius: '1rem', margin: '0.4rem 0 1rem', boxShadow: '0 8px 24px rgba(30,64,175,0.10)', background: '#e2e8f0' },
        p: { fontSize: '1rem', lineHeight: 1.7, color: '#334155', margin: '0 0 0.8rem', whiteSpace: 'pre-line' },
        prodList: { listStyle: 'none', padding: 0, margin: '0.5rem 0', display: 'grid', gap: '0.5rem' },
        prodItem: { display: 'flex', justifyContent: 'space-between', gap: '1rem', background: '#fff', border: '1px solid #e8eef6', borderRadius: '0.6rem', padding: '0.7rem 0.9rem', fontSize: '0.95rem' },
        faqItem: { background: '#fff', border: '1px solid #e8eef6', borderRadius: '0.7rem', padding: '0.9rem 1.1rem', marginBottom: '0.6rem' },
        faqQ: { margin: '0 0 0.35rem', fontSize: '1.02rem', color: '#0f172a' },
        relWrap: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' },
        relLink: { display: 'inline-block', background: '#fff', border: '1px solid #bfdbfe', color: '#1e40af', textDecoration: 'none', fontWeight: 600, padding: '0.45rem 0.8rem', borderRadius: '999px', fontSize: '0.88rem' },
        footer: { background: '#0f172a', color: '#cbd5e1', marginTop: '2rem', padding: '1.5rem 1rem', textAlign: 'center', fontSize: '0.85rem' },
        offer: { display: 'inline-block', background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0', borderRadius: '0.6rem', padding: '0.45rem 0.75rem', fontSize: '0.9rem', fontWeight: 600, margin: '0 0 1rem' },
        cards: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.75rem', margin: '0 0 1.1rem' },
        card: { position: 'relative', background: '#fff', border: '1px solid #dbeafe', borderRadius: '0.9rem', padding: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', boxShadow: '0 4px 14px rgba(30,64,175,0.07)' },
        cardImg: { width: '100%', height: 130, objectFit: 'contain', background: '#fff', borderRadius: '0.6rem' },
        cardBadge: { position: 'absolute', top: '0.6rem', left: '0.6rem', background: '#1e40af', color: '#fff', fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '999px' },
        cardName: { fontSize: '0.92rem', fontWeight: 600, color: '#0f172a', lineHeight: 1.3 },
        cardPrice: { fontSize: '1.45rem', fontWeight: 800, color: '#1e40af', lineHeight: 1.1 },
        cardNote: { fontSize: '0.8rem', color: '#475569' },
        cardBtn: { marginTop: 'auto', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', background: '#108043', color: '#fff', textDecoration: 'none', fontWeight: 700, padding: '0.65rem 0.8rem', borderRadius: '0.6rem', fontSize: '0.95rem' },
        aviso: { display: 'block', background: '#fffbeb', border: '1px solid #fcd34d', color: '#92400e', borderRadius: '0.7rem', padding: '0.7rem 0.9rem', fontWeight: 600, textDecoration: 'none', margin: '0 0 1rem', fontSize: '0.95rem' },
        midCta: { background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '0.9rem', padding: '1rem 1.1rem', margin: '1.5rem 0', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' },
        footerLinks: { display: 'flex', flexWrap: 'wrap', gap: '0.9rem', justifyContent: 'center', marginTop: '0.6rem' },
    };

    return (
        <div style={c.page}>
            {/* NAVBAR */}
            <nav style={c.nav}>
                <div style={c.navInner}>
                    <Link to="/" aria-label="Inicio">
                        <img src="/artifacts/logo_insersalud_160.webp" alt="INSER SALUD" width={160} height={160} style={{ height: 38, width: 38 }}
                            onError={(e) => { e.target.style.display = 'none'; }} />
                    </Link>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <a href="tel:+5493512065320" style={{ ...c.waBtn, background: '#1e40af' }}>
                            <Phone size={16} /> Llamar
                        </a>
                        <a href={waCtx(data.h1)} target="_blank" rel="noopener noreferrer" style={c.waBtn}>
                            <MessageCircle size={16} /> WhatsApp
                        </a>
                    </div>
                </div>
            </nav>

            {/* HERO */}
            <header style={c.hero}>
                <div>
                    <div style={c.crumb}>
                        <Link to="/" style={{ color: '#64748b', textDecoration: 'none' }}>Inicio</Link>
                        <ChevronRight size={13} />
                        <span>{data.h1}</span>
                    </div>
                    <h1 style={c.h1}>{data.h1}</h1>
                    {data.aviso && (
                        <Link to={data.aviso.href} style={c.aviso}>{data.aviso.texto} →</Link>
                    )}
                    <p style={c.intro}>{conEnlaces(data.intro)}</p>
                    {data.offerLine && <p style={c.offer}>{data.offerLine}</p>}
                    {data.priceCards && data.products?.length > 0 && (
                        <div style={c.cards}>
                            {data.products.map((p, i) => (
                                <div key={i} style={c.card}>
                                    {p.badge && <span style={c.cardBadge}>{p.badge}</span>}
                                    {p.img && (
                                        <img src={webp(p.img)} alt={p.name} width={420} height={280} style={c.cardImg}
                                            loading={i === 0 ? 'eager' : 'lazy'} decoding="async"
                                            onError={(e) => { e.target.style.display = 'none'; }} />
                                    )}
                                    <span style={c.cardName}>{p.name}</span>
                                    <span style={c.cardPrice}>{p.price}</span>
                                    {p.note && <span style={c.cardNote}>{p.note}</span>}
                                    <a href={waProducto(p)} target="_blank" rel="noopener noreferrer" style={c.cardBtn}>
                                        <MessageCircle size={16} /> Lo quiero
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                    {data.waPrecio && (
                        <a href={`${WA}?text=${encodeURIComponent(data.waPrecio)}`} target="_blank" rel="noopener noreferrer"
                            style={{ ...c.ctaWa, fontSize: '1.08rem', padding: '0.9rem 1.4rem', marginBottom: '0.6rem' }}>
                            <MessageCircle size={18} /> Ver precio por WhatsApp
                        </a>
                    )}
                    <div style={c.ctas}>
                        {data.national ? (
                            <>
                                <a style={c.ctaWa} href={waCtx(data.h1)} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} /> Comprar por WhatsApp</a>
                                <button style={c.ctaPrimary} onClick={() => openSanti(data.ctaSanti)}>Consultar con Santi</button>
                            </>
                        ) : (
                            <>
                                <button style={c.ctaPrimary} onClick={() => openSanti(data.ctaSanti)}>Consultar con Santi</button>
                                {!data.waPrecio && (
                                    <a style={c.ctaWa} href={waCtx(data.h1)} target="_blank" rel="noopener noreferrer"><Phone size={16} /> WhatsApp directo</a>
                                )}
                            </>
                        )}
                    </div>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '0.6rem 0 0' }}>Respondemos todos los días, también fines de semana. Santi atiende las 24 hs.</p>
                </div>
                {!data.priceCards && (
                    <img src={webp(data.heroImg)} alt={data.h1} style={c.heroImg} fetchpriority="high" decoding="async"
                        onError={(e) => { e.target.src = '/artifacts/logo_insersalud.jpg'; }} />
                )}
            </header>

            {/* TRUST BAR */}
            <div style={c.trust}>
                <div style={c.trustInner}>
                    <span style={c.trustItem}><ShieldCheck size={16} /> Aprobado por ANMAT</span>
                    <span style={c.trustItem}><Truck size={16} /> {data.national ? 'Envío a todo el país' : 'Entrega a domicilio en el día en Córdoba'}</span>
                    {/* La garantia se muestra SOLO si la landing la declara. No hay
                        default: prometer "2 años" en paginas cuyos productos no lo
                        declaran seria un compromiso comercial que no podemos sostener.
                        Hoy la declaran las 2 landings de mascaras. */}
                    {data.garantia && <span style={c.trustItem}><Clock size={16} /> {data.garantia}</span>}
                    <span style={c.trustItem}><Star size={16} /> {data.national ? '+500 pacientes' : '+500 pacientes en Córdoba'}</span>
                </div>
            </div>

            {/* CONTENIDO */}
            <main style={c.section}>
                {data.sections.map((s, i) => (
                    <section key={i}>
                        <h2 style={c.h2}>{s.title}</h2>
                        {/* Foto opcional por seccion (img: { src, alt }). Va entre el titulo y el texto. */}
                        {s.img && (
                            <img src={webp(s.img.src)} alt={s.img.alt} loading="lazy" decoding="async"
                                width={1200} height={800} style={c.secImg}
                                onError={(e) => { e.target.style.display = 'none'; }} />
                        )}
                        <p style={c.p}>{conEnlaces(s.content)}</p>
                        {data.national && i === 1 && (
                            <div style={c.midCta}>
                                <span style={{ fontWeight: 600, color: '#0f172a' }}>¿Ya tenés la indicación de tu médico? Te pasamos el precio del día y el envío a tu provincia.</span>
                                <a href={waCtx(data.h1)} target="_blank" rel="noopener noreferrer" style={c.cardBtn}><MessageCircle size={16} /> Escribinos</a>
                            </div>
                        )}
                    </section>
                ))}

                {/* Formulario con la foto real de cada equipo (solo en el hub de alquiler) */}
                {data.formularioEquipos && (
                    <section style={{ margin: '1.5rem 0' }}>
                        <h2 style={c.h2}>Pedí tu cotización</h2>
                        <p style={c.p}>Marcá qué te indicó tu médico. Te respondemos por WhatsApp el mismo día.</p>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                            <LeadForm contexto={data.h1} sinTitulo conImagenes />
                        </div>
                    </section>
                )}

                {!data.priceCards && data.products && data.products.length > 0 && (
                    <section>
                        <h2 style={c.h2}>Equipos relacionados</h2>
                        <ul style={c.prodList}>
                            {data.products.map((p, i) => (
                                <li key={i} style={c.prodItem}>
                                    <span>{p.name}</span>
                                    <strong style={{ color: '#1e40af', whiteSpace: 'nowrap' }}>{p.price}</strong>
                                </li>
                            ))}
                        </ul>
                        <p style={{ ...c.p, marginTop: '0.6rem' }}>
                            <Link to="/" style={{ color: '#1e40af', fontWeight: 600 }}>Ver todo el catálogo y ofertas →</Link>
                        </p>
                    </section>
                )}

                {/* COMO FUNCIONA */}
                <section>
                    <h2 style={c.h2}>Cómo funciona</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                        {[['1','Nos contactás','WhatsApp, teléfono o formulario. Respondemos todos los días, también fines de semana.'],['2','Te asesoramos','Elegimos el equipo según tu prescripción médica.'],['3','Entregamos','En Córdoba con instalación en el día; al país, envío con puesta en marcha guiada y seguimiento.']].map(([n,t,d]) => (
                            <div key={n} style={{ background: '#fff', border: '1px solid #e8eef6', borderRadius: '0.7rem', padding: '0.9rem 1rem' }}>
                                <strong style={{ color: '#1e40af' }}>{n}. {t}</strong>
                                <p style={{ ...c.p, margin: '0.3rem 0 0', fontSize: '0.88rem' }}>{d}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ */}
                <section>
                    <h2 style={c.h2}>Preguntas frecuentes</h2>
                    {data.faq.map((f, i) => (
                        <div key={i} style={c.faqItem}>
                            <h3 style={c.faqQ}>{f.q}</h3>
                            <p style={{ ...c.p, margin: 0 }}>{conEnlaces(f.a)}</p>
                        </div>
                    ))}
                </section>

                {/* FORM */}
                <section style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                    <LeadForm contexto={data.h1} />
                </section>

                {/* RELACIONADOS */}
                <section>
                    <h2 style={c.h2}>También te puede servir</h2>
                    <div style={c.relWrap}>
                        {(data.related || others.slice(0, 3).map((o) => ({ label: o.h1, href: `/${o.slug}` }))).map((r, i) => (
                            <Link key={i} to={r.href} style={c.relLink}>{r.label}</Link>
                        ))}
                    </div>
                </section>
            </main>

            {/* FOOTER */}
            <footer style={c.footer}>
                <div>&copy; 2026 INSER SALUD · Aparatología aprobada por ANMAT · Córdoba, Argentina</div>
                <div style={c.footerLinks}>
                    <Link to="/" style={{ color: '#93c5fd' }}>Inicio</Link>
                    <Link to="/comprar-cpap-cordoba" style={{ color: '#93c5fd' }}>Comprar CPAP</Link>
                    <Link to="/alquiler-cpap-cordoba" style={{ color: '#93c5fd' }}>Alquiler CPAP</Link>
                    <Link to="/alquiler-concentrador-oxigeno-cordoba" style={{ color: '#93c5fd' }}>Alquiler oxígeno</Link>
                    <a href={WA} target="_blank" rel="noopener noreferrer" style={{ color: '#93c5fd' }}>WhatsApp</a>
                </div>
            </footer>
        </div>
    );
};

export default LocalPage;
