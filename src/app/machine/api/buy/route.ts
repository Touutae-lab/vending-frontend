import cookie from 'cookie';

export async function POST(request: Request) {
    const API_URL = process.env.API_URL;

    const requestBody = await request.json();
    const value = request.headers.get('Cookie');
    if  (!value) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    const token = cookie.parse(value).token;

    const apiResponse = await fetch(`${API_URL}retail/buy`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(requestBody)
    });

    const apiResponseBody = await apiResponse.json();
    return new Response(JSON.stringify(apiResponseBody), {
        status: apiResponse.status,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
