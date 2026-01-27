import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabase';
import { useAuth } from '../auth/AuthContext';
import Button from '../../components/ui/Button';
import css from '../common/TreatmentModules.module.css';
import { format, addMonths, addDays, isAfter, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';

const Reminders = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        calculateReminders();
    }, [user]);

    const calculateReminders = async () => {
        try {
            const newReminders = [];

            // 1. Fetch data from setups
            const { data: apnea } = await supabase.from('apnea_setup').select('*').eq('user_id', user.id).single();
            const { data: oxygen } = await supabase.from('oxygen_setup').select('*').eq('user_id', user.id).single();

            // 2. Logic for APNEA
            if (apnea) {
                if (apnea.mask_start_date) {
                    const nextMaskChange = addMonths(new Date(apnea.mask_start_date), 6);
                    newReminders.push({
                        title: 'Cambio de Máscara',
                        date: nextMaskChange,
                        icon: '🎭',
                        description: 'Se recomienta renovar la máscara cada 6 meses.'
                    });
                }

                // Filter change (every 30 days)
                const nextFilter = addDays(new Date(apnea.created_at), 30);
                newReminders.push({
                    title: 'Limpieza de Filtros',
                    date: nextFilter,
                    icon: '💨',
                    description: 'Revisá y limpiá el filtro de tu CPAP.'
                });
            }

            // 3. Logic for OXYGEN
            if (oxygen) {
                if (oxygen.interface_start_date) {
                    const nextInterface = addMonths(new Date(oxygen.interface_start_date), 3);
                    newReminders.push({
                        title: 'Cambio de Bigotera',
                        date: nextInterface,
                        icon: '👃',
                        description: 'Es tiempo de renovar tu cánula nasal.'
                    });
                }
            }

            // Simple mock if demo
            if (user?.id === 'demo-user-id') {
                newReminders.push({
                    title: 'Control Kinesiológico',
                    date: addDays(new Date(), 3),
                    icon: '👨‍⚕️',
                    description: 'Turno pendiente para control de tratamiento.'
                });
            }

            // Sort by date
            newReminders.sort((a, b) => a.date - b.date);
            setReminders(newReminders);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={css.container}>
            <header className={css.header}>
                <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', padding: 0, color: 'var(--color-primary)', marginBottom: '1rem' }}>
                    ← Volver al inicio
                </button>
                <h1>Recordatorios ⏰</h1>
                <p>Próximas acciones de tu tratamiento</p>
            </header>

            {reminders.length > 0 ? (
                <div className={css.stepList}>
                    {reminders.map((rem, i) => {
                        const daysLeft = differenceInDays(rem.date, new Date());
                        const isOverdue = daysLeft < 0;

                        return (
                            <div key={i} className={css.card} style={{ borderLeft: `4px solid ${isOverdue ? '#ef4444' : 'var(--color-primary)'}` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div style={{ fontSize: '1.5rem' }}>{rem.icon}</div>
                                    <span style={{
                                        fontSize: '0.7rem',
                                        padding: '4px 8px',
                                        borderRadius: '12px',
                                        background: isOverdue ? '#fef2f2' : '#f0f9ff',
                                        color: isOverdue ? '#ef4444' : 'var(--color-primary)',
                                        fontWeight: 'bold'
                                    }}>
                                        {isOverdue ? 'VENCIDO' : `En ${daysLeft} días`}
                                    </span>
                                </div>
                                <div style={{ marginTop: '0.5rem' }}>
                                    <h4 style={{ margin: 0 }}>{rem.title}</h4>
                                    <p style={{ margin: '0.25rem 0', fontSize: '0.85rem', color: '#666' }}>{rem.description}</p>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--color-primary)', marginTop: '0.5rem' }}>
                                        Fecha: {format(rem.date, "eeee d 'de' MMMM", { locale: es })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className={css.card} style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                    <h3>Todo al día</h3>
                    <p style={{ color: '#666' }}>No tenés recordatorios pendientes para los próximos días.</p>
                </div>
            )}

            <div className={css.fixedBottom}>
                <Button variant="whatsapp" onClick={() => window.open('https://insersalud.com/tienda')} className="w-full">
                    Pedir Insumos en Tienda
                </Button>
            </div>
        </div>
    );
};

export default Reminders;
