import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import css from '../common/TreatmentModules.module.css';

const Maintenance = () => {
    const navigate = useNavigate();

    return (
        <div className={css.container}>
            <header className={css.header}>
                <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', padding: 0, color: 'var(--color-primary)', marginBottom: '1rem' }}>
                    ← Volver al inicio
                </button>
                <h1>Limpieza y Cuidados 🧼</h1>
                <p>Mantené tu terapia higiénica y segura</p>
            </header>

            <div className={css.card}>
                <h3>🧼 Rutina de Limpieza</h3>
                <div className={css.stepList}>
                    <div className={css.stepItem}>
                        <div className={css.stepNumber}>D</div>
                        <div>
                            <div className={css.stepTitle}>Diario: Mascarilla</div>
                            <div className={css.stepText}>Limpiar la silicona con un paño húmedo o toallita sin alcohol para quitar la grasitud de la piel.</div>
                        </div>
                    </div>
                    <div className={css.stepItem}>
                        <div className={css.stepNumber}>S</div>
                        <div>
                            <div className={css.stepTitle}>Semanal: Tubuladura y Humidificador</div>
                            <div className={css.stepText}>Lavar con agua tibia y detergente suave. Enjuagar bien y dejar secar a la sombra.</div>
                        </div>
                    </div>
                    <div className={css.stepItem}>
                        <div className={css.stepNumber}>M</div>
                        <div>
                            <div className={css.stepTitle}>Mensual: Filtros</div>
                            <div className={css.stepText}>Revisar el filtro blanco. Si está gris o con polvo, es momento de cambiarlo por uno nuevo.</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={css.card}>
                <h3>💧 Cuidado del Humidificador</h3>
                <div className={css.tipCard}>
                    <p>Usar siempre <strong>agua destilada</strong> para evitar la acumulación de sarro y minerales que dañan el equipo y la cubeta.</p>
                </div>
            </div>

            <div className={css.fixedBottom}>
                <Button onClick={() => window.open('https://wa.me/5493512065320')} className="w-full">
                    Pedir Kit de Limpieza / Filtros
                </Button>
            </div>
        </div>
    );
};

export default Maintenance;
