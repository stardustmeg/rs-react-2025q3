import { describe, expect, it } from 'vitest';

import { mockCountries } from '@/__mocks__/mockCountries';
import { filterCountries, findCountry, getCountrySuggestions } from '@/utils/countryUtils';

describe('Country Utils', () => {
  describe('filterCountries', () => {
    it('should return all countries when query is empty', () => {
      const result = filterCountries(mockCountries, '');
      expect(result).toEqual(mockCountries);
    });

    it('should return all countries when query is whitespace', () => {
      const result = filterCountries(mockCountries, '   ');
      expect(result).toEqual(mockCountries);
    });

    it('should filter countries by name (case-insensitive)', () => {
      const result = filterCountries(mockCountries, 'united');
      expect(result).toEqual([
        { code: 'US', name: 'United States' },
        { code: 'GB', name: 'United Kingdom' },
      ]);
    });

    it('should filter countries by code (case-insensitive)', () => {
      const result = filterCountries(mockCountries, 'us');
      expect(result).toEqual([
        { code: 'US', name: 'United States' },
        { code: 'AU', name: 'Australia' },
        { code: 'RU', name: 'Russia' },
      ]);
    });

    it('should filter countries by partial name match', () => {
      const result = filterCountries(mockCountries, 'an');
      expect(result).toEqual([
        { code: 'CA', name: 'Canada' },
        { code: 'FR', name: 'France' },
        { code: 'DE', name: 'Germany' },
        { code: 'NL', name: 'Netherlands' },
        { code: 'JP', name: 'Japan' },
        { code: 'TW', name: 'Taiwan' },
        { code: 'FI', name: 'Finland' },
        { code: 'PL', name: 'Poland' },
        { code: 'TH', name: 'Thailand' },
        { code: 'KZ', name: 'Kazakhstan' },
        { code: 'UZ', name: 'Uzbekistan' },
      ]);
    });

    it('should return empty array when no matches found', () => {
      const result = filterCountries(mockCountries, 'nonexistent');
      expect(result).toEqual([]);
    });

    it('should handle mixed case queries', () => {
      const result = filterCountries(mockCountries, 'United States');
      expect(result).toEqual([{ code: 'US', name: 'United States' }]);
    });
  });

  describe('findCountry', () => {
    it('should return undefined when query is empty', () => {
      const result = findCountry(mockCountries, '');
      expect(result).toBeUndefined();
    });

    it('should return undefined when query is whitespace', () => {
      const result = findCountry(mockCountries, '   ');
      expect(result).toBeUndefined();
    });

    it('should find exact country by name (case-insensitive)', () => {
      const result = findCountry(mockCountries, 'united states');
      expect(result).toEqual({ code: 'US', name: 'United States' });
    });

    it('should find exact country by code (case-insensitive)', () => {
      const result = findCountry(mockCountries, 'us');
      expect(result).toEqual({ code: 'US', name: 'United States' });
    });

    it('should return undefined when no exact match found', () => {
      const result = findCountry(mockCountries, 'united');
      expect(result).toBeUndefined();
    });

    it('should handle mixed case queries', () => {
      const result = findCountry(mockCountries, 'United States');
      expect(result).toEqual({ code: 'US', name: 'United States' });
    });
  });

  describe('getCountrySuggestions', () => {
    it('should return limited countries when query is empty', () => {
      const result = getCountrySuggestions(mockCountries, '', 5);
      expect(result).toEqual(mockCountries.slice(0, 5));
    });

    it('should limit the number of suggestions', () => {
      const result = getCountrySuggestions(mockCountries, '', 3);
      expect(result).toEqual(mockCountries.slice(0, 3));
    });

    it('should return filtered and limited suggestions', () => {
      const result = getCountrySuggestions(mockCountries, 'a', 2);
      expect(result).toEqual([
        { code: 'US', name: 'United States' },
        { code: 'CA', name: 'Canada' },
      ]);
    });

    it('should return all filtered results when limit is higher than matches', () => {
      const result = getCountrySuggestions(mockCountries, 'united', 10);
      expect(result).toEqual([
        { code: 'US', name: 'United States' },
        { code: 'GB', name: 'United Kingdom' },
      ]);
    });

    it('should default to limit of 10', () => {
      const manyCountries = Array.from({ length: 15 }, (_, index) => ({
        code: `C${index}`,
        name: `Country ${index}`,
      }));

      const result = getCountrySuggestions(manyCountries, '');
      expect(result).toHaveLength(10);
    });
  });
});
