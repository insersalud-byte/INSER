import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import Button from '../../components/ui/Button';
import css from '../common/TreatmentModules.module.css';

const SleepTracker = () => {
    const navigate = useNavigate();
    const [lastNight, setLastNight] = useState({
        hours: 7.5,
        maskFit: 'Bueno',
        events: 1.2
    });

    return (
        <div className={css.container}>
            <Navigation />
            <header className={css.header}>
                <div className={css.headerImgContainer}>
                    <img src="/artifacts/paciente_cpap_durmiendo_1769206063359.png" alt="Descanso" className={css.headerImg} />
                </div>
                <h1>Mi Sueño 😴</h1>
                <p>Resumen de tu última sesión</p>
            </header>

            <div className={css.card}>
                <h3>📊 Última Noche</h3>
                <div className={css.infoGrid}>
                    <div className={css.infoItem} style={{ textAlign: 'center', gridColumn: 'span 2', padding: '1rem 0' }}>
                        <span className={css.infoLabel}>Horas de Uso</span>
                        <span className={css.infoValue} style={{ fontSize: '3rem' }}>{lastNight.hours}h</span>
                    </div>
                    <div className={css.infoItem}>
                        <span className={css.infoLabel}>Sello Mascarilla</span>
                        <span className={css.infoValue} style={{ color: '#10b981' }}>{lastNight.maskFit}</span>
                    </div>
                    <div className={css.infoItem}>
                        <span className={css.infoLabel}>Eventos (AHI)</span>
                        <span className={css.infoValue}>{lastNight.events} / h</span>
                    </div>
                </div>
            </div>

            <div className={css.card}>
                <h3>📅 Historial Semanal</h3>
                <div style={{ height: '100px', display: 'flex', alignItems: 'flex-end', gap: '8px', padding: '10px 0' }}>
                    {[4, 6, 7, 5, 8, 7, 7.5].map((h, i) => (
                        <div key={i} style={{ flex: 1, background: '#e2e8f0', borderRadius: '4px', height: `${(h / 10) * 100}%`, position: 'relative' }}>
                            <div style={{ position: 'absolute', bottom: '-20px', left: 0, right: 0, textAlign: 'center', fontSize: '10px' }}>
                                {['L', 'M', 'M', 'J', 'V', 'S', 'D'][i]}
                            </div>
                        </div>
                    ))}
                </div>
                <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: '#666' }}>
                    <strong>Tip:</strong> El uso recomendado es de al menos 6 horas por noche para un tratamiento efectivo.
                </p>
            </div>

            <div className={css.fixedBottom}>
                <Button onClick={() => window.open('https://wa.me/5493512065320')} className="w-full">
                    No pude usar el equipo anoche
                </Button>
            </div>
        </div>
    );
};

export default SleepTracker;
