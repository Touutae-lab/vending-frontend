import cookie from 'cookie';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const API_URL = process.env.API_URL;


    const value = request.headers.get('Cookie');
    if  (!value) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    const token = cookie.parse(value).token;

    const data = await fetch(`${API_URL}product/${params.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });

    if  (!data.ok) {
        return new Response(JSON.stringify({ error: data.body }), { status: data.status });
    }
    return new Response(data.body, {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
  }
