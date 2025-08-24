import { describe, expect, it } from 'vitest';

import { genders, HIGHLIGHT_DURATION } from '@/constants';

describe('Constants', () => {
  describe('genders', () => {
    it('is an array with correct length', () => {
      expect(Array.isArray(genders)).toBe(true);
      expect(genders).toHaveLength(6);
    });

    it('contains all expected gender options', () => {
      expect(genders).toContain('male');
      expect(genders).toContain('female');
      expect(genders).toContain('other');
      expect(genders).toContain('prefer not to say');
      expect(genders).toContain('prefer to self-describe');
      expect(genders).toContain('identify as bread');
    });

    it('has correct order of gender options', () => {
      expect(genders[0]).toBe('male');
      expect(genders[1]).toBe('female');
      expect(genders[2]).toBe('other');
      expect(genders[3]).toBe('prefer not to say');
      expect(genders[4]).toBe('prefer to self-describe');
      expect(genders[5]).toBe('identify as bread');
    });

    it('all gender options are strings', () => {
      for (const gender of genders) {
        expect(typeof gender).toBe('string');
      }
    });

    it('all gender options are lowercase', () => {
      for (const gender of genders) {
        expect(gender).toBe(gender.toLowerCase());
      }
    });

    it('no duplicate gender options', () => {
      const uniqueGenders = [...new Set(genders)];
      expect(genders).toHaveLength(uniqueGenders.length);
    });

    it('all gender options have reasonable length', () => {
      for (const gender of genders) {
        expect(gender.length).toBeGreaterThan(0);
        expect(gender.length).toBeLessThan(50);
      }
    });
  });

  describe('HIGHLIGHT_DURATION', () => {
    it('is a number', () => {
      expect(typeof HIGHLIGHT_DURATION).toBe('number');
    });

    it('has a reasonable value for highlight duration', () => {
      expect(HIGHLIGHT_DURATION).toBeGreaterThan(0);
      expect(HIGHLIGHT_DURATION).toBeLessThan(10_000);
    });

    it('has the expected value', () => {
      expect(HIGHLIGHT_DURATION).toBe(3000);
    });

    it('is a reasonable duration for UI feedback', () => {
      expect(HIGHLIGHT_DURATION).toBeGreaterThanOrEqual(1000);
      expect(HIGHLIGHT_DURATION).toBeLessThanOrEqual(5000);
    });
  });

  describe('Constants Integration', () => {
    it('constants are properly exported', () => {
      expect(genders).toBeDefined();
      expect(HIGHLIGHT_DURATION).toBeDefined();
    });

    it('constants have correct types', () => {
      expect(genders).toBeInstanceOf(Array);
      expect(typeof HIGHLIGHT_DURATION).toBe('number');
    });
  });
});
