import React, { useState, useEffect, useRef } from 'react';
import { Send, X, MessageCircle, ExternalLink } from 'lucide-react';
import css from './AIFloat.module.css';

const QUICK_CHIPS = [
    'Quiero un CPAP',
    '¿Qué es la apnea del sueño?',
    'Ver precios de concentradores',
    'Quiero alquilar un equipo',
];

const INITIAL_MESSAGE = {
    id: 1,
    type: 'bot',
    text: '¡Hola! 😊 Soy Santi, de INSER SALUD. ¿En qué te puedo ayudar hoy?'
};

// Sesión persistente para tracking en Supabase
function getSessionId() {
    let id = localStorage.getItem('santi_session_id');
    if (!id) {
        id = 'web_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);
        localStorage.setItem('santi_session_id', id);
    }
    return id;
}

const AIFloat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [messages, setMessages] = useState([INITIAL_MESSAGE]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);
    const inputRef = useRef(null);
    const sessionId = useRef(getSessionId());

    // Tooltip aparece a los 2s
    useEffect(() => {
        const timer = setTimeout(() => setShowTooltip(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    // Auto-scroll inteligente:
    // · Usuario envía / Santi escribiendo → scroll al fondo (ver indicador)
    // · Santi responde → scroll al INICIO de su respuesta (leer de arriba hacia abajo)
    useEffect(() => {
        if (!scrollRef.current) return;
        if (isTyping) {
            // Mostrar indicador de escritura
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            return;
        }
        const lastMsg = messages[messages.length - 1];
        if (lastMsg?.type === 'bot' && messages.length > 1) {
            // Ir al inicio del último mensaje de Santi
            const botBubbles = scrollRef.current.querySelectorAll('[data-msg-type="bot"]');
            const lastBubble = botBubbles[botBubbles.length - 1];
            if (lastBubble) {
                lastBubble.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    // Focus input cuando se abre
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Escuchar CustomEvent desde LandingPage para abrir con mensaje pre-cargado
    useEffect(() => {
        const handler = (e) => {
            const msg = e.detail?.message;
            setIsOpen(true);
            setShowTooltip(false);
            if (msg) {
                sendMessage(msg);
            }
        };
        window.addEventListener('open-santi', handler);
        return () => window.removeEventListener('open-santi', handler);
    }, [messages]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleOpen = () => {
        setIsOpen(true);
        setShowTooltip(false);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const sendMessage = async (text) => {
        const trimmed = text?.trim() || inputValue.trim();
        if (!trimmed) return;

        const userMsg = { id: Date.now(), type: 'user', text: trimmed };
        const updatedMessages = [...messages, userMsg];
        setMessages(updatedMessages);
        setInputValue('');
        setIsTyping(true);

        try {
            const API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_VERCEL_API_URL || '/api/chat';
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId: sessionId.current,
                    messages: updatedMessages.map(m => ({
                        role: m.type === 'user' ? 'user' : 'assistant',
                        content: m.text
                    }))
                })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Error de comunicación');

            setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: data.message }]);
        } catch (err) {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                type: 'bot',
                text: '⚠️ Tuve un problema de conexión. Podés escribirme directo por WhatsApp 👉 +54 9 351 206-5320'
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleSend = () => sendMessage(inputValue);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const showChips = messages.length === 1;

    return (
        <>
            {/* Chat Popup */}
            {isOpen && (
                <div className={css.chatPanel}>
                    {/* Header */}
                    <div className={css.chatHeader}>
                        <div className={css.headerInfo}>
                            <div className={css.headerAvatar}>
                                <img
                                    src="/artifacts/santi_real.jpg"
                                    alt="Santi"
                                    onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Santi&background=1e40af&color=fff'; }}
                                />
                                <span className={css.onlineDotHeader}></span>
                            </div>
                            <div>
                                <strong>Santi</strong>
                                <span>Asesor Inser Salud · En línea</span>
                            </div>
                        </div>
                        <div className={css.headerActions}>
                            <a
                                href="https://wa.me/5493512065320"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={css.waLink}
                                title="Abrir en WhatsApp"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ExternalLink size={16} />
                            </a>
                            <button className={css.closeBtn} onClick={handleClose}>
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className={css.messagesList} ref={scrollRef}>
                        {messages.map(msg => (
                            <div key={msg.id} className={`${css.message} ${css[msg.type]}`} data-msg-type={msg.type}>
                                {msg.type === 'bot' && (
                                    <img
                                        src="/artifacts/santi_real.jpg"
                                        className={css.botAvatar}
                                        alt="Santi"
                                        onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=S&background=1e40af&color=fff'; }}
                                    />
                                )}
                                <div className={css.bubble}>{msg.text}</div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className={`${css.message} ${css.bot}`}>
                                <img src="/artifacts/santi_real.jpg" className={css.botAvatar} alt="Santi" onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=S&background=1e40af&color=fff'; }} />
                                <div className={`${css.bubble} ${css.typingBubble}`}>
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        )}

                        {/* Quick chips (solo al inicio) */}
                        {showChips && !isTyping && (
                            <div className={css.chips}>
                                {QUICK_CHIPS.map((chip, i) => (
                                    <button key={i} className={css.chip} onClick={() => sendMessage(chip)}>
                                        {chip}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className={css.inputArea}>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Escribí tu consulta..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isTyping}
                        />
                        <button
                            className={css.sendBtn}
                            onClick={handleSend}
                            disabled={isTyping || !inputValue.trim()}
                        >
                            <Send size={18} />
                        </button>
                    </div>

                    <div className={css.chatFooter}>
                        <MessageCircle size={12} />
                        <span>Powered by Inser Salud AI</span>
                    </div>
                </div>
            )}

            {/* FAB Button */}
            <div className={css.fabContainer} onClick={handleOpen}>
                {showTooltip && !isOpen && (
                    <div className={css.tooltip}>
                        <span>👋 ¡Hola!</span>
                        <strong>¿Te ayudo a elegir tu equipo?</strong>
                    </div>
                )}
                <div className={css.fabShadow}></div>
                <div className={css.avatarBtn}>
                    <span className={css.onlineDot}></span>
                    <img
                        src="/artifacts/santi_real.jpg"
                        alt="Santi IA"
                        onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Santi+IA&background=1e40af&color=fff'; }}
                    />
                </div>
            </div>
        </>
    );
};

export default AIFloat;
