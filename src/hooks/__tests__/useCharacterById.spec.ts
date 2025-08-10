import { waitFor } from '@testing-library/react';
import { useParams } from 'react-router';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';

import type { Character, HttpError, TransformedCharacter } from '@/types';

import { mockCharacters } from '@/__mocks__/mockCharacters';
import { mockTransformedCharacters } from '@/__mocks__/mockTransformedCharacters';
import { renderHookWithQuery } from '@/__tests__/utils';
import { transformCharacter } from '@/hooks/helpers/transformCharacter';
import { useCharacterById } from '@/hooks/useCharacterById';
import { fetchCharacterById } from '@/services/api';
import { isHttpError } from '@/types/helpers';

vi.mock('react-router');
vi.mock('@/services/api');
vi.mock('@/types/helpers');
vi.mock('@/hooks/helpers/transformCharacter');

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
    vi.mocked(transformCharacter).mockReturnValue(mockTransformedCharacter);
  });

  it('should return initial state', () => {
    mockFetchCharacterById.mockResolvedValue(mockCharacter);
    const { result } = renderHookWithQuery(() => useCharacterById());

    expect(result.current).toEqual({
      character: null,
      refetch: expect.any(Function) as () => void,
      status: { status: 'loading' },
    });
  });

  it('should fetch and transform character data successfully', async () => {
    mockFetchCharacterById.mockResolvedValue(mockCharacter);

    const { result } = renderHookWithQuery(() => useCharacterById());

    await waitFor(() => {
      expect(result.current.status.status).toBe('ready');
    });

    expect(result.current.character).toEqual(mockTransformedCharacter);
  });

  it('should handle 404 error by setting status to ready', async () => {
    const error = new Error('Not found') as HttpError;
    error.status = 404;
    mockFetchCharacterById.mockRejectedValue(error);
    mockIsHttpError.mockReturnValue(true);

    const { result } = renderHookWithQuery(() => useCharacterById());

    await waitFor(() => {
      expect(result.current.status.status).toBe('ready');
    });

    expect(result.current.character).toBeNull();
  });

  it('should handle other errors by setting error state', async () => {
    const error = new Error('Server error');
    mockFetchCharacterById.mockRejectedValue(error);
    mockIsHttpError.mockReturnValue(false);

    const { result } = renderHookWithQuery(() => useCharacterById());

    await waitFor(() => {
      expect(result.current.status.status).toBe('error');
    });

    expect(result.current.character).toBeNull();
  });

  it('should not fetch when id is not provided', async () => {
    mockUseParams.mockReturnValue({ id: undefined });

    const { result } = renderHookWithQuery(() => useCharacterById());

    await waitFor(() => {
      expect(mockFetchCharacterById).not.toHaveBeenCalled();
    });
    expect(result.current.status.status).toBe('ready');
  });

  it('should refetch when id changes', async () => {
    mockFetchCharacterById.mockResolvedValueOnce(mockCharacter);
    mockUseParams.mockReturnValue({ id: '1' });

    const { result } = renderHookWithQuery(() => useCharacterById());

    await waitFor(() => {
      expect(mockFetchCharacterById).toHaveBeenCalledWith('1');
    });

    expect(result.current.character).toEqual(mockTransformedCharacter);
  });
});
