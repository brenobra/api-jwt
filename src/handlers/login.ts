export async function handleLogin(request: Request): Promise<Response> {
  const user = { id: 1, username: "testuser" };
  const secretKey = SECRET_KEY; // Retrieve from environment variable

  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = btoa(JSON.stringify(header));

  const payload = {
    id: user.id,
    username: user.username,
    aud: "myapi",
    iss: "your-domain.com",
    exp: Math.floor(Date.now() / 1000) + (2 * 60 * 60), // Expires in 2 hours
  };
  const encodedPayload = btoa(JSON.stringify(payload));

  const data = `${encodedHeader}.${encodedPayload}`;

  try {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secretKey);
    const cryptoKey = await crypto.subtle.importKey(
      "raw", keyData, { name: "HMAC", hash: "SHA-256" }, true, ["sign"]
    );
    const signature = await crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(data));
    const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)));

    const jwt = `${data}.${encodedSignature}`;
    return new Response(JSON.stringify({ token: jwt }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });
  } catch (error) {
    return new Response(`Failed to sign token: ${error}`, { status: 500 });
  }
}
