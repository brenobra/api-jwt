// Import the necessary library for JWT
import { encode } from 'https://cdn.skypack.dev/jose';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const { pathname } = new URL(request.url);

  switch (pathname) {
    case '/login':
      return handleLogin(request);
    case '/data':
      return handleData(request);
    case '/about':
      return new Response('This is a demo API using Cloudflare Workers', { status: 200 });
    default:
      return new Response('Not found', { status: 404 });
  }
}

async function handleLogin(request) {
  // Simulate user authentication
  const user = { id: 1, username: "testuser" }; // Normally you would validate against user input

  // Create a JWT
  const key = new TextEncoder().encode('your-secret-key-here');
  const token = await encode(new Uint8Array(key), { aud: 'myapi', exp: Math.floor(Date.now() / 1000) + (60 * 60), ...user }, 'HS256');

  return new Response(JSON.stringify({ token }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200
  });
}
