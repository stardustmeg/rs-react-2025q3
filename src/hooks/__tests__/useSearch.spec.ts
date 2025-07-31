import { act, renderHook } from '@testing-library/react';
import { useSearchParams } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useSearch } from '@/hooks/useSearch';

vi.mock('react-router', () => ({
  useSearchParams: vi.fn(),
}));

vi.mock('@/hooks/useLocalStorage', () => ({
  useLocalStorage: vi.fn(() => [1, vi.fn()]),
  useLocalStorageSearch: vi.fn(() => ['', vi.fn()]),
}));

vi.mock('@/hooks/helpers/buildUrlParams', () => ({
  buildUrlParams: vi.fn((page: number, query: string) => {
    const params: Record<string, string> = { page: String(page) };
    if (query.trim()) {
      params.search = query.trim();
    }
    return params;
  }),
}));

describe('useSearch', () => {
  const mockSetSearchParams = vi.fn();
  const mockSearchParams = new URLSearchParams();

  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchParams.delete('page');
    mockSearchParams.delete('search');
    vi.mocked(useSearchParams).mockReturnValue([mockSearchParams, mockSetSearchParams]);
  });

  it('should return page 1 when no page param is present', () => {
    const { result } = renderHook(() => useSearch());

    expect(result.current.searchPage).toBe(1);
  });

  it('should return empty search query when no search param is present', () => {
    const { result } = renderHook(() => useSearch());

    expect(result.current.searchQuery).toBe('');
  });

  it('should return the current page number when page param exists', () => {
    mockSearchParams.set('page', '3');
    const { result } = renderHook(() => useSearch());

    expect(result.current.searchPage).toBe(3);
  });

  it('should return the search query when search param exists', () => {
    mockSearchParams.set('search', 'rick');
    const { result } = renderHook(() => useSearch());

    expect(result.current.searchQuery).toBe('rick');
  });

  it('should set page to 1 when no page param exists on initial render', () => {
    renderHook(() => useSearch());

    expect(mockSetSearchParams).toHaveBeenCalledWith({ page: '1' }, { replace: true });
  });

  it('should not set default page when page param already exists', () => {
    mockSearchParams.set('page', '2');
    renderHook(() => useSearch());

    expect(mockSetSearchParams).not.toHaveBeenCalled();
  });

  it('should update the page number when setSearchPage is called', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setSearchPage(5);
    });

    expect(mockSetSearchParams).toHaveBeenCalledWith({ page: '5' });
  });

  it('should update the search query when setSearchQuery is called', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setSearchQuery('morty');
    });

    expect(mockSetSearchParams).toHaveBeenCalledWith({ page: '1', search: 'morty' });
  });

  it('should update both page and query when setSearchParams is called', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setSearchParams(3, 'rick');
    });

    expect(mockSetSearchParams).toHaveBeenCalledWith({ page: '3', search: 'rick' });
  });

  it('should handle non-numeric page params by defaulting to 1', () => {
    mockSearchParams.set('page', 'invalid');
    const { result } = renderHook(() => useSearch());

    expect(result.current.searchPage).toBe(1);
  });

  it('should trim search query when setting', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setSearchQuery('  rick  ');
    });

    expect(mockSetSearchParams).toHaveBeenCalledWith({ page: '1', search: 'rick' });
  });

  it('should not include search param when query is empty', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setSearchQuery('');
    });

    expect(mockSetSearchParams).toHaveBeenCalledWith({ page: '1' });
  });
});
