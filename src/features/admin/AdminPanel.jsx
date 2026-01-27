import React, { useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import css from './AdminPanel.module.css';

import AdminDashboard from './components/AdminDashboard';
import UsersList from './components/UsersList';
import AdminSettings from './components/AdminSettings';
import BannersManager from './components/BannersManager';

const AdminPanel = () => {
    const { user, isAdmin } = useAuth();
    const [authorized, setAuthorized] = useState(null);

    React.useEffect(() => {
        // Check if real admin
        isAdmin().then(is => setAuthorized(is));
    }, [user]);

    if (authorized === null) return <div>Verificando permisos...</div>;
    if (authorized === false) return <div className={css.error}>Acceso Denegado. No tenés permisos de administrador.</div>;

    return (
        <div className={css.layout}>
            <aside className={css.sidebar}>
                <div className={css.logo}>Inser Admin</div>
                <nav className={css.nav}>
                    <Link to="/admin" className={css.navItem}>📊 Dashboard</Link>
                    <Link to="/admin/users" className={css.navItem}>👥 Usuarios</Link>
                    <Link to="/admin/settings" className={css.navItem}>⚙️ Configuración</Link>
                    <Link to="/admin/banners" className={css.navItem}>🖼️ Banners</Link>

                    <div className={css.navDivider} />

                    <Link to="/" className={css.navItem} style={{ color: '#fbbf24' }}>
                        🏠 Volver a la App
                    </Link>
                </nav>
                <div className={css.user}>
                    <div style={{ marginBottom: '10px' }}>
                        <small>{user.email}</small>
                    </div>
                    <button
                        onClick={() => {
                            localStorage.removeItem('demo_admin');
                            supabase.auth.signOut().then(() => window.location.hash = '/welcome');
                        }}
                        className={css.logoutBtn}
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </aside>
            <main className={css.content}>
                <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/users" element={<UsersList />} />
                    <Route path="/settings" element={<AdminSettings />} />
                    <Route path="/banners" element={<BannersManager />} />
                </Routes>
            </main>
        </div>
    );
};

export default AdminPanel;
