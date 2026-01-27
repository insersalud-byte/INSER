import React from 'react';
import Input from '../../../components/ui/Input';
import css from '../OnboardingWizard.module.css';

const SetupApnea = ({ data, onChange }) => {
    return (
        <div className={css.stepContainer}>
            <h2>Configuración Apnea</h2>
            <Input
                label="Tipo de Equipo"
                placeholder="Ej: CPAP, AutoCPAP, BiPAP"
                value={data.device_type || ''}
                onChange={e => onChange('device_type', e.target.value)}
            />

            <div className={css.row}>
                <label className={css.label}>Tipo de Máscara</label>
                <select
                    className={css.select}
                    value={data.mask_type || ''}
                    onChange={e => onChange('mask_type', e.target.value)}
                >
                    <option value="">Seleccionar...</option>
                    <option value="nasal">Nasal</option>
                    <option value="nasobucal">Nasobucal (Nariz y Boca)</option>
                    <option value="pillows">Almohadillas (Narinas)</option>
                </select>
            </div>

            <div className={css.row}>
                <label className={css.label}>Modalidad</label>
                <select
                    className={css.select}
                    value={data.ownership_type || ''}
                    onChange={e => onChange('ownership_type', e.target.value)}
                >
                    <option value="">Seleccionar...</option>
                    <option value="rent">Alquiler</option>
                    <option value="buy">Equipo Propio</option>
                </select>
            </div>

            <Input
                label="Fecha instalación máscara (aprox)"
                type="date"
                value={data.mask_date || ''}
                onChange={e => onChange('mask_date', e.target.value)}
            />
        </div>
    );
};

export default SetupApnea;
