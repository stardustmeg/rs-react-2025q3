import { describe, expect, it } from 'vitest';

import type { Country } from '@/types/form';

import { mockCountries } from '@/__mocks__/mockCountries';
import countriesReducer, { countriesSlice, setCountries } from '@/store/slices/countriesSlice';

describe('countriesSlice', () => {
  const initialState: Country[] = mockCountries;

  describe('initial state', () => {
    it('has the correct initial countries', () => {
      expect(countriesSlice.getInitialState()).toEqual(initialState);
      expect(countriesSlice.getInitialState()).toHaveLength(45);
    });

    it('contains expected countries', () => {
      const state = countriesSlice.getInitialState();

      expect(state).toContainEqual({ code: 'US', name: 'United States' });
      expect(state).toContainEqual({ code: 'GB', name: 'United Kingdom' });
      expect(state).toContainEqual({ code: 'FR', name: 'France' });
      expect(state).toContainEqual({ code: 'DE', name: 'Germany' });
    });
  });

  describe('setCountries action', () => {
    it('replaces the countries with new array', () => {
      const newCountries: Country[] = [
        { code: 'TEST1', name: 'Test Country 1' },
        { code: 'TEST2', name: 'Test Country 2' },
      ];

      const result = countriesReducer(initialState, setCountries(newCountries));

      expect(result).toEqual(newCountries);
      expect(result).toHaveLength(2);
    });

    it('handles empty array', () => {
      const result = countriesReducer(initialState, setCountries([]));

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('handles single country', () => {
      const singleCountry: Country[] = [{ code: 'XX', name: 'Test Country' }];
      const result = countriesReducer(initialState, setCountries(singleCountry));

      expect(result).toEqual(singleCountry);
      expect(result).toHaveLength(1);
    });
  });

  describe('slice configuration', () => {
    it('has correct name', () => {
      expect(countriesSlice.name).toBe('countries');
    });

    it('exports the setCountries action', () => {
      expect(setCountries).toBeDefined();
      expect(typeof setCountries).toBe('function');
    });

    it('exports the reducer as default', () => {
      expect(countriesReducer).toBeDefined();
      expect(typeof countriesReducer).toBe('function');
    });
  });

  describe('country data structure', () => {
    it('all countries have code and name properties', () => {
      const state = countriesSlice.getInitialState();

      for (const country of state) {
        expect(country).toHaveProperty('code');
        expect(country).toHaveProperty('name');
        expect(typeof country.code).toBe('string');
        expect(typeof country.name).toBe('string');
        expect(country.code.length).toBe(2);
      }
    });

    it('all country codes are uppercase', () => {
      const state = countriesSlice.getInitialState();

      for (const country of state) {
        expect(country.code).toBe(country.code.toUpperCase());
      }
    });

    it('no duplicate country codes', () => {
      const state = countriesSlice.getInitialState();
      const codes = state.map((country) => country.code);
      const uniqueCodes = [...new Set(codes)];

      expect(codes).toHaveLength(uniqueCodes.length);
    });
  });
});
