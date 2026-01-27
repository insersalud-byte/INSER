import React from 'react';
import Input from '../../../components/ui/Input';
import css from '../OnboardingWizard.module.css';

const SetupOxygen = ({ data, onChange }) => {
    return (
        <div className={css.stepContainer}>
            <h2>Configuración Oxígeno</h2>

            <div className={css.row}>
                <label className={css.label}>Tipo de Equipo</label>
                <select
                    className={css.select}
                    value={data.device_type || ''}
                    onChange={e => onChange('device_type', e.target.value)}
                >
                    <option value="">Seleccionar...</option>
                    <option value="concentrator">Concentrador Estacionario</option>
                    <option value="portable">Concentrador Portátil</option>
                    <option value="cylinder">Cilindro / Tubo</option>
                </select>
            </div>

            <div className={css.row}>
                <label className={css.label}>Interfaz</label>
                <select
                    className={css.select}
                    value={data.interface_type || ''}
                    onChange={e => onChange('interface_type', e.target.value)}
                >
                    <option value="">Seleccionar...</option>
                    <option value="cannula">Bigotera (Cánula)</option>
                    <option value="mask">Máscara</option>
                </select>
            </div>

            <Input
                label="Litros por minuto"
                type="number"
                value={data.liters_per_min || ''}
                onChange={e => onChange('liters_per_min', e.target.value)}
            />
        </div>
    );
};

export default SetupOxygen;
