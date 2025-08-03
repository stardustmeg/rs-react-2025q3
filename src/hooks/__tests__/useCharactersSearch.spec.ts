import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';

import type { Character, Info } from '@/types';

import { mockCharacters } from '@/__mocks__/mockCharacters';
import { transformCharacter } from '@/hooks/helpers/transformCharacter';
import { useCharactersSearch } from '@/hooks/useCharactersSearch';
import { useSearch } from '@/hooks/useSearch';
import { fetchCharacters } from '@/services/api';
import { isHttpError } from '@/types/helpers';

vi.mock('@/services/api');
vi.mock('@/hooks/useSearch');
vi.mock('@/types/helpers');
vi.mock('@/hooks/helpers/transformCharacter');

const mockInfo: Info<Character[]>['info'] = {
  count: 1,
  next: null,
  pages: 1,
  prev: null,
};

describe('useCharactersSearch', () => {
  let mockFetchCharacters: Mock;
  let mockUseSearch: Mock;
  let mockIsHttpError: Mock;
  let mockTransformCharacter: Mock;

  const mockSetSearchPage = vi.fn();
  const mockSetSearchQuery = vi.fn();
  const mockSetSearchParams = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    mockFetchCharacters = vi.mocked(fetchCharacters);
    mockUseSearch = vi.mocked(useSearch);
    mockIsHttpError = vi.mocked(isHttpError);
    mockTransformCharacter = vi.mocked(transformCharacter);

    mockUseSearch.mockReturnValue({
      searchPage: 1,
      searchQuery: '',
      setSearchPage: mockSetSearchPage,
      setSearchParams: mockSetSearchParams,
      setSearchQuery: mockSetSearchQuery,
    });

    mockTransformCharacter.mockImplementation((char: Character) => ({
      ...char,
      id: String(char.id),
      info: [
        { label: 'Gender', value: char.gender },
        { label: 'Origin', value: char.origin.name },
        { label: 'Species', value: char.species },
        { label: 'Status', value: char.status },
      ],
      origin: char.origin.name,
    }));

    mockFetchCharacters.mockResolvedValue({ info: mockInfo, results: mockCharacters });
  });

  it('should return initial state', () => {
    const { result } = renderHook(() => useCharactersSearch());

    expect(result.current).toEqual({
      characters: [],
      handlePagination: expect.any(Function) as (...arguments_: unknown[]) => void,
      handleSearch: expect.any(Function) as (...arguments_: unknown[]) => void,
      searchPage: 1,
      searchQuery: '',
      status: { status: 'loading' },
      totalPages: 1,
    });
  });

  it('should fetch characters on mount', async () => {
    renderHook(() => useCharactersSearch());

    await waitFor(() => {
      expect(mockFetchCharacters).toHaveBeenCalledWith({ name: '', page: 1 });
    });
  });

  it('should transform characters data correctly', async () => {
    const { result } = renderHook(() => useCharactersSearch());

    await waitFor(() => {
      expect(mockTransformCharacter).toHaveBeenCalledWith(mockCharacters[0]);
    });

    expect(result.current.characters).toHaveLength(mockCharacters.length);
  });

  it('should handle search', () => {
    const { result } = renderHook(() => useCharactersSearch());

    act(() => {
      result.current.handleSearch('Rick');
    });

    expect(mockSetSearchParams).toHaveBeenCalledWith(1, 'Rick');
    expect(result.current.status.status).toBe('loading');
  });

  it('should handle pagination', () => {
    const { result } = renderHook(() => useCharactersSearch());

    act(() => {
      result.current.handlePagination(2);
    });

    expect(mockSetSearchPage).toHaveBeenCalledWith(2);
    expect(result.current.status.status).toBe('loading');
  });

  it('should handle other errors by setting error state', async () => {
    const error = new Error('Server error');
    mockFetchCharacters.mockRejectedValue(error);
    mockIsHttpError.mockReturnValue(false);

    const { result } = renderHook(() => useCharactersSearch());

    await waitFor(() => {
      expect(result.current.status.status).toBe('error');
    });
  });

  it('should update total pages from API response', async () => {
    mockFetchCharacters.mockResolvedValue({
      info: { ...mockInfo, pages: 5 },
      results: mockCharacters,
    });

    const { result } = renderHook(() => useCharactersSearch());

    await waitFor(() => {
      expect(result.current.totalPages).toBe(5);
    });
  });

  it('should use search hook for query and page persistence', () => {
    mockUseSearch.mockReturnValue({
      searchPage: 3,
      searchQuery: 'initial',
      setSearchPage: mockSetSearchPage,
      setSearchParams: mockSetSearchParams,
      setSearchQuery: mockSetSearchQuery,
    });

    const { result } = renderHook(() => useCharactersSearch());

    expect(result.current.searchQuery).toBe('initial');
    expect(result.current.searchPage).toBe(3);
  });
});
