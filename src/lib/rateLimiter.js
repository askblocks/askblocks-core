const RATE_LIMIT = 60;
const WINDOW = 60;
const ipHits = new Map();

function getKey(request) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const now = Math.floor(Date.now() / 1000);
  return `${ip}:${Math.floor(now / WINDOW)}`;
}

export async function rateLimit(request) {
  const key = getKey(request);
  const count = ipHits.get(key) || 0;

  if (count >= RATE_LIMIT) {
    return new Response('Too Many Requests', { status: 429 });
  }

  ipHits.set(key, count + 1);
  return null;
}
