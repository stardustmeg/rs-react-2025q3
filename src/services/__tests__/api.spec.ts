import { beforeEach, describe, expect, it, vi } from 'vitest';

import { mockCharacters } from '@/__mocks__/mockCharacters';
import { fetchCharacterById, fetchCharacters } from '@/services/api';
import createHttpError from '@/services/utils/httpError';

const mockCharacter = mockCharacters[0];

describe('API Service', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('fetchCharacters', () => {
    it('fetches characters successfully with a name filter', async () => {
      const mockResponse = new Response(JSON.stringify({ results: mockCharacters }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      });
      global.fetch = vi.fn().mockResolvedValue(mockResponse);

      const data = await fetchCharacters({ name: 'rick' });
      expect(data.results).toEqual(mockCharacters);
      expect(fetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/?name=rick&page=1');
    });

    it('fetches characters successfully without a name filter', async () => {
      const mockResponse = new Response(JSON.stringify({ results: mockCharacters }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      });
      global.fetch = vi.fn().mockResolvedValue(mockResponse);

      const data = await fetchCharacters({ page: 2 });
      expect(data.results).toEqual(mockCharacters);
      expect(fetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/?page=2');
    });

    it('throws HttpError on 404 response', async () => {
      const NOT_FOUND_ERROR_CODE = 404;
      global.fetch = vi.fn().mockResolvedValue(new Response(null, { status: 404, statusText: 'Not Found' }));

      await expect(fetchCharacters({ name: 'nonexistent' })).rejects.toThrow(
        createHttpError(NOT_FOUND_ERROR_CODE, 'Not Found'),
      );
    });

    it('throws Error when response structure is invalid', async () => {
      const mockResponse = new Response(JSON.stringify({ invalid: 'data' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      });
      global.fetch = vi.fn().mockResolvedValue(mockResponse);

      await expect(fetchCharacters({})).rejects.toThrow('Response structure is invalid');
    });

    it('throws on network error', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network failure'));

      await expect(fetchCharacters({})).rejects.toThrow('Network failure');
    });
  });

  describe('fetchCharacterById', () => {
    it('fetches a character successfully by ID', async () => {
      const mockResponse = new Response(JSON.stringify(mockCharacter), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      });
      global.fetch = vi.fn().mockResolvedValue(mockResponse);

      const data = await fetchCharacterById('1');
      expect(data).toEqual(mockCharacter);
      expect(fetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/1');
    });

    it('throws HttpError on 404 response', async () => {
      const NOT_FOUND_ERROR_CODE = 404;
      global.fetch = vi.fn().mockResolvedValue(new Response(null, { status: 404, statusText: 'Not Found' }));

      await expect(fetchCharacterById('999')).rejects.toThrow(createHttpError(NOT_FOUND_ERROR_CODE, 'Not Found'));
    });

    it('throws Error when response structure is invalid', async () => {
      const mockResponse = new Response(JSON.stringify({ invalid: 'data' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      });
      global.fetch = vi.fn().mockResolvedValue(mockResponse);

      await expect(fetchCharacterById('1')).rejects.toThrow('Response structure is invalid');
    });

    it('throws on network error', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network failure'));

      await expect(fetchCharacterById('1')).rejects.toThrow('Network failure');
    });
  });

  describe('apiFetch utility', () => {
    it('throws HttpError with correct status and message', async () => {
      const SERVER_ERROR_CODE = 500;
      global.fetch = vi.fn().mockResolvedValue(new Response(null, { status: 500, statusText: 'Server Error' }));

      await expect(fetchCharacters({})).rejects.toThrow(createHttpError(SERVER_ERROR_CODE, 'Server Error'));
    });

    it('includes response body in HttpError when available', async () => {
      const errorBody = { error: 'Invalid request' };
      global.fetch = vi.fn().mockResolvedValue(
        new Response(JSON.stringify(errorBody), {
          status: 400,
          statusText: 'Bad Request',
        }),
      );

      try {
        await fetchCharacters({});
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        if (error instanceof Error) {
          expect(error.message).toContain('400');
          expect(error.message).toContain('Bad Request');
        }
      }
    });
  });
});
