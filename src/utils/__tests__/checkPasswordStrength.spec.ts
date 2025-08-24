import { describe, expect, it } from 'vitest';

import { checkPasswordStrength, getPasswordStrengthText } from '@/utils/checkPasswordStrength';

describe('checkPasswordStrength', () => {
  describe('empty password', () => {
    it('returns empty strength for empty password', () => {
      const result = checkPasswordStrength('');

      expect(result.strength).toBe('');
      expect(result.score).toBe(0);
      expect(result.criteria.hasLower).toBe(false);
      expect(result.criteria.hasUpper).toBe(false);
      expect(result.criteria.hasNumber).toBe(false);
      expect(result.criteria.hasSpecial).toBe(false);
    });
  });

  describe('weak passwords (score = 1)', () => {
    it('returns Weak for password with only lowercase letters', () => {
      const result = checkPasswordStrength('password');

      expect(result.strength).toBe('Weak');
      expect(result.score).toBe(1);
      expect(result.criteria.hasLower).toBe(true);
      expect(result.criteria.hasUpper).toBe(false);
      expect(result.criteria.hasNumber).toBe(false);
      expect(result.criteria.hasSpecial).toBe(false);
    });

    it('returns Weak for password with only uppercase letters', () => {
      const result = checkPasswordStrength('PASSWORD');

      expect(result.strength).toBe('Weak');
      expect(result.score).toBe(1);
      expect(result.criteria.hasLower).toBe(false);
      expect(result.criteria.hasUpper).toBe(true);
    });

    it('returns Weak for password with only numbers', () => {
      const result = checkPasswordStrength('123456');

      expect(result.strength).toBe('Weak');
      expect(result.score).toBe(1);
      expect(result.criteria.hasNumber).toBe(true);
    });

    it('returns Weak for password with only special characters', () => {
      const result = checkPasswordStrength('!@#$%');

      expect(result.strength).toBe('Weak');
      expect(result.score).toBe(1);
      expect(result.criteria.hasSpecial).toBe(true);
    });
  });

  describe('medium passwords (score = 2)', () => {
    it('returns Medium for password with lowercase and uppercase', () => {
      const result = checkPasswordStrength('Password');

      expect(result.strength).toBe('Medium');
      expect(result.score).toBe(2);
      expect(result.criteria.hasLower).toBe(true);
      expect(result.criteria.hasUpper).toBe(true);
      expect(result.criteria.hasNumber).toBe(false);
      expect(result.criteria.hasSpecial).toBe(false);
    });

    it('returns Medium for password with lowercase and numbers', () => {
      const result = checkPasswordStrength('password123');

      expect(result.strength).toBe('Medium');
      expect(result.score).toBe(2);
      expect(result.criteria.hasLower).toBe(true);
      expect(result.criteria.hasUpper).toBe(false);
      expect(result.criteria.hasNumber).toBe(true);
      expect(result.criteria.hasSpecial).toBe(false);
    });

    it('returns Medium for password with lowercase and special characters', () => {
      const result = checkPasswordStrength('password!');

      expect(result.strength).toBe('Medium');
      expect(result.score).toBe(2);
      expect(result.criteria.hasLower).toBe(true);
      expect(result.criteria.hasUpper).toBe(false);
      expect(result.criteria.hasNumber).toBe(false);
      expect(result.criteria.hasSpecial).toBe(true);
    });

    it('returns Medium for password with uppercase and numbers', () => {
      const result = checkPasswordStrength('PASSWORD123');

      expect(result.strength).toBe('Medium');
      expect(result.score).toBe(2);
    });

    it('returns Medium for password with uppercase and special characters', () => {
      const result = checkPasswordStrength('PASSWORD!');

      expect(result.strength).toBe('Medium');
      expect(result.score).toBe(2);
    });

    it('returns Medium for password with numbers and special characters', () => {
      const result = checkPasswordStrength('123!@#');

      expect(result.strength).toBe('Medium');
      expect(result.score).toBe(2);
    });
  });

  describe('medium passwords (score = 3)', () => {
    it('returns Medium for password with lowercase, uppercase, and numbers', () => {
      const result = checkPasswordStrength('Password123');

      expect(result.strength).toBe('Medium');
      expect(result.score).toBe(3);
      expect(result.criteria.hasLower).toBe(true);
      expect(result.criteria.hasUpper).toBe(true);
      expect(result.criteria.hasNumber).toBe(true);
      expect(result.criteria.hasSpecial).toBe(false);
    });

    it('returns Medium for password with lowercase, uppercase, and special characters', () => {
      const result = checkPasswordStrength('Password!');

      expect(result.strength).toBe('Medium');
      expect(result.score).toBe(3);
      expect(result.criteria.hasLower).toBe(true);
      expect(result.criteria.hasUpper).toBe(true);
      expect(result.criteria.hasNumber).toBe(false);
      expect(result.criteria.hasSpecial).toBe(true);
    });

    it('returns Medium for password with lowercase, numbers, and special characters', () => {
      const result = checkPasswordStrength('password123!');

      expect(result.strength).toBe('Medium');
      expect(result.score).toBe(3);
    });

    it('returns Medium for password with uppercase, numbers, and special characters', () => {
      const result = checkPasswordStrength('PASSWORD123!');

      expect(result.strength).toBe('Medium');
      expect(result.score).toBe(3);
    });
  });

  describe('perfect passwords (score = 4)', () => {
    it('returns Strong for password with all criteria met', () => {
      const result = checkPasswordStrength('Password123!');

      expect(result.strength).toBe('Strong');
      expect(result.score).toBe(4);
      expect(result.criteria.hasLower).toBe(true);
      expect(result.criteria.hasUpper).toBe(true);
      expect(result.criteria.hasNumber).toBe(true);
      expect(result.criteria.hasSpecial).toBe(true);
    });

    it('handles complex strong password', () => {
      const result = checkPasswordStrength('MySecureP@ssw0rd!');

      expect(result.strength).toBe('Strong');
      expect(result.score).toBe(4);
      expect(result.criteria.hasLower).toBe(true);
      expect(result.criteria.hasUpper).toBe(true);
      expect(result.criteria.hasNumber).toBe(true);
      expect(result.criteria.hasSpecial).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('handles password with spaces', () => {
      const result = checkPasswordStrength('Pass word 123!');

      expect(result.score).toBe(4);
      expect(result.strength).toBe('Strong');
    });

    it('handles very long password', () => {
      const longPassword = 'a'.repeat(100) + 'A' + '1' + '!';
      const result = checkPasswordStrength(longPassword);

      expect(result.score).toBe(4);
      expect(result.strength).toBe('Strong');
    });

    it('handles password with only spaces', () => {
      const result = checkPasswordStrength('   ');

      expect(result.score).toBe(0);
      expect(result.strength).toBe('');
    });

    it('handles password with mixed case but same letter', () => {
      const result = checkPasswordStrength('aaaAAA');

      expect(result.score).toBe(2);
      expect(result.strength).toBe('Medium');
      expect(result.criteria.hasLower).toBe(true);
      expect(result.criteria.hasUpper).toBe(true);
    });
  });

  describe('special character detection', () => {
    it('recognizes various special characters', () => {
      const specialChars = [
        '!',
        '@',
        '#',
        '$',
        '%',
        '^',
        '&',
        '*',
        '(',
        ')',
        ',',
        '.',
        '?',
        '"',
        ':',
        '{',
        '}',
        '|',
        '<',
        '>',
      ];

      for (const char of specialChars) {
        const result = checkPasswordStrength(`password${char}`);
        expect(result.criteria.hasSpecial).toBe(true);
      }
    });

    it('does not recognize non-special characters as special', () => {
      const nonSpecialChars = ['a', 'A', '1', ' ', '-', '_', '+', '=', '[', ']', '/', '\\'];

      for (const char of nonSpecialChars) {
        const result = checkPasswordStrength(`password${char}`);
        expect(result.criteria.hasSpecial).toBe(false);
      }
    });
  });
});

describe('getPasswordStrengthText', () => {
  it('returns the strength text from checkPasswordStrength', () => {
    expect(getPasswordStrengthText('')).toBe('');
    expect(getPasswordStrengthText('password')).toBe('Weak');
    expect(getPasswordStrengthText('Password')).toBe('Medium');
    expect(getPasswordStrengthText('Password123')).toBe('Medium');
    expect(getPasswordStrengthText('Password123!')).toBe('Strong');
  });

  it('is consistent with checkPasswordStrength results', () => {
    const testPasswords = ['', 'weak', 'Medium123', 'StrongPass123!', 'SUPER_COMPLEX_P@ssw0rd!'];

    for (const password of testPasswords) {
      const directResult = checkPasswordStrength(password);
      const textResult = getPasswordStrengthText(password);

      expect(textResult).toBe(directResult.strength);
    }
  });
});
