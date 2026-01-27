import React, { useState } from 'react';
import { supabase } from '../../services/supabase';
import { useAuth } from '../auth/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import css from '../auth/LoginPage.module.css';

const AdminLoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { loginAsDemo } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        let emailToUse = username;
        if (username.toLowerCase() === 'admind') {
            emailToUse = 'admin@insersalud.app';
        }

        try {
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: emailToUse,
                password: password
            });

            if (signInError) {
                if (signInError.message.includes("disabled")) {
                    throw new Error("ERROR DE CONFIGURACIÓN: El 'Email Provider' está apagado en Supabase. Activalo en Auth -> Providers -> Email o usa el botón de abajo.");
                } else if (signInError.message.includes("Invalid login")) {
                    throw new Error("Usuario o contraseña inválidos.");
                }
                throw signInError;
            }

            window.location.hash = '/admin';

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDemoEntry = () => {
        loginAsDemo('ADMIN');
        window.location.hash = '/admin';
    };

    return (
        <div className={css.container}>
            <div className={css.glassCard} style={{ borderColor: 'var(--color-primary)' }}>
                <h1 className={css.title}>Admin Panel</h1>
                <p className={css.subtitle}>Acceso Administrativo</p>

                {error && <div className={css.error} style={{ fontSize: '0.8rem' }}>{error}</div>}

                <form onSubmit={handleLogin} className={css.form}>
                    <Input
                        label="Usuario"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="admind"
                        required
                    />
                    <Input
                        label="Contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" loading={loading} className="w-full">
                        Ingresar
                    </Button>
                </form>

                <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                    <Button variant="outline" onClick={handleDemoEntry} className="w-full">
                        Entrar en Modo Demo (Bypass)
                    </Button>
                </div>

                <div className={css.adminLink}>
                    <small>¿Sos paciente? <a href="/#/login">Ingresá acá</a></small>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;
