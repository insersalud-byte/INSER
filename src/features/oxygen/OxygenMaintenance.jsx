import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import css from '../common/TreatmentModules.module.css';

const OxygenMaintenance = () => {
    const navigate = useNavigate();

    return (
        <div className={css.container}>
            <header className={css.header}>
                <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', padding: 0, color: 'var(--color-primary)', marginBottom: '1rem' }}>
                    ← Volver al inicio
                </button>
                <h1>Higiene y Cuidados 🧼</h1>
                <p>Mantenimiento de tu equipo de oxígeno</p>
            </header>

            <div className={css.card}>
                <h3>👃 Limpieza de Bigotera / Máscara</h3>
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                    Realiza esta limpieza al menos **2 veces por semana**.
                </p>

                <div className={css.stepList}>
                    <div className={css.stepItem}>
                        <div className={css.stepNumber}>1</div>
                        <div>
                            <div className={css.stepTitle}>Lavado suave</div>
                            <div className={css.stepText}>Sumerge la interfaz en agua tibia con jabón neutro.</div>
                        </div>
                    </div>
                    <div className={css.stepItem}>
                        <div className={css.stepNumber}>2</div>
                        <div>
                            <div className={css.stepTitle}>Enjuague</div>
                            <div className={css.stepText}>Enjuaga con abundante agua limpia para quitar restos de jabón.</div>
                        </div>
                    </div>
                    <div className={css.stepItem}>
                        <div className={css.stepNumber}>3</div>
                        <div>
                            <div className={css.stepTitle}>Secado a la sombra</div>
                            <div className={css.stepText}>Deja secar al aire, nunca bajo el sol directo o con secadores.</div>
                        </div>
                    </div>
                </div>

                <div className={css.warningCard} style={{ marginTop: '1.5rem' }}>
                    <p><strong>⚠️ Recordatorio:</strong> Reemplaza la bigotera por una nueva cada **3 meses** para evitar infecciones.</p>
                </div>
            </div>

            <div className={css.card}>
                <h3>⚙️ Chequeo del Equipo</h3>
                <div className={css.stepList}>
                    <div className={css.stepItem}>
                        <div className={css.icon}>💧</div>
                        <div>
                            <div className={css.stepTitle}>Vaso Humidificador</div>
                            <div className={css.stepText}>Lávalo diariamente con agua y jabón para evitar formación de hongos.</div>
                        </div>
                    </div>
                    <div className={css.stepItem}>
                        <div className={css.icon}>💨</div>
                        <div>
                            <div className={css.stepTitle}>Filtro de Aire</div>
                            <div className={css.stepText}>Si tu concentrador tiene filtro externo, sacúdalo semanalmente.</div>
                        </div>
                    </div>
                    <div className={css.stepItem}>
                        <div className={css.icon}>📦</div>
                        <div>
                            <div className={css.stepTitle}>Manguera Alargadora</div>
                            <div className={css.stepText}>Verifica que no esté doblada o aplastada por muebles.</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={css.fixedBottom}>
                <Button onClick={() => window.open('https://wa.me/5493512065320')} className="w-full">
                    Solicitar Insumos / Repuestos
                </Button>
            </div>
        </div>
    );
};

export default OxygenMaintenance;
