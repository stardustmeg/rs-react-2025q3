import { describe, expect, it } from 'vitest';

import { validFormData } from '@/__mocks__/validFormData';
import { age, image, name, password } from '@/validation/constants';
import { fileSchema, formSchema } from '@/validation/schemas';

describe('Form Validation Schemas', () => {
  describe('fileSchema', () => {
    it('should validate valid image files', () => {
      const validFiles = [
        { size: 1024 * 1024, type: 'image/png' },
        { size: 2 * 1024 * 1024, type: 'image/jpeg' },
        { size: 1024 * 512, type: 'image/jpg' },
      ];

      for (const { size, type } of validFiles) {
        const file = new File([''], 'test.png', { type });
        Object.defineProperty(file, 'size', { value: size });

        const result = fileSchema.safeParse(file);
        expect(result.success).toBe(true);
      }
    });

    it('should reject files that are too large', () => {
      const largeFile = new File([''], 'large.png', { type: 'image/png' });
      const LARGE_FILE_SIZE = 6 * 1024 * 1024;
      Object.defineProperty(largeFile, 'size', { value: LARGE_FILE_SIZE });

      const result = fileSchema.safeParse(largeFile);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0]?.message).toContain('File size must be less than');
    });

    it('should reject unsupported file formats', () => {
      const invalidFiles = [
        { name: 'test.gif', type: 'image/gif' },
        { name: 'test.webp', type: 'image/webp' },
        { name: 'test.txt', type: 'text/plain' },
      ];

      for (const { name, type } of invalidFiles) {
        const file = new File([''], name, { type });
        const FILE_SIZE = 1024 * 1024;
        Object.defineProperty(file, 'size', { value: FILE_SIZE });

        const result = fileSchema.safeParse(file);
        expect(result.success).toBe(false);
        expect(result.error?.issues[0]?.message).toContain('Only PNG and JPEG files are allowed');
      }
    });
  });

  describe('formSchema', () => {
    it('should validate complete valid form data', () => {
      const result = formSchema.safeParse(validFormData);
      expect(result.success).toBe(true);
    });

    it('should validate individual field constraints', () => {
      expect(() => formSchema.parse({ ...validFormData, name: 'J' })).toThrow();
      expect(() => formSchema.parse({ ...validFormData, name: 'A'.repeat(101) })).toThrow();
      expect(() => formSchema.parse({ ...validFormData, name: 'john doe' })).toThrow();

      expect(() => formSchema.parse({ ...validFormData, age: 0 })).toThrow();
      expect(() => formSchema.parse({ ...validFormData, age: 121 })).toThrow();

      expect(() => formSchema.parse({ ...validFormData, email: 'invalid-email' })).toThrow();

      expect(() => formSchema.parse({ ...validFormData, password: 'weak' })).toThrow();
      expect(() => formSchema.parse({ ...validFormData, password: 'NoSpecial123' })).toThrow();
    });

    it('should validate password confirmation matching', () => {
      const dataWithMismatchedPasswords = {
        ...validFormData,
        confirmPassword: 'DifferentP@ss123',
        password: 'StrongP@ss123',
      };

      const result = formSchema.safeParse(dataWithMismatchedPasswords);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0]?.message).toContain("Passwords don't match");
    });

    it('should require terms acceptance', () => {
      const dataWithoutTerms = {
        ...validFormData,
        acceptTerms: false,
      };

      const result = formSchema.safeParse(dataWithoutTerms);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0]?.message).toContain('You must accept the terms and conditions');
    });

    it('should validate picture format', () => {
      const dataWithInvalidPicture = {
        ...validFormData,
        picture: 'invalid-base64',
      };

      const result = formSchema.safeParse(dataWithInvalidPicture);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0]?.message).toContain('Invalid image format');
    });

    it('should validate gender enum', () => {
      const dataWithInvalidGender = {
        ...validFormData,
        gender: 'invalid-gender',
      };

      const result = formSchema.safeParse(dataWithInvalidGender);
      expect(result.success).toBe(false);
    });
  });

  describe('Validation Constants', () => {
    it('should have correct password regex patterns', () => {
      expect(password.LOWERCASE.test('password')).toBe(true);
      expect(password.LOWERCASE.test('PASSWORD')).toBe(false);

      expect(password.UPPERCASE.test('PASSWORD')).toBe(true);
      expect(password.UPPERCASE.test('password')).toBe(false);

      expect(password.NUMBER.test('pass123')).toBe(true);
      expect(password.NUMBER.test('password')).toBe(false);

      expect(password.SPECIAL_CHARACTER.test('pass@word')).toBe(true);
      expect(password.SPECIAL_CHARACTER.test('password')).toBe(false);
    });

    it('should have correct image format regex', () => {
      expect(image.FORMATS.test('data:image/png;base64,')).toBe(true);
      expect(image.FORMATS.test('data:image/jpeg;base64,')).toBe(true);
      expect(image.FORMATS.test('data:image/jpg;base64,')).toBe(true);
      expect(image.FORMATS.test('data:image/gif;base64,')).toBe(false);
      expect(image.FORMATS.test('invalid-format')).toBe(false);
    });

    it('should have correct age limits', () => {
      expect(age.MIN).toBe(1);
      expect(age.MAX).toBe(120);
    });

    it('should have correct name limits', () => {
      expect(name.MIN).toBe(2);
      expect(name.MAX).toBe(100);
      expect(name.START_WITH_UPPERCASE.test('John')).toBe(true);
      expect(name.START_WITH_UPPERCASE.test('john')).toBe(false);
    });
  });
});
