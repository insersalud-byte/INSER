const axios = require('axios');

async function testSanti() {
    console.log('--- Probando Identidad de Santi ---');
    try {
        const response = await axios.post('http://localhost:3000/api/chat', {
            messages: [{ role: 'user', content: '¿Quién sos y qué podés hacer?' }]
        });
        console.log('Respuesta de Santi:');
        console.log(response.data.message);
    } catch (error) {
        console.error('Error probando Santi:', error.message);
        console.log('Asegurate de que el servidor esté corriendo en el puerto 3000.');
    }
}

testSanti();
