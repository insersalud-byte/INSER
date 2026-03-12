const axios = require('axios');

const API_TOKEN = 'jD9x5UFuaCyjj4CEKU2MDKnbdyIrp2OVapflhQoPbc60b212';

async function listVPS() {
    try {
        console.log('Fetching VPS list...');
        const response = await axios.get('https://api.hostinger.com/v1/vps', {
            headers: { 'Authorization': `Bearer ${API_TOKEN}` }
        });
        console.log('VPS List:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('Error fetching VPS list:', error.response?.data || error.message);
    }
}

listVPS();
