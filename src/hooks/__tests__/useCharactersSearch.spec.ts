import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';

import type { Character, Info } from '@/types';

import { mockCharacters } from '@/__mocks__/mockCharacters';
import { mockTransformedCharacters } from '@/__mocks__/mockTransformedCharacters';
import { useCharactersSearch } from '@/hooks/useCharactersSearch';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useSearchPage } from '@/hooks/useSearchPage';
import { fetchCharacters } from '@/services/api';
import { isHttpError } from '@/types/helpers';

vi.mock('@/services/api');
vi.mock('@/hooks/useLocalStorage');
vi.mock('@/hooks/useSearchPage');
vi.mock('@/types/helpers');

const mockInfo: Info<Character[]>['info'] = {
  count: 1,
  next: null,
  pages: 1,
  prev: null,
};

describe('useCharactersSearch', () => {
  let mockFetchCharacters: Mock;
  let mockUseLocalStorage: Mock;
  let mockUseSearchPage: Mock;
  let mockIsHttpError: Mock;

  beforeEach(() => {
    vi.clearAllMocks();

    mockFetchCharacters = vi.mocked(fetchCharacters);
    mockUseLocalStorage = vi.mocked(useLocalStorage);
    mockUseSearchPage = vi.mocked(useSearchPage);
    mockIsHttpError = vi.mocked(isHttpError);

    mockUseLocalStorage.mockReturnValue(['', vi.fn()]);
    mockUseSearchPage.mockReturnValue([1, vi.fn()]);
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
      expect(result.current.characters).toEqual(mockTransformedCharacters);
    });
  });

  it('should handle search', async () => {
    let searchQuery = '';
    const setSearchQuery = vi.fn().mockImplementation((newQuery: string) => {
      searchQuery = newQuery;
    });

    mockUseLocalStorage.mockImplementation(() => [searchQuery, setSearchQuery]);

    const { result } = renderHook(() => useCharactersSearch());

    act(() => {
      result.current.handleSearch('Rick');
    });

    await waitFor(() => {
      expect(mockFetchCharacters).toHaveBeenCalledWith({ name: 'Rick', page: 1 });
    });

    expect(setSearchQuery).toHaveBeenCalledWith('Rick');
    expect(result.current.searchQuery).toBe('Rick');
  });

  it('should handle pagination', async () => {
    let searchPage = 1;
    const setSearchPage = vi.fn().mockImplementation((newPage: number) => {
      searchPage = newPage;
    });

    mockUseSearchPage.mockImplementation(() => [searchPage, setSearchPage]);

    const { result } = renderHook(() => useCharactersSearch());

    act(() => {
      result.current.handlePagination(2);
    });

    await waitFor(() => {
      expect(mockFetchCharacters).toHaveBeenCalledWith({ name: '', page: 2 });
    });

    expect(setSearchPage).toHaveBeenCalledWith(2);
    expect(result.current.searchPage).toBe(2);
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

  it('should use localStorage for search query persistence', () => {
    mockUseLocalStorage.mockReturnValue(['initial', vi.fn()]);

    const { result } = renderHook(() => useCharactersSearch());

    expect(result.current.searchQuery).toBe('initial');
  });

  it('should use searchPage hook for page persistence', () => {
    mockUseSearchPage.mockReturnValue([3, vi.fn()]);

    const { result } = renderHook(() => useCharactersSearch());

    expect(result.current.searchPage).toBe(3);
  });
});
