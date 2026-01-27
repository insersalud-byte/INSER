import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import css from './WelcomePage.module.css';

const WelcomePage = () => {
    const navigate = useNavigate();

    return (
        <div className={css.container}>
            <div className={css.hero}>
                <div className={css.doctorHero}>
                    <img
                        src="/artifacts/medico_sonriendo_estetoscopio_1769206037424.png"
                        alt="Nuestro equipo médico"
                        className={css.heroImage}
                        onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1559839734-2b71f153a827?auto=format&fit=crop&q=80&w=800';
                        }}
                    />
                    <div className={css.heroOverlay}>
                        <h1 className={css.title}>Tu bienestar comienza aquí</h1>
                        <p className={css.subtitle}>
                            Acompañamiento profesional en cada paso de su tratamiento respiratorio.
                        </p>
                    </div>
                </div>
            </div>

            <div className={css.actionsContainer}>
                <div className={css.actionCard}>
                    <h3>¿Es tu primera vez con nosotros?</h3>
                    <p>Comencemos a personalizar tu experiencia de salud.</p>
                    <Button
                        onClick={() => navigate('/login')}
                        size="lg"
                        className={css.primaryBtn}
                    >
                        Empezar ahora
                    </Button>
                </div>

                <div className={css.actionCard}>
                    <h3>¿Ya sos paciente de Inser?</h3>
                    <p>Ingresá para ver tus ejercicios y controles.</p>
                    <Button
                        onClick={() => navigate('/login')}
                        variant="outline"
                        size="lg"
                        className={css.secondaryBtn}
                    >
                        Acceder a mi portal
                    </Button>
                </div>
            </div>

            {/* WhatsApp Button */}
            <a
                href="https://wa.me/5493512065320"
                className={css.whatsappBtn}
                target="_blank"
                rel="noopener noreferrer"
            >
                <span className={css.whatsappIcon}>💬</span>
                <span>Contactanos</span>
            </a>
        </div>
    );
};

export default WelcomePage;
