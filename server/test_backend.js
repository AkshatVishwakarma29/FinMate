const axios = require('axios');

async function testBackend() {
    try {
        console.log('Testing Root Endpoint...');
        const rootRes = await axios.get('http://localhost:5000/');
        console.log('Root Endpoint Status:', rootRes.status);
        console.log('Root Endpoint Data:', rootRes.data);

        console.log('\nTesting Registration...');
        const email = `test${Date.now()}@example.com`;
        const password = 'password123';
        try {
            const regRes = await axios.post('http://localhost:5000/api/auth/register', {
                name: 'Test User',
                email,
                password
            });
            console.log('Registration Status:', regRes.status);
            console.log('Registration Token:', regRes.data.token ? 'Received' : 'Missing');
        } catch (e) {
            console.log('Registration Failed:', e.response ? e.response.data : e.message);
        }

        console.log('\nTesting Login...');
        try {
            const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });
            console.log('Login Status:', loginRes.status);
            console.log('Login Token:', loginRes.data.token ? 'Received' : 'Missing');
        } catch (e) {
            console.log('Login Failed:', e.response ? e.response.data : e.message);
        }

    } catch (err) {
        console.error('Backend Test Failed:', err.message);
    }
}

testBackend();
