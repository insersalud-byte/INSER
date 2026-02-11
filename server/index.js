const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/chat', async (req, res) => {
    try {
        const { messages, systemPrompt } = req.body;

        if (!process.env.OPENAI_API_KEY) {
            console.error('ERROR: OPENAI_API_KEY no configurada en el servidor');
            return res.status(500).json({ error: 'Configuración del servidor incompleta (falta API Key)' });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: systemPrompt },
                ...(messages || [])
            ],
            temperature: 0.7,
        });

        res.json({ message: response.choices[0].message.content });
    } catch (error) {
        console.error('AI Error:', error.message);
        if (error.status === 401) {
            res.status(401).json({ error: 'La clave de API de Santi es inválida o ha expirado' });
        } else {
            res.status(500).json({ error: 'Santi tiene problemas técnicos' });
        }
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor de Santi corriendo en puerto ${PORT}`);
});
