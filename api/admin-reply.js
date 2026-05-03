/**
 * api/admin-reply.js
 * Permite al admin enviar un mensaje manual desde el dashboard.
 * POST body: { conversationId, message }
 * Header:    Authorization: Bearer <ADMIN_SECRET>
 *
 * Efectos:
 *   - Guarda el mensaje con is_admin_reply = true
 *   - Marca la conversación como is_paused = true
 *   - Si el canal es messenger/instagram, reenvía vía Facebook Graph API
 */

const { createClient } = require('@supabase/supabase-js');

function getSupabase() {
    return createClient(
        process.env.SUPABASE_URL || '',
        process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );
}

async function sendFbMessage(recipientId, text, pageAccessToken) {
    const url = `https://graph.facebook.com/v19.0/me/messages?access_token=${pageAccessToken}`;
    const chunks = [];
    for (let i = 0; i < text.length; i += 1900) {
        chunks.push(text.slice(i, i + 1900));
    }
    for (const chunk of chunks) {
        const resp = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                recipient: { id: recipientId },
                message:   { text: chunk },
            }),
        });
        const data = await resp.json();
        if (data.error) console.error('FB send error:', data.error);
    }
}

module.exports = async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin',  '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST')    return res.status(405).json({ error: 'Method not allowed' });

    // ── Auth: Bearer ADMIN_SECRET ──────────────────────────────────────────────
    const adminSecret = process.env.ADMIN_SECRET || '';
    const authHeader  = req.headers.authorization || '';

    if (!adminSecret || authHeader !== `Bearer ${adminSecret}`) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { conversationId, message } = req.body || {};

    if (!conversationId || !message?.trim()) {
        return res.status(400).json({ error: 'conversationId and message are required' });
    }

    const sb = getSupabase();

    try {
        // 1. Fetch conversation ─────────────────────────────────────────────────
        const { data: conv, error: convErr } = await sb
            .from('chat_conversations')
            .select('channel, platform_sender_id, page_id, status')
            .eq('id', conversationId)
            .single();

        if (convErr || !conv) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        if (conv.status === 'closed') {
            return res.status(400).json({ error: 'Conversation is closed' });
        }

        // 2. Save admin message ────────────────────────────────────────────────
        const { error: insertErr } = await sb.from('chat_messages').insert({
            conversation_id: conversationId,
            role:            'assistant',
            content:         message.trim(),
            channel:         conv.channel,
            is_admin_reply:  true,
        });

        if (insertErr) throw insertErr;

        // 3. Pause conversation (admin took over) ──────────────────────────────
        await sb
            .from('chat_conversations')
            .update({
                is_paused:       true,
                last_message_at: new Date().toISOString(),
            })
            .eq('id', conversationId);

        // 4. Forward to Facebook / Instagram if social channel ─────────────────
        const isSocial = conv.channel === 'messenger' || conv.channel === 'instagram';

        if (isSocial && conv.platform_sender_id) {
            const pageToken = process.env.FB_PAGE_ACCESS_TOKEN;
            if (pageToken) {
                await sendFbMessage(conv.platform_sender_id, message.trim(), pageToken);
            } else {
                console.warn('FB_PAGE_ACCESS_TOKEN not set — message NOT sent to Facebook');
            }
        }

        return res.status(200).json({ status: 'sent', channel: conv.channel });
    } catch (err) {
        console.error('admin-reply error:', err);
        return res.status(500).json({ error: err.message || 'Internal server error' });
    }
};
