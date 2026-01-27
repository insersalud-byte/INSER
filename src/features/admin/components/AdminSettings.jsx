import React, { useEffect, useState } from 'react';
import { supabase } from '../../../services/supabase';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import css from '../AdminPanel.module.css';

const AdminSettings = () => {
    const [config, setConfig] = useState({
        store_url: '',
        // Apnea
        cpap_mask_replace_months: 6,
        cpap_mask_critical_months: 12,
        cpap_pillows_replace_months: 6,
        cpap_filter_replace_days: 60,
        cpap_velcro_check_days: 14,
        cpap_water_reminder_daily: true,
        // Oxygen
        oxygen_cannula_clean_days: 7,
        oxygen_equipment_check_days: 30,
        oxygen_cannula_replace_days: 90,
        oxygen_cannula_critical_days: 150,
        // Rehab
        rehab_exercise_reminder_days: 2
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        const { data, error } = await supabase.from('admin_settings').select('*').single();
        if (data) setConfig(data);
        setLoading(false);
    };

    const handleSave = async () => {
        setSaving(true);
        const { error } = await supabase.from('admin_settings').upsert({ id: 1, ...config });
        if (error) alert('Error guardando configuración');
        else alert('Configuración guardada correctamente');
        setSaving(false);
    };

    if (loading) return <div>Cargando configuración...</div>;

    return (
        <div className={css.pageContainer}>
            <div className={css.header}>
                <h1>Configuración General</h1>
                <p>Ajustá las frecuencias de alertas y recordatorios</p>
            </div>

            <div className={css.settingsGrid}>
                {/* General */}
                <div className={css.card}>
                    <h3>General</h3>
                    <Input
                        label="URL de la Tienda (Store)"
                        value={config.store_url || ''}
                        onChange={e => setConfig({ ...config, store_url: e.target.value })}
                        placeholder="https://..."
                    />
                </div>

                {/* Apnea */}
                <div className={css.card}>
                    <h3>Apnea del Sueño (CPAP/BiPAP)</h3>
                    <div className={css.fieldRow}>
                        <Input
                            label="Cambio de Máscara (Meses - Warning)"
                            type="number"
                            value={config.cpap_mask_replace_months}
                            onChange={e => setConfig({ ...config, cpap_mask_replace_months: e.target.value })}
                        />
                        <Input
                            label="Cambio de Máscara (Meses - Critical)"
                            type="number"
                            value={config.cpap_mask_critical_months}
                            onChange={e => setConfig({ ...config, cpap_mask_critical_months: e.target.value })}
                        />
                    </div>
                    <Input
                        label="Cambio de Almohadillas (Meses)"
                        type="number"
                        value={config.cpap_pillows_replace_months}
                        onChange={e => setConfig({ ...config, cpap_pillows_replace_months: e.target.value })}
                    />
                    <Input
                        label="Cambio de Filtros (Días)"
                        type="number"
                        value={config.cpap_filter_replace_days}
                        onChange={e => setConfig({ ...config, cpap_filter_replace_days: e.target.value })}
                    />
                    <Input
                        label="Chequeo de Velcro/Arnés (Días)"
                        type="number"
                        value={config.cpap_velcro_check_days}
                        onChange={e => setConfig({ ...config, cpap_velcro_check_days: e.target.value })}
                    />
                    <label className={css.checkbox}>
                        <input
                            type="checkbox"
                            checked={config.cpap_water_reminder_daily}
                            onChange={e => setConfig({ ...config, cpap_water_reminder_daily: e.target.checked })}
                        />
                        <span>Recordatorio diario de agua destilada</span>
                    </label>
                </div>

                {/* Oxygen */}
                <div className={css.card}>
                    <h3>Oxigenoterapia</h3>
                    <div className={css.fieldRow}>
                        <Input
                            label="Cambio de Bigotera (Días - Warning)"
                            type="number"
                            value={config.oxygen_cannula_replace_days}
                            onChange={e => setConfig({ ...config, oxygen_cannula_replace_days: e.target.value })}
                        />
                        <Input
                            label="Cambio de Bigotera (Días - Critical)"
                            type="number"
                            value={config.oxygen_cannula_critical_days}
                            onChange={e => setConfig({ ...config, oxygen_cannula_critical_days: e.target.value })}
                        />
                    </div>
                    <Input
                        label="Limpieza de Bigotera (Días)"
                        type="number"
                        value={config.oxygen_cannula_clean_days}
                        onChange={e => setConfig({ ...config, oxygen_cannula_clean_days: e.target.value })}
                    />
                    <Input
                        label="Chequeo General de Equipo (Días)"
                        type="number"
                        value={config.oxygen_equipment_check_days}
                        onChange={e => setConfig({ ...config, oxygen_equipment_check_days: e.target.value })}
                    />
                </div>

                {/* Rehab */}
                <div className={css.card}>
                    <h3>Rehabilitación</h3>
                    <Input
                        label="Recordatorio de Inactividad (Días)"
                        type="number"
                        value={config.rehab_exercise_reminder_days}
                        onChange={e => setConfig({ ...config, rehab_exercise_reminder_days: e.target.value })}
                    />
                </div>
            </div>

            <div className={css.saveBar}>
                <Button onClick={handleSave} loading={saving} size="lg">Guardar Configuración</Button>
            </div>
        </div>
    );
};

export default AdminSettings;
