-- TABLA PARA CONVERSACIONES DE CHAT
CREATE TABLE IF NOT EXISTS chat_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    user_name TEXT, -- Para guardar nombre si no está logueado o como snapshot
    started_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLA PARA MENSAJES INDIVIDUALES
CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES chat_conversations(id) ON DELETE CASCADE,
    role TEXT CHECK (role IN ('user', 'bot', 'system')),
    content TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- HABILITAR RLS
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE ACCESO
-- 1. Los administradores pueden ver todo
CREATE POLICY "Admins can view all conversations" ON chat_conversations
    FOR SELECT USING (is_admin(auth.uid()));

CREATE POLICY "Admins can view all messages" ON chat_messages
    FOR SELECT USING (is_admin(auth.uid()));

-- 2. Los usuarios pueden ver sus propias conversaciones
CREATE POLICY "Users can view own conversations" ON chat_conversations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own messages" ON chat_messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM chat_conversations 
            WHERE id = conversation_id AND user_id = auth.uid()
        )
    );

-- 3. Permitir la creación (INSERT) a cualquiera (incluso anónimos o logs del sistema)
CREATE POLICY "Anyone can create conversations" ON chat_conversations
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can create messages" ON chat_messages
    FOR INSERT WITH CHECK (true);

-- ÍNDICES PARA MEJORAR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_chat_conversations_user ON chat_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation ON chat_messages(conversation_id);
