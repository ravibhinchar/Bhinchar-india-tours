// Native fetch is available in Node 18+

async function testRegister() {
    try {
        const response = await fetch('http://localhost:5001/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Debug User',
                email: 'debug' + Date.now() + '@example.com',
                password: 'password123'
            })
        });

        const text = await response.text();
        console.log('Status:', response.status);
        console.log('Body:', text);

    } catch (error) {
        console.error('Error:', error);
    }
}

testRegister();
