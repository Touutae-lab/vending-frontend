export async function POST(request: Request) {
    const API_URL = process.env.API_URL;
    const loginResponse = await fetch(`${API_URL}machine/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request.body),
    });

    const data  = await loginResponse.json();
    if (loginResponse.ok && data.token) {
        const response = new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Set-Cookie': `token=${data.token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400;
                ${
                    process.env.NODE_ENV !== 'development' ? 'Secure;' : ''
                }
                `
            },
        });
        return response;
    } else {
        const response = new Response(JSON.stringify(data), {
            status: 401,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    }

}