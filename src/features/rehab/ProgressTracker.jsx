import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import css from '../common/TreatmentModules.module.css';

const ProgressTracker = () => {
    const navigate = useNavigate();

    return (
        <div className={css.container}>
            <header className={css.header}>
                <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', padding: 0, color: 'var(--color-primary)', marginBottom: '1rem' }}>
                    ← Volver al inicio
                </button>
                <h1>Mi Progreso 📊</h1>
                <p>Tu evolución en la rehabilitación</p>
            </header>

            <div className={css.card}>
                <h3>✨ Logros</h3>
                <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', padding: '0.5rem 0' }}>
                    <div style={{ minWidth: '80px', textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🥇</div>
                        <div style={{ fontSize: '0.7rem' }}>7 Días Seguidos</div>
                    </div>
                    <div style={{ minWidth: '80px', textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💪</div>
                        <div style={{ fontSize: '0.7rem' }}>30 Min Totales</div>
                    </div>
                    <div style={{ minWidth: '80px', textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔥</div>
                        <div style={{ fontSize: '0.7rem' }}>Nivel 2 Completo</div>
                    </div>
                </div>
            </div>

            <div className={css.card}>
                <h3>📅 Sesiones Completadas</h3>
                {[
                    { date: 'Hoy', active: '30 min', feeling: 'Excelente' },
                    { date: 'Ayer', active: '25 min', feeling: 'Bien' },
                    { date: '18 Ene', active: '20 min', feeling: 'Cansado' }
                ].map((s, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: i < 2 ? '1px solid #f1f5f9' : 'none' }}>
                        <div>
                            <div style={{ fontWeight: 500 }}>{s.date}</div>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>{s.active} de ejercicio</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>Sentimiento</div>
                            <div style={{ fontWeight: 500 }}>{s.feeling}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={css.fixedBottom}>
                <Button variant="whatsapp" onClick={() => window.open('https://wa.me/5493512065320')} className="w-full">
                    Compartir progreso con mi Kinesiólogo
                </Button>
            </div>
        </div>
    );
};

export default ProgressTracker;
