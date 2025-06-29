import { describe, it, expect } from '@jest/globals';
import { rateLimit } from '../src/lib/rateLimiter.js';

const mockIP = '1.2.3.4';

function createMockRequest(ip = mockIP) {
  return new Request('https://test.com/ask', {
    method: 'POST',
    headers: { 'cf-connecting-ip': ip },
  });
}

describe('rateLimit', () => {
  it('should allow first request', async () => {
    const request = createMockRequest();
    const result = await rateLimit(request);
    expect(result).toBe(null);
  });

  it('should block after exceeding limit', async () => {
    const request = createMockRequest();

    for (let i = 0; i < 100; i++) {
      await rateLimit(request);
    }

    const result = await rateLimit(request);
    expect(result.status).toBe(429);
  });

  it('should respect IP headers', async () => {
    const request = createMockRequest('8.8.8.8');
    const result = await rateLimit(request);
    expect(result).toBe(null);
  });
});
