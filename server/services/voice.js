const axios = require('axios');

const ELEVENLABS_API_KEY = 'sk_9a1094c50709aa47c761dc5736d61ae5830601924ecad6cd';
const VOICE_ID = 'beto'; // Premium Persona

async function synthesizeSpeech(text) {
    console.log(`🎙️ Generando voz premium para: "${text.substring(0, 30)}..."`);
    try {
        const response = await axios({
            method: 'post',
            url: `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
            data: {
                text,
                model_id: 'eleven_multilingual_v2',
                voice_settings: {
                    stability: 0.75,
                    similarity_boost: 0.8
                }
            },
            headers: {
                'Accept': 'audio/mpeg',
                'xi-api-key': ELEVENLABS_API_KEY,
                'Content-Type': 'application/json'
            },
            responseType: 'arraybuffer'
        });
        return response.data;
    } catch (error) {
        console.error('❌ Error en síntesis de voz ElevenLabs:', error.response?.data || error.message);
        throw error;
    }
}

module.exports = { synthesizeSpeech };
