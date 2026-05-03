const axios = require('axios');

async function testVoice() {
    console.log('--- Probando Síntesis de Voz (ElevenLabs) ---');
    try {
        const response = await axios.post('http://localhost:3000/api/voice', {
            text: 'Buenas culiau, ¿cómo anda la banda de Inser Salud? Todo joya por acá.'
        });
        console.log('✅ Voz generada con éxito');
        console.log('Tipo de contenido:', response.headers['content-type']);
        console.log('Tamaño del audio:', response.data.length, 'bytes');
    } catch (error) {
        console.error('❌ Error probando Voz:', error.response?.data || error.message);
    }
}

testVoice();
