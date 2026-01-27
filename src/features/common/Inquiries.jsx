import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabase';
import { useAuth } from '../auth/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import css from '../common/TreatmentModules.module.css';

const Inquiries = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        setSending(true);
        try {
            const { error } = await supabase
                .from('inquiries')
                .insert({
                    user_id: user.id,
                    message: message,
                    status: 'NEW'
                });

            if (error) throw error;
            setSuccess(true);
            setMessage('');
        } catch (err) {
            console.error(err);
            alert("Error al enviar la consulta. Intentá por WhatsApp.");
        } finally {
            setSending(false);
        }
    };

    if (success) {
        return (
            <div className={css.container}>
                <div className={css.card} style={{ textAlign: 'center', padding: '3rem 1rem', marginTop: '4rem' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📩</div>
                    <h2>¡Consulta Enviada!</h2>
                    <p style={{ color: '#666', marginBottom: '2rem' }}>Recibimos tu mensaje. Un especialista te contactará a la brevedad.</p>
                    <Button onClick={() => navigate('/')} className="w-full">Volver al Inicio</Button>
                </div>
            </div>
        );
    }

    return (
        <div className={css.container}>
            <header className={css.header}>
                <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', padding: 0, color: 'var(--color-primary)', marginBottom: '1rem' }}>
                    ← Volver al inicio
                </button>
                <h1>Consultas 💬</h1>
                <p>Envianos tu duda y un especialista te responderá.</p>
            </header>

            <div className={css.card}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
                    <div style={{ fontSize: '2rem' }}>👨‍⚕️</div>
                    <div style={{ fontSize: '0.9rem', color: '#1e293b' }}>
                        Si tenés una <strong>urgencia médica</strong>, por favor llamá al servicio de emergencias o acudí a la guardia más cercana.
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Tu mensaje</label>
                        <textarea
                            style={{
                                width: '100%',
                                minHeight: '150px',
                                padding: '1rem',
                                borderRadius: '12px',
                                border: '1px solid #e2e8f0',
                                outline: 'none',
                                fontSize: '1rem',
                                fontFamily: 'inherit'
                            }}
                            placeholder="Escribí aquí tu consulta técnica o médica..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" loading={sending} className="w-full">
                        Enviar Consulta
                    </Button>
                </form>
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>¿Necesitás una respuesta inmediata?</p>
                <Button variant="whatsapp" onClick={() => window.open('https://wa.me/5493512065320')} className="w-full">
                    Chatear por WhatsApp ahora
                </Button>
            </div>
        </div>
    );
};

export default Inquiries;
