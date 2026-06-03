import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';
import css from './ChatLogs.module.css';
import { format } from 'date-fns';
import { MessageSquare, User, Bot, RefreshCw, Calendar, ChevronRight, Search } from 'lucide-react';

const ChatLogs = () => {
    const [conversations, setConversations] = useState([]);
    const [selectedConvId, setSelectedConvId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchConversations();

        const sub = supabase
            .channel('public:chat_conversations')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_conversations' }, (payload) => {
                setConversations(prev => [payload.new, ...prev]);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(sub);
        };
    }, []);

    useEffect(() => {
        if (selectedConvId) {
            fetchMessages(selectedConvId);
        } else {
            setMessages([]);
        }
    }, [selectedConvId]);

    const fetchConversations = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('chat_conversations')
                .select('*')
                .order('last_message_at', { ascending: false })
                .limit(50);

            if (error) throw error;
            setConversations(data || []);
        } catch (error) {
            console.error('Error fetching conversations:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMessages = async (convId) => {
        try {
            const { data, error } = await supabase
                .from('chat_messages')
                .select('*')
                .eq('conversation_id', convId)
                .order('created_at', { ascending: true });

            if (error) throw error;
            setMessages(data || []);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const filteredConversations = conversations.filter(c =>
        (c.user_name || 'Anónimo').toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={css.container}>
            <div className={css.sidebar}>
                <div className={css.sidebarHeader}>
                    <div className={css.headerTop}>
                        <MessageSquare className={css.icon} size={20} />
                        <h2>Santi logs</h2>
                    </div>
                </div>

                <div className={css.searchContainer}>
                    <Search size={16} />
                    <input
                        type="text"
                        placeholder="Buscar chats..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className={css.conversationList}>
                    {loading && <div className={css.statusMsg}>Cargando...</div>}
                    {!loading && filteredConversations.length === 0 && (
                        <div className={css.statusMsg}>No hay chats.</div>
                    )}
                    {filteredConversations.map(conv => (
                        <div
                            key={conv.id}
                            className={`${css.conversationItem} ${selectedConvId === conv.id ? css.active : ''}`}
                            onClick={() => setSelectedConvId(conv.id)}
                        >
                            <div className={css.convHeader}>
                                <div className={css.userInfo}>
                                    <User size={14} />
                                    <span className={css.user}>{conv.user_name || 'Anónimo'}</span>
                                </div>
                                <span className={css.time}>
                                    {format(new Date(conv.last_message_at || conv.created_at), 'HH:mm')}
                                </span>
                            </div>
                            <div className={css.convMeta}>
                                <Calendar size={12} />
                                <span>{format(new Date(conv.last_message_at || conv.created_at), 'dd/MM/yyyy')}</span>
                            </div>
                            <ChevronRight size={14} className={css.arrow} />
                        </div>
                    ))}
                </div>
            </div>

            <div className={css.chatArea}>
                {selectedConvId ? (
                    <>
                        <div className={css.chatHeader}>
                            <div className={css.chatTitle}>
                                <h3>Conversación con {conversations.find(c => c.id === selectedConvId)?.user_name || 'Usuario'}</h3>
                                <small>ID: {selectedConvId}</small>
                            </div>
                            <button className={css.refreshBtn} onClick={() => fetchMessages(selectedConvId)}>
                                <RefreshCw size={16} />
                                Actualizar
                            </button>
                        </div>
                        <div className={css.messagesContainer}>
                            {messages.map(msg => (
                                <div key={msg.id} className={`${css.message} ${msg.role === 'user' ? css.userMessage : css.botMessage}`}>
                                    <div className={css.msgHeader}>
                                        {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                                        <strong>{msg.role === 'user' ? 'Usuario' : 'Santi'}</strong>
                                        <small>{format(new Date(msg.created_at), 'HH:mm')}</small>
                                    </div>
                                    <div className={css.msgContent}>{msg.content}</div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className={css.emptyState}>
                        <div className={css.emptyIcon}>💬</div>
                        <h3>Visor de Chats Santi</h3>
                        <p>Seleccioná una conversación para ver lo que hablaron.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatLogs;
