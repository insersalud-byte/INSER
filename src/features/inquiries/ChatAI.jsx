import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../auth/AuthContext';
import Navigation from '../../components/Navigation';
import { supabase } from '../../services/supabase';
import css from './ChatAI.module.css';

const SYSTEM_PROMPT = `(Prompt simplificado para el frontend - el completo está en el servidor)`;

const ChatAI = () => {
    const [messages, setMessages] = useState([
        { id: 1, type: 'bot', text: `¡Hola! Soy Santi, asesor comercial de Inser Salud. 👋 ¿Estás buscando algún equipo o accesorio específico para tu tratamiento? Estoy aquí para ayudarte a elegir la mejor opción y pasarte nuestras ofertas vigentes.` }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [conversationId, setConversationId] = useState(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages, isTyping]);

    useEffect(() => {
        const initConversation = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                const { data } = await supabase.from('chat_conversations').insert([{
                    user_id: user?.id || null,
                    user_name: user?.email || 'Visitante',
                    started_at: new Date()
                }]).select().single();
                if (data) setConversationId(data.id);
            } catch (error) { console.error('Error init:', error); }
        };
        initConversation();
    }, []);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMsg = { id: Date.now(), type: 'user', text: inputValue };
        setMessages(prev => [...prev, userMsg]);
        const history = [...messages, userMsg];
        setInputValue('');
        setIsTyping(true);

        // Guardar mensaje en Supabase
        if (conversationId) {
            supabase.from('chat_messages').insert([{
                conversation_id: conversationId,
                role: 'user',
                content: userMsg.text
            }]).catch(e => { });
        }

        try {
            // Buscamos la URL de la API: 1. VITE_API_URL, 2. VITE_VERCEL_API_URL, 3. Relativo /api/chat
            const API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_VERCEL_API_URL || '/api/chat';

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: history.map(m => ({
                        role: m.type === 'user' ? 'user' : 'assistant',
                        content: m.text
                    }))
                })
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || 'Error de comunicación');

            const botResponse = data.message;

            setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: botResponse }]);

            if (conversationId) {
                supabase.from('chat_messages').insert([{
                    conversation_id: conversationId,
                    role: 'bot',
                    content: botResponse
                }]).catch(e => { });
            }

        } catch (err) {
            console.error("Santi Error:", err);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                type: 'bot',
                text: `⚠️ Error de conexión: ${err.message}. Por favor, intenta de nuevo.`
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className={css.chatContainer}>
            <Navigation />
            <header className={css.chatHeader}>
                <div className={css.avatarContainer}>
                    <img src="/artifacts/santi_real.jpg" alt="Santi" className={css.avatar} onError={(e) => e.target.src = 'https://ui-avatars.com/api/?name=Santi+IA&background=0ea5e9&color=fff'} />
                    <div className={css.onlineStatus}></div>
                </div>
                <div className={css.headerInfo}>
                    <h3>Santi - Inser AI</h3>
                    <span>En línea</span>
                </div>
            </header>
            <div className={css.messagesList} ref={scrollRef}>
                {messages.map(msg => (
                    <div key={msg.id} className={`${css.message} ${css[msg.type]}`}>{msg.text}</div>
                ))}
                {isTyping && <div className={css.typing}>Santi está pensando...</div>}
            </div>
            <div className={css.inputArea}>
                <input type="text" placeholder="Escribí tu mensaje..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} />
                <button className={css.sendBtn} onClick={handleSend}>🚀</button>
            </div>
        </div>
    );
};

export default ChatAI;
