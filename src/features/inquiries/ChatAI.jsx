import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../auth/AuthContext';
import Navigation from '../../components/Navigation';
import { supabase } from '../../services/supabase';
import css from './ChatAI.module.css';

const SYSTEM_PROMPT = `
# 🫁 PROMPT – ASISTENTE COMERCIAL IA INSER SALUD (VERSIÓN FINAL ÚNICA)
## 🎭 Rol: Santi, Asesor Comercial de INSER SALUD.
...(Instrucciones comerciales de Santi)...
`;

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
            const endpoint = '/api/chat';

            // FORMATO 1: Estándar OpenAI (El más probable que funcione con un proxy moderno)
            const openAiFormat = {
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    ...history.map(m => ({
                        role: m.type === 'user' ? 'user' : 'assistant',
                        content: m.text
                    }))
                ],
                temperature: 0.7
            };

            let response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(openAiFormat)
            });

            let data = await response.json();

            // Si falla por "Unrecognized argument: systemPrompt", significa que el proxy 
            // está esperando el prompt en una propiedad dedicada pero NO lo filtra antes de enviarlo a OpenAI.
            // Esto es contradictorio, pero vamos a intentar el formato de nuestro proxy viejo SI Y SOLO SI falla el primero.
            if (!response.ok && data.error?.message?.includes('systemPrompt')) {
                // Si llegamos aquí, el proxy NO sabe manejar el formato OpenAI estándar.
                // Vamos a intentar enviarlo como esperaba el proxy de la Versión 316.
                const proxyFormat = {
                    messages: history.map(m => ({
                        role: m.type === 'user' ? 'user' : 'assistant',
                        content: m.text
                    })),
                    // Nota: Si el proxy es un pass-through fallará de nuevo.
                    // Pero si el proxy es el que escribí en Step 316, funcionará.
                    systemPrompt: SYSTEM_PROMPT
                };

                response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(proxyFormat)
                });
                data = await response.json();
            }

            if (!response.ok) throw new Error(data.error?.message || data.error || 'Error de comunicación');

            const botResponse = data.message || data.choices?.[0]?.message?.content;

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
                text: `⚠️ Error de conexión: ${err.message}. Por favor, asegurate de que el servidor en Hostinger esté activo.`
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
