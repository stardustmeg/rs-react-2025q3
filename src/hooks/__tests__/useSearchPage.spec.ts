import { act, renderHook } from '@testing-library/react';
import { useSearchParams } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useSearchPage } from '@/hooks/useSearchPage';

vi.mock('react-router', () => ({
  useSearchParams: vi.fn(),
}));

describe('useSearchPage', () => {
  const mockSetSearchParams = vi.fn();
  const mockSearchParams = new URLSearchParams();

  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchParams.delete('page');
    vi.mocked(useSearchParams).mockReturnValue([mockSearchParams, mockSetSearchParams]);
  });

  it('should return page 1 when no page param is present', () => {
    const { result } = renderHook(() => useSearchPage());

    expect(result.current[0]).toBe(1);
  });

  it('should return the current page number when page param exists', () => {
    mockSearchParams.set('page', '3');
    const { result } = renderHook(() => useSearchPage());

    expect(result.current[0]).toBe(3);
  });

  it('should set page to 1 when no page param exists on initial render', () => {
    renderHook(() => useSearchPage());

    expect(mockSetSearchParams).toHaveBeenCalledWith({ page: '1' }, { replace: true });
  });

  it('should not set default page when page param already exists', () => {
    mockSearchParams.set('page', '2');
    renderHook(() => useSearchPage());

    expect(mockSetSearchParams).not.toHaveBeenCalled();
  });

  it('should update the page number when setSearchPage is called', () => {
    const { result } = renderHook(() => useSearchPage());

    act(() => {
      result.current[1](5);
    });

    expect(mockSetSearchParams).toHaveBeenCalledWith({ page: '5' });
  });

  it('should handle non-numeric page params by defaulting to 1', () => {
    mockSearchParams.set('page', 'invalid');
    const { result } = renderHook(() => useSearchPage());

    expect(result.current[0]).toBe(1);
  });
});
