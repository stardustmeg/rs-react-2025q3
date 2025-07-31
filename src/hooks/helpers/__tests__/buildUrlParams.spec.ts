import { describe, expect, it } from 'vitest';

import { buildUrlParams } from '@/hooks/helpers/buildUrlParams';

describe('buildUrlParams', () => {
  it('should build params with page only when query is empty', () => {
    const result = buildUrlParams(1, '');

    expect(result).toEqual({ page: '1' });
  });

  it('should build params with page and search when query is provided', () => {
    const result = buildUrlParams(2, 'rick');

    expect(result).toEqual({ page: '2', search: 'rick' });
  });

  it('should trim whitespace from query', () => {
    const result = buildUrlParams(1, '  morty  ');

    expect(result).toEqual({ page: '1', search: 'morty' });
  });

  it('should not include search param when query is only whitespace', () => {
    const result = buildUrlParams(3, '   ');

    expect(result).toEqual({ page: '3' });
  });

  it('should convert page number to string', () => {
    const result = buildUrlParams(42, 'test');

    expect(result.page).toBe('42');
    expect(typeof result.page).toBe('string');
  });

  it('should handle special characters in query', () => {
    const result = buildUrlParams(1, 'rick & morty');

    expect(result).toEqual({ page: '1', search: 'rick & morty' });
  });
});
