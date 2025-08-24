import { describe, expect, it } from 'vitest';

import type { FormData } from '@/types/form';

import { mockValidFormData } from '@/__mocks__/mockValidFormData';
import { getFieldConfigs } from '@/components/helpers';

describe('getFieldConfigs', () => {
  const mockTimestamp = 1_700_000_000_000;
  const mockDateString = new Date(mockTimestamp).toLocaleString();

  const baseFormData: FormData = { ...mockValidFormData, picture: '', timestamp: mockTimestamp };

  it('should return correct field configs for complete form data', () => {
    const result = getFieldConfigs(baseFormData);

    expect(result).toEqual([
      { label: 'Age:', value: 25 },
      { label: 'Email:', value: 'test@example.com' },
      { label: 'Password:', value: 'Password123!' },
      { label: 'Confirm Password:', value: 'Password123!' },
      { label: 'Gender:', value: 'Male' },
      { label: 'Country:', value: 'United States' },
      { label: 'Terms Accepted:', value: 'Yes' },
      { label: 'Submitted:', value: mockDateString },
    ]);
  });

  it('should handle acceptTerms false', () => {
    const formData = { ...baseFormData, acceptTerms: false };
    const result = getFieldConfigs(formData);

    const termsField = result.find((field) => field.label === 'Terms Accepted:');
    expect(termsField?.value).toBe('No');
  });

  it('should capitalize gender correctly', () => {
    const testCases = [
      { expected: 'Female', gender: 'female' as const },
      { expected: 'Other', gender: 'other' as const },
      { expected: 'Prefer not to say', gender: 'prefer not to say' as const },
    ];

    for (const { expected, gender } of testCases) {
      const formData = { ...baseFormData, gender };
      const result = getFieldConfigs(formData);

      const genderField = result.find((field) => field.label === 'Gender:');
      expect(genderField?.value).toBe(expected);
    }
  });

  it('should handle different age values', () => {
    const testCases = [0, 1, 18, 99, 120];

    for (const age of testCases) {
      const formData = { ...baseFormData, age };
      const result = getFieldConfigs(formData);

      const ageField = result.find((field) => field.label === 'Age:');
      expect(ageField?.value).toBe(age);
    }
  });

  it('should handle empty strings for string fields', () => {
    const formData = { ...baseFormData, confirmPassword: '', country: '', email: '', password: '' };

    const result = getFieldConfigs(formData);

    expect(result[1]).toEqual({ label: 'Email:', value: '' });
    expect(result[5]).toEqual({ label: 'Country:', value: '' });
    expect(result[2]).toEqual({ label: 'Password:', value: '' });
    expect(result[3]).toEqual({ label: 'Confirm Password:', value: '' });
  });

  it('should return exactly 8 fields', () => {
    const result = getFieldConfigs(baseFormData);
    expect(result).toHaveLength(8);
  });

  it('should handle timestamp correctly', () => {
    const timestamp = Date.now();
    const expectedDateString = new Date(timestamp).toLocaleString();

    const formData = { ...baseFormData, timestamp };
    const result = getFieldConfigs(formData);

    const submittedField = result.find((field) => field.label === 'Submitted:');
    expect(submittedField?.value).toBe(expectedDateString);
  });
});
