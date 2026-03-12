const axios = require('axios');

const API_TOKEN = 'jD9x5UFuaCyjj4CEKU2MDKnbdyIrp2OVapflhQoPbc60b212';
const CONTROL_LEVEL = 'full_admin';
const PORT = 18789;

async function getVPSInfo() {
    try {
        const response = await axios.get('https://api.hostinger.com/v1/vps', {
            headers: { 'Authorization': `Bearer ${API_TOKEN}` }
        });
        return response.data;
    } catch (error) {
        console.error('❌ Error al obtener info del VPS:', error.message);
        return null;
    }
}

async function openPort(vpsId) {
    if (!vpsId) return;
    console.log(`🚀 Intentando abrir puerto ${PORT} en el VPS ${vpsId}...`);
    try {
        const response = await axios.post(`https://api.hostinger.com/v1/vps/${vpsId}/firewall`, {
            action: 'ALLOW',
            port: PORT,
            protocol: 'TCP'
        }, {
            headers: { 'Authorization': `Bearer ${API_TOKEN}` }
        });
        console.log('✅ Puerto abierto con éxito:', response.data);
    } catch (error) {
        console.error('❌ Error al abrir puerto:', error.response?.data || error.message);
    }
}

async function autoRepairNetwork() {
    console.log('🛠️ Iniciando Auto-Repair de Red...');
    const vpsList = await getVPSInfo();
    if (vpsList && vpsList.length > 0) {
        for (const vps of vpsList) {
            await openPort(vps.id);
        }
    } else {
        console.log('⚠️ No se encontraron VPS o la API no respondió correctamente.');
    }
}

autoRepairNetwork();
