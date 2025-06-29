import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { handleAsk } from '../src/handlers/ask.js';

global.fetch = jest.fn();

describe('handleAsk', () => {
  beforeEach(() => {
    fetch.mockReset();
  });

  it('should return a valid answer from Groq API', async () => {
    const mockPrompt = 'What is AI?';
    const mockGroqResponse = {
      choices: [
        {
          message: {
            content: 'AI stands for Artificial Intelligence...',
          },
        },
      ],
    };

    fetch.mockResolvedValueOnce({
      json: async () => mockGroqResponse,
    });

    const request = new Request('https://test.com/ask', {
      method: 'POST',
      body: JSON.stringify({ prompt: mockPrompt }),
      headers: { 'Content-Type': 'application/json' },
    });

    const env = { GROQ_API_KEY: 'fake-key' };
    const response = await handleAsk(request, env);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.answer).toContain('AI stands');
  });

  it('should return 500 if Groq API fails', async () => {
    fetch.mockRejectedValueOnce(new Error('API down'));

    const request = new Request('https://test.com/ask', {
      method: 'POST',
      body: JSON.stringify({ prompt: 'Test' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const env = { GROQ_API_KEY: 'fake-key' };
    const response = await handleAsk(request, env);
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json.error).toBe('Something went wrong');
  });

  it('should return 400 for invalid JSON', async () => {
    const badRequest = new Request('https://test.com/ask', {
      method: 'POST',
      body: 'not-json',
    });

    const env = { GROQ_API_KEY: 'fake-key' };
    const response = await handleAsk(badRequest, env);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.error).toBe('Invalid JSON or missing prompt');
  });
});
