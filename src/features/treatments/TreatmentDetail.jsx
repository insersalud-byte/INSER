import React from 'react';
import { useAuth } from '../auth/AuthContext';
import Button from '../../components/ui/Button';
import css from '../dashboard/Dashboard.module.css';

const TreatmentDetail = () => {
    const { profile } = useAuth();

    return (
        <div className={css.pageContainer}>
            <Button variant="ghost" onClick={() => window.location.hash = '/'}>← Volver al Inicio</Button>

            <div style={{ marginTop: '1.5rem', background: 'white', padding: '2rem', borderRadius: '16px' }}>
                <h1>Mi Tratamiento</h1>
                <p>Detalles del equipo para: <strong>{profile?.full_name}</strong></p>
                <hr style={{ margin: '1rem 0', border: '0', borderTop: '1px solid #eee' }} />
                <p>Esta sección mostrará gráficos de uso y detalles específicos del equipo (CPAP, Concentrador, etc).</p>
                <p><em>Próximamente...</em></p>
            </div>
        </div>
    );
};

export default TreatmentDetail;
