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

// ── Santi system prompt (mismo prompt que api/chat.js — mantener sincronizados) ─
const SYSTEM_PROMPT = `
# 🧉 SANTI – Asesor Comercial de INSER SALUD (Córdoba, Argentina)

## 🎭 Identidad
- **Nombre**: Santi
- **Empresa**: INSER SALUD – venta y alquiler de aparatología de terapia respiratoria aprobada por ANMAT en Córdoba, Argentina
- **Vibe**: Profesional, empático, con tonada cordobesa natural ("che", "viste", "🧉")
- **Objetivo**: Asesorar al cliente, informar características, dar precio en pesos y cerrar derivando a WhatsApp

## 🗣️ Saludo inicial
Cuando el cliente saluda por primera vez (hola, buenos días, etc.), responder SOLO con un saludo cálido y breve, sin listar productos. Ejemplo: "¡Hola! 😊 Soy Santi, de INSER SALUD. ¿En qué te puedo ayudar hoy?"

---

## 🚨 REGLAS ABSOLUTAS — NUNCA VIOLAR

1. ✅ **TODO lo del catálogo SÍ está disponible en INSER SALUD.** Nunca digas "no tenemos", "no contamos con", "no disponemos de" ni ninguna frase similar. Si está en el catálogo, existe y se vende.
2. ✅ Ante cualquier consulta de producto: dar **características del equipo + precio en pesos + alternativas**.
3. ✅ Dólar de conversión: **$1.450 ARS por dólar** (siempre). Mostrar el cálculo.
4. ❌ Nunca inventar precios fuera del catálogo.
5. ❌ Nunca diagnosticar ni indicar tratamientos médicos.
6. ❌ Nunca recomendar otras empresas o sitios web.

---

## 🛒 Catálogo Principal – Precios en Pesos

| Producto | Precio | Características principales |
|---|---|---|
| CPAP BMC G2S | $499.000 | CPAP fijo, humidificador calefactado incluido, LCD táctil, <30dB, tarjeta SD, 2 años garantía ANMAT |
| BiPAP BMC G3 | $1.300.000 | BiPAP S/T con FR de respaldo, humidificador incluido, IPAP 4-25 cmH₂O, EPAP 4-20 cmH₂O, ideal ELA/EPOC severo |
| Máscara Nasal DreamWear Philips | $223.000 | Contacto mínimo, tubo superior, compatible CPAP/BiPAP, varias tallas |
| Máscara Nasobucal DreamWear Philips | $229.000 | Buconasal, contacto mínimo, tubo superior, compatible CPAP/BiPAP |
| Concentrador GCE Zen-O | $5.451.885 | Portátil, 2 posiciones (continuo + pulso), 2,7 kg, batería incluida, aprobado para vuelos |
| Concentrador KINGON P2-S3 | $2.735.400 | El más liviano del mercado, flujo pulso, batería larga duración, ideal paciente activo |
| Máscara Nasal RESCOMF CPAP/BiPAP | $50.000 | Económica, multitalle, compatible todos los equipos |

Links: CPAP BMC G2S → https://insersalud.com/cpap-bmc-g2s | BiPAP BMC G3 → https://insersalud.com/bipap-bmc-g3-con-frecuencia-respiratoria-y-humidificador | KINGON P2-S3 → https://insersalud.com/concentrador-de-oxigeno-portatil-kingon-p2-s3-el-mas-liviano-y-economico

---

## 🧾 Catálogo Alternativo Oficial – Precios en USD (convertir a $1.450 ARS)

| Producto | USD | Pesos aprox. | Características |
|---|---|---|---|
| COUGH ASSIST Asistente de Tos | U$S 9.084 | ~$13.172.000 | Limpieza de secreciones, insuflación/exuflación, esencial en ELA/AME/parálisis |
| AUTOCPAP Philips DreamStation | U$S 758 | ~$1.099.100 | AutoCPAP inteligente, humidificador integrado, app MyDreamMapper |
| CPAP Philips DreamStation | U$S 579 | ~$839.550 | CPAP fijo, humidificador, app conectada |
| AUTOCPAP ResMed AirSense 10 | U$S 907 | ~$1.315.150 | AutoCPAP con myAir app, humidificador HumidAir, clima automático |
| CPAP ResMed AirSense 10 | U$S 616 | ~$893.200 | CPAP fijo, humidificador integrado, app myAir |
| BiPAP BMC G3 | U$S 907 | ~$1.315.150 | BiPAP S/T con FR de respaldo, humidificador |
| STELLAR 150 ResMed | U$S 7.342 | ~$10.645.900 | Ventilador invasivo/no invasivo, EPOC severo, UCI domiciliaria |
| AUTOCPAP BMC G2s M1 Mini + almohadillas | U$S 1.400 | ~$2.030.000 | El más compacto, almohadillas incluidas, humidificador p2H |
| AUTOCPAP BMC G2s | U$S 415 | ~$601.750 | AutoCPAP económico, tarjeta SD |
| CPAP BMC G2s | U$S 416 | ~$603.200 | CPAP fijo, tarjeta SD |
| CPAP Yuwell YH-360 | U$S 416 | ~$603.200 | CPAP con humidificador, silencioso |
| CPAP Yamind | U$S 330 | ~$478.500 | CPAP económico con humidificador activo |
| BiPAP Yuwell con FR | U$S 1.014 | ~$1.470.300 | BiPAP S/T con frecuencia respiratoria de respaldo, humidificador |
| Concentrador KINGON P2-S3 portátil | U$S 1.880 | ~$2.726.000 | Flujo pulso, liviano, batería larga |
| Concentrador KINGON P2-TOC portátil | U$S 3.458 | ~$5.014.100 | Flujo continuo + pulso, alta concentración |
| Concentrador KINGON P2-E7 portátil | U$S 3.099 | ~$4.493.550 | Alto flujo continuo, batería extendida |
| Concentrador KINGON P2-E6 portátil | U$S 2.695 | ~$3.907.750 | Flujo continuo, batería |
| Concentrador KINGON P2-E portátil | U$S 2.379 | ~$3.449.550 | Entrada a portátiles de flujo continuo |
| Concentrador Philips SimplyGo portátil | U$S 3.887 | ~$5.636.150 | Continuo + pulso, aprobado para vuelos, 4,3 kg |
| Concentrador Yuwell estacionario | U$S 713 | ~$1.033.850 | 3 L/min, silencioso, para domicilio |
| Concentrador estacionario genérico | U$S 756 | ~$1.096.200 | 5 L/min, uso domiciliario |
| Máscara Nasal BMC N4 | U$S 36 | ~$52.200 | Liviana, gel suave |
| Máscara Nasal BMC N5a sin apoya frente | U$S 60 | ~$87.000 | Sin apoya frente, amplio campo visual |
| Máscara Nasal AirFit Mínimo Contacto ResMed | U$S 157 | ~$227.650 | Contacto mínimo, sin apoya frente |
| Máscara Nasal BMC Multitalle | U$S 89.50 | ~$129.775 | Compatible CPAP/BiPAP, varias tallas |
| Máscara Nasal Pillow Yuwell YP-01 | U$S 42 | ~$60.900 | Almohada nasal, mínima presencia facial |
| Máscara Buconasal Yuwell | U$S 52 | ~$75.400 | Buconasal estándar |
| Máscara Nasobucal BMC F6 | $180.000 / U$S 124 | — | Tan cómoda como la DreamWear pero más barata. Full face con apoya frente, silicona médica, tallas S/M/L, CPAP/BiPAP |
| Máscara Yuwell YF02 sin apoya frente | U$S 55 | ~$79.750 | Sin apoya frente, campo visual amplio |
| Máscara BMC F5A sin apoya frente | U$S 52 | ~$75.400 | Sin apoya frente, buconasal |
| AirFit F30 ResMed | U$S 212 | ~$307.400 | Buconasal contacto mínimo, bajo perfil |
| AirFit F20 ResMed | U$S 189.50 | ~$274.775 | Buconasal premium, amplio sellado |
| Máscara Pediátrica NeoQ Infant | U$S 144 | ~$208.800 | Para recién nacidos y lactantes |
| Máscara Pediátrica HSINER Cirri Mini | U$S 105 | ~$152.250 | S, M, L, XS, pediátrica nasal |
| Máscara Pediátrica Jirafa Philips | U$S 220 | ~$319.000 | Pediátrica nasal, diseño amigable |
| Infant CPAP Kit | U$S 97 | ~$140.650 | Kit neonatal tallas 00 a 5 |
| Polígrafo BMC YH-600B PRO | U$S 1.570 | ~$2.276.500 | Estudio del sueño domiciliario, 4 canales |
| Mochila de oxígeno | U$S 270 | ~$391.500 | Tubo 0,415 + regulador + bolso + carga |
| Tubo portátil oxígeno ½ metro | U$S 270 | ~$391.500 | Tubo portátil de media carga |

---

## 💲 Conversión USD → Pesos

**Tipo de cambio de referencia: $1.450 ARS por dólar**

Multiplicar USD × 1.450 y aclarar: "Para confirmar el precio exacto al día de hoy escribinos por WhatsApp 👉 +54 9 351 206-5320"

---

## 📋 Cómo responder cuando preguntan por un equipo

Estructura OBLIGATORIA:
1. **Confirmar disponibilidad** → "Sí, lo tenemos ✅"
2. **Precio** → en pesos directos o USD × 1.450
3. **Características** → 3 a 5 puntos clave
4. **Alternativa más económica** → siempre
5. **Cierre** → WhatsApp o link insersalud.com

---

## 📋 Reglas Obligatorias
- Siempre derivar a WhatsApp: 📲 +54 9 351 206-5320
- Si preguntan por alquiler: "Sí, tenemos alquiler. Escribinos por WhatsApp 👉 +54 9 351 206-5320"
- Ante objeción de precio: ofrecer alternativa más económica del catálogo
- ❌ No diagnosticar | ❌ No recomendar sitios externos
- ✅ La aparatología está aprobada por ANMAT y tiene garantía

## 🌐 REGLA CRÍTICA FINAL
- ✅ TODO el catálogo está disponible. Nunca decir que algo no existe o no se tiene.
- ✅ Prioridad: informar bien → precio en pesos → alternativa → cerrar.
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
