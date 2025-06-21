import { handleAsk } from './handlers/ask.js';
import { handleHealth } from './handlers/health.js';

export default {
  async fetch(request) {
    const { pathname } = new URL(request.url);

    if (request.method === 'POST' && pathname === '/ask') {
      return handleAsk(request);
    }

    if (request.method === 'GET' && pathname === '/health') {
      return handleHealth(request);
    }

    return new Response('Not Found', { status: 404 });
  }
};
