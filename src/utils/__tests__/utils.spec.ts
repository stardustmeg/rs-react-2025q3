import { describe, expect, it } from 'vitest';

import { capitalize } from '@/utils';
import { checkPasswordStrength, getPasswordStrengthText } from '@/utils/checkPasswordStrength';
import { validateFile } from '@/utils/fileUtils';

describe('Password Strength Validation', () => {
  describe('checkPasswordStrength', () => {
    it('should return strong password for all criteria met', () => {
      const password = 'StrongP@ss123';
      const result = checkPasswordStrength(password);

      expect(result.strength).toBe('Strong');
      expect(result.score).toBe(4);
      expect(result.criteria).toEqual({ hasLower: true, hasNumber: true, hasSpecial: true, hasUpper: true });
    });

    it('should return medium password for 2-3 criteria met', () => {
      const passwords = ['StrongP@ss', 'strong123', 'STRONG123', 'Strong123'];

      for (const password of passwords) {
        const result = checkPasswordStrength(password);
        expect(result.strength).toBe('Medium');
        expect(result.score).toBeGreaterThanOrEqual(2);
        expect(result.score).toBeLessThanOrEqual(3);
      }
    });

    it('should return weak password for only 1 criterion met', () => {
      const passwords = ['strong', 'STRONG', '123456', '!@#$%^'];

      for (const password of passwords) {
        const result = checkPasswordStrength(password);
        expect(result.strength).toBe('Weak');
        expect(result.score).toBe(1);
      }
    });

    it('should return empty strength for no criteria met', () => {
      const password = '';
      const result = checkPasswordStrength(password);

      expect(result.strength).toBe('');
      expect(result.score).toBe(0);
      expect(result.criteria).toEqual({ hasLower: false, hasNumber: false, hasSpecial: false, hasUpper: false });
    });

    it('should correctly identify individual criteria', () => {
      expect(checkPasswordStrength('password').criteria.hasLower).toBe(true);
      expect(checkPasswordStrength('password').criteria.hasUpper).toBe(false);

      expect(checkPasswordStrength('PASSWORD').criteria.hasUpper).toBe(true);
      expect(checkPasswordStrength('PASSWORD').criteria.hasLower).toBe(false);

      expect(checkPasswordStrength('123456').criteria.hasNumber).toBe(true);
      expect(checkPasswordStrength('123456').criteria.hasLower).toBe(false);

      expect(checkPasswordStrength('!@#$%^').criteria.hasSpecial).toBe(true);
      expect(checkPasswordStrength('!@#$%^').criteria.hasNumber).toBe(false);
    });
  });

  describe('getPasswordStrengthText', () => {
    it('should return the strength text from checkPasswordStrength', () => {
      const password = 'StrongP@ss123';
      const result = getPasswordStrengthText(password);

      expect(result).toBe('Strong');
      expect(result).toBe(checkPasswordStrength(password).strength);
    });

    it('should handle all strength levels', () => {
      expect(getPasswordStrengthText('StrongP@ss123')).toBe('Strong');
      expect(getPasswordStrengthText('Medium123')).toBe('Medium');
      expect(getPasswordStrengthText('weak')).toBe('Weak');
      expect(getPasswordStrengthText('')).toBe('');
    });
  });
});

describe('File Utilities', () => {
  describe('validateFile', () => {
    it('should validate valid image file', () => {
      const validFile = new File([''], 'test.png', { type: 'image/png' });
      Object.defineProperty(validFile, 'size', { value: 1024 * 1024 });

      const result = validateFile(validFile);

      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should reject file that is too large', () => {
      const largeFile = new File([''], 'test.png', { type: 'image/png' });
      Object.defineProperty(largeFile, 'size', { value: 10 * 1024 * 1024 });

      const result = validateFile(largeFile);

      expect(result.isValid).toBe(false);
      expect(result.error).toContain('File size must be less than');
    });

    it('should reject unsupported file format', () => {
      const invalidFile = new File([''], 'test.gif', { type: 'image/gif' });
      Object.defineProperty(invalidFile, 'size', { value: 1024 * 1024 });

      const result = validateFile(invalidFile);

      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Only PNG and JPEG files are allowed');
    });

    it('should handle multiple validation errors', () => {
      const invalidFile = new File([''], 'test.gif', { type: 'image/gif' });
      Object.defineProperty(invalidFile, 'size', { value: 10 * 1024 * 1024 });

      const result = validateFile(invalidFile);

      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });
  });
});

describe('String Utilities', () => {
  describe('capitalize', () => {
    it('should capitalize the first letter of a lowercase word', () => {
      const result = capitalize('hello');
      expect(result).toBe('Hello');
    });

    it('should handle already capitalized words', () => {
      const result = capitalize('Hello');
      expect(result).toBe('Hello');
    });

    it('should handle all uppercase words', () => {
      const result = capitalize('HELLO');
      expect(result).toBe('HELLO');
    });

    it('should handle single character strings', () => {
      expect(capitalize('a')).toBe('A');
      expect(capitalize('A')).toBe('A');
    });

    it('should handle empty strings', () => {
      const result = capitalize('');
      expect(result).toBe('');
    });

    it('should handle strings with multiple words', () => {
      const result = capitalize('hello world');
      expect(result).toBe('Hello world');
    });

    it('should handle strings with special characters', () => {
      expect(capitalize('!hello')).toBe('!hello');
      expect(capitalize('@world')).toBe('@world');
      expect(capitalize('123abc')).toBe('123abc');
    });

    it('should handle strings with numbers at the beginning', () => {
      const result = capitalize('123hello');
      expect(result).toBe('123hello');
    });

    it('should handle strings with spaces at the beginning', () => {
      const result = capitalize(' hello');
      expect(result).toBe(' hello');
    });

    it('should handle strings with punctuation', () => {
      expect(capitalize('hello, world!')).toBe('Hello, world!');
      expect(capitalize('test-case')).toBe('Test-case');
    });

    it('should handle edge cases and type safety', () => {
      expect(typeof capitalize).toBe('function');
      expect(capitalize.length).toBe(1);
    });
  });
});
