import React, { useState } from 'react';
import Navigation from '../../components/Navigation';
import Button from '../../components/ui/Button';
import css from '../common/TreatmentModules.module.css';

const DailyExercises = () => {
    const [exercises] = useState([
        { id: 1, name: 'Respiración Labios Fruncidos', desc: 'Inhala por la nariz 2 seg, exhala suave 4 seg.', img: '🫁' },
        { id: 2, name: 'Caminata Estacionaria', desc: 'Marcha en el lugar levantando rodillas por 5 min.', img: '🏃' },
        { id: 3, name: 'Expansión Costal', desc: 'Lleva aire a los costados de tus costillas.', img: '↔️' }
    ]);

    return (
        <div className={css.container}>
            <Navigation />
            <header className={css.header}>
                <div className={css.headerImgContainer}>
                    <img src="/artifacts/medico_rehabilitacion_respiratoria_1769206103419.png" alt="Rehabilitación" className={css.headerImg} />
                </div>
                <h1>Mis Ejercicios 🏃</h1>
                <p>Tu rutina de hoy</p>
            </header>

            {exercises.map(ex => (
                <div key={ex.id} className={css.card} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ fontSize: '2.5rem', background: '#f8fafc', padding: '1rem', borderRadius: '12px' }}>{ex.img}</div>
                    <div style={{ flex: 1 }}>
                        <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{ex.name}</h4>
                        <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#666' }}>{ex.desc}</p>
                    </div>
                    <Button size="sm" variant="ghost">▶️</Button>
                </div>
            ))}

            <div className={css.tipCard} style={{ marginTop: '2rem' }}>
                <p>🌟 <strong>No te sobreexijas:</strong> Si sentís falta de aire intensa o mareos, detené el ejercicio y descansá.</p>
            </div>

            <div className={css.fixedBottom}>
                <Button className="w-full">Comenzar Rutina Completa</Button>
            </div>
        </div>
    );
};

export default DailyExercises;
