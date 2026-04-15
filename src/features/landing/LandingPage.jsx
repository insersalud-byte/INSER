import React, { useState } from 'react';
import {
    Moon, Wind, Activity, Brain, Zap, Heart,
    CheckCircle, Clock, Award, Users,
    Lightbulb, Shield, Bell, RefreshCw,
    Phone, Mail, MapPin, Star, Menu, X, MessageCircle
} from 'lucide-react';
import css from './LandingPage.module.css';

// ── Datos ──────────────────────────────────────────────────────────────────
const saleOffers = [
    { name: 'Máscara Nasal RESCOMF', price: '$50.000', img: '/artifacts/mascara_rescomf.jpg', link: 'https://insersalud.com/tienda', badge: 'OFERTA' },
    { name: 'CPAP BMC G2S', price: '$499.000', img: '/artifacts/cpap_bmc_g2s.jpg', link: 'https://insersalud.com/cpap-bmc-g2s' },
    { name: 'BiPAP BMC G3', price: '$1.300.000', img: '/artifacts/bipap_bmc_g3.jpg', link: 'https://insersalud.com/bipap-bmc-g3-con-frecuencia-respiratoria-y-humidificador' },
    { name: 'Máscara Nasal DreamWear', price: '$223.000', img: '/artifacts/mascara_nasal_dreamwear.jpg', link: 'https://insersalud.com/mascarilla-nasal-cpap', note: 'Opciones más baratas disponibles' },
    { name: 'Máscara Nasobucal DreamWear', price: '$229.000', img: '/artifacts/mascara_nasobucal_dreamwear.jpg', link: 'https://insersalud.com/mascarilla-nasobucal-dreamwear-philips-cpap' },
    { name: 'GCE Zen-O (2 bat + carro)', price: '$5.451.885', img: '/artifacts/gce_zeno.jpg', link: 'https://insersalud.com/concentrador-portatil-gce-zen-o-con-carrito-y-2-baterias', badge: 'PREMIUM' },
    { name: 'KINGON P2-S3', price: '$2.735.400', img: '/artifacts/kingon_p2_s3.jpg', link: 'https://insersalud.com/concentrador-de-oxigeno-portatil-kingon-p2-s3-el-mas-liviano-y-economico', badge: 'EL MÁS LIVIANO' },
];

const services = [
    { title: 'Alquiler de Equipos', desc: 'CPAP, BiPAP y Concentradores con entrega inmediata en domicilio en Córdoba. Sin depósito, con soporte técnico incluido.', img: '/artifacts/cpap_real.png', link: 'https://wa.me/5493512065320', cta: 'Consultar alquiler' },
    { title: 'Venta Directa', desc: 'Equipos nuevos con garantía oficial y el mejor asesoramiento técnico del mercado. Los precios más competitivos de Córdoba.', img: '/artifacts/venta_directa_ofertas.jpg', link: 'https://insersalud.com/tienda', cta: 'Ver tienda', focusTop: true },
    { title: 'Adaptación y Seguimiento', desc: 'Nuestro equipo de especialistas te acompaña día a día con cuidado, paciencia y respeto para que tu terapia sea un éxito.', img: '/artifacts/seguimiento_profesional.jpg', link: 'https://insersalud.com/servicios', cta: 'Saber más' },
];

const pathologies = [
    { icon: Moon, name: 'Apnea del Sueño', desc: 'Diagnóstico y equipamiento CPAP/BiPAP para mejorar tu descanso y calidad de vida.', color: '#1e40af' },
    { icon: Wind, name: 'EPOC', desc: 'Oxigenoterapia y rehabilitación pulmonar para pacientes con enfermedad pulmonar obstructiva crónica.', color: '#0ea5e9' },
    { icon: Activity, name: 'Fibrosis Pulmonar', desc: 'Soporte integral con concentradores de oxígeno y seguimiento profesional continuo.', color: '#6366f1' },
    { icon: Brain, name: 'ELA / Esclerosis', desc: 'Ventilación no invasiva y asistentes de tos para enfermedades neuromusculares.', color: '#8b5cf6' },
    { icon: Zap, name: 'Atrofia Muscular', desc: 'Equipamiento especializado para AME y otras patologías musculares de origen genético.', color: '#ec4899' },
    { icon: Heart, name: 'Parálisis Cerebral', desc: 'Soluciones respiratorias adaptadas con acompañamiento humano cercano y personalizado.', color: '#f59e0b' },
];

const tips = [
    { icon: CheckCircle, title: 'Cómo adaptarse al CPAP', desc: 'Los primeros días pueden ser incómodos. Usá el equipo primero mientras estás despierto, en períodos cortos, hasta acostumbrarte a la sensación de presión y la máscara.', color: '#10b981' },
    { icon: Lightbulb, title: 'Ejercicios respiratorios', desc: 'Practicá respiración diafragmática y labios fruncidos diariamente. 10 minutos por la mañana mejoran la capacidad pulmonar y reducen la disnea.', color: '#1e40af' },
    { icon: RefreshCw, title: 'Renovación de accesorios', desc: 'Cambiá el filtro del CPAP cada 30 días, la almohadilla de la máscara cada 2 semanas y el tubo cada 3 meses para asegurar higiene y rendimiento óptimo.', color: '#f59e0b' },
    { icon: Bell, title: 'Señales de alerta', desc: 'Consultá a tu médico si notás mayor somnolencia diurna, dolores de cabeza matutinos, boca muy seca o si el equipo hace ruidos inusuales.', color: '#ef4444' },
];

const testimonials = [
    { name: 'María López', city: 'Córdoba', text: 'La atención y los equipos de Inser Salud han cambiado mi vida. Ahora duermo toda la noche sin interrupciones y me levanto con energía. El seguimiento de los especialistas fue clave en mi adaptación.', condition: 'Apnea del Sueño', avatar: 'ML' },
    { name: 'Juan Pérez', city: 'Córdoba', text: 'Servicio excepcional. Me ayudaron a elegir el concentrador de oxígeno ideal para mi EPOC con mucha paciencia y conocimiento técnico. Los precios son los mejores que encontré en Córdoba.', condition: 'EPOC', avatar: 'JP' },
];

const stats = [
    { value: '+500', label: 'Pacientes atendidos', icon: Users },
    { value: '+5', label: 'Años de experiencia', icon: Award },
    { value: 'ANMAT', label: 'Certificado oficial', icon: Shield },
    { value: '24hs', label: 'Entrega en Córdoba', icon: Clock },
];

// ── Helper ─────────────────────────────────────────────────────────────────
const openSanti = (message) => {
    window.dispatchEvent(new CustomEvent('open-santi', { detail: { message } }));
};

// ── Componente ─────────────────────────────────────────────────────────────
const LandingPage = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
    };

    return (
        <div className={css.landingContainer}>

            {/* ── NAVBAR ─────────────────────────────────────────────── */}
            <nav className={css.navbar}>
                <div className={css.navContent}>
                    <div className={css.logo}>
                        <img src="/artifacts/logo_insersalud.jpg" alt="Inser Salud" className={css.logoImg} />
                    </div>

                    {/* Desktop links */}
                    <div className={css.navLinks}>
                        <button onClick={() => scrollTo('patologias')}>Patologías</button>
                        <button onClick={() => scrollTo('ofertas')}>Ofertas</button>
                        <button onClick={() => scrollTo('servicios')}>Servicios</button>
                        <button onClick={() => scrollTo('consejos')}>Consejos</button>
                        <button onClick={() => scrollTo('contacto')}>Contacto</button>
                    </div>

                    <div className={css.navRight}>
                        <a href="https://wa.me/5493512065320" target="_blank" rel="noopener noreferrer" className={css.waNavBtn}>
                            <MessageCircle size={16} /> WhatsApp
                        </a>
                        <button
                            className={css.hamburger}
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Menú"
                        >
                            {menuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <div className={css.mobileMenu}>
                        <button onClick={() => scrollTo('patologias')}>Patologías</button>
                        <button onClick={() => scrollTo('ofertas')}>Ofertas</button>
                        <button onClick={() => scrollTo('servicios')}>Servicios</button>
                        <button onClick={() => scrollTo('consejos')}>Consejos</button>
                        <button onClick={() => scrollTo('contacto')}>Contacto</button>
                        <a href="https://wa.me/5493512065320" target="_blank" rel="noopener noreferrer" className={css.mobileWa}>
                            <MessageCircle size={16} /> Escribirnos por WhatsApp
                        </a>
                    </div>
                )}
            </nav>

            {/* ── HERO ───────────────────────────────────────────────── */}
            <header className={css.hero}>
                <div className={css.heroContent}>
                    <div className={css.badge}>
                        <Shield size={14} /> Distribuidor Oficial Certificado ANMAT
                    </div>
                    <h1 className={css.heroTitle}>
                        Respirá mejor,<br />
                        <span>viví mejor</span>
                    </h1>
                    <p className={css.heroSubtitle}>
                        Especialistas en medicina respiratoria en Córdoba. Alquiler y venta de equipos CPAP, BiPAP y concentradores de oxígeno con seguimiento profesional y atención personalizada.
                    </p>
                    <div className={css.heroActions}>
                        <button className={css.heroBtnPrimary} onClick={() => openSanti(null)}>
                            Hablar con Santi
                        </button>
                        <button className={css.heroBtnOutline} onClick={() => scrollTo('ofertas')}>
                            Ver ofertas
                        </button>
                    </div>
                </div>

                <div className={css.heroImageContainer}>
                    <div className={css.heroFloatCard}>
                        <img src="/artifacts/santi_real.jpg" alt="Santi" className={css.santiMini}
                            onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Santi&background=1e40af&color=fff'; }} />
                        <div>
                            <strong>Santi está en línea</strong>
                            <p>¿Te ayudo a elegir tu equipo?</p>
                        </div>
                    </div>
                    <div className={css.heroImgWrapper}>
                        <img src="/artifacts/cpap_real.png" alt="Inser Salud" className={css.heroImg} />
                    </div>
                </div>
            </header>

            {/* ── STATS BAR ──────────────────────────────────────────── */}
            <div className={css.statsBar}>
                {stats.map((s, i) => (
                    <div key={i} className={css.statItem}>
                        <s.icon size={28} className={css.statIcon} />
                        <div>
                            <span className={css.statValue}>{s.value}</span>
                            <span className={css.statLabel}>{s.label}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── PATOLOGÍAS ─────────────────────────────────────────── */}
            <section id="patologias" className={css.section}>
                <div className={css.container}>
                    <div className={css.sectionHeader}>
                        <span className={css.sectionTag}>Áreas de tratamiento</span>
                        <h2>Patologías que atendemos</h2>
                        <p>Equipamiento certificado y acompañamiento profesional para cada condición respiratoria.</p>
                    </div>
                    <div className={css.pathGrid}>
                        {pathologies.map((p, i) => (
                            <div key={i} className={css.pathCard} style={{ '--card-color': p.color }}>
                                <div className={css.pathIcon}>
                                    <p.icon size={28} />
                                </div>
                                <h3>{p.name}</h3>
                                <p>{p.desc}</p>
                                <button
                                    className={css.pathBtn}
                                    onClick={() => openSanti(`Hola Santi, necesito información sobre tratamiento para ${p.name}. ¿Qué equipos me recomendás?`)}
                                >
                                    Consultar con Santi →
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── OFERTAS ────────────────────────────────────────────── */}
            <section id="ofertas" className={css.productsSection}>
                <div className={css.container}>
                    <div className={css.sectionHeader}>
                        <span className={css.sectionTagWhite}>Precios actualizados</span>
                        <h2 className={css.whiteText}>Ofertas Vigentes</h2>
                        <p className={css.whiteMutedText}>Equipos certificados por ANMAT. Consultá precio y disponibilidad con Santi.</p>
                    </div>
                    <div className={css.productsGrid}>
                        {saleOffers.map((p, i) => (
                            <div key={i} className={css.productCard}>
                                {p.badge && <span className={css.cardBadge}>{p.badge}</span>}
                                <div className={css.productImgContainer}>
                                    <img src={p.img} alt={p.name} />
                                </div>
                                <h4>{p.name}</h4>
                                <div className={css.priceTag}>{p.price}</div>
                                {p.note && <p className={css.productNote}>{p.note}</p>}
                                <div className={css.productCardBtns}>
                                    <button
                                        className={css.consultBtn}
                                        onClick={() => openSanti(`Hola Santi, me interesa el ${p.name} a ${p.price}. ¿Podés darme más información y disponibilidad?`)}
                                    >
                                        Consultar precio
                                    </button>
                                    <a href={p.link} target="_blank" rel="noopener noreferrer" className={css.specBtn}>
                                        Ficha técnica
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SERVICIOS ──────────────────────────────────────────── */}
            <section id="servicios" className={css.section}>
                <div className={css.container}>
                    <div className={css.sectionHeader}>
                        <span className={css.sectionTag}>Lo que hacemos</span>
                        <h2>Servicios Profesionales</h2>
                        <p>Acompañamiento integral para pacientes respiratorios en Córdoba.</p>
                    </div>
                    <div className={css.servicesGrid}>
                        {services.map((s, i) => (
                            <div key={i} className={css.serviceCard}>
                                <div className={css.serviceImgContainer}>
                                    <img src={s.img} alt={s.title} className={s.focusTop ? css.imgTop : ''} />
                                </div>
                                <div className={css.serviceInfo}>
                                    <h3>{s.title}</h3>
                                    <p>{s.desc}</p>
                                    <a href={s.link} target="_blank" rel="noopener noreferrer" className={css.serviceLink}>
                                        {s.cta} →
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CONSEJOS ───────────────────────────────────────────── */}
            <section id="consejos" className={css.tipsSection}>
                <div className={css.container}>
                    <div className={css.sectionHeader}>
                        <span className={css.sectionTag}>Información para pacientes</span>
                        <h2>Consejos de Salud Respiratoria</h2>
                        <p>Guías prácticas para mejorar tu tratamiento y calidad de vida en casa.</p>
                    </div>
                    <div className={css.tipsGrid}>
                        {tips.map((t, i) => (
                            <div key={i} className={css.tipCard} style={{ '--tip-color': t.color }}>
                                <div className={css.tipIcon}>
                                    <t.icon size={22} />
                                </div>
                                <h3>{t.title}</h3>
                                <p>{t.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIOS ────────────────────────────────────────── */}
            <section className={css.testimonialsSection}>
                <div className={css.container}>
                    <div className={css.sectionHeader}>
                        <span className={css.sectionTag}>Lo que dicen nuestros pacientes</span>
                        <h2>Testimonios</h2>
                    </div>
                    <div className={css.testimonialsGrid}>
                        {testimonials.map((t, i) => (
                            <div key={i} className={css.testimonialCard}>
                                <div className={css.stars}>
                                    {[...Array(5)].map((_, j) => (
                                        <Star key={j} size={16} fill="#f59e0b" color="#f59e0b" />
                                    ))}
                                </div>
                                <p className={css.testimonialText}>"{t.text}"</p>
                                <div className={css.testimonialAuthor}>
                                    <div className={css.testimonialAvatar}>
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=1e40af&color=fff&size=48`}
                                            alt={t.name}
                                        />
                                    </div>
                                    <div>
                                        <strong>{t.name}</strong>
                                        <span>{t.city} · {t.condition}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SANTI CTA ──────────────────────────────────────────── */}
            <section className={css.santiCta}>
                <div className={css.container}>
                    <div className={css.santiCard} onClick={() => openSanti(null)}>
                        <img
                            src="/artifacts/santi_real.jpg"
                            alt="Santi"
                            className={css.santiLarge}
                            onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Santi&background=1e40af&color=fff&size=180'; }}
                        />
                        <div className={css.santiText}>
                            <h3>¿No sabés por dónde empezar?</h3>
                            <p>Contame tus dudas y te ayudo a encontrar el tratamiento ideal para vos en menos de un minuto. Sin turnos, sin esperas.</p>
                            <button className={css.santiBtn}>
                                ¡Quiero asesorarme ahora!
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CONTACTO ───────────────────────────────────────────── */}
            <section id="contacto" className={css.contactSection}>
                <div className={css.container}>
                    <div className={css.sectionHeader}>
                        <span className={css.sectionTag}>Estamos para vos</span>
                        <h2>Contacto Directo</h2>
                        <p>Respondemos todos los días. Para emergencias de equipos, tenemos atención prioritaria.</p>
                    </div>
                    <div className={css.contactGrid}>
                        <a href="https://wa.me/5493512065320" target="_blank" rel="noopener noreferrer" className={css.contactCardWa}>
                            <MessageCircle size={32} />
                            <div>
                                <strong>WhatsApp Ventas</strong>
                                <span>+54 9 351 206-5320</span>
                                <small>Respondemos en minutos</small>
                            </div>
                        </a>
                        <a href="https://wa.me/5493515575258" target="_blank" rel="noopener noreferrer" className={css.contactCardWa2}>
                            <Phone size={32} />
                            <div>
                                <strong>Línea Alternativa</strong>
                                <span>+54 9 351 557-5258</span>
                                <small>Soporte técnico</small>
                            </div>
                        </a>
                        <a href="mailto:inser.salud@gmail.com" className={css.contactCard}>
                            <Mail size={32} />
                            <div>
                                <strong>Email</strong>
                                <span>inser.salud@gmail.com</span>
                                <small>Consultas generales</small>
                            </div>
                        </a>
                        <div className={css.contactCard}>
                            <MapPin size={32} />
                            <div>
                                <strong>Ubicación</strong>
                                <span>Córdoba, Argentina</span>
                                <small>Entrega en todo Córdoba</small>
                            </div>
                        </div>
                    </div>

                    <div className={css.portalCta}>
                        <p>Para información completa de productos y patologías visitá nuestro portal:</p>
                        <a href="https://insersalud.com" target="_blank" rel="noopener noreferrer" className={css.portalBtn}>
                            Ir a insersalud.com →
                        </a>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ─────────────────────────────────────────────── */}
            <footer className={css.footer}>
                <div className={css.footerInner}>
                    <div className={css.footerBrand}>
                        <img src="/artifacts/logo_insersalud.jpg" alt="Inser Salud" className={css.footerLogo}
                            onError={(e) => { e.target.style.display = 'none'; }} />
                        <p>Especialistas en terapias respiratorias domiciliarias. Córdoba, Argentina.</p>
                    </div>
                    <div className={css.footerLinks}>
                        <strong>Navegación</strong>
                        <button onClick={() => scrollTo('patologias')}>Patologías</button>
                        <button onClick={() => scrollTo('ofertas')}>Ofertas</button>
                        <button onClick={() => scrollTo('servicios')}>Servicios</button>
                        <button onClick={() => scrollTo('consejos')}>Consejos</button>
                        <button onClick={() => scrollTo('contacto')}>Contacto</button>
                    </div>
                    <div className={css.footerContact}>
                        <strong>Contacto</strong>
                        <a href="https://wa.me/5493512065320" target="_blank" rel="noopener noreferrer">WhatsApp: +54 9 351 206-5320</a>
                        <a href="mailto:inser.salud@gmail.com">inser.salud@gmail.com</a>
                        <a href="https://insersalud.com" target="_blank" rel="noopener noreferrer">insersalud.com</a>
                    </div>
                </div>
                <div className={css.footerBottom}>
                    <p>&copy; 2026 Inser Salud · Certificado ANMAT · Córdoba, Argentina</p>
                </div>
            </footer>

        </div>
    );
};

export default LandingPage;
