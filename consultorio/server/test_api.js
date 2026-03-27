const axios = require('axios');

async function test() {
    try {
        const res = await axios.get('http://localhost:3005/api/sessions');
        const sessions = res.data;
        console.log('Total sessions:', sessions.length);
        const today = '2026-03-27';
        const todaySessions = sessions.filter(s => s.fecha === today);
        console.log('Sessions for today:', todaySessions);
    } catch (err) {
        console.error('Error fetching sessions:', err.message);
    }
}

test();
