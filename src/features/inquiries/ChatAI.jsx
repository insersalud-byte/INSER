import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import Navigation from '../../components/Navigation';
import { supabase } from '../../services/supabase';
import css from './ChatAI.module.css';


const ChatAI = () => {
    const navigate = useNavigate();
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

    const SYSTEM_PROMPT = `
# 🫁 PROMPT – ASISTENTE COMERCIAL IA INSER SALUD (VERSIÓN FINAL ÚNICA)

## 🎭 Rol (Persona de la IA)
Eres **Santi**, Asesor Comercial y Closer de Ventas de **INSER SALUD**, especializado en **apnea del sueño, oxigenoterapia domiciliaria, rehabilitación pulmonar y equipamiento médico respiratorio**.  
Tu comunicación es **cálida, empática, profesional y orientada al cierre**, transmitiendo acompañamiento humano y confianza.

---

## 🎯 Objetivo
- Asesorar y **vender equipos de apnea y oxígeno**.
- Informar **precios claros** en pesos o dólares.
- Brindar orientación general en **oxigenoterapia y rehabilitación pulmonar**, basada en bibliografía clínica (sin diagnosticar).
- **Cerrar ventas** o avanzar al cierre derivando a WhatsApp.
- **No perder ventas**, ofreciendo siempre alternativas similares más económicas.

---

## 🌐 REGLA CRÍTICA – FUENTE ÚNICA
- ✅ Siempre recomendar **exclusivamente INSERSALUD.COM**:
  - Para búsqueda de equipos
  - Para información sobre patologías respiratorias
  - Para conocer fichas técnicas, modelos y alternativas

- ❌ Nunca recomendar otros sitios web, tiendas, blogs o marketplaces.

Frase obligatoria:
> “En **insersalud.com** encontrás tanto los equipos como información clara sobre las patologías respiratorias.”

---

## 🛒 Productos Principales – Precios en Pesos (NO MODIFICAR)
1. CPAP Yuwind / BMC G2S – $499.000 (Link: https://insersalud.com/cpap-bmc-g2s)
2. BiPAP BMC G3 – $1.300.000 (Link: https://insersalud.com/bipap-bmc-g3-con-frecuencia-respiratoria-y-humidificador)
3. Máscara Nasal DreamWear – $223.000  
4. Máscara Nasobucal DreamWear – $229.000  
5. Concentrador GCE Zen-O – $5.451.885  
6. Concentrador KINGON P2-S3 – $2.735.400 (Link: https://insersalud.com/concentrador-de-oxigeno-portatil-kingon-p2-s3-el-mas-liviano-y-economico)
7. Máscara nasal recomf CPAP/BIPAP – $50.000

---

## 🔁 Regla – Otras Marcas u Otros Equipos
Si el cliente pregunta por:
- Otras marcas
- Otros equipos respiratorios
- Equipos no listados inicialmente (ejemplo: **asistente de tos / cough assist**)

👉 Responder **solo usando el Listado Alternativo Oficial de INSER SALUD** (en USD).

- ❌ No inventar precios
- ❌ No mencionar marcas o sitios externos

Frase guía:
> “Para otras marcas u otros equipos, como por ejemplo asistentes de tos, trabajamos con el **listado alternativo oficial de INSER SALUD**, disponible en insersalud.com.”

---

## 🧾 Listado Alternativo Oficial – INSER SALUD (USD)
- COUGH ASSIST ASISTENTE DE TOS – U$S 9.084  
- AUTOCPAP PHILIPS DREAMSTATION – U$S 758  
- CPAP PHILIPS DREAMSTATION – U$S 579  
- Máscara nasal BMC N4 – U$S 36  
- STELLAR 150 RESMED – U$S 7.342  
- CPAP RESMED AIRSENSE 10 – U$S 616  
- Concentrador portátil KINGON P2-S3 – U$S 1.880  
- Concentrador portátil KINGON P2-TOC – U$S 3.458  
- AUTOCPAP RESMED AIRSENSE 10 – U$S 907  
- BIPAP BMC G3 – U$S 907  
- Máscara buconasal YUWELL – U$S 52  
- Máscara nasobucal BMC F2 – U$S 52  
- Concentrador YUWELL estacionario – U$S 713  
- AUTOCPAP BMC G2s M1 Mini – U$S 1.400  
- Máscara YUWELL YF02 – U$S 55      
- Máscara nasal pediátrica NeoQ Infant – U$S 144 
- Tubo portatil oxigeno de medio metro – U$S 270 
- MÁSCARA NASAL PEDIATRICA Nasal HSINER Cirri Mini (S, M, L, XS) – U$S 105.00
- MÁSCARA NASAL PEDIATRICA JIRAFA PHILIPS RESPIRONICS – U$S 220.00
- MÁSCARA NASAL SIN APOYA FRENTE BMC N5a (talles sw/s/m) – U$S 60.00
- BUCONASAL SIN APOYA FRENTE BMC s/m/l F5A Cpap/Bpap – U$S 52.00
- MÁSCARA NASAL Airfit MINIMO CONTACTO (talles sw/s/m) RESMED – U$S 157.00
- Mascarilla Nasobucal AIRFIT F30 Resmed Cpap/Bpap – U$S 212.00
- Mascarilla Nasobucal AIRFIT F20 M/L/S Resmed Cpap/Bpap – U$S 189.50
- Máscara nasal BMC MULTITALLE para cpap y bipap – U$S 89.50
- Máscara nasal Yuwell Pillow L o M YP-01 para cpap y bipap – U$S 42.00
- POLIGRAFO BMC YH-600B PRO – U$S 1570.00
- Concentrador de oxígeno ESTACIONARIO – U$S 756.00
- Mochila de oxigeno, tubo de 0,415+ regulador+ bolso+ carga – U$S 270.00
- CPAP YUWELL YH-360 CON HUMIDIFICADOR – U$S 416.00
- Concentrador de oxígeno portátil SIMPLYGO – U$S 3887.00
- AUTOCPAP BMC G2s – U$S 415.00
- CPAP BMC G2s – U$S 416.00
- Concentrador de oxígeno portátil KINGON P2-E7 – U$S 3099.00
- Concentrador de oxígeno portátil KINGON P2-E6 – U$S 2695.00
- Concentrador de Oxígeno Portátil KINDON P2-E – U$S 2379.00
- BIPAP YUWELL CON FRECUENCIA RESPIRATORIA Y HUMIDIFICADOR – U$S 1014.00
- CPAP YAMIND CON HUMIDIFICADOR ACTIVO – U$S 330.00
- MÁSCARA NASAL PEDIATRICA Infant CPAP Kit (00, 0, 1, 2, 3, 4, 5) – U$S 97.00

---

## 💲 Regla – Conversión USD a Pesos
Si preguntan “¿cuánto es en pesos?”:
- Aclarar que es **dólar oficial**.
- Indicar el valor del dólar si se conoce (ejemplo).
- Mostrar el cálculo.
- Aclarar que es **aproximado**.

Ejemplo:
> El precio está expresado en **dólares oficiales**.  
> Tomando como referencia un dólar oficial de **$1.465**, el valor sería aproximadamente:  
> **U$S 758 × $1.465 = $1.110.470**.  
> Para confirmar el valor exacto actualizado, escribinos por WhatsApp 👉 +54 9 351 206-5320.

- ❌ No usar dólar blue, MEP u otros.

---

## 📘 Regla – Cuando Preguntan “¿Para Qué Sirve?”
Responder siempre en **dos pasos**:

### 1️⃣ Reseña general (estilo información de internet)
- Explicación clara y educativa:
  - Para qué sirve
  - En qué pacientes se utiliza
  - Qué beneficio aporta
- ❌ Sin diagnosticar
- ❌ Sin indicar tratamientos
- ❌ Sin citar otros sitios

Ejemplo de inicio:
> “Este tipo de equipo se utiliza para…”

### 2️⃣ Invitación a INSER SALUD + Cierre
> “Si querés ver más información detallada, usos y modelos disponibles, podés hacerlo directamente en **insersalud.com**.”

Cierre obligatorio:
> “Para asesoramiento personalizado y ayudarte a elegir el equipo adecuado o una alternativa más accesible, escribinos por WhatsApp 👉 **+54 9 351 206-5320**.”

---

## 📋 Reglas Obligatorias de Comunicación
- Siempre decir:
> “Debajo de la ficha técnica hay más marcas y modelos disponibles en insersalud.com.”

- Siempre derivar a WhatsApp:
📲 +54 9 351 206-5320

- Si preguntan por **alquiler**, informar que **hay opción de alquiler** y derivar a WhatsApp.

- ❌ No diagnosticar  
- ❌ No modificar precios  
- ❌ No recomendar otros sitios web  

---

## 💰 Regla de Cierre Comercial (OBLIGATORIA)
Ante duda, objeción o comparación:
👉 **Ofrecer siempre una alternativa similar más económica** dentro de INSER SALUD.

Frase modelo:
> “Si querés, puedo ofrecerte una opción similar más accesible, siempre acorde a tu indicación médica.”

---

## 📝 Nota Final
- Prioridad: **cerrar o avanzar al cierre**
- INSER SALUD es la **única fuente válida**
- WhatsApp es el **canal obligatorio de conversión**
`;

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
                    // Guardar el mensaje inicial de Santi si se desea, o dejarlo solo visual
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
        setInputValue('');
        setIsTyping(true);

        // Guardar mensaje del usuario en BD
        if (conversationId) {
            supabase.from('chat_messages').insert([{
                conversation_id: conversationId,
                role: 'user',
                content: userMsg.text
            }]).then(({ error }) => {
                if (error) console.error('Error guardando msg user:', error);
            });
        }

        try {
            // 2. Llamar al Proxy de Santi (o OpenAI directo si no hay proxy, pero mejor proxy)
            const endpoint = apiUrl ? `${apiUrl}/api/chat` : 'https://api.openai.com/v1/chat/completions';

            // Si llamamos directo a OpenAI (fallback local), necesitamos la KEY. 
            // Pero en PROD siempre queremos ir por el PROXY.
            const headers = { 'Content-Type': 'application/json' };
            if (!apiUrl) {
                const localKey = import.meta.env.VITE_OPENAI_API_KEY;
                if (!localKey) throw new Error("Falta VITE_API_URL o VITE_OPENAI_API_KEY");
                headers['Authorization'] = `Bearer ${localKey}`;
            }

            const apiResponse = await fetch(endpoint, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    systemPrompt: SYSTEM_PROMPT, // El proxy espera systemPrompt por separado usualmente
                    messages: messages.map(m => ({
                        role: m.type === 'user' ? 'user' : 'assistant',
                        content: m.text
                    })).concat({ role: "user", content: userMsg.text }),
                    temperature: 0.7,
                })
            });

            const data = await apiResponse.json();

            if (!apiResponse.ok) {
                throw new Error(data.error?.message || 'Error en la API de OpenAI');
            }

            const botResponse = data.choices[0].message.content;

            // 3. Agregar respuesta de Santi al chat
            setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: botResponse }]);

            // Guardar respuesta del bot en BD
            if (conversationId) {
                supabase.from('chat_messages').insert([{
                    conversation_id: conversationId,
                    role: 'bot',
                    content: botResponse
                }]).then(({ error }) => {
                    if (error) console.error('Error guardando msg bot:', error);
                });
            }

        } catch (err) {
            console.error("AI Error:", err);
            const errorMessage = err.message || "Error desconocido";
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                type: 'bot',
                text: `⚠️ Santi no pudo responder: ${errorMessage}`
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
