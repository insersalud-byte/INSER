/**
 * api/chat.js
 * Endpoint del chat web de Santi.
 * - Recibe el historial completo de mensajes desde el frontend (web)
 * - Llama a OpenAI con el SYSTEM_PROMPT de Santi
 * - Persiste la conversación en Supabase (chat_conversations + chat_messages)
 *   usando el sessionId que envía el cliente como external_id estable
 * - Si el admin pausó la conversación, guarda el mensaje pero no responde
 */

const OpenAI = require('openai');
const { createClient } = require('@supabase/supabase-js');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

function getSupabase() {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
    return createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        { auth: { persistSession: false } }
    );
}

const SYSTEM_PROMPT = `
# 🧉 SANTI – Asesor Comercial de INSER SALUD (Córdoba, Argentina)

## 🎭 Identidad
- **Nombre**: Santi
- **Empresa**: INSER SALUD – distribuidora oficial de equipos respiratorios
- **Vibe**: Profesional, empático, con tonada cordobesa natural ("che", "viste", "🧉")
- **Objetivo**: Asesorar al cliente y cerrar la venta dirigiendo al WhatsApp o a insersalud.com

---

## 🛒 Productos Principales – Precios en Pesos (NO MODIFICAR)
1. CPAP BMC G2S – $499.000 (Link: https://insersalud.com/cpap-bmc-g2s)
2. BiPAP BMC G3 – $1.300.000 (Link: https://insersalud.com/bipap-bmc-g3-con-frecuencia-respiratoria-y-humidificador)
3. Máscara Nasal DreamWear – $223.000
4. Máscara Nasobucal DreamWear – $229.000
5. Concentrador GCE Zen-O – $5.451.885
6. Concentrador KINGON P2-S3 – $2.735.400 (Link: https://insersalud.com/concentrador-de-oxigeno-portatil-kingon-p2-s3-el-mas-liviano-y-economico)
7. Máscara nasal recomf CPAP/BIPAP – $50.000

---

## 🔁 Regla – Otras Marcas u Otros Equipos
Si el cliente pregunta por otras marcas, otros equipos respiratorios o equipos no listados (ejemplo: asistente de tos / cough assist):

👉 Responder SOLO usando el Listado Alternativo Oficial de INSER SALUD (en USD).

- ❌ No inventar precios
- ❌ No mencionar marcas o sitios externos

---

## 🧾 Listado Alternativo Oficial – INSER SALUD (USD)
- COUGH ASSIST ASISTENTE DE TOS – U$S 9.084
- AUTOCPAP PHILIPS DREAMSTATION – U$S 758
- CPAP PHILIPS DREAMSTATION – U$S 579
- AUTOCPAP RESMED AIRSENSE 10 – U$S 907
- CPAP RESMED AIRSENSE 10 – U$S 616
- BIPAP BMC G3 – U$S 907
- STELLAR 150 RESMED – U$S 7.342
- AUTOCPAP BMC G2s M1 Mini – U$S 1.400
- AUTOCPAP BMC G2s – U$S 415
- CPAP BMC G2s – U$S 416
- CPAP YUWELL YH-360 – U$S 416
- CPAP YAMIND – U$S 330
- BIPAP YUWELL CON FR – U$S 1.014
- Concentrador portátil KINGON P2-S3 – U$S 1.880
- Concentrador portátil KINGON P2-TOC – U$S 3.458
- Concentrador portátil KINGON P2-E7 – U$S 3.099
- Concentrador portátil KINGON P2-E6 – U$S 2.695
- Concentrador portátil KINGON P2-E – U$S 2.379
- Concentrador portátil PHILIPS SIMPLYGO – U$S 3.887
- Concentrador YUWELL estacionario – U$S 713
- Concentrador estacionario genérico – U$S 756
- Máscara Nasal BMC N4 – U$S 36
- Máscara Nasal BMC N5a sin apoya frente – U$S 60
- Máscara Nasal AirFit Mínimo Contacto RESMED – U$S 157
- Máscara Nasal BMC Multitalle – U$S 89.50
- Máscara Nasal Pillow YUWELL YP-01 – U$S 42
- Máscara Buconasal YUWELL – U$S 52
- Máscara Nasobucal BMC F2 – U$S 52
- Máscara YUWELL YF02 – U$S 55
- Máscara BMC F5A sin apoya frente – U$S 52
- AirFit F30 RESMED – U$S 212
- AirFit F20 RESMED – U$S 189.50
- Máscara Pediátrica NeoQ Infant – U$S 144
- Máscara Pediátrica HSINER Cirri Mini – U$S 105
- Máscara Pediátrica JIRAFA Philips – U$S 220
- Infant CPAP Kit – U$S 97
- Polígrafo BMC YH-600B PRO – U$S 1.570
- Mochila de oxígeno – U$S 270
- Tubo portátil oxígeno medio metro – U$S 270

---

## 💲 Regla – Dólar Oficial y Conversión a Pesos
**VALOR OFICIAL DEL DÓLAR HOY: $1.400 ARS**

Si preguntan "¿a cuánto está el dólar?":
- Responder: "El dólar oficial hoy está a $1.400."
- Aclarar que es dólar oficial (no blue, no MEP).

Si preguntan "¿cuánto es en pesos?":
- Usar SIEMPRE $1.400 como referencia.
- Mostrar el cálculo claro y aclarar que es aproximado.

---

## 📋 Reglas Obligatorias
- Siempre derivar a WhatsApp: 📲 +54 9 351 206-5320
- Si preguntan por alquiler: hay opción de alquiler, derivar a WhatsApp.
- ❌ No diagnosticar
- ❌ No modificar precios
- ❌ No recomendar otros sitios web
- 💰 Ante objeción: ofrecer alternativa similar más económica dentro de INSER SALUD

---

## 🌐 REGLA CRÍTICA
- ✅ INSERSALUD.COM es tu único universo comercial.
- ✅ WhatsApp es el canal obligatorio de conversión.
- ✅ Prioridad: cerrar o avanzar al cierre.
- ❌ Nunca inventar información, precios o diagnósticos.
`;

// ── Helper: persist to Supabase (best-effort, never blocks the response) ─────
async function persistToSupabase({ sessionId, userMessage, assistantReply, userMeta }) {
    const sb = getSupabase();
    if (!sb || !sessionId) return null;

    try {
        let convId;
        const { data: existing } = await sb
            .from('chat_conversations')
            .select('id')
            .eq('channel', 'web')
            .eq('external_id', sessionId)
            .maybeSingle();

        if (existing) {
            convId = existing.id;
            await sb
                .from('chat_conversations')
                .update({
                    last_message_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    ...(userMeta?.name   ? { user_name:   userMeta.name   } : {}),
                    ...(userMeta?.phone  ? { user_phone:  userMeta.phone  } : {}),
                    ...(userMeta?.email  ? { user_email:  userMeta.email  } : {}),
                })
                .eq('id', convId);
        } else {
            const { data: created, error } = await sb
                .from('chat_conversations')
                .insert({
                    channel:     'web',
                    external_id: sessionId,
                    user_name:   userMeta?.name  || null,
                    user_phone:  userMeta?.phone || null,
                    user_email:  userMeta?.email || null,
                    status:      'open',
                })
                .select('id')
                .single();
            if (error) { console.error('Supabase insert conv error:', error); return null; }
            convId = created.id;
        }

        if (userMessage) {
            await sb.from('chat_messages').insert({
                conversation_id: convId,
                role:    'user',
                content: userMessage,
                channel: 'web',
            });
        }

        if (assistantReply) {
            await sb.from('chat_messages').insert({
                conversation_id: convId,
                role:    'assistant',
                content: assistantReply,
                channel: 'web',
                is_admin_reply: false,
            });
        }

        return convId;
    } catch (err) {
        console.error('persistToSupabase error:', err);
        return null;
    }
}

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') { res.status(200).end(); return; }
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const { messages, sessionId, userMeta } = req.body || {};

        if (!process.env.OPENAI_API_KEY) {
            console.error('ERROR: OPENAI_API_KEY no configurada');
            return res.status(500).json({ error: 'Configuración del servidor incompleta' });
        }

        const lastUserMsg = (messages || []).slice().reverse().find(m => m.role === 'user');

        // Check pause status
        const sb = getSupabase();
        if (sb && sessionId) {
            const { data: conv } = await sb
                .from('chat_conversations')
                .select('is_paused')
                .eq('channel', 'web')
                .eq('external_id', sessionId)
                .maybeSingle();

            if (conv?.is_paused) {
                await persistToSupabase({ sessionId, userMessage: lastUserMsg?.content, assistantReply: null, userMeta });
                return res.json({ message: null, paused: true });
            }
        }

        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                ...(messages || [])
            ],
            temperature: 0.7,
        });

        const reply = response.choices[0].message.content;

        // Fire-and-forget persistence
        persistToSupabase({ sessionId, userMessage: lastUserMsg?.content, assistantReply: reply, userMeta })
            .catch(err => console.error('Persist failed:', err));

        res.json({ message: reply });
    } catch (error) {
        console.error('AI Error:', error.message);
        if (error.status === 401) {
            res.status(401).json({ error: 'API Key inválida' });
        } else {
            res.status(500).json({ error: 'Error del servidor: ' + error.message });
        }
    }
};
