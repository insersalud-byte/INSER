import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { supabase } from '../../services/supabase';
import Suggestions from './components/Suggestions';
import Banners from './components/Banners';
import Navigation from '../../components/Navigation';
import css from './Dashboard.module.css';

const HomePage = () => {
    const { user, profile } = useAuth();
    const navigate = useNavigate();
    const [treatments, setTreatments] = useState(null);
    const [loading, setLoading] = useState(true);
    const firstName = profile?.full_name?.split(' ')[0] || 'Paciente';

    useEffect(() => {
        const safetyTimeout = setTimeout(() => {
            if (loading) {
                console.warn('HomePage loading safety timeout reached. Forcing loading to false.');
                setLoading(false);
            }
        }, 3000);

        loadTreatments();

        return () => clearTimeout(safetyTimeout);
    }, [user]);

    const loadTreatments = async () => {
        try {
            // If we are in demo mode (no real user.id or specific flag), use profile data
            if (user?.id === 'demo-user-id') {
                setTreatments({
                    has_apnea: profile.has_apnea,
                    has_oxygen: profile.has_oxygen,
                    has_rehab: profile.has_rehab
                });
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from('treatments')
                .select('*')
                .eq('user_id', user.id)
                .single();

            if (error && error.code !== 'PGRST116') throw error;
            setTreatments(data || { has_apnea: false, has_oxygen: false, has_rehab: false });
        } catch (err) {
            console.error('Error loading treatments:', err);
            // Fallback for safety
            setTreatments({
                has_apnea: profile?.has_apnea || false,
                has_oxygen: profile?.has_oxygen || false,
                has_rehab: profile?.has_rehab || false
            });
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/welcome');
    };

    if (loading) {
        return <div className={css.loading}>Cargando...</div>;
    }
    return (
        <div className={css.pageContainer}>
            <Navigation showBack={false} />
            <header className={css.header}>
                <div>
                    <h1>Hola, {firstName} 👋</h1>
                    <p>¿Cómo te sentís hoy?</p>
                </div>
                <div className={css.headerActions}>
                    <div className={css.avatar}>
                        {firstName[0]}
                    </div>
                    <button onClick={handleLogout} className={css.logoutBtn}>
                        Salir
                    </button>
                </div>
            </header>

            <Banners />
            <Suggestions />

            {/* Dynamic Modules based on Treatment */}
            <section className={css.modulesSection}>
                <h2 className={css.sectionTitle}>Mis Módulos</h2>

                <div className={css.gridMenu}>
                    {/* APNEA Modules */}
                    {treatments?.has_apnea && (
                        <div className={css.menuCard} onClick={() => navigate('/apnea/sleep')}>
                            <img src="/artifacts/paciente_cpap_durmiendo_1769206063359.png" alt="Apnea" className={css.cardImg} />
                            <div className={css.cardContent}>
                                <span>Mi Tratamiento CPAP</span>
                                <small>Sueño y Equipo</small>
                            </div>
                        </div>
                    )}

                    {/* OXYGEN Modules */}
                    {treatments?.has_oxygen && (
                        <div className={css.menuCard} onClick={() => navigate('/oxygen/usage')}>
                            <img src="/artifacts/paciente_oxigeno_hogar_1769206083704.png" alt="Oxígeno" className={css.cardImg} />
                            <div className={css.cardContent}>
                                <span>Oxigenoterapia</span>
                                <small>Uso y Seguridad</small>
                            </div>
                        </div>
                    )}

                    {/* REHAB Modules */}
                    {treatments?.has_rehab && (
                        <div className={css.menuCard} onClick={() => navigate('/rehab/exercises')}>
                            <img src="/artifacts/medico_rehabilitacion_respiratoria_1769206103419.png" alt="Rehabilitación" className={css.cardImg} />
                            <div className={css.cardContent}>
                                <span>Mi Rehabilitación</span>
                                <small>Ejercicios Diarios</small>
                            </div>
                        </div>
                    )}

                    <div className={css.menuCard} onClick={() => navigate('/chat-ai')}>
                        <img src="/artifacts/santi_real.jpg" alt="Asistente" className={css.cardImg} />
                        <div className={css.cardContent}>
                            <span>Asistente IA</span>
                            <small>Santi AI 24/7</small>
                        </div>
                    </div>
                </div>
            </section>

            {/* WhatsApp Button */}
            <a
                href="https://wa.me/5493512065320"
                className={css.whatsappBtn}
                target="_blank"
                rel="noopener noreferrer"
            >
                <span className={css.whatsappIcon}>💬</span>
            </a>
        </div>
    );
};

export default HomePage;
