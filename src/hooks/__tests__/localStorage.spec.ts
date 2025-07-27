import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useLocalStorage } from '@/hooks/useLocalStorage';

const LS_SEARCH_KEY = 'search';
const LS_PREFIX = 'stardustmeg_8c0a1a24-b273-4b98-91c6-c7d623fc53f1';

const getFullKey = (key: string): string => {
  return `${LS_PREFIX}_${key}`;
};

describe('useLocalStorage hook', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('initializes with empty string when no value is stored', () => {
    const { result } = renderHook(() => useLocalStorage());
    expect(result.current[0]).toBe('');
  });

  it('initializes with trimmed value from localStorage', () => {
    localStorage.setItem(getFullKey(LS_SEARCH_KEY), '  test value  ');
    const { result } = renderHook(() => useLocalStorage());
    expect(result.current[0]).toBe('test value');
  });

  it('updates localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage());

    act(() => {
      result.current[1]('new value');
    });

    expect(localStorage.getItem(getFullKey(LS_SEARCH_KEY))).toBe('new value');
    expect(result.current[0]).toBe('new value');
  });

  it('persists value between renders', () => {
    const { rerender, result } = renderHook(() => useLocalStorage());

    act(() => {
      result.current[1]('persisted value');
    });

    rerender();

    expect(result.current[0]).toBe('persisted value');
    expect(localStorage.getItem(getFullKey(LS_SEARCH_KEY))).toBe('persisted value');
  });

  it('handles empty string values correctly', () => {
    const { result } = renderHook(() => useLocalStorage());

    act(() => {
      result.current[1]('');
    });

    expect(result.current[0]).toBe('');
    expect(localStorage.getItem(getFullKey(LS_SEARCH_KEY))).toBe('');
  });

  it('trims values only in localStorage, not in state', () => {
    localStorage.setItem(getFullKey(LS_SEARCH_KEY), '  initial  ');

    const { result } = renderHook(() => useLocalStorage());

    expect(result.current[0]).toBe('initial');
    expect(localStorage.getItem(getFullKey(LS_SEARCH_KEY))).toBe('initial');

    act(() => {
      result.current[1]('  new value  ');
    });

    expect(result.current[0]).toBe('  new value  ');
    expect(localStorage.getItem(getFullKey(LS_SEARCH_KEY))).toBe('new value');

    act(() => {
      result.current[1]('    ');
    });

    expect(result.current[0]).toBe('    ');
    expect(localStorage.getItem(getFullKey(LS_SEARCH_KEY))).toBe('');
  });
});
