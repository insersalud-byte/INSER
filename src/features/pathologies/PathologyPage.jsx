import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    ArrowLeft, MessageCircle, CheckCircle, ChevronRight,
    Phone, Star, AlertCircle, X, BookOpen
} from 'lucide-react';
import { getPathologyBySlug, pathologies } from './pathologyData';
import { getSpecsFor } from '../../data/productSpecs';
import { useSEO } from '../../hooks/useSEO';
import LeadForm from '../../components/LeadForm';
import css from './PathologyPage.module.css';

const openSanti = (message) => {
    window.dispatchEvent(new CustomEvent('open-santi', { detail: { message } }));
};

/* ── Dimensiones intrínsecas reales de cada imagen (leídas del archivo) ──
   Sirven para que el navegador reserve el espacio y no haya salto de layout (CLS).
   El CSS sigue mandando sobre el tamaño final. Si una imagen no está en el mapa,
   no se emite width/height (mejor nada que un dato falso). */
const IMG_DIMS = {
    '/artifacts/autocpap_dreamstation.jpg': [1174, 895],
    '/artifacts/bipap_bmc_g3.jpg': [1200, 825],
    '/artifacts/concentrador_yuwell.jpg': [1119, 1029],
    '/artifacts/cough_assist.jpg': [1155, 1285],
    '/artifacts/cpap_airsense10.jpg': [1203, 717],
    '/artifacts/cpap_bmc_g2s.jpg': [993, 1024],
    '/artifacts/gce_zeno.jpg': [1164, 774],
    '/artifacts/hero_ame.jpg': [768, 1159],
    '/artifacts/hero_apnea.jpg': [768, 474],
    '/artifacts/hero_ela.jpg': [768, 893],
    '/artifacts/hero_epoc.jpg': [900, 600],
    '/artifacts/hero_fibrosis.jpg': [768, 1159],
    '/artifacts/hero_paralisis.jpg': [768, 786],
    '/artifacts/kingon_p2_s3.jpg': [1198, 921],
    '/artifacts/kingon_p2_toc.jpg': [604, 1195],
    '/artifacts/logo_insersalud.jpg': [400, 400],
    '/artifacts/mascara_nasal_dreamwear.jpg': [1200, 1026],
    '/artifacts/mascara_nasobucal_dreamwear.jpg': [1018, 1600],
    '/artifacts/mascara_rescomf.jpg': [702, 686],
    '/artifacts/products/876bc618-e07c-4007-8341-8660f0226cb4.jpg': [900, 904],
    '/artifacts/santi_real.jpg': [400, 601],
    '/artifacts/stellar_150.jpg': [1196, 1027],
};

const imgDims = (src) => {
    const d = IMG_DIMS[src];
    return d ? { width: d[0], height: d[1] } : {};
};

/* ── Modal de especificaciones técnicas ─────────────────────────── */
const SpecsModal = ({ product, onClose }) => {
    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    if (!product) return null;
    const specs = getSpecsFor(product.name);
    const priceTxt = [product.priceARS, product.priceUSD].filter(Boolean).join(' · ') || 'Consultar precio';

    return (
        <div className={css.modalOverlay} onClick={onClose}>
            <div className={css.specsPanel} onClick={(e) => e.stopPropagation()}>
                <button className={css.modalCloseBtn} onClick={onClose} aria-label="Cerrar">
                    <X size={22} />
                </button>

                <div className={css.specsHead}>
                    <div className={css.specsHeadImg}>
                        <img src={product.img} alt={product.name} {...imgDims(product.img)}
                            onError={(e) => { e.target.src = '/artifacts/logo_insersalud.jpg'; }} />
                    </div>
                    <div className={css.specsHeadInfo}>
                        <h3>{product.name}</h3>
                        <div className={css.specsHeadPrice}>{priceTxt}</div>
                        {product.desc && <p>{product.desc}</p>}
                    </div>
                </div>

                <div className={css.specsContent}>
                    <h4>Especificaciones técnicas</h4>
                    {specs.length > 0 ? (
                        <table className={css.specsTable}>
                            <tbody>
                                {specs.map(([k, v], i) => (
                                    <tr key={i}><th>{k}</th><td>{v}</td></tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className={css.specsFallback}>
                            Las especificaciones completas las tiene Santi. Te pasa ficha técnica, manual y compatibilidades al instante.
                        </p>
                    )}
                </div>

                <div className={css.specsFoot}>
                    <div className={css.specsSantiRow}>
                        <img
                            src="/artifacts/santi_real.jpg"
                            alt="Santi"
                            width={400}
                            height={601}
                            onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Santi&background=1e40af&color=fff'; }}
                        />
                        <div>
                            <strong>¿Te asesoro con este equipo?</strong>
                            <p>Disponibilidad, financiación y adaptación — al instante.</p>
                        </div>
                    </div>
                    <div className={css.specsFootActions}>
                        <button
                            className={css.specsBtnSanti}
                            onClick={() => {
                                openSanti(`Hola Santi, estoy viendo las especificaciones del ${product.name} (${priceTxt}). ¿Podés asesorarme?`);
                                onClose();
                            }}
                        >
                            <MessageCircle size={16} /> Consultar con Santi
                        </button>
                        <a
                            className={css.specsBtnWa}
                            href={`https://wa.me/5493512065320?text=${encodeURIComponent(`Hola, me interesa el ${product.name}. ¿Me das más info?`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Phone size={14} /> WhatsApp directo
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
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
    const [specsProduct, setSpecsProduct] = useState(null);

    // Cada dominio se indexa por separado con angulo propio:
    // inser.ar = equipos/venta; insersalud.com = tratamiento domiciliario.
    const isInsersaludHost = typeof window !== 'undefined' && window.location.hostname.includes('insersalud.com');
    const seoBase = isInsersaludHost ? 'https://insersalud.com' : 'https://inser.ar';
    useSEO({
        title: isInsersaludHost && data?.metaTitle
            ? data.metaTitle.replace('| INSER SALUD', '· Tratamiento Domiciliario | INSER SALUD')
            : data?.metaTitle,
        description: data?.subtitle || data?.intro,
        canonical: slug ? `${seoBase}/patologia/${slug}` : undefined,
    });

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

            {/* ── MODAL DE ESPECIFICACIONES ─────────────────────── */}
            {specsProduct && (
                <SpecsModal
                    product={specsProduct}
                    onClose={() => setSpecsProduct(null)}
                />
            )}

            {/* ── NAVBAR ─────────────────────────────────────────── */}
            <nav className={css.navbar}>
                <div className={css.navInner}>
                    <Link to="/" className={css.navLogo}>
                        <img src="/artifacts/logo_insersalud.jpg" alt="Inser Salud" width={400} height={400}
                            onError={(e) => { e.target.style.display = 'none'; }} />
                    </Link>
                    <div className={css.navActions}>
                        <button className={css.backBtn} onClick={() => navigate('/')}>
                            <ArrowLeft size={16} /> Inicio
                        </button>
                        <a href="tel:+5493512065320" className={css.waBtn} style={{ background: '#1e40af' }}>
                            <Phone size={15} /> Llamar
                        </a>
                        <a href={`https://wa.me/5493512065320?text=${encodeURIComponent(`Hola, estoy viendo la página de ${data?.title || 'patologías'} en insersalud.com y quiero hacer una consulta.`)}`} target="_blank" rel="noopener noreferrer" className={css.waBtn}>
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
                        <a href={`https://wa.me/5493512065320?text=${encodeURIComponent(`Hola, estoy viendo la página de ${data?.title} en insersalud.com y quiero asesorarme.`)}`} target="_blank" rel="noopener noreferrer" className={css.ctaWa}>
                            <Phone size={16} /> WhatsApp directo
                        </a>
                    </div>
                </div>
                <div className={css.heroImgWrap}>
                    <img src={data.heroImg} alt={data.title} className={css.heroImg} {...imgDims(data.heroImg)} />
                    <div className={css.heroImgBadge}>
                        <Star size={14} fill="white" color="white" />
                        <span>Aparatología aprobada por ANMAT</span>
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
                        <p>Aparatología aprobada por ANMAT con precios actualizados. Consultá disponibilidad con Santi.</p>
                    </div>
                    <div className={css.productsGrid}>
                        {data.products.map((p, i) => (
                            <div key={i} className={css.productCard}>
                                {p.badge && <span className={css.productBadge}>{p.badge}</span>}
                                <div className={css.productImg}>
                                    <img src={p.img} alt={p.name} loading="lazy" decoding="async" {...imgDims(p.img)}
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
                                        onClick={() => setSpecsProduct(p)}
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

            {/* ── PREGUNTAS FRECUENTES (propias de la patología) ─── */}
            {data.faq && data.faq.length > 0 && (
                <section className={css.tipsSection}>
                    <div className={css.container}>
                        <h2 className={css.sectionTitle}>Preguntas frecuentes sobre {data.title}</h2>
                        <div style={{ display: 'grid', gap: '0.8rem', maxWidth: 860, margin: '0 auto' }}>
                            {data.faq.map((f, i) => (
                                <div key={i} style={{ background: '#fff', border: '1px solid #e8eef6', borderRadius: '0.7rem', padding: '1rem 1.2rem' }}>
                                    <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.02rem', color: '#0f172a' }}>{f.q}</h3>
                                    <p style={{ margin: 0, lineHeight: 1.65, color: '#334155' }}>{f.a}</p>
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
                            width={400}
                            height={601}
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

            {/* ── FORMULARIO DE CONSULTA ─────────────────────────── */}
            <section className={css.santiSection}>
                <div className={css.container} style={{ display: 'flex', justifyContent: 'center' }}>
                    <LeadForm contexto={data.title} />
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
                                    <img src={o.heroImg} alt={o.title} loading="lazy" decoding="async" {...imgDims(o.heroImg)}
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
                    <span>&copy; 2026 Inser Salud · Aparatología aprobada por ANMAT · Córdoba, Argentina</span>
                    <div className={css.footerLinks}>
                        <Link to="/">Inicio</Link>
                        <Link to="/">Patologías</Link>
                        <a href="https://wa.me/5493512065320" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                        <a href="mailto:inser.salud@gmail.com">Email</a>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default PathologyPage;
