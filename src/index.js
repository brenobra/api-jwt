import { handleLogin } from './handlers/login';
import { handleData } from './handlers/data';
import { handleAbout } from './handlers/about';

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
      return handleAbout(request);
    default:
      return new Response('Not found', { status: 404 });
  }
}
