import React from 'react';
import Input from '../../../components/ui/Input';
import css from '../OnboardingWizard.module.css';

const SetupRehab = ({ data, onChange }) => {
    return (
        <div className={css.stepContainer}>
            <h2>Rehabilitación Pulmonar</h2>
            <Input
                label="Diagnóstico Principal"
                placeholder="Ej: EPOC, Fibrosis, Post-COVID"
                value={data.diagnosis || ''}
                onChange={e => onChange('diagnosis', e.target.value)}
            />

            <div className={css.row}>
                <label className={css.label}>Nivel de Cansancio (Disnea)</label>
                <select
                    className={css.select}
                    value={data.fatigue_level || ''}
                    onChange={e => onChange('fatigue_level', e.target.value)}
                >
                    <option value="">Seleccionar...</option>
                    <option value="mild">Leve (Al subir escaleras)</option>
                    <option value="moderate">Moderado (Al caminar rápido)</option>
                    <option value="severe">Alto (Al vestirse/bañarse)</option>
                </select>
            </div>

            <label className={css.consentParams}>
                <input
                    type="checkbox"
                    checked={data.uses_oxygen_exercise || false}
                    onChange={e => onChange('uses_oxygen_exercise', e.target.checked)}
                />
                <span>Uso oxígeno para hacer ejercicios</span>
            </label>
        </div>
    );
};

export default SetupRehab;
