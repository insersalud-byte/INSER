const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');

/**
 * Santi Master WhatsApp Professional Bridge
 * Persistence: DAEMON_MODE
 */

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "santi-master-inser-salud"
    }),
    puppeteer: {
        args: ['--no-sandbox']
    }
});

client.on('qr', (qr) => {
    console.log('🧉 ESCANEA EL QR PARA ACTIVAR A SANTI MASTER:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ Santi Master Orchestrator está conectado a WhatsApp!');
});

client.on('message', async (msg) => {
    if (msg.from.includes('@c.us')) {
        console.log(`📩 Mensaje recibido de ${msg.from}: ${msg.body}`);

        // Aquí se conectará con el backend de Santi para procesar el mensaje
        try {
            const response = await axios.post('http://localhost:3001/api/chat', {
                message: msg.body,
                userId: msg.from
            });

            if (response.data && response.data.text) {
                await msg.reply(response.data.text);
            }
        } catch (error) {
            console.error('❌ Error al procesar mensaje con Santi AI:', error.message);
        }
    }
});

client.on('disconnected', (reason) => {
    console.log('⚠️ Bridge desconectado:', reason);
    console.log('🔄 Reintentando conexión agresiva...');
    client.initialize();
});

console.log('🚀 Iniciando Santi Master WhatsApp Professional Bridge...');
client.initialize();
