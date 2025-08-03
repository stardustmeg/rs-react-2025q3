import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useLocalStorage, useLocalStorageSearch } from '@/hooks/useLocalStorage';

const LS_SEARCH_KEY = 'search';
const LS_PREFIX = 'stardustmeg_8c0a1a24-b273-4b98-91c6-c7d623fc53f1';

const getFullKey = (key: string): string => {
  return `${key}_${LS_PREFIX}`;
};

describe('useLocalStorage hook', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('initializes with default value when no value is stored', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('initializes with stored string value', () => {
    localStorage.setItem(getFullKey('test-key'), 'stored value');
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    expect(result.current[0]).toBe('stored value');
  });

  it('initializes with stored JSON value', () => {
    const testObject = { count: 42, name: 'test' };
    localStorage.setItem(getFullKey('test-key'), JSON.stringify(testObject));
    const { result } = renderHook(() => useLocalStorage('test-key', {}));
    expect(result.current[0]).toEqual(testObject);
  });

  it('falls back to string when JSON parsing fails', () => {
    localStorage.setItem(getFullKey('test-key'), 'invalid json {');
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    expect(result.current[0]).toBe('invalid json {');
  });

  it('updates localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    act(() => {
      result.current[1]('new value');
    });

    expect(localStorage.getItem(getFullKey('test-key'))).toBe('new value');
    expect(result.current[0]).toBe('new value');
  });

  it('stores objects as JSON', () => {
    const testObject = { count: 42, name: 'test' };
    const { result } = renderHook(() => useLocalStorage('test-key', {}));

    act(() => {
      result.current[1](testObject);
    });

    expect(localStorage.getItem(getFullKey('test-key'))).toBe(JSON.stringify(testObject));
    expect(result.current[0]).toEqual(testObject);
  });

  it('persists value between renders', () => {
    const { rerender, result } = renderHook(() => useLocalStorage('test-key', 'default'));

    act(() => {
      result.current[1]('persisted value');
    });

    rerender();

    expect(result.current[0]).toBe('persisted value');
    expect(localStorage.getItem(getFullKey('test-key'))).toBe('persisted value');
  });
});

describe('useLocalStorageSearch hook', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('initializes with empty string when no value is stored', () => {
    const { result } = renderHook(() => useLocalStorageSearch());
    expect(result.current[0]).toBe('');
  });

  it('initializes with trimmed value from localStorage', () => {
    localStorage.setItem(getFullKey(LS_SEARCH_KEY), '  test value  ');
    const { result } = renderHook(() => useLocalStorageSearch());
    expect(result.current[0]).toBe('test value');
  });

  it('updates localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorageSearch());

    act(() => {
      result.current[1]('new value');
    });

    expect(localStorage.getItem(getFullKey(LS_SEARCH_KEY))).toBe('new value');
    expect(result.current[0]).toBe('new value');
  });

  it('trims values only in localStorage, not in state', () => {
    const { result } = renderHook(() => useLocalStorageSearch());

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

  it('persists trimmed value between renders', () => {
    const { rerender, result } = renderHook(() => useLocalStorageSearch());

    act(() => {
      result.current[1]('  persisted  ');
    });

    rerender();

    expect(result.current[0]).toBe('  persisted  ');
    expect(localStorage.getItem(getFullKey(LS_SEARCH_KEY))).toBe('persisted');
  });
});
