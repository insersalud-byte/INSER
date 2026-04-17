import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, ExternalLink, CheckCircle, ChevronRight, Phone, Star, AlertCircle, Link2 } from 'lucide-react';
import { getPathologyBySlug, pathologies } from './pathologyData';
import css from './PathologyPage.module.css';

const openSanti = (message) => {
    window.dispatchEvent(new CustomEvent('open-santi', { detail: { message } }));
};

const PathologyPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const data = getPathologyBySlug(slug);

    // Set document title
    useEffect(() => {
        if (data?.metaTitle) {
            document.title = data.metaTitle;
        }
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

    // Otras patologías para el bloque "También tratamos"
    const others = pathologies.filter(p => p.slug !== slug).slice(0, 3);

    // Helper para formatear el precio del producto
    const formatPrice = (product) => {
        if (product.priceARS && product.priceUSD) return `${product.priceARS} · ${product.priceUSD}`;
        if (product.priceARS) return product.priceARS;
        if (product.priceUSD) return product.priceUSD;
        return 'Consultar precio';
    };

    // Artículo gramatical
    const article = ['EPOC', 'ALS', 'ELA'].includes(data.title) ? 'el' : 'la';

    return (
        <div className={css.page} style={{ '--path-color': data.color, '--path-light': data.colorLight }}>

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
                        <button
                            className={css.ctaPrimary}
                            onClick={() => openSanti(data.santiMessage)}
                        >
                            Consultar con Santi
                        </button>
                        <a
                            href="https://wa.me/5493512065320"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={css.ctaWa}
                        >
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
                        {data.intro && (
                            <p className={css.descIntro}>{data.intro}</p>
                        )}
                    </div>
                </div>
            </section>

            {/* ── ALERTA / CTA BANNER ────────────────────────────── */}
            {data.alertText && (
                <div className={css.alertBanner}>
                    <div className={css.container}>
                        <div className={css.alertInner}>
                            <AlertCircle size={22} className={css.alertIcon} />
                            <p>{data.alertText}</p>
                            <button
                                className={css.alertBtn}
                                onClick={() => openSanti(data.santiMessage)}
                            >
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
                                <p className={css.infoContent}>{s.content}</p>
                                {s.link && (
                                    <a href={s.link} target="_blank" rel="noopener noreferrer" className={css.infoLink}>
                                        {s.linkText} <ExternalLink size={13} />
                                    </a>
                                )}
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
                                        onClick={() => openSanti(`Hola Santi, me interesa el ${p.name} (${formatPrice(p)}) para tratar ${data.title}. ¿Podés darme más información?`)}
                                    >
                                        Consultar precio
                                    </button>
                                    <a href={p.link} target="_blank" rel="noopener noreferrer" className={css.specBtn}>
                                        Ficha →
                                    </a>
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

            {/* ── LINKS RELACIONADOS ─────────────────────────────── */}
            {data.relatedLinks && data.relatedLinks.length > 0 && (
                <section className={css.relatedSection}>
                    <div className={css.container}>
                        <h2 className={css.sectionTitle}>Recursos relacionados</h2>
                        <div className={css.relatedList}>
                            {data.relatedLinks.map((l, i) => (
                                <a key={i} href={l.url} target="_blank" rel="noopener noreferrer" className={css.relatedLink}>
                                    <Link2 size={15} />
                                    <span>{l.text}</span>
                                    <ExternalLink size={13} className={css.relatedExtIcon} />
                                </a>
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
                        <a href="https://wa.me/5493512065320" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                        <a href="mailto:inser.salud@gmail.com">Email</a>
                        <a href={data.moreInfoUrl} target="_blank" rel="noopener noreferrer">Sitio original</a>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default PathologyPage;
