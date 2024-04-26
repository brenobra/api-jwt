export async function handleAbout(request: Request): Promise<Response> {
    return new Response('This is a demo API using Cloudflare Workers', { status: 200 });
  }
  