import { jwtSign } from 'https://cdn.skypack.dev/jose';

export async function handleLogin(request: Request): Promise<Response> {
  const user = { id: 1, username: "testuser" }; // Example user
  const key = new TextEncoder().encode('your-secret-key-here');
  const token = await encode(new Uint8Array(key), { aud: 'myapi', exp: Math.floor(Date.now() / 1000) + (60 * 60), ...user }, 'HS256');

  return new Response(JSON.stringify({ token }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200
  });
}
