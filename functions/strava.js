export async function onRequest(context) {
    const { env } = context;

    const CLIENT_ID = env.STRAVA_CLIENT_ID;
    const CLIENT_SECRET = env.STRAVA_CLIENT_SECRET;

    // Get stored tokens from KV
    let tokens = JSON.parse(await env.STRAVA_TOKENS.get('tokens') || '{}');

    // Refresh if expired
    if (Date.now() / 1000 >= tokens.expires_at) {
        const res = await fetch('https://www.strava.com/oauth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                grant_type: 'refresh_token',
                refresh_token: tokens.refresh_token
            })
        });
        tokens = await res.json();

        // Save new tokens to KV
        await env.STRAVA_TOKENS.put('tokens', JSON.stringify(tokens));
    }

    // Fetch your stats
    const stats = await fetch('https://www.strava.com/api/v3/athletes/147358638/stats', {
        headers: { Authorization: `Bearer ${tokens.access_token}` }
    });

    return new Response(JSON.stringify(await stats.json()), {
        headers: { 'Content-Type': 'application/json' }
    });
}