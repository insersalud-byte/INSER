import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabase';
import { useAuth } from '../auth/AuthContext';
import Button from '../../components/ui/Button';
import css from '../common/TreatmentModules.module.css';

const EquipmentInfo = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [setup, setSetup] = useState(null);

    useEffect(() => {
        if (user?.id === 'demo-user-id') {
            setSetup({
                device_type: 'AUTOCPAP',
                mask_type: 'NASAL',
                pressure_text: '8 - 12 cmH2O',
                acquired_as: 'ALQUILER'
            });
        }
    }, [user]);

    return (
        <div className={css.container}>
            <header className={css.header}>
                <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', padding: 0, color: 'var(--color-primary)', marginBottom: '1rem' }}>
                    ← Volver al inicio
                </button>
                <h1>Mi Equipo ⚙️</h1>
                <p>Configuración y detalles técnicos</p>
            </header>

            <div className={css.card}>
                <h3>📟 Dispositivo</h3>
                <div className={css.infoGrid}>
                    <div className={css.infoItem}>
                        <span className={css.infoLabel}>Tipo</span>
                        <span className={css.infoValue}>{setup?.device_type}</span>
                    </div>
                    <div className={css.infoItem}>
                        <span className={css.infoLabel}>Presión</span>
                        <span className={css.infoValue}>{setup?.pressure_text}</span>
                    </div>
                    <div className={css.infoItem}>
                        <span className={css.infoLabel}>Adquisición</span>
                        <span className={css.infoValue}>{setup?.acquired_as}</span>
                    </div>
                </div>
            </div>

            <div className={css.card}>
                <h3>🎭 Mascarilla</h3>
                <div className={css.infoGrid}>
                    <div className={css.infoItem}>
                        <span className={css.infoLabel}>Modelo</span>
                        <span className={css.infoValue}>{setup?.mask_type}</span>
                    </div>
                    <div className={css.infoItem}>
                        <span className={css.infoLabel}>Último cambio</span>
                        <span className={css.infoValue}>Hace 3 meses</span>
                    </div>
                </div>
                <div style={{ marginTop: '1.5rem' }}>
                    <Button variant="outline" size="sm" onClick={() => window.open('https://insersalud.com/tienda')}>Ver repuestos</Button>
                </div>
            </div>

            <div className={css.tipCard}>
                <p>💡 <strong>¿Sabías que?</strong> Los filtros de tu equipo deben cambiarse cada 30-60 días para proteger el motor y tus pulmones.</p>
            </div>

            <div className={css.fixedBottom}>
                <Button variant="whatsapp" onClick={() => window.open('https://wa.me/5493512065320')} className="w-full">
                    Solicitar Cambio de Presión
                </Button>
            </div>
        </div>
    );
};

export default EquipmentInfo;
