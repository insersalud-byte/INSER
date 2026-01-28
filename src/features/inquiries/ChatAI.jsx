import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import Navigation from '../../components/Navigation';
import css from './ChatAI.module.css';

import OpenAI from 'openai';

// Configuración de OpenAI (usando la llave configurada en Hostinger/Vite)
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
console.log("Santi Debug - Key exists:", !!API_KEY);

const openai = new OpenAI({
    apiKey: API_KEY,
    dangerouslyAllowBrowser: true
});

const ChatAI = () => {
    const navigate = useNavigate();
    const { profile } = useAuth();
    const [messages, setMessages] = useState([
        { id: 1, type: 'bot', text: `¡Hola! Soy Santi, asesor comercial de Inser Salud. 👋 ¿Estás buscando algún equipo o accesorio específico para tu tratamiento? Estoy aquí para ayudarte a elegir la mejor opción y pasarte nuestras ofertas vigentes.` }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const SYSTEM_PROMPT = `
ASISTENTE: Santi, Asesor Comercial / Closer de Ventas de INSER SALUD.
OBJETIVO: Vender equipos de apnea y oxigeno, pasar precios y derivar a WhatsApp para cerrar.

PRODUCTOS Y PRECIOS:
1) CPAP Yuwind / BMC G2S: $499.000. Link: https://insersalud.com/cpap-bmc-g2s1
2) BiPAP BMC G3: $1.300.000. Link: https://insersalud.com/bipap-bmc-g2-con-frecuencia-respiratoria-y-humidificador
3) Máscara Nasal DreamWear: $223.000. Link: https://insersalud.com/mascarilla-nasal-cpap
4) Máscara Nasobucal DreamWear: $229.000. Link: https://insersalud.com/mascarilla-nasobucal-dreamwear-philips-cpap
5) GCE Zen-O: $5.451.885.
6) KINGON P2-S3: $2.735.400.

REGLAS:
- Siempre mencionar que debajo de la ficha técnica hay más marcas/modelos.
- Derivar a WhatsApp para asesoramiento personalizado (Número: +54 9 351 206-5320).
- Ser cálido, profesional y humanizado.
- Si preguntan por alquiler, ofrecer la opción y derivar a WhatsApp.
`;

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMsg = { id: Date.now(), type: 'user', text: inputValue };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    ...messages.map(m => ({
                        role: m.type === 'user' ? 'user' : 'assistant',
                        content: m.text
                    })),
                    { role: "user", content: userMsg.text }
                ],
                temperature: 0.7,
            });

            const botResponse = response.choices[0].message.content;
            setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: botResponse }]);
        } catch (err) {
            console.error("AI Error:", err);
            setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: "Lo siento, tuve un pequeño problema de conexión. ¿Podrías repetirme eso?" }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className={css.chatContainer}>
            <Navigation />
            <header className={css.chatHeader}>
                <div className={css.avatarContainer}>
                    <img
                        src="/artifacts/santi_real.jpg"
                        alt="Asistente IA"
                        className={css.avatar}
                        onError={(e) => e.target.src = 'https://ui-avatars.com/api/?name=Santi+IA&background=0ea5e9&color=fff'}
                    />
                    <div className={css.onlineStatus}></div>
                </div>
                <div className={css.headerInfo}>
                    <h3>Santi - Inser AI</h3>
                    <span>En línea</span>
                </div>
            </header>

            <div className={css.messagesList} ref={scrollRef}>
                {messages.map(msg => (
                    <div key={msg.id} className={`${css.message} ${css[msg.type]}`}>
                        {msg.text}
                    </div>
                ))}
                {isTyping && <div className={css.typing}>Santi está escribiendo...</div>}
            </div>

            <div className={css.inputArea}>
                <input
                    type="text"
                    placeholder="Escribí tu duda aquí..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button className={css.sendBtn} onClick={handleSend}>
                    🚀
                </button>
            </div>
        </div>
    );
};

export default ChatAI;
