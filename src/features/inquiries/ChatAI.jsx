import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../auth/AuthContext';
import Navigation from '../../components/Navigation';
import { supabase } from '../../services/supabase';
import css from './ChatAI.module.css';

const ChatAI = () => {
    const { profile } = useAuth();
    const [messages, setMessages] = useState([
        { id: 1, type: 'bot', text: `¡Hola! Soy Santi, asesor comercial de Inser Salud. 👋 ¿Estás buscando algún equipo o accesorio específico para tu tratamiento? Estoy aquí para ayudarte a elegir la mejor opción y pasarte nuestras ofertas vigentes.` }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [conversationId, setConversationId] = useState(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    // Inicializar conversación en BD
    useEffect(() => {
        const initConversation = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                const { data, error } = await supabase
                    .from('chat_conversations')
                    .insert([{
                        user_id: user?.id || null,
                        user_name: user?.email || 'Visitante',
                        started_at: new Date()
                    }])
                    .select()
                    .single();

                if (data) {
                    setConversationId(data.id);
                }
            } catch (error) {
                console.error('Error creando conversación:', error);
            }
        };
        initConversation();
    }, []);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const apiUrl = import.meta.env.VITE_API_URL || '';

        // 1. Agregar mensaje del usuario al chat visual
        const userMsg = { id: Date.now(), type: 'user', text: inputValue };
        setMessages(prev => [...prev, userMsg]);
        const currentMessages = [...messages, userMsg];
        setInputValue('');
        setIsTyping(true);

        // Guardar mensaje del usuario en BD (background)
        if (conversationId) {
            supabase.from('chat_messages').insert([{
                conversation_id: conversationId,
                role: 'user',
                content: userMsg.text
            }]).catch(e => console.error('Error guardando msg user:', e));
        }

        try {
            // 2. Determinar el endpoint.
            let endpoint = '/api/chat';
            if (apiUrl && !apiUrl.includes('localhost')) {
                endpoint = `${apiUrl}/api/chat`;
            } else if (!apiUrl && window.location.hostname === 'localhost') {
                endpoint = 'http://localhost:3000/api/chat';
            }

            const apiResponse = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: currentMessages.map(m => ({
                        role: m.type === 'user' ? 'user' : 'assistant',
                        content: m.text
                    }))
                })
            });

            const data = await apiResponse.json();

            if (!apiResponse.ok) {
                throw new Error(data.error || 'Error en el servidor de Santi');
            }

            const botResponse = data.message;

            // 3. Agregar respuesta de Santi al chat
            setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: botResponse }]);

            // Guardar respuesta del bot en BD (background)
            if (conversationId) {
                supabase.from('chat_messages').insert([{
                    conversation_id: conversationId,
                    role: 'bot',
                    content: botResponse
                }]).catch(e => console.error('Error guardando msg bot:', e));
            }

        } catch (err) {
            console.error("AI Error:", err);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                type: 'bot',
                text: `⚠️ Santi no pudo responder: ${err.message}`
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
