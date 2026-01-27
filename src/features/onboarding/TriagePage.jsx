import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabase';
import { useAuth } from '../auth/AuthContext';
import Button from '../../components/ui/Button';
import css from './TriagePage.module.css';

const TriagePage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [step, setStep] = useState(1);

    // Form state
    const [equipment, setEquipment] = useState([]);
    const [mainGoal, setMainGoal] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [otherDiagnosis, setOtherDiagnosis] = useState('');
    const [relationship, setRelationship] = useState('');
    const [marketingOptIn, setMarketingOptIn] = useState(false);

    const handleEquipmentToggle = (value) => {
        setEquipment(prev =>
            prev.includes(value)
                ? prev.filter(item => item !== value)
                : [...prev, value]
        );
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            // Determine treatment flags based on responses
            const finalDiagnosis = diagnosis === 'OTRO' ? otherDiagnosis : diagnosis;
            const hasApnea = equipment.includes('CPAP/BIPAP') || mainGoal === 'DORMIR_MEJOR' || diagnosis === 'APNEA';
            const hasOxygen = equipment.includes('OXIGENO') || mainGoal === 'CONTROLAR_OXIGENO';
            const hasRehab = equipment.includes('REHABILITACION') || mainGoal === 'EJERCICIOS';

            // Update profile with marketing consent
            await supabase
                .from('profiles')
                .update({
                    marketing_opt_in: marketingOptIn,
                    referring_doctor: '', // placeholder
                    health_insurance: '', // placeholder
                    updated_at: new Date().toISOString()
                })
                .eq('id', user.id);

            // Create or update treatments record
            await supabase
                .from('treatments')
                .upsert({
                    user_id: user.id,
                    has_apnea: hasApnea,
                    has_oxygen: hasOxygen,
                    has_rehab: hasRehab,
                    diagnosis: finalDiagnosis
                }, { onConflict: 'user_id' });

            // Redirect to onboarding
            navigate('/onboarding');
        } catch (err) {
            console.error('Triage error:', err);
            setError(err.message || 'Error al guardar tus respuestas');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={css.container}>
            <div className={css.card}>
                <div className={css.header}>
                    <h1>Conocé tu perfil</h1>
                    <p>Respondé estas preguntas para personalizar tu experiencia</p>
                    <div className={css.progress}>
                        <div className={css.progressBar} style={{ width: `${(step / 5) * 100}%` }} />
                    </div>
                </div>

                {error && <div className={css.error}>{error}</div>}

                {step === 1 && (
                    <div className={css.question}>
                        <h2>¿Qué usás hoy?</h2>
                        <p className={css.hint}>Podés seleccionar más de una opción</p>
                        <div className={css.optionsGrid}>
                            {[
                                { value: 'CPAP/BIPAP', label: 'Equipo para dormir (CPAP / BiPAP)', icon: '😴' },
                                { value: 'OXIGENO', label: 'Oxígeno (concentrador o tubo)', icon: '🫁' },
                                { value: 'REHABILITACION', label: 'Rehabilitación / ejercicios', icon: '🏃' },
                                { value: 'NO_SEGURO', label: 'No estoy seguro', icon: '❓' }
                            ].map(option => (
                                <button
                                    key={option.value}
                                    type="button"
                                    className={`${css.optionCard} ${equipment.includes(option.value) ? css.selected : ''}`}
                                    onClick={() => handleEquipmentToggle(option.value)}
                                >
                                    <span className={css.icon}>{option.icon}</span>
                                    <span>{option.label}</span>
                                </button>
                            ))}
                        </div>
                        <Button onClick={() => setStep(2)} disabled={equipment.length === 0}>
                            Continuar
                        </Button>
                    </div>
                )}

                {step === 2 && (
                    <div className={css.question}>
                        <h2>¿Cuál es tu principal objetivo?</h2>
                        <div className={css.optionsGrid}>
                            {[
                                { value: 'DORMIR_MEJOR', label: 'Dormir mejor / apnea', icon: '🌙' },
                                { value: 'CANSARME_MENOS', label: 'Cansarme menos en tareas', icon: '💪' },
                                { value: 'CONTROLAR_OXIGENO', label: 'Controlar mi oxígeno', icon: '📊' },
                                { value: 'EJERCICIOS', label: 'Seguir plan de ejercicios', icon: '🏋️' }
                            ].map(option => (
                                <button
                                    key={option.value}
                                    type="button"
                                    className={`${css.optionCard} ${mainGoal === option.value ? css.selected : ''}`}
                                    onClick={() => setMainGoal(option.value)}
                                >
                                    <span className={css.icon}>{option.icon}</span>
                                    <span>{option.label}</span>
                                </button>
                            ))}
                        </div>
                        <div className={css.actions}>
                            <Button variant="ghost" onClick={() => setStep(1)}>Volver</Button>
                            <Button onClick={() => setStep(3)} disabled={!mainGoal}>Continuar</Button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className={css.question}>
                        <h2>¿Tenés algún diagnóstico? (Opcional)</h2>
                        <div className={css.optionsGrid}>
                            {[
                                { value: 'EPOC', label: 'EPOC' },
                                { value: 'APNEA', label: 'Apnea del sueño' },
                                { value: 'ASMA', label: 'Asma' },
                                { value: 'FIBROSIS', label: 'Fibrosis' },
                                { value: 'OTRO', label: 'Otro' },
                                { value: 'NO_SE', label: 'No sé' }
                            ].map(option => (
                                <button
                                    key={option.value}
                                    type="button"
                                    className={`${css.optionCard} ${diagnosis === option.value ? css.selected : ''}`}
                                    onClick={() => setDiagnosis(option.value)}
                                >
                                    <span>{option.label}</span>
                                </button>
                            ))}
                        </div>

                        {diagnosis === 'OTRO' && (
                            <div className={css.otherInputContainer}>
                                <label>Especificá tu diagnóstico:</label>
                                <input
                                    type="text"
                                    placeholder="Nombre de la patología"
                                    className={css.textInput}
                                    value={otherDiagnosis}
                                    onChange={(e) => setOtherDiagnosis(e.target.value)}
                                    autoFocus
                                />
                            </div>
                        )}

                        <div className={css.actions}>
                            <Button variant="ghost" onClick={() => setStep(2)}>Volver</Button>
                            <Button
                                onClick={() => setStep(4)}
                                disabled={diagnosis === 'OTRO' && !otherDiagnosis.trim()}
                            >
                                Continuar
                            </Button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className={css.question}>
                        <h2>¿Cómo obtuviste tu equipo?</h2>
                        <div className={css.optionsGrid}>
                            {[
                                { value: 'ALQUILER', label: 'Alquiler', icon: '🔄' },
                                { value: 'COMPRA', label: 'Compra', icon: '🛒' }
                            ].map(option => (
                                <button
                                    key={option.value}
                                    type="button"
                                    className={`${css.optionCard} ${relationship === option.value ? css.selected : ''}`}
                                    onClick={() => setRelationship(option.value)}
                                >
                                    <span className={css.icon}>{option.icon}</span>
                                    <span>{option.label}</span>
                                </button>
                            ))}
                        </div>
                        <div className={css.actions}>
                            <Button variant="ghost" onClick={() => setStep(3)}>Volver</Button>
                            <Button onClick={() => setStep(5)} disabled={!relationship}>Continuar</Button>
                        </div>
                    </div>
                )}

                {step === 5 && (
                    <div className={css.question}>
                        <h2>Consentimiento WhatsApp</h2>
                        <div className={css.consentBox}>
                            <label className={css.checkbox}>
                                <input
                                    type="checkbox"
                                    checked={marketingOptIn}
                                    onChange={(e) => setMarketingOptIn(e.target.checked)}
                                />
                                <span>
                                    Acepto recibir novedades, ofertas y recordatorios por WhatsApp
                                </span>
                            </label>
                            <p className={css.privacyNote}>
                                Podés cambiar esta preferencia en cualquier momento desde tu perfil
                            </p>
                        </div>
                        <div className={css.actions}>
                            <Button variant="ghost" onClick={() => setStep(4)}>Volver</Button>
                            <Button onClick={handleSubmit} loading={loading}>
                                Finalizar
                            </Button>
                        </div>
                    </div>
                )}
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

export default TriagePage;
