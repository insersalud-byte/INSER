import React, { useState } from 'react';
import { supabase } from '../../services/supabase';
import { useAuth } from './AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import css from './LoginPage.module.css';

const LoginPage = () => {
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { loginAsDemo } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const cleanPhone = phone.replace(/\D/g, '');
        if (cleanPhone.length < 8) {
            setError("Por favor ingresá un número de WhatsApp válido.");
            setLoading(false);
            return;
        }

        const fakeEmail = `${cleanPhone}@insersalud.app`;
        const fakePassword = cleanPhone;

        try {
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: fakeEmail,
                password: fakePassword
            });

            if (signInError) {
                if (signInError.message.includes("disabled")) {
                    throw new Error("⚠️ ERROR SUPABASE: Debes habilitar 'Email Provider' en el dashboard de Supabase (Authentication -> Providers -> Email -> Enable).");
                }

                // Intentar registro si falla login
                const { error: signUpError } = await supabase.auth.signUp({
                    email: fakeEmail,
                    password: fakePassword,
                    options: { data: { full_name: fullName, phone: cleanPhone } }
                });

                if (signUpError) throw signUpError;
            }
        } catch (err) {
            console.error("Login Error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={css.container}>
            <div className={css.glassCard}>
                <h1 className={css.title}>Inser Salud</h1>
                <p className={css.subtitle}>Portal del paciente</p>

                {error && <div className={css.error}>{error}</div>}

                <form onSubmit={handleLogin} className={css.form}>
                    <Input
                        label="Nombre Completo"
                        type="text"
                        placeholder="Juan Pérez"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                    <Input
                        label="Número de WhatsApp"
                        type="tel"
                        placeholder="351222333"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <Button type="submit" loading={loading} className="w-full">
                        Ingresar
                    </Button>
                </form>

                <div style={{ marginTop: '15px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                    <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#666', marginBottom: '10px' }}>
                        Simular perfiles (Modo Demo):
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => loginAsDemo('USER', { apnea: true, oxygen: false, rehab: false })}
                            style={{ fontSize: '0.75rem' }}
                        >
                            😴 Solo CPAP
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => loginAsDemo('USER', { apnea: false, oxygen: true, rehab: false })}
                            style={{ fontSize: '0.75rem' }}
                        >
                            🫁 Solo Oxígeno
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => loginAsDemo('USER', { apnea: false, oxygen: false, rehab: true })}
                            style={{ fontSize: '0.75rem' }}
                        >
                            🏃 Solo Rehab
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => loginAsDemo('USER', { apnea: true, oxygen: true, rehab: true })}
                            style={{ fontSize: '0.75rem', fontWeight: 'bold' }}
                        >
                            🌟 Todos
                        </Button>
                    </div>
                </div>

                <div className={css.adminLink}>
                    <small>¿Sos administrador? <a href="/login-admin">Ingresá acá</a></small>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
