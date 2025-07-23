import { describe, expect, it, vi } from 'vitest';

import { mockCharacters } from '@/__mocks__/mockCharacters';
import { fetchCharacters } from '@/services/api';

describe('fetchCharacters', () => {
  it('fetches characters successfully with a name filter', async () => {
    const data = await fetchCharacters({ name: 'rick' });
    expect(data.results).toEqual(mockCharacters);
  });

  it('fetches characters successfully without a name filter', async () => {
    const data = await fetchCharacters({ page: 1 });
    expect(data).toBeDefined();
    expect(Array.isArray(data.results)).toBe(true);
  });

  it('throws HttpError on 500 response', async () => {
    await expect(fetchCharacters({ name: 'status 500' })).rejects.toThrow('500');
  });

  it('throws Error when response structure is invalid', async () => {
    const mockResponse = new Response(JSON.stringify({ invalid: 'data' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
      statusText: 'OK',
    });

    global.fetch = vi.fn(() => Promise.resolve(mockResponse));

    await expect(fetchCharacters({ name: 'rick' })).rejects.toThrow('Response structure is invalid');
  });

  it('throws on network error', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Network failure')));

    await expect(fetchCharacters({ name: 'rick' })).rejects.toThrow('Network failure');
  });
});
