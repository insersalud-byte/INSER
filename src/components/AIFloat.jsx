import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import css from './AIFloat.module.css';

const AIFloat = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showTooltip, setShowTooltip] = useState(false);

    // Aparece en TODOS lados excepto en el chat mismo
    const shouldHide = location.pathname === '/chat-ai';

    useEffect(() => {
        if (!shouldHide) {
            const timer = setTimeout(() => setShowTooltip(true), 1500);
            return () => clearTimeout(timer);
        }
    }, [location.pathname]);

    if (shouldHide) return null;

    return (
        <div className={css.fabContainer} onClick={() => navigate('/chat-ai')}>
            <div className={css.speechBubble}>
                {showTooltip && (
                    <div className={css.tooltip}>
                        👋 Hola! Soy Santi. <br />
                        <strong>¿Qué necesitás hoy?</strong>
                    </div>
                )}
            </div>
            <div className={css.fabShadow}></div>
            <div className={css.avatarBtn}>
                <div className={css.onlineDot}></div>
                <img
                    src="/artifacts/santi_real.jpg"
                    alt="Santi IA"
                    onError={(e) => e.target.src = 'https://ui-avatars.com/api/?name=Santi+IA&background=1e40af&color=fff'}
                />
            </div>
        </div>
    );
};

export default AIFloat;
