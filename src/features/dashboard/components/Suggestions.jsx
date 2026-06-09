import React, { useEffect, useState } from 'react';
import { differenceInDays, addMonths, addDays } from 'date-fns';
import { useAuth } from '../../auth/AuthContext';
import { supabase } from '../../../services/supabase';
import Button from '../../../components/ui/Button';
import css from './Suggestions.module.css';

const Suggestions = () => {
    const { user } = useAuth();
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [storeUrl, setStoreUrl] = useState('https://insersalud.com/tienda');

    useEffect(() => {
        if (user) {
            loadSuggestions();
        }
    }, [user]);

    const loadSuggestions = async () => {
        try {
            // Load admin settings
            const { data: settings } = await supabase
                .from('admin_settings')
                .select('*')
                .eq('id', 1)
                .single();

            if (settings) {
                setStoreUrl(settings.store_url || 'https://insersalud.com/tienda');
            }

            // Load user setups
            const { data: apnea } = await supabase
                .from('apnea_setup')
                .select('*')
                .eq('user_id', user.id)
                .single();

            const { data: oxygen } = await supabase
                .from('oxygen_setup')
                .select('*')
                .eq('user_id', user.id)
                .single();

            const { data: rehab } = await supabase
                .from('rehab_setup')
                .select('*')
                .eq('user_id', user.id)
                .single();

            const { data: exerciseLogs } = await supabase
                .from('exercise_logs')
                .select('completed_at')
                .eq('user_id', user.id)
                .order('completed_at', { ascending: false })
                .limit(1);

            const newSuggestions = [];

            // APNEA RULES
            if (apnea) {
                // Rule 1 & 2: Máscara - 6 meses (WARNING) y 12 meses (CRITICAL)
                if (apnea.mask_start_date) {
                    const maskDate = new Date(apnea.mask_start_date);
                    const monthsSinceMask = differenceInDays(new Date(), maskDate) / 30;

                    if (monthsSinceMask >= (settings?.cpap_mask_critical_months || 12)) {
                        newSuggestions.push({
                            id: 'mask_critical',
                            type: 'CRITICAL',
                            priority: 1,
                            title: 'Cambio de Máscara Recomendado',
                            description: 'Por el tiempo de uso, se recomienda cambiar la máscara para asegurar un buen sellado y un descanso adecuado.',
                            actions: [
                                { label: 'Ver opciones recomendadas', url: storeUrl },
                                { label: 'Hablar con Inser Salud', url: 'https://wa.me/5493512065320' }
                            ]
                        });
                    } else if (monthsSinceMask >= (settings?.cpap_mask_replace_months || 6)) {
                        newSuggestions.push({
                            id: 'mask_warning',
                            type: 'WARNING',
                            priority: 2,
                            title: 'Evaluá el Recambio de tu Máscara',
                            description: 'Tu máscara ya tiene varios meses de uso. Para mantener comodidad y un buen sellado, se recomienda evaluar el recambio.',
                            actions: [
                                { label: 'Ver recomendaciones', url: storeUrl },
                                { label: 'Consultar por WhatsApp', url: 'https://wa.me/5493512065320' }
                            ]
                        });
                    }
                }

                // Rule 3: Filtro CPAP - cambio sugerido (WARNING)
                if (apnea.filter_last_change_date) {
                    const filterDate = new Date(apnea.filter_last_change_date);
                    const daysSinceFilter = differenceInDays(new Date(), filterDate);

                    if (daysSinceFilter >= (settings?.cpap_filter_replace_days || 60)) {
                        newSuggestions.push({
                            id: 'filter_warning',
                            type: 'WARNING',
                            priority: 3,
                            title: 'Cambio de Filtro Sugerido',
                            description: 'Cambiar el filtro ayuda a mantener el buen funcionamiento del equipo y la calidad del aire.',
                            actions: [
                                { label: 'Ver cómo cambiarlo', url: storeUrl },
                                { label: 'Visitar Store Inser Salud', url: storeUrl }
                            ]
                        });
                    }
                }

                // Rule 4: Arnés/Velcro - recambio recomendado (CRITICAL)
                // This would be triggered by user reporting issues, for now we'll skip automatic detection

                // Rule 7: Agua destilada - recordatorio (PREVENTIVO)
                if (settings?.cpap_water_reminder_daily) {
                    newSuggestions.push({
                        id: 'water_reminder',
                        type: 'PREVENTIVO',
                        priority: 7,
                        title: 'Recordatorio: Agua Destilada',
                        description: 'Recordá usar solo agua destilada en el humidificador. No uses solución fisiológica ni agua de red.',
                        actions: [
                            { label: 'Ver cuidados del equipo', url: storeUrl }
                        ]
                    });
                }
            }

            // OXYGEN RULES
            if (oxygen) {
                // Rule 5 & 6: Oxígeno - cambio bigotera 3 meses (WARNING) y vencida (CRITICAL)
                if (oxygen.interface_start_date) {
                    const interfaceDate = new Date(oxygen.interface_start_date);
                    const daysSinceInterface = differenceInDays(new Date(), interfaceDate);

                    if (daysSinceInterface >= (settings?.oxygen_cannula_critical_days || 150)) {
                        newSuggestions.push({
                            id: 'cannula_critical',
                            type: 'CRITICAL',
                            priority: 1,
                            title: 'Cambio de Bigotera Necesario',
                            description: 'Por el tiempo de uso, se recomienda cambiar la bigotera para evitar irritaciones y asegurar una correcta administración del oxígeno.',
                            actions: [
                                { label: 'Ver opciones disponibles', url: storeUrl },
                                { label: 'Hablar con Inser Salud', url: 'https://wa.me/5493512065320' }
                            ]
                        });
                    } else if (daysSinceInterface >= (settings?.oxygen_cannula_replace_days || 90)) {
                        newSuggestions.push({
                            id: 'cannula_warning',
                            type: 'WARNING',
                            priority: 2,
                            title: 'Cambio de Bigotera Recomendado',
                            description: 'Para mantener una buena higiene y comodidad, se recomienda cambiar la bigotera cada 3 meses.',
                            actions: [
                                { label: 'Ver recomendaciones', url: storeUrl },
                                { label: 'Consultar por WhatsApp', url: 'https://wa.me/5493512065320' }
                            ]
                        });
                    }
                }
            }

            // REHAB RULES
            if (rehab) {
                // Rule 9: Rehab - inactividad (MOTIVACIONAL)
                const lastExercise = exerciseLogs?.[0];
                if (lastExercise) {
                    const daysSinceExercise = differenceInDays(new Date(), new Date(lastExercise.completed_at));
                    if (daysSinceExercise >= (settings?.rehab_exercise_reminder_days || 2)) {
                        newSuggestions.push({
                            id: 'exercise_motivation',
                            type: 'MOTIVACIONAL',
                            priority: 9,
                            title: 'Retomá tus Ejercicios',
                            description: 'Hace unos días que no registrás ejercicios. Retomar con una rutina suave puede ayudarte a sentirte mejor.',
                            actions: [
                                { label: 'Ver ejercicios de hoy', url: '/rehab/exercises' },
                                { label: 'Visitar Store Inser Salud', url: storeUrl }
                            ]
                        });
                    }
                }
            }

            // Sort by priority (CRITICAL > WARNING > MOTIVACIONAL) and limit to 3
            const sortedSuggestions = newSuggestions
                .sort((a, b) => a.priority - b.priority)
                .slice(0, 3);

            setSuggestions(sortedSuggestions);
        } catch (err) {
            console.error('Error loading suggestions:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading || suggestions.length === 0) {
        return null;
    }

    return (
        <section className={css.suggestionsSection}>
            <h2 className={css.sectionTitle}>Sugerencias para vos</h2>
            <div className={css.suggestionsGrid}>
                {suggestions.map((suggestion) => (
                    <div
                        key={suggestion.id}
                        className={`${css.suggestionCard} ${css[suggestion.type.toLowerCase()]}`}
                    >
                        <div className={css.suggestionHeader}>
                            <span className={css.badge}>{suggestion.type}</span>
                        </div>
                        <h3>{suggestion.title}</h3>
                        <p>{suggestion.description}</p>
                        <div className={css.actions}>
                            {suggestion.actions.map((action, idx) => (
                                <Button
                                    key={idx}
                                    variant={idx === 0 ? 'primary' : 'outline'}
                                    size="sm"
                                    onClick={() => {
                                        if (action.url.startsWith('http')) {
                                            window.open(action.url, '_blank');
                                        } else {
                                            const dest = (action.url || '').replace(/^#/, '');
                                            window.location.href = dest.startsWith('/') ? dest : `/${dest}`;
                                        }
                                    }}
                                >
                                    {action.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Suggestions;
