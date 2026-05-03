/**
 * SantiDashboard.jsx
 * Dashboard de conversaciones de Santi en tiempo real.
 * Permite ver conversaciones de todos los canales (Web, Messenger, Instagram),
 * leer historial de mensajes, responder manualmente e intervenir.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../../services/supabase';
import css from './SantiDashboard.module.css';

// ── Constants ─────────────────────────────────────────────────────────────────

const CHANNEL_TABS = [
    { key: 'all',       label: '🌐 Todos'      },
    { key: 'web',       label: '💻 Web'         },
    { key: 'messenger', label: '💬 Messenger'   },
    { key: 'instagram', label: '📸 Instagram'   },
    { key: 'whatsapp',  label: '📱 WhatsApp'    },
];

const CHANNEL_ICON = {
    web:       '💻',
    messenger: '💬',
    instagram: '📸',
    whatsapp:  '📱',
};

const STATUS_LABEL = {
    open:   { text: 'Abierta', color: '#10b981' },
    closed: { text: 'Cerrada', color: '#6b7280' },
    spam:   { text: 'Spam',    color: '#ef4444' },
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function SantiDashboard() {
    const [conversations, setConversations] = useState([]);
    const [selectedId, setSelectedId]       = useState(null);
    const [messages, setMessages]           = useState([]);
    const [channelFilter, setChannelFilter] = useState('all');
    const [replyText, setReplyText]         = useState('');
    const [sending, setSending]             = useState(false);
    const [loading, setLoading]             = useState(true);
    const [adminSecret, setAdminSecret]     = useState(() => localStorage.getItem('santi_admin_secret') || '');
    const [showSecretPrompt, setShowSecretPrompt] = useState(false);
    const messagesEndRef = useRef(null);

    const selectedConv = conversations.find(c => c.id === selectedId) || null;

    // ── Data loaders ──────────────────────────────────────────────────────────

    const loadConversations = useCallback(async () => {
        const { data, error } = await supabase
            .from('chat_conversations')
            .select('*')
            .order('last_message_at', { ascending: false })
            .limit(200);

        if (!error) setConversations(data || []);
        setLoading(false);
    }, []);

    const loadMessages = useCallback(async (convId) => {
        const { data } = await supabase
            .from('chat_messages')
            .select('*')
            .eq('conversation_id', convId)
            .order('created_at', { ascending: true });
        setMessages(data || []);
    }, []);

    // ── Initial load + real-time subscriptions ────────────────────────────────

    useEffect(() => {
        loadConversations();

        const channel = supabase
            .channel('santi-dashboard-rt')
            // Any change to conversations table
            .on('postgres_changes', {
                event:  '*',
                schema: 'public',
                table:  'chat_conversations',
            }, () => {
                loadConversations();
            })
            // New messages (for open conversation)
            .on('postgres_changes', {
                event:  'INSERT',
                schema: 'public',
                table:  'chat_messages',
            }, (payload) => {
                const msg = payload.new;
                setSelectedId(current => {
                    if (current && msg.conversation_id === current) {
                        setMessages(prev => {
                            // Avoid duplicates
                            if (prev.some(m => m.id === msg.id)) return prev;
                            return [...prev, msg];
                        });
                    }
                    return current;
                });
                loadConversations();
            })
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, [loadConversations]);

    // Reload messages when conversation changes
    useEffect(() => {
        if (selectedId) loadMessages(selectedId);
        else setMessages([]);
    }, [selectedId, loadMessages]);

    // Scroll to bottom when new message arrives
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // ── Actions ───────────────────────────────────────────────────────────────

    async function handleAdminReply() {
        if (!replyText.trim() || !selectedConv || sending) return;

        if (!adminSecret) {
            setShowSecretPrompt(true);
            return;
        }

        setSending(true);
        try {
            const resp = await fetch('/api/admin-reply', {
                method:  'POST',
                headers: {
                    'Content-Type':  'application/json',
                    'Authorization': `Bearer ${adminSecret}`,
                },
                body: JSON.stringify({
                    conversationId: selectedConv.id,
                    message:        replyText.trim(),
                }),
            });

            const data = await resp.json();

            if (!resp.ok) {
                if (resp.status === 401) {
                    alert('❌ ADMIN_SECRET incorrecto. Verificá la configuración.');
                    setShowSecretPrompt(true);
                } else {
                    alert('Error: ' + (data.error || 'Desconocido'));
                }
                return;
            }

            setReplyText('');
            // Message will arrive via real-time subscription, but also reload to be safe
            await loadMessages(selectedConv.id);
            await loadConversations();
        } catch (err) {
            alert('Error de red: ' + err.message);
        } finally {
            setSending(false);
        }
    }

    async function resumeSanti(convId) {
        await supabase
            .from('chat_conversations')
            .update({ is_paused: false })
            .eq('id', convId);
        await loadConversations();
    }

    async function changeStatus(convId, status) {
        await supabase
            .from('chat_conversations')
            .update({ status })
            .eq('id', convId);
        if (status === 'closed' || status === 'spam') {
            setSelectedId(null);
        }
        await loadConversations();
    }

    function saveAdminSecret(val) {
        setAdminSecret(val);
        localStorage.setItem('santi_admin_secret', val);
        setShowSecretPrompt(false);
    }

    // ── Derived data ──────────────────────────────────────────────────────────

    const filtered = channelFilter === 'all'
        ? conversations
        : conversations.filter(c => c.channel === channelFilter);

    const stats = {
        total:   conversations.length,
        open:    conversations.filter(c => c.status === 'open').length,
        paused:  conversations.filter(c => c.is_paused).length,
        today:   conversations.filter(c => {
            const d = new Date(c.last_message_at || c.started_at);
            return d.toDateString() === new Date().toDateString();
        }).length,
    };

    // Count per channel for tab badges
    const countFor = key => key === 'all'
        ? conversations.length
        : conversations.filter(c => c.channel === key).length;

    // ── Render ────────────────────────────────────────────────────────────────

    return (
        <div className={css.dashboard}>

            {/* ── Admin Secret Modal ── */}
            {showSecretPrompt && (
                <div className={css.secretOverlay}>
                    <div className={css.secretModal}>
                        <h3>🔐 Admin Secret</h3>
                        <p>Ingresá el valor de <code>ADMIN_SECRET</code> de tu entorno Vercel para poder enviar respuestas manuales.</p>
                        <input
                            type="password"
                            placeholder="Admin secret..."
                            defaultValue={adminSecret}
                            id="admin-secret-input"
                            autoFocus
                        />
                        <div className={css.secretActions}>
                            <button
                                className={css.btnPrimary}
                                onClick={() => {
                                    const val = document.getElementById('admin-secret-input').value;
                                    saveAdminSecret(val);
                                }}
                            >
                                Guardar
                            </button>
                            <button
                                className={css.btnSecondary}
                                onClick={() => setShowSecretPrompt(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Stats Bar ── */}
            <div className={css.statsBar}>
                <div className={css.statCard}>
                    <span className={css.statNum}>{stats.total}</span>
                    <span className={css.statLabel}>Total</span>
                </div>
                <div className={css.statCard}>
                    <span className={css.statNum} style={{ color: '#10b981' }}>{stats.open}</span>
                    <span className={css.statLabel}>Abiertas</span>
                </div>
                <div className={css.statCard}>
                    <span className={css.statNum} style={{ color: '#f59e0b' }}>{stats.paused}</span>
                    <span className={css.statLabel}>Pausadas</span>
                </div>
                <div className={css.statCard}>
                    <span className={css.statNum} style={{ color: '#3b82f6' }}>{stats.today}</span>
                    <span className={css.statLabel}>Hoy</span>
                </div>
                <div className={css.secretBtn}>
                    <button
                        className={css.btnGhost}
                        onClick={() => setShowSecretPrompt(true)}
                        title="Configurar Admin Secret"
                    >
                        🔐 {adminSecret ? 'Secret ✓' : 'Configurar secret'}
                    </button>
                </div>
            </div>

            {/* ── Channel Tabs ── */}
            <div className={css.tabs}>
                {CHANNEL_TABS.map(({ key, label }) => (
                    <button
                        key={key}
                        className={`${css.tab} ${channelFilter === key ? css.tabActive : ''}`}
                        onClick={() => setChannelFilter(key)}
                    >
                        {label}
                        <span className={css.tabBadge}>{countFor(key)}</span>
                    </button>
                ))}
            </div>

            {/* ── Main Split ── */}
            <div className={css.main}>

                {/* ── Conversation List ── */}
                <div className={css.convList}>
                    {loading && (
                        <div className={css.emptyState}>Cargando conversaciones...</div>
                    )}
                    {!loading && filtered.length === 0 && (
                        <div className={css.emptyState}>
                            No hay conversaciones en este canal.
                        </div>
                    )}
                    {filtered.map(conv => {
                        const isSelected = conv.id === selectedId;
                        const statusInfo = STATUS_LABEL[conv.status] || STATUS_LABEL.open;
                        return (
                            <div
                                key={conv.id}
                                className={[
                                    css.convItem,
                                    isSelected    ? css.convItemActive  : '',
                                    conv.is_paused ? css.convItemPaused  : '',
                                    conv.status === 'closed' ? css.convItemClosed : '',
                                ].join(' ')}
                                onClick={() => setSelectedId(conv.id)}
                            >
                                <div className={css.convItemTop}>
                                    <span className={css.convIcon}>
                                        {CHANNEL_ICON[conv.channel] || '💬'}
                                    </span>
                                    <span className={css.convName}>
                                        {conv.sender_name || conv.platform_sender_id || 'Usuario Web'}
                                    </span>
                                    <span
                                        className={css.convStatus}
                                        style={{ color: statusInfo.color }}
                                    >
                                        {conv.is_paused ? '⏸ Admin' : statusInfo.text}
                                    </span>
                                </div>
                                <div className={css.convTime}>
                                    {new Date(conv.last_message_at || conv.started_at)
                                        .toLocaleString('es-AR', {
                                            day: '2-digit', month: '2-digit',
                                            hour: '2-digit', minute: '2-digit',
                                        })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ── Chat Pane ── */}
                <div className={css.chatPane}>
                    {!selectedConv ? (
                        <div className={css.noneSelected}>
                            <span className={css.noneIcon}>👈</span>
                            <p>Seleccioná una conversación</p>
                        </div>
                    ) : (
                        <>
                            {/* Chat Header */}
                            <div className={css.chatHeader}>
                                <div className={css.chatHeaderInfo}>
                                    <strong>
                                        {selectedConv.sender_name || selectedConv.platform_sender_id || 'Usuario Web'}
                                    </strong>
                                    <span className={css.headerMeta}>
                                        {CHANNEL_ICON[selectedConv.channel]} {selectedConv.channel}
                                        {selectedConv.page_id && ` · page ${selectedConv.page_id}`}
                                    </span>
                                </div>
                                <div className={css.chatHeaderActions}>
                                    {selectedConv.is_paused ? (
                                        <button
                                            className={css.btnResume}
                                            onClick={() => resumeSanti(selectedConv.id)}
                                            title="Reactivar Santi para esta conversación"
                                        >
                                            🤖 Retomar Santi
                                        </button>
                                    ) : (
                                        <span className={css.santiActiveBadge}>🤖 Santi activo</span>
                                    )}
                                    {selectedConv.status === 'open' && (
                                        <button
                                            className={css.btnCloseConv}
                                            onClick={() => changeStatus(selectedConv.id, 'closed')}
                                        >
                                            ✕ Cerrar
                                        </button>
                                    )}
                                    {selectedConv.status === 'open' && (
                                        <button
                                            className={css.btnSpam}
                                            onClick={() => changeStatus(selectedConv.id, 'spam')}
                                        >
                                            🚫 Spam
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Messages */}
                            <div className={css.messagesList}>
                                {messages.length === 0 && (
                                    <div className={css.noMessages}>Sin mensajes aún.</div>
                                )}
                                {messages.map(msg => (
                                    <div
                                        key={msg.id}
                                        className={[
                                            css.msgRow,
                                            msg.role === 'user' ? css.msgUser : css.msgBot,
                                            msg.is_admin_reply   ? css.msgAdminReply : '',
                                        ].join(' ')}
                                    >
                                        <div className={css.msgBubble}>
                                            {msg.is_admin_reply && (
                                                <span className={css.adminTag}>Admin</span>
                                            )}
                                            <span className={css.msgContent}>{msg.content}</span>
                                            <span className={css.msgTime}>
                                                {new Date(msg.created_at).toLocaleTimeString('es-AR', {
                                                    hour: '2-digit', minute: '2-digit',
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Reply Area */}
                            <div className={css.replyArea}>
                                {selectedConv.is_paused && (
                                    <div className={css.pausedNote}>
                                        ⏸ Santi pausado — tus mensajes se envían directamente al usuario
                                    </div>
                                )}
                                {selectedConv.status !== 'closed' && selectedConv.status !== 'spam' ? (
                                    <div className={css.replyRow}>
                                        <textarea
                                            className={css.replyTextarea}
                                            placeholder={
                                                selectedConv.is_paused
                                                    ? 'Escribí tu respuesta manual...'
                                                    : 'Respuesta manual (pausará a Santi)...'
                                            }
                                            value={replyText}
                                            onChange={e => setReplyText(e.target.value)}
                                            onKeyDown={e => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleAdminReply();
                                                }
                                            }}
                                            rows={2}
                                            disabled={sending}
                                        />
                                        <button
                                            className={css.sendBtn}
                                            onClick={handleAdminReply}
                                            disabled={sending || !replyText.trim()}
                                        >
                                            {sending ? '⏳' : '➤ Enviar'}
                                        </button>
                                    </div>
                                ) : (
                                    <div className={css.closedNote}>
                                        Esta conversación está {selectedConv.status === 'spam' ? 'marcada como spam' : 'cerrada'}.
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
