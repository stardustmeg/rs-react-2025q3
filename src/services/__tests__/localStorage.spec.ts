import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getTrimmedSearchQuery, saveSearchQuery } from '@/services/localStorage';

const LS_SEARCH_KEY = 'search';
const LS_PREFIX = 'stardustmeg_8c0a1a24-b273-4b98-91c6-c7d623fc53f1';

describe('LocalStorageService and helpers', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('saves a search query to localStorage with prefix', () => {
    const testValue = '  test query  ';
    saveSearchQuery(testValue);

    const storedValue = localStorage.getItem(`${LS_PREFIX}_${LS_SEARCH_KEY}`);
    expect(storedValue).toBe(testValue);
  });

  it('retrieves and trims a stored search query', () => {
    localStorage.setItem(`${LS_PREFIX}_${LS_SEARCH_KEY}`, '  some query  ');

    const result = getTrimmedSearchQuery();

    expect(result).toBe('some query');
  });

  it('returns empty string if nothing stored', () => {
    const result = getTrimmedSearchQuery();
    expect(result).toBe('');
  });
});
