import React, { useEffect, useState } from 'react';
import { supabase } from '../../../services/supabase';
import Button from '../../../components/ui/Button';
import css from '../AdminPanel.module.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeThisWeek: 0,
        completedOnboarding: 0,
        treatmentBreakdown: { apnea: 0, oxygen: 0, rehab: 0 },
        criticalAlerts: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            // Count users
            const { count: totalUsers } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
            const { count: onboarded } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('onboarding_completed', true);

            // Breakdown
            const { count: apneaCount } = await supabase.from('treatments').select('*', { count: 'exact', head: true }).eq('has_apnea', true);
            const { count: oxygenCount } = await supabase.from('treatments').select('*', { count: 'exact', head: true }).eq('has_oxygen', true);
            const { count: rehabCount } = await supabase.from('treatments').select('*', { count: 'exact', head: true }).eq('has_rehab', true);

            // Active users (mock logic for now since we don't have login logs table yet, using updated_at)
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            const { count: activeCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).gte('updated_at', weekAgo.toISOString());

            setStats({
                totalUsers: totalUsers || 0,
                activeThisWeek: activeCount || 0,
                completedOnboarding: onboarded || 0,
                treatmentBreakdown: {
                    apnea: apneaCount || 0,
                    oxygen: oxygenCount || 0,
                    rehab: rehabCount || 0
                },
                criticalAlerts: 0 // Would need complex query for alerts
            });
        } catch (err) {
            console.error('Error loading stats:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className={css.pageContainer}>Cargando dashboard...</div>;

    return (
        <div className={css.pageContainer}>
            <div className={css.header}>
                <h1>Dashboard</h1>
                <p>Resumen general de Inser Salud</p>
            </div>

            <div className={css.metricsGrid}>
                <div className={css.metricCard}>
                    <div className={css.metricLabel}>Total Pacientes</div>
                    <div className={css.metricValue}>{stats.totalUsers}</div>
                    <small style={{ color: '#10b981' }}>↑ Nuevos esta semana</small>
                </div>
                <div className={css.metricCard}>
                    <div className={css.metricLabel}>Activos (7d)</div>
                    <div className={css.metricValue}>{stats.activeThisWeek}</div>
                </div>
                <div className={css.metricCard}>
                    <div className={css.metricLabel}>Onboarding Completado</div>
                    <div className={css.metricValue}>{stats.completedOnboarding}</div>
                    <small>{Math.round((stats.completedOnboarding / (stats.totalUsers || 1)) * 100)}% del total</small>
                </div>
                <div className={css.metricCard}>
                    <div className={css.metricLabel}>Alertas Críticas</div>
                    <div className={css.metricValue} style={{ color: '#ef4444' }}>0</div>
                </div>
            </div>

            <div className={css.dashboardSection}>
                <h3>Distribución por Tratamiento</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                    <div style={{ textAlign: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
                        <span style={{ fontSize: '2rem' }}>😴</span>
                        <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#0f172a' }}>{stats.treatmentBreakdown.apnea}</div>
                        <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Apnea</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
                        <span style={{ fontSize: '2rem' }}>🫁</span>
                        <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#0f172a' }}>{stats.treatmentBreakdown.oxygen}</div>
                        <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Oxígeno</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
                        <span style={{ fontSize: '2rem' }}>🏃</span>
                        <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#0f172a' }}>{stats.treatmentBreakdown.rehab}</div>
                        <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Rehabilitación</div>
                    </div>
                </div>
            </div>

            <div className={css.dashboardSection}>
                <h3>Acciones Rápidas</h3>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <Button onClick={() => window.location.href = '/admin/users'}>Ver Usuarios</Button>
                    <Button variant="outline" onClick={() => window.location.href = '/admin/banners'}>Gestionar Banners</Button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
