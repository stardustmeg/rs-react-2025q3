import { act, renderHook, waitFor } from '@testing-library/react';
import { useParams } from 'react-router';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';

import type { Character, HttpError, TransformedCharacter } from '@/types';

import { mockCharacters } from '@/__mocks__/mockCharacters';
import { mockTransformedCharacters } from '@/__mocks__/mockTransformedCharacters';
import { useCharacterById } from '@/hooks/useCharacterById';
import { fetchCharacterById } from '@/services/api';
import { isHttpError } from '@/types/helpers';

vi.mock('react-router');
vi.mock('@/services/api');
vi.mock('@/types/helpers');

const mockCharacter: Character = mockCharacters[0];

const mockTransformedCharacter: TransformedCharacter = mockTransformedCharacters[0];

describe('useCharacterById', () => {
  let mockUseParams: Mock;
  let mockFetchCharacterById: Mock;
  let mockIsHttpError: Mock;

  beforeEach(() => {
    vi.clearAllMocks();

    mockUseParams = vi.mocked(useParams).mockReturnValue({ id: '1' });
    mockFetchCharacterById = vi.mocked(fetchCharacterById);
    mockIsHttpError = vi.mocked(isHttpError);
  });

  it('should return initial state', () => {
    mockFetchCharacterById.mockResolvedValue(mockCharacter);
    const { result } = renderHook(() => useCharacterById());

    expect(result.current).toEqual({
      character: null,
      error: null,
      setStatus: expect.any(Function) as (status: 'error' | 'loading' | 'ready') => void,
      status: { status: 'loading' },
    });
  });

  it('should fetch and transform character data successfully', async () => {
    mockFetchCharacterById.mockResolvedValue(mockCharacter);

    const { result } = renderHook(() => useCharacterById());

    await waitFor(() => {
      expect(result.current.status.status).toBe('ready');
    });

    expect(result.current.character).toEqual(mockTransformedCharacter);
    expect(result.current.error).toBeNull();
  });

  it('should handle 404 error by setting status to ready', async () => {
    const error = new Error('Not found') as HttpError;
    error.status = 404;
    mockFetchCharacterById.mockRejectedValue(error);
    mockIsHttpError.mockReturnValue(true);

    const { result } = renderHook(() => useCharacterById());

    await waitFor(() => {
      expect(result.current.status.status).toBe('ready');
    });

    expect(result.current.character).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('should handle other errors by setting error state', async () => {
    const error = new Error('Server error');
    mockFetchCharacterById.mockRejectedValue(error);
    mockIsHttpError.mockReturnValue(false);

    const { result } = renderHook(() => useCharacterById());

    await waitFor(() => {
      expect(result.current.status.status).toBe('error');
    });

    expect(result.current.character).toBeNull();
    expect(result.current.error).toBe('Server error');
  });

  it('should not fetch when id is not provided', async () => {
    mockUseParams.mockReturnValue({ id: undefined });

    const { result } = renderHook(() => useCharacterById());

    await waitFor(() => {
      expect(mockFetchCharacterById).not.toHaveBeenCalled();
    });
    expect(result.current.status.status).toBe('loading');
  });

  it('should allow manual status updates via setStatus', () => {
    mockFetchCharacterById.mockResolvedValue(mockCharacter);
    const { result } = renderHook(() => useCharacterById());

    act(() => {
      result.current.setStatus({ status: 'error' });
    });

    expect(result.current.status.status).toBe('error');
  });

  it('should refetch when id changes', async () => {
    mockFetchCharacterById.mockResolvedValueOnce(mockCharacter);

    const { rerender } = renderHook(
      ({ id }) => {
        vi.mocked(useParams).mockReturnValue({ id });
        return useCharacterById();
      },
      {
        initialProps: { id: '1' },
      },
    );

    await waitFor(() => {
      expect(mockFetchCharacterById).toHaveBeenCalledWith('1');
    });

    const mockCharacter2 = { ...mockCharacter, id: 2, name: 'Morty' };
    mockFetchCharacterById.mockResolvedValueOnce(mockCharacter2);

    rerender({ id: '2' });

    await waitFor(() => {
      expect(mockFetchCharacterById).toHaveBeenCalledWith('2');
    });
    expect(mockFetchCharacterById).toHaveBeenCalledTimes(2);
  });
});
