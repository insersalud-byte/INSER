import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    ArrowLeft, MessageCircle, CheckCircle, ChevronRight,
    Phone, Star, AlertCircle, X, BookOpen
} from 'lucide-react';
import { getPathologyBySlug, pathologies } from './pathologyData';
import css from './PathologyPage.module.css';

const openSanti = (message) => {
    window.dispatchEvent(new CustomEvent('open-santi', { detail: { message } }));
};

/* ── Modal de sección informativa ───────────────────────────────── */
const SectionModal = ({ section, data, onClose }) => {
    // Cerrar con ESC
    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    return (
        <div className={css.modalOverlay} onClick={onClose}>
            <div className={css.modalPanel} onClick={(e) => e.stopPropagation()}>
                {/* Header del modal */}
                <div className={css.modalHeader} style={{ background: `linear-gradient(135deg, var(--path-color), color-mix(in srgb, var(--path-color) 70%, #60a5fa))` }}>
                    <div className={css.modalHeaderContent}>
                        <BookOpen size={22} color="white" />
                        <span className={css.modalPathLabel}>{data.title}</span>
                    </div>
                    <button className={css.modalClose} onClick={onClose} aria-label="Cerrar">
                        <X size={22} />
                    </button>
                </div>

                {/* Contenido */}
                <div className={css.modalBody}>
                    <h2 className={css.modalTitle}>{section.title}</h2>
                    <div className={css.modalContent}>
                        {section.content}
                    </div>

                    {/* CTAs dentro del modal */}
                    <div className={css.modalActions}>
                        {section.link && section.link.includes('wa.me') && (
                            <a
                                href={section.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={css.modalBtnWa}
                                onClick={onClose}
                            >
                                <MessageCircle size={17} />
                                {section.linkText}
                            </a>
                        )}
                        <button
                            className={css.modalBtnSanti}
                            onClick={() => { openSanti(data.santiMessage); onClose(); }}
                        >
                            Consultar con Santi
                        </button>
                        <a
                            href="https://wa.me/5493512065320"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={css.modalBtnWaDirect}
                        >
                            <Phone size={15} /> WhatsApp directo
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ── Componente principal ─────────────────────────────────────── */
const PathologyPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const data = getPathologyBySlug(slug);
    const [activeSection, setActiveSection] = useState(null);

    useEffect(() => {
        if (data?.metaTitle) document.title = data.metaTitle;
        return () => { document.title = 'INSER SALUD'; };
    }, [data]);

    if (!data) {
        return (
            <div className={css.notFound}>
                <h2>Página no encontrada</h2>
                <button onClick={() => navigate('/')}>Volver al inicio</button>
            </div>
        );
    }

    const others = pathologies.filter(p => p.slug !== slug).slice(0, 3);

    const formatPrice = (product) => {
        if (product.priceARS && product.priceUSD) return `${product.priceARS} · ${product.priceUSD}`;
        if (product.priceARS) return product.priceARS;
        if (product.priceUSD) return product.priceUSD;
        return 'Consultar precio';
    };

    const article = ['EPOC', 'ALS', 'ELA'].includes(data.title) ? 'el' : 'la';

    // Truncar texto para preview en card
    const truncate = (text, max = 160) => {
        const plain = text.split('\n')[0]; // primer párrafo
        return plain.length > max ? plain.slice(0, max) + '…' : plain;
    };

    return (
        <div className={css.page} style={{ '--path-color': data.color, '--path-light': data.colorLight }}>

            {/* ── MODAL ──────────────────────────────────────────── */}
            {activeSection && (
                <SectionModal
                    section={activeSection}
                    data={data}
                    onClose={() => setActiveSection(null)}
                />
            )}

            {/* ── NAVBAR ─────────────────────────────────────────── */}
            <nav className={css.navbar}>
                <div className={css.navInner}>
                    <Link to="/" className={css.navLogo}>
                        <img src="/artifacts/logo_insersalud.jpg" alt="Inser Salud"
                            onError={(e) => { e.target.style.display = 'none'; }} />
                    </Link>
                    <div className={css.navActions}>
                        <button className={css.backBtn} onClick={() => navigate('/')}>
                            <ArrowLeft size={16} /> Inicio
                        </button>
                        <a href="https://wa.me/5493512065320" target="_blank" rel="noopener noreferrer" className={css.waBtn}>
                            <MessageCircle size={15} /> WhatsApp
                        </a>
                    </div>
                </div>
            </nav>

            {/* ── HERO ───────────────────────────────────────────── */}
            <header className={css.hero}>
                <div className={css.heroContent}>
                    <div className={css.heroBreadcrumb}>
                        <Link to="/">Inicio</Link>
                        <ChevronRight size={14} />
                        <span>{data.title}</span>
                    </div>
                    <h1>{data.headline}</h1>
                    <p className={css.heroSub}>{data.subtitle}</p>
                    <div className={css.heroCtas}>
                        <button className={css.ctaPrimary} onClick={() => openSanti(data.santiMessage)}>
                            Consultar con Santi
                        </button>
                        <a href="https://wa.me/5493512065320" target="_blank" rel="noopener noreferrer" className={css.ctaWa}>
                            <Phone size={16} /> WhatsApp directo
                        </a>
                    </div>
                </div>
                <div className={css.heroImgWrap}>
                    <img src={data.heroImg} alt={data.title} className={css.heroImg} />
                    <div className={css.heroImgBadge}>
                        <Star size={14} fill="white" color="white" />
                        <span>Certificado ANMAT</span>
                    </div>
                </div>
            </header>

            {/* ── DESCRIPCIÓN + INTRO ────────────────────────────── */}
            <section className={css.descSection}>
                <div className={css.container}>
                    <div className={css.descCard}>
                        <h2>¿Qué es {article} {data.title}?</h2>
                        <p className={css.descMain}>{data.description}</p>
                        {data.intro && <p className={css.descIntro}>{data.intro}</p>}
                    </div>
                </div>
            </section>

            {/* ── ALERTA ─────────────────────────────────────────── */}
            {data.alertText && (
                <div className={css.alertBanner}>
                    <div className={css.container}>
                        <div className={css.alertInner}>
                            <AlertCircle size={22} className={css.alertIcon} />
                            <p>{data.alertText}</p>
                            <button className={css.alertBtn} onClick={() => openSanti(data.santiMessage)}>
                                {data.alertCta || 'Consultar ahora →'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── SECCIONES INFO ─────────────────────────────────── */}
            <section className={css.infoSection}>
                <div className={css.container}>
                    <h2 className={css.sectionTitle}>Diagnóstico y Tratamiento</h2>
                    <div className={css.infoGrid}>
                        {data.sections.map((s, i) => (
                            <div key={i} className={css.infoCard}>
                                <div className={css.infoNum}>{String(i + 1).padStart(2, '0')}</div>
                                <h3>{s.title}</h3>
                                <p className={css.infoPreview}>{truncate(s.content)}</p>
                                <div className={css.infoCardBtns}>
                                    <button
                                        className={css.infoReadMore}
                                        onClick={() => setActiveSection(s)}
                                    >
                                        <BookOpen size={14} />
                                        Leer información completa
                                    </button>
                                    {s.link && s.link.includes('wa.me') && (
                                        <a
                                            href={s.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={css.infoLink}
                                        >
                                            <MessageCircle size={13} /> {s.linkText}
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PRODUCTOS ──────────────────────────────────────── */}
            <section className={css.productsSection}>
                <div className={css.container}>
                    <div className={css.productsSectionHeader}>
                        <h2>Equipos disponibles</h2>
                        <p>Equipos certificados ANMAT con precios actualizados. Consultá disponibilidad con Santi.</p>
                    </div>
                    <div className={css.productsGrid}>
                        {data.products.map((p, i) => (
                            <div key={i} className={css.productCard}>
                                {p.badge && <span className={css.productBadge}>{p.badge}</span>}
                                <div className={css.productImg}>
                                    <img src={p.img} alt={p.name}
                                        onError={(e) => { e.target.src = '/artifacts/logo_insersalud.jpg'; }} />
                                </div>
                                <h4>{p.name}</h4>
                                {p.desc && <p className={css.productDesc}>{p.desc}</p>}
                                <div className={css.productPrice}>
                                    {p.priceARS && <span className={css.priceARS}>{p.priceARS}</span>}
                                    {p.priceUSD && <span className={css.priceUSD}>{p.priceUSD}</span>}
                                    {!p.priceARS && !p.priceUSD && <span className={css.priceConsult}>Consultar</span>}
                                </div>
                                <div className={css.productBtns}>
                                    <button
                                        className={css.consultBtn}
                                        onClick={() => openSanti(`Hola Santi, me interesa el ${p.name} (${formatPrice(p)}) para tratar ${data.title}. ¿Podés darme más información y disponibilidad?`)}
                                    >
                                        Consultar precio
                                    </button>
                                    <button
                                        className={css.specBtn}
                                        onClick={() => openSanti(`Hola Santi, quiero conocer las especificaciones técnicas del ${p.name}. ¿Me podés dar más detalles?`)}
                                    >
                                        Especificaciones
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TIPS ───────────────────────────────────────────── */}
            <section className={css.tipsSection}>
                <div className={css.container}>
                    <h2 className={css.sectionTitle}>Consejos para pacientes</h2>
                    <div className={css.tipsGrid}>
                        {data.tips.map((tip, i) => (
                            <div key={i} className={css.tipItem}>
                                <CheckCircle size={20} className={css.tipIcon} />
                                <p>{tip}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIOS ────────────────────────────────────── */}
            {data.testimonials && data.testimonials.length > 0 && (
                <section className={css.testimonialsSection}>
                    <div className={css.container}>
                        <h2 className={css.sectionTitle}>Lo que dicen nuestros pacientes</h2>
                        <div className={css.testimonialsGrid}>
                            {data.testimonials.map((t, i) => (
                                <div key={i} className={css.testimonialCard}>
                                    <div className={css.testimonialStars}>
                                        {Array.from({ length: t.stars || 5 }).map((_, si) => (
                                            <Star key={si} size={16} className={css.starFilled} />
                                        ))}
                                    </div>
                                    <p className={css.testimonialText}>"{t.text}"</p>
                                    <div className={css.testimonialAuthor}>
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=1e40af&color=fff&size=64&bold=true`}
                                            alt={t.name}
                                            className={css.testimonialAvatar}
                                        />
                                        <div>
                                            <strong>{t.name}</strong>
                                            {t.city && <span className={css.testimonialCity}>{t.city}</span>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── SANTI CTA ──────────────────────────────────────── */}
            <section className={css.santiSection}>
                <div className={css.container}>
                    <div className={css.santiCard} onClick={() => openSanti(data.santiMessage)}>
                        <img
                            src="/artifacts/santi_real.jpg"
                            alt="Santi"
                            className={css.santiAvatar}
                            onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Santi&background=1e40af&color=fff&size=160'; }}
                        />
                        <div className={css.santiText}>
                            <h3>¿Tenés dudas sobre {data.title}?</h3>
                            <p>Santi, nuestro asesor con IA, te ayuda a elegir el equipo correcto según tu indicación médica. Sin turnos, sin esperas — respondemos al instante.</p>
                            <button className={css.santiBtn}>Hablar con Santi ahora</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── OTRAS PATOLOGÍAS ───────────────────────────────── */}
            <section className={css.othersSection}>
                <div className={css.container}>
                    <h2 className={css.sectionTitle}>También tratamos</h2>
                    <div className={css.othersGrid}>
                        {others.map((o, i) => (
                            <Link key={i} to={`/patologia/${o.slug}`} className={css.otherCard} style={{ '--other-color': o.color }}>
                                <div className={css.otherImg}>
                                    <img src={o.heroImg} alt={o.title}
                                        onError={(e) => { e.target.src = '/artifacts/logo_insersalud.jpg'; }} />
                                </div>
                                <div className={css.otherBody}>
                                    <h4>{o.title}</h4>
                                    <p>{o.subtitle}</p>
                                    <span className={css.otherLink}>Ver información →</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FOOTER ─────────────────────────────────────────── */}
            <footer className={css.footer}>
                <div className={css.footerInner}>
                    <span>&copy; 2026 Inser Salud · Certificado ANMAT · Córdoba, Argentina</span>
                    <div className={css.footerLinks}>
                        <Link to="/">Inicio</Link>
                        <Link to="/#patologias">Patologías</Link>
                        <a href="https://wa.me/5493512065320" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                        <a href="mailto:inser.salud@gmail.com">Email</a>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default PathologyPage;
