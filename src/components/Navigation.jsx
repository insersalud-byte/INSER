import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import css from './Navigation.module.css';

const Navigation = ({ showBack = true, showHome = true }) => {
    const navigate = useNavigate();

    return (
        <div className={css.navContainer}>
            {showBack && (
                <button
                    className={css.navBtn}
                    onClick={() => navigate(-1)}
                    title="Volver"
                >
                    <ArrowLeft size={20} />
                    <span>Volver</span>
                </button>
            )}
            <div className={css.spacer} />
            {showHome && (
                <button
                    className={css.navBtn}
                    onClick={() => navigate('/')}
                    title="Inicio"
                >
                    <Home size={20} />
                    <span>Inicio</span>
                </button>
            )}
        </div>
    );
};

export default Navigation;
