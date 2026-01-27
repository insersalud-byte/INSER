import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabase';
import { useAuth } from '../auth/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import css from './OnboardingWizard.module.css';

const OnboardingWizard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [step, setStep] = useState(0);
    const [treatments, setTreatments] = useState(null);

    // Form data for each treatment type
    const [medicalData, setMedicalData] = useState({
        referring_doctor: '',
        health_insurance: ''
    });

    const [apneaData, setApneaData] = useState({
        device_type: '',
        mask_type: '',
        acquired_as: '',
        difficulty_main: '',
        pressure_text: '',
        bipap_ipap_text: '',
        bipap_epap_text: '',
        mask_start_date: ''
    });

    const [oxygenData, setOxygenData] = useState({
        equipment_type: '',
        interface_type: '',
        liters_text: '',
        hours_per_day_text: '',
        acquired_as: '',
        interface_start_date: ''
    });

    const [rehabData, setRehabData] = useState({
        diagnosis: '',
        fatigue_level: '',
        uses_oxygen_during_exercise: ''
    });

    useEffect(() => {
        loadTreatments();
    }, [user]);

    const loadTreatments = async () => {
        try {
            // Bypass for demo mode
            if (user?.id === 'demo-user-id') {
                setTreatments({ has_apnea: true, has_oxygen: true, has_rehab: true });
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
            setError('Error cargando información de tratamiento');
        } finally {
            setLoading(false);
        }
    };

    const handleComplete = async () => {
        setSaving(true);
        setError(null);

        try {
            // 1. Update Profile (Medical Data)
            await supabase
                .from('profiles')
                .update({
                    referring_doctor: medicalData.referring_doctor,
                    health_insurance: medicalData.health_insurance,
                    onboarding_completed: true,
                    onboarding_completed_at: new Date().toISOString()
                })
                .eq('id', user.id);

            // 2. Save APNEA setup if applicable
            if (treatments.has_apnea) {
                await supabase
                    .from('apnea_setup')
                    .upsert({
                        user_id: user.id,
                        ...apneaData,
                        mask_start_date: apneaData.mask_start_date || null
                    }, { onConflict: 'user_id' });
            }

            // 3. Save OXYGEN setup if applicable
            if (treatments.has_oxygen) {
                await supabase
                    .from('oxygen_setup')
                    .upsert({
                        user_id: user.id,
                        ...oxygenData,
                        interface_start_date: oxygenData.interface_start_date || null
                    }, { onConflict: 'user_id' });
            }

            // 4. Save REHAB setup if applicable
            if (treatments.has_rehab) {
                await supabase
                    .from('rehab_setup')
                    .upsert({
                        user_id: user.id,
                        ...rehabData
                    }, { onConflict: 'user_id' });
            }

            // Redirect to dashboard
            navigate('/');
        } catch (err) {
            console.error('Error saving onboarding:', err);
            setError(err.message || 'Error al guardar la configuración');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className={css.loading}>Cargando...</div>;
    }

    if (!treatments) {
        return <div className={css.error}>Error: No se encontró información de tratamiento</div>;
    }

    // Determine steps based on treatments
    const steps = ['general']; // Always start with general medical info
    if (treatments.has_apnea) steps.push('apnea');
    if (treatments.has_oxygen) steps.push('oxygen');
    if (treatments.has_rehab) steps.push('rehab');

    const currentStepType = steps[step];
    const isLastStep = step === steps.length - 1;

    return (
        <div className={css.container}>
            <div className={css.card}>
                <div className={css.header}>
                    <h1>Configuración de Tratamiento</h1>
                    <p>Paso {step + 1} de {steps.length}</p>
                    <div className={css.progress}>
                        <div className={css.progressBar} style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
                    </div>
                </div>

                {error && <div className={css.error}>{error}</div>}

                {/* GENERAL MEDICAL INFO */}
                {currentStepType === 'general' && (
                    <div className={css.stepContent}>
                        <h2>Información del Paciente</h2>
                        <p style={{ marginBottom: '1.5rem', color: '#666' }}>Ayudanos a completar tu ficha médica para brindarte una mejor atención.</p>

                        <div className={css.field}>
                            <label>Obra Social / Prepaga</label>
                            <Input
                                type="text"
                                placeholder="Ej: OSDE, Swiss Medical, PAMI"
                                value={medicalData.health_insurance}
                                onChange={(e) => setMedicalData({ ...medicalData, health_insurance: e.target.value })}
                                required
                            />
                        </div>

                        <div className={css.field}>
                            <label>Médico que solicitó el tratamiento</label>
                            <Input
                                type="text"
                                placeholder="Nombre del profesional"
                                value={medicalData.referring_doctor}
                                onChange={(e) => setMedicalData({ ...medicalData, referring_doctor: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                )}

                {currentStepType === 'apnea' && (
                    <div className={css.stepContent}>
                        <div className={css.stepHero}>
                            <img src="/artifacts/cpap_real.png" alt="Equipo CPAP" className={css.stepImg} />
                        </div>
                        <h2>Configuración de Apnea del Sueño</h2>

                        <div className={css.field}>
                            <label>Tipo de Equipo</label>
                            <select
                                value={apneaData.device_type}
                                onChange={(e) => setApneaData({ ...apneaData, device_type: e.target.value })}
                                required
                            >
                                <option value="">Seleccioná...</option>
                                <option value="CPAP">CPAP</option>
                                <option value="AUTOCPAP">AutoCPAP</option>
                                <option value="BIPAP">BiPAP</option>
                            </select>
                        </div>

                        <div className={css.field}>
                            <label>Tipo de Máscara</label>
                            <select
                                value={apneaData.mask_type}
                                onChange={(e) => setApneaData({ ...apneaData, mask_type: e.target.value })}
                                required
                            >
                                <option value="">Seleccioná...</option>
                                <option value="NASAL">Nasal</option>
                                <option value="NASOBUCAL">Nasobucal (Full Face)</option>
                                <option value="ALMOHADILLAS">Almohadillas Nasales</option>
                            </select>
                        </div>

                        <div className={css.field}>
                            <label>¿Cómo obtuviste el equipo?</label>
                            <select
                                value={apneaData.acquired_as}
                                onChange={(e) => setApneaData({ ...apneaData, acquired_as: e.target.value })}
                                required
                            >
                                <option value="">Seleccioná...</option>
                                <option value="ALQUILER">Alquiler</option>
                                <option value="COMPRA">Compra</option>
                            </select>
                        </div>

                        <div className={css.field}>
                            <label>Principal dificultad (opcional)</label>
                            <select
                                value={apneaData.difficulty_main}
                                onChange={(e) => setApneaData({ ...apneaData, difficulty_main: e.target.value })}
                            >
                                <option value="">Ninguna en particular</option>
                                <option value="MOLESTA_MASCARA">Me molesta la máscara</option>
                                <option value="ME_SECO">Me seco mucho</option>
                                <option value="ME_LO_SACO">Me lo saco durante la noche</option>
                                <option value="NO_DESCANSO">No descanso bien</option>
                            </select>
                        </div>

                        {apneaData.device_type === 'BIPAP' && (
                            <>
                                <div className={css.field}>
                                    <label>Presión IPAP (opcional)</label>
                                    <Input
                                        type="text"
                                        placeholder="Ej: 12"
                                        value={apneaData.bipap_ipap_text}
                                        onChange={(e) => setApneaData({ ...apneaData, bipap_ipap_text: e.target.value })}
                                    />
                                </div>
                                <div className={css.field}>
                                    <label>Presión EPAP (opcional)</label>
                                    <Input
                                        type="text"
                                        placeholder="Ej: 8"
                                        value={apneaData.bipap_epap_text}
                                        onChange={(e) => setApneaData({ ...apneaData, bipap_epap_text: e.target.value })}
                                    />
                                </div>
                            </>
                        )}

                        <div className={css.field}>
                            <label>Fecha de inicio de máscara (opcional)</label>
                            <Input
                                type="date"
                                value={apneaData.mask_start_date}
                                onChange={(e) => setApneaData({ ...apneaData, mask_start_date: e.target.value })}
                            />
                        </div>
                    </div>
                )}

                {/* OXYGEN SETUP */}
                {currentStepType === 'oxygen' && (
                    <div className={css.stepContent}>
                        <div className={css.stepHero}>
                            <img src="/artifacts/paciente_oxigeno_hogar_1769206083704.png" alt="Oxígenoterapia" className={css.stepImg} />
                        </div>
                        <h2>Configuración de Oxigenoterapia</h2>

                        <div className={css.field}>
                            <label>Tipo de Equipo</label>
                            <select
                                value={oxygenData.equipment_type}
                                onChange={(e) => setOxygenData({ ...oxygenData, equipment_type: e.target.value })}
                                required
                            >
                                <option value="">Seleccioná...</option>
                                <option value="ESTACIONARIO">Concentrador Estacionario</option>
                                <option value="PORTATIL">Concentrador Portátil</option>
                                <option value="CILINDRO">Cilindro de Oxígeno</option>
                            </select>
                        </div>

                        <div className={css.field}>
                            <label>Interfaz</label>
                            <select
                                value={oxygenData.interface_type}
                                onChange={(e) => setOxygenData({ ...oxygenData, interface_type: e.target.value })}
                                required
                            >
                                <option value="">Seleccioná...</option>
                                <option value="BIGOTERA">Bigotera (Cánula Nasal)</option>
                                <option value="MASCARA">Máscara</option>
                            </select>
                        </div>

                        <div className={css.field}>
                            <label>Litros por minuto (opcional)</label>
                            <Input
                                type="text"
                                placeholder="Ej: 2"
                                value={oxygenData.liters_text}
                                onChange={(e) => setOxygenData({ ...oxygenData, liters_text: e.target.value })}
                            />
                        </div>

                        <div className={css.field}>
                            <label>Horas de uso por día (opcional)</label>
                            <Input
                                type="text"
                                placeholder="Ej: 16 horas"
                                value={oxygenData.hours_per_day_text}
                                onChange={(e) => setOxygenData({ ...oxygenData, hours_per_day_text: e.target.value })}
                            />
                        </div>

                        <div className={css.field}>
                            <label>¿Cómo obtuviste el equipo?</label>
                            <select
                                value={oxygenData.acquired_as}
                                onChange={(e) => setOxygenData({ ...oxygenData, acquired_as: e.target.value })}
                                required
                            >
                                <option value="">Seleccioná...</option>
                                <option value="ALQUILER">Alquiler</option>
                                <option value="COMPRA">Compra</option>
                            </select>
                        </div>

                        <div className={css.field}>
                            <label>Fecha de inicio de bigotera/máscara (opcional)</label>
                            <Input
                                type="date"
                                value={oxygenData.interface_start_date}
                                onChange={(e) => setOxygenData({ ...oxygenData, interface_start_date: e.target.value })}
                            />
                        </div>
                    </div>
                )}

                {/* REHAB SETUP */}
                {currentStepType === 'rehab' && (
                    <div className={css.stepContent}>
                        <h2>Configuración de Rehabilitación</h2>

                        <div className={css.field}>
                            <label>Diagnóstico</label>
                            <select
                                value={rehabData.diagnosis}
                                onChange={(e) => setRehabData({ ...rehabData, diagnosis: e.target.value })}
                                required
                            >
                                <option value="">Seleccioná...</option>
                                <option value="EPOC">EPOC</option>
                                <option value="APNEA">Apnea del sueño</option>
                                <option value="ASMA">Asma</option>
                                <option value="FIBROSIS">Fibrosis Pulmonar</option>
                                <option value="OTRO">Otro</option>
                            </select>
                        </div>

                        <div className={css.field}>
                            <label>Nivel de fatiga</label>
                            <select
                                value={rehabData.fatigue_level}
                                onChange={(e) => setRehabData({ ...rehabData, fatigue_level: e.target.value })}
                                required
                            >
                                <option value="">Seleccioná...</option>
                                <option value="LEVE">Leve - Me canso con esfuerzos moderados</option>
                                <option value="MODERADO">Moderado - Me canso con tareas cotidianas</option>
                                <option value="ALTO">Alto - Me canso con mínimo esfuerzo</option>
                            </select>
                        </div>

                        <div className={css.field}>
                            <label>¿Usás oxígeno durante el ejercicio?</label>
                            <select
                                value={rehabData.uses_oxygen_during_exercise}
                                onChange={(e) => setRehabData({ ...rehabData, uses_oxygen_during_exercise: e.target.value })}
                                required
                            >
                                <option value="">Seleccioná...</option>
                                <option value="SI">Sí</option>
                                <option value="NO">No</option>
                                <option value="AVECES">A veces</option>
                            </select>
                        </div>
                    </div>
                )}

                <div className={css.actions}>
                    {step > 0 && (
                        <Button variant="ghost" onClick={() => setStep(step - 1)}>
                            Volver
                        </Button>
                    )}
                    {!isLastStep ? (
                        <Button onClick={() => setStep(step + 1)}>
                            Continuar
                        </Button>
                    ) : (
                        <Button onClick={handleComplete} loading={saving}>
                            Finalizar Configuración
                        </Button>
                    )}
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
            </a>
        </div>
    );
};

export default OnboardingWizard;
