import { Hono } from 'hono';
import { jwt } from 'hono/jwt';

const app = new Hono();

// Mock user credentials
const mockUsers = { username: 'user', password: 'pass' };

// Key Generation
let secretKey: CryptoKey;

// Function to initialize the cryptographic key
async function initCryptoKey() {
    secretKey = await crypto.subtle.generateKey(
        { name: "HMAC", hash: { name: "SHA-256" } },
        true, // whether the key is extractable (i.e. can be used in exportKey)
        ["sign", "verify"] // can be used to sign and verify signatures
    );
}

// Initialize the key at the start
initCryptoKey();

// Login endpoint
app.post('/login', async (c) => {
    const { username, password } = await c.req.json();
    if (username === mockUsers.username && password === mockUsers.password && secretKey) {
        const encoder = new TextEncoder();
        const encoded = encoder.encode(username);
        const signature = await crypto.subtle.sign(
            { name: "HMAC" },
            secretKey,
            encoded
        );
        const token = Buffer.from(signature).toString('base64'); // Convert ArrayBuffer to base64
        return c.json({ token });
    }
    return c.json({ error: 'Invalid credentials' }, 401);
});

// Data endpoint
app.get('/data', jwt({ key: secretKey }), (c) => {
    const mockData = { data: "This is protected data" };
    return c.json(mockData);
});

// Start the server
app.fire();
