/**
 * api/messenger.js
 * Webhook para Facebook Messenger e Instagram
 * GET  → verificación de webhook (hub.challenge)
 * POST → recibe mensajes, llama a Santi, guarda en Supabase, responde vía Graph API
 */

const OpenAI = require('openai');
const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

// ── OpenAI (same key as api/chat.js) ──────────────────────────────────────────
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ── Supabase server-side client (service role — bypasses RLS) ─────────────────
function getSupabase() {
    return createClient(
        process.env.SUPABASE_URL || '',
        process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );
}

// ── Santi system prompt (same persona as api/chat.js) ─────────────────────────
const SYSTEM_PROMPT = `
# 🫁 PROMPT – ASISTENTE COMERCIAL IA INSER SALUD (VERSIÓN FINAL ÚNICA)

## 🎭 Rol (Persona de la IA)
Eres **Santi**, Asesor Comercial y Closer de Ventas de **INSER SALUD**, especializado en **apnea del sueño, oxigenoterapia domiciliaria, rehabilitación pulmonar y equipamiento médico respiratorio**.
Tu comunicación es **cálida, empática, profesional y orientada al cierre**, transmitiendo acompañamiento humano y confianza.

## 🎯 Objetivo
- Asesorar y **vender equipos de apnea y oxígeno**.
- Informar **precios claros** en pesos o dólares.
- **Cerrar ventas** o avanzar al cierre derivando a WhatsApp.
- **No perder ventas**, ofreciendo siempre alternativas similares más económicas.

## 🌐 REGLA CRÍTICA – FUENTE ÚNICA
- ✅ Siempre recomendar **exclusivamente INSERSALUD.COM**
- ❌ Nunca recomendar otros sitios web, tiendas, blogs o marketplaces.

## 🛒 Productos Principales – Precios en Pesos
1. CPAP BMC G2S – $499.000 (https://insersalud.com/cpap-bmc-g2s)
2. BiPAP BMC G3 – $1.300.000 (https://insersalud.com/bipap-bmc-g3-con-frecuencia-respiratoria-y-humidificador)
3. Máscara Nasal DreamWear – $223.000
4. Máscara Nasobucal DreamWear – $229.000
5. Concentrador GCE Zen-O – $5.451.885
6. Concentrador KINGON P2-S3 – $2.735.400 (https://insersalud.com/concentrador-de-oxigeno-portatil-kingon-p2-s3-el-mas-liviano-y-economico)
7. Máscara Nasal RESCOMF – $50.000

## 🧾 Listado Alternativo Oficial – INSER SALUD (USD)
- AUTOCPAP PHILIPS DREAMSTATION – U$S 758
- CPAP PHILIPS DREAMSTATION – U$S 579
- AUTOCPAP RESMED AIRSENSE 10 – U$S 907
- CPAP RESMED AIRSENSE 10 – U$S 616
- BIPAP BMC G3 – U$S 907
- STELLAR 150 RESMED – U$S 7.342
- COUGH ASSIST – U$S 9.084
- AUTOCPAP BMC G2s – U$S 415
- CPAP BMC G2s – U$S 416
- CPAP YUWELL YH-360 – U$S 416
- CPAP YAMIND – U$S 330
- BIPAP YUWELL con FR – U$S 1.014
- AUTOCPAP BMC G2S Mini con Almohadillas – U$S 1.400
- Concentrador portátil KINGON P2-S3 – U$S 1.880
- Concentrador portátil KINGON P2-TOC – U$S 3.458
- Concentrador portátil KINGON P2-E7 – U$S 3.099
- Concentrador portátil KINGON P2-E6 – U$S 2.695
- Concentrador portátil KINGON P2-E – U$S 2.379
- Concentrador portátil PHILIPS SIMPLYGO – U$S 3.887
- Concentrador YUWELL estacionario – U$S 713
- Concentrador estacionario genérico – U$S 756
- Máscara Nasal BMC N4 – U$S 36
- Máscara Nasal RESCOMF – U$S 35
- Máscara Nasal BMC N5a sin apoya frente – U$S 60
- Máscara Nasal AirFit Mínimo Contacto RESMED – U$S 157
- Máscara Nasal BMC Multitalle – U$S 89.50
- Máscara Nasal Pillow YUWELL YP-01 – U$S 42
- Máscara Nasobucal DreamWear Philips – U$S 157
- Máscara BMC F2 Nasobucal – U$S 52
- Máscara YUWELL Buconasal – U$S 52
- Máscara YUWELL YF02 sin apoya frente – U$S 55
- Máscara BMC F5A sin apoya frente – U$S 52
- AirFit F30 RESMED – U$S 212
- AirFit F20 RESMED – U$S 189.50
- Máscara Nasal Pediátrica NeoQ Infant – U$S 144
- Máscara Pediátrica HSINER Cirri Mini – U$S 105
- Máscara Pediátrica JIRAFA Philips – U$S 220
- Infant CPAP Kit – U$S 97
- Polígrafo BMC YH-600B PRO – U$S 1.570
- Mochila de oxígeno – U$S 270

## 💲 Conversión USD → Pesos
Si preguntan cuánto es en pesos: usar dólar oficial, mostrar cálculo aproximado, derivar a WhatsApp para valor exacto actualizado.

## 📋 Reglas Obligatorias
- Siempre derivar a WhatsApp: +54 9 351 206-5320
- Si preguntan por alquiler: hay opción, derivar a WhatsApp
- ❌ No diagnosticar | ❌ No modificar precios | ❌ No recomendar otros sitios
- 💰 Ante objeción: ofrecer alternativa más económica dentro de INSER SALUD

## 📝 Nota Final
Prioridad: **cerrar o avanzar al cierre**. WhatsApp es el canal obligatorio de conversión.
`;

// ── Helpers ───────────────────────────────────────────────────────────────────

function verifySignature(rawBody, signature) {
    if (!process.env.FB_APP_SECRET || !signature) return true; // skip in dev
    try {
        const expected = 'sha256=' + crypto
            .createHmac('sha256', process.env.FB_APP_SECRET)
            .update(rawBody)
            .digest('hex');
        // timingSafeEqual requires same length
        const a = Buffer.from(signature);
        const b = Buffer.from(expected);
        if (a.length !== b.length) return false;
        return crypto.timingSafeEqual(a, b);
    } catch {
        return false;
    }
}

async function callSanti(conversationMessages) {
    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...conversationMessages,
        ],
        temperature: 0.7,
        max_tokens: 600,
    });
    return response.choices[0].message.content;
}

async function sendFbMessage(recipientId, text, pageAccessToken) {
    const url = `https://graph.facebook.com/v19.0/me/messages?access_token=${pageAccessToken}`;
    // Facebook messages have a 2000-char limit
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
                message: { text: chunk },
            }),
        });
        const data = await resp.json();
        if (data.error) {
            console.error('FB send error:', data.error);
        }
    }
}

// ── Main handler ──────────────────────────────────────────────────────────────

module.exports = async (req, res) => {
    // ── GET: webhook verification ──────────────────────────────────────────────
    if (req.method === 'GET') {
        const mode      = req.query['hub.mode'];
        const token     = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];

        if (mode === 'subscribe' && token === process.env.FB_VERIFY_TOKEN) {
            console.log('Webhook verified ✓');
            return res.status(200).send(challenge);
        }
        console.warn('Webhook verification failed. token received:', token);
        return res.status(403).json({ error: 'Verification token mismatch' });
    }

    // ── POST: receive events ───────────────────────────────────────────────────
    if (req.method !== 'POST') return res.status(405).end();

    // Verify signature (uses raw body — Vercel passes it as Buffer when rawBody is true)
    const rawBody = req.rawBody || JSON.stringify(req.body);
    const signature = req.headers['x-hub-signature-256'];
    if (signature && !verifySignature(rawBody, signature)) {
        console.error('Invalid Facebook signature');
        return res.status(401).json({ error: 'Invalid signature' });
    }

    const body = req.body;

    // Accept Messenger (object: "page") and Instagram (object: "instagram")
    if (body.object !== 'page' && body.object !== 'instagram') {
        return res.status(200).json({ status: 'ignored' });
    }

    const channel = body.object === 'instagram' ? 'instagram' : 'messenger';
    const sb = getSupabase();

    // Always respond 200 quickly to Facebook before processing
    res.status(200).json({ status: 'ok' });

    // Process asynchronously (don't block the response)
    try {
        for (const entry of (body.entry || [])) {
            const pageId = entry.id;
            const messagingEvents = entry.messaging || [];

            for (const event of messagingEvents) {
                // Skip echos (messages sent by the page itself)
                if (!event.message || event.message.is_echo) continue;

                const senderId     = event.sender?.id;
                const messageText  = event.message?.text;
                const platformMsgId = event.message?.mid;

                if (!senderId || !messageText) continue;

                // 1. Get or create conversation ───────────────────────────────
                const { data: convId, error: rpcErr } = await sb.rpc(
                    'get_or_create_social_conversation',
                    {
                        p_sender_id:   senderId,
                        p_page_id:     pageId,
                        p_channel:     channel,
                        p_sender_name: null,
                    }
                );

                if (rpcErr || !convId) {
                    console.error('get_or_create_social_conversation error:', rpcErr);
                    continue;
                }

                // 2. Update last_message_at ────────────────────────────────────
                await sb
                    .from('chat_conversations')
                    .update({ last_message_at: new Date().toISOString() })
                    .eq('id', convId);

                // 3. Save incoming user message ────────────────────────────────
                await sb.from('chat_messages').insert({
                    conversation_id: convId,
                    role:            'user',
                    content:         messageText,
                    channel,
                    platform_msg_id: platformMsgId,
                });

                // 4. Check if admin paused this conversation ───────────────────
                const { data: conv } = await sb
                    .from('chat_conversations')
                    .select('is_paused')
                    .eq('id', convId)
                    .single();

                if (conv?.is_paused) {
                    // Admin is handling — Santi stays silent
                    continue;
                }

                // 5. Load recent conversation history for context ──────────────
                const { data: history } = await sb
                    .from('chat_messages')
                    .select('role, content')
                    .eq('conversation_id', convId)
                    .order('created_at', { ascending: true })
                    .limit(20);

                const conversationMessages = (history || []).map(m => ({
                    role:    m.role === 'user' ? 'user' : 'assistant',
                    content: m.content,
                }));

                // 6. Call Santi ────────────────────────────────────────────────
                const santiReply = await callSanti(conversationMessages);

                // 7. Save Santi's reply ────────────────────────────────────────
                await sb.from('chat_messages').insert({
                    conversation_id: convId,
                    role:            'assistant',
                    content:         santiReply,
                    channel,
                    is_admin_reply:  false,
                });

                // 8. Send via Facebook Graph API ───────────────────────────────
                const pageToken = process.env.FB_PAGE_ACCESS_TOKEN;
                if (pageToken) {
                    await sendFbMessage(senderId, santiReply, pageToken);
                } else {
                    console.warn('FB_PAGE_ACCESS_TOKEN not set — message not sent');
                }
            }
        }
    } catch (err) {
        console.error('Messenger webhook processing error:', err);
    }
};
