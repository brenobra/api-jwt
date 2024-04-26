import { decode } from 'https://cdn.skypack.dev/jose';

export async function handleData(request: Request): Promise<Response> {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return new Response('Authorization required', { status: 401 });
  }

  try {
    const user = await decode(new Uint8Array(new TextEncoder().encode('your-secret-key-here')), token, 'HS256');
    return new Response(JSON.stringify({ data: "This is protected data" }), { status: 200 });
  } catch (error) {
    return new Response('Invalid token', { status: 403 });
  }
}
