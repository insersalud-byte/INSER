import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import css from './LandingPage.module.css';

const LandingPage = () => {
    const navigate = useNavigate();

    const saleOffers = [
        {
            name: 'CPAP BMC G2S',
            price: '$499.000',
            img: '/artifacts/cpap_bmc_g2s.jpg',
            link: 'https://insersalud.com/cpap-bmc-g2s1'
        },
        {
            name: 'BiPAP BMC G3',
            price: '$1.300.000',
            img: '/artifacts/bipap_bmc_g3.jpg',
            link: 'https://insersalud.com/bipap-bmc-g2-con-frecuencia-respiratoria-y-humidificador'
        },
        {
            name: 'Máscara Nasal DreamWear',
            price: '$223.000',
            img: '/artifacts/mascara_nasal_dreamwear.jpg',
            link: 'https://insersalud.com/mascarilla-nasal-cpap',
            note: 'Opciones más baratas disponibles'
        },
        {
            name: 'Máscara Nasobucal DreamWear',
            price: '$229.000',
            img: '/artifacts/mascara_nasobucal_dreamwear.jpg',
            link: 'https://insersalud.com/mascarilla-nasobucal-dreamwear-philips-cpap'
        },
        {
            name: 'GCE Zen-O (2 bat + carro)',
            price: '$5.451.885',
            img: '/artifacts/gce_zeno.jpg',
            link: 'https://insersalud.com/concentrador-portatil-gce-zen-o-con-carrito-y-2-baterias',
            badge: 'PREMIUM'
        },
        {
            name: 'KINGON P2-S3',
            price: '$2.735.400',
            img: '/artifacts/kingon_p2_s3.jpg',
            link: '#',
            badge: 'EL MÁS LIVIANO'
        }
    ];

    const services = [
        {
            title: 'Alquiler de equipos',
            desc: 'CPAP, BiPAP y Concentradores con entrega inmediata en domicilio en Córdoba.',
            img: '/artifacts/cpap_real.png',
            link: 'https://wa.me/5493512065320'
        },
        {
            title: 'Venta Directa',
            desc: 'Equipos nuevos con garantía oficial y el mejor asesoramiento técnico del mercado.',
            img: '/artifacts/venta_directa_ofertas.jpg',
            link: 'https://insersalud.com/tienda',
            focusTop: true
        },
        {
            title: 'Adaptación y Seguimiento',
            desc: 'Nuestro equipo de especialistas te acompaña día a día para que tu terapia sea un éxito.',
            img: '/artifacts/seguimiento_profesional.jpg',
            link: 'https://insersalud.com/servicios'
        }
    ];

    return (
        <div className={css.landingContainer}>
            {/* Navbar */}
            <nav className={css.navbar}>
                <div className={css.navContent}>
                    <div className={css.logo}>
                        <img src="/artifacts/logo_insersalud.jpg" alt="Inser Salud" className={css.logoImg} />
                    </div>
                    <div className={css.navLinks}>
                        <a href="#ofertas">Ofertas</a>
                        <a href="#servicios">Servicios</a>
                        <a href="#contacto">Contacto</a>
                        <Button variant="primary" size="sm" onClick={() => navigate('/chat-ai')}>Hablar con Santi</Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className={css.hero}>
                <div className={css.heroContent}>
                    <div className={css.badge}>Distribuidor Oficial Certificado</div>
                    <h1 className={css.heroTitle}><span>INSER SALUD</span></h1>
                    <p className={css.heroSubtitle}>
                        Especialistas en medicina respiratoria en Córdoba. Alquiler y venta de equipos
                        con seguimiento profesional y atención personalizada.
                    </p>
                    <div className={css.heroActions}>
                        <Button size="lg" onClick={() => navigate('/chat-ai')}>
                            Asesorarme Ahora
                        </Button>
                        <Button size="lg" variant="outline" onClick={() => document.getElementById('ofertas').scrollIntoView({ behavior: 'smooth' })}>
                            Ver Ofertas
                        </Button>
                    </div>
                </div>
                <div className={css.heroImageContainer}>
                    <div className={css.heroFloatCard}>
                        <img src="/artifacts/santi_real.jpg" alt="Santi" className={css.santiMini} />
                        <div>
                            <strong>Santi está en línea</strong>
                            <p>¿Te ayudo a elegir tu equipo?</p>
                        </div>
                    </div>
                    <img src="/artifacts/medico_sonriendo_estetoscopio_1769206037424.png" alt="Profesional Inser Salud" className={css.heroImg} />
                </div>
            </header>

            {/* Offers Section (Formely Equipamiento, now Blue and at Top) */}
            <section id="ofertas" className={css.productsSection}>
                <div className={css.container}>
                    <div className={css.sectionHeader}>
                        <h2 className={css.whiteText}>OFERTAS VIGENTES</h2>
                        <p className={css.whiteMutedText}>Equipos certificados por ANMAT con precios actualizados.</p>
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
                                <a href={p.link} target="_blank" rel="noopener noreferrer" className={css.buyBtn}>
                                    Ver Ficha Técnica
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="servicios" className={css.section}>
                <div className={css.container}>
                    <div className={css.sectionHeader}>
                        <h2>Servicios Profesionales</h2>
                        <p>Acompañamiento integral para pacientes respiratorios.</p>
                    </div>
                    <div className={css.servicesGrid}>
                        {services.map((s, i) => (
                            <a key={i} href={s.link} target="_blank" rel="noopener noreferrer" className={css.serviceCard}>
                                <div className={css.serviceImgContainer}>
                                    <img
                                        src={s.img}
                                        alt={s.title}
                                        className={s.focusTop ? css.imgTop : ''}
                                    />
                                </div>
                                <div className={css.serviceInfo}>
                                    <h3>{s.title}</h3>
                                    <p>{s.desc}</p>
                                    <span className={css.cardLink}>Más info aquí →</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* santi-call-to-action */}
            <section className={css.santiCta}>
                <div className={css.container}>
                    <div className={css.santiCard} onClick={() => navigate('/chat-ai')}>
                        <img src="/artifacts/santi_real.jpg" alt="Santi Closer" className={css.santiLarge} />
                        <div className={css.santiText}>
                            <h3>¿No sabés por dónde empezar?</h3>
                            <p>Contame tus dudas y te ayudo a encontrar el tratamiento ideal para vos en menos de un minuto.</p>
                            <Button size="lg">¡Quiero asesorarme!</Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contacto" className={css.contactSection}>
                <div className={css.container}>
                    <div className={css.contactGrid}>
                        <div className={css.contactInfo}>
                            <h2>Contacto Directo</h2>
                            <p>Estamos en Córdoba para ayudarte.</p>
                            <div className={css.contactItems}>
                                <div className={css.contactItem}>
                                    <strong>WhatsApp Ventas:</strong>
                                    <span>+54 9 351 206 5320</span>
                                </div>
                                <div className={css.contactItem}>
                                    <strong>Email:</strong>
                                    <span>inser.salud@gmail.com</span>
                                </div>
                            </div>
                        </div>
                        <div className={css.ctaContainer}>
                            <p className={css.ctaText}>Para una experiencia completa visitá nuestro portal principal.</p>
                            <Button
                                size="lg"
                                className="w-full"
                                onClick={() => window.location.href = 'https://insersalud.com'}
                            >
                                Seguir navegando en Inser
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <footer className={css.footer}>
                <p>&copy; 2026 Inser Salud | Certificado ANMAT | Córdoba, Argentina</p>
            </footer>
        </div>
    );
};

export default LandingPage;
