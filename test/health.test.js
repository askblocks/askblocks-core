import { describe, it, expect } from '@jest/globals';
import { handleHealth } from '../src/handlers/health.js';

describe('handleHealth', () => {
  it('should return a 200 response with expected body', async () => {
    const response = await handleHealth();

    expect(response.status).toBe(200);

    const text = await response.text();
    expect(text).toBe("{\"status\":\"ok\"}");
  });
});
