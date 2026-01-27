import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';
import { useAuth } from '../auth/AuthContext';
import Navigation from '../../components/Navigation';
import Button from '../../components/ui/Button';
import css from '../common/TreatmentModules.module.css';

const OxygenUsage = () => {
    const { user } = useAuth();
    const [setup, setSetup] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOxygenSetup();
    }, [user]);

    const loadOxygenSetup = async () => {
        // En modo demo o si falla supabase, usamos datos dummy realistas
        if (user?.id === 'demo-user-id') {
            setSetup({
                equipment_type: 'ESTACIONARIO',
                liters_text: '2 L/min',
                hours_per_day_text: '16 horas',
                interface_type: 'BIGOTERA',
                acquired_as: 'ALQUILER'
            });
            setLoading(false);
            return;
        }

        try {
            const { data } = await supabase
                .from('oxygen_setup')
                .select('*')
                .eq('user_id', user.id)
                .single();
            setSetup(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className={css.container}>Cargando...</div>;

    return (
        <div className={css.container}>
            <Navigation />
            <header className={css.header}>
                <div className={css.headerImgContainer}>
                    <img src="/artifacts/paciente_oxigeno_hogar_1769206083704.png" alt="Oxígenoterapia" className={css.headerImg} />
                </div>
                <h1>Uso de Oxígeno 🫁</h1>
                <p>Tu tratamiento y medidas de seguridad</p>
            </header>

            <div className={css.card}>
                <h3>📋 Mi Configuración</h3>
                <div className={css.infoGrid}>
                    <div className={css.infoItem}>
                        <span className={css.infoLabel}>Equipo</span>
                        <span className={css.infoValue}>{setup?.equipment_type || 'No definido'}</span>
                    </div>
                    <div className={css.infoItem}>
                        <span className={css.infoLabel}>Flujo</span>
                        <span className={css.infoValue}>{setup?.liters_text || 'No definido'}</span>
                    </div>
                    <div className={css.infoItem}>
                        <span className={css.infoLabel}>Frecuencia</span>
                        <span className={css.infoValue}>{setup?.hours_per_day_text || 'No definido'}</span>
                    </div>
                    <div className={css.infoItem}>
                        <span className={css.infoLabel}>Interfaz</span>
                        <span className={css.infoValue}>{setup?.interface_type || 'No definida'}</span>
                    </div>
                </div>
            </div>

            <div className={css.card}>
                <h3>🛡️ Seguridad Crítica</h3>
                <div className={css.warningCard}>
                    <p><strong>🔥 Prohibido Fumar:</strong> Nunca fumes ni permitas que fumen cerca del equipo de oxígeno.</p>
                </div>
                <div className={css.warningCard}>
                    <p><strong>🔌 Distancia al calor:</strong> Mantén el equipo a 2 metros de estufas, cocinas o fuentes de chispa.</p>
                </div>
                <div className={css.tipCard} style={{ background: '#ecfdf5', borderLeftColor: '#10b981' }}>
                    <p style={{ color: '#065f46' }}><strong>💪 Actividad y Esfuerzo:</strong> Si vas a realizar una actividad (bañarte, ir al baño, comer o caminar), se recomienda subir el flujo a **5 litros**. No olvides volver a tu flujo normal al terminar.</p>
                </div>
                <div className={css.tipCard}>
                    <p><strong>🧴 Sin grasa:</strong> No uses cremas o pomadas con grasa (como vaselina) en la cara o nariz mientras usas oxígeno.</p>
                </div>
            </div>

            <div className={css.card}>
                <h3>💡 Tips de Uso</h3>
                <div className={css.stepList}>
                    <div className={css.stepItem}>
                        <div className={css.stepNumber}>1</div>
                        <div>
                            <div className={css.stepTitle}>Verifica el agua</div>
                            <div className={css.stepText}>Si usas humidificador, asegúrate que tenga agua destilada entre las marcas de Max y Min.</div>
                        </div>
                    </div>
                    <div className={css.stepItem}>
                        <div className={css.stepNumber}>2</div>
                        <div>
                            <div className={css.stepTitle}>Posición del equipo</div>
                            <div className={css.stepText}>Usa el equipo en un lugar ventilado, nunca dentro de un placard o pegado a la pared.</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={css.fixedBottom}>
                <Button variant="whatsapp" onClick={() => window.open('https://wa.me/5493512065320')} className="w-full">
                    Consultar por WhatsApp
                </Button>
            </div>
        </div>
    );
};

export default OxygenUsage;
