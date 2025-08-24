import { describe, expect, it } from 'vitest';

import type { Country, FormData } from '@/types/form';

import { genders } from '@/constants';

describe('Form Types', () => {
  describe('Country type', () => {
    it('should accept valid country objects', () => {
      const validCountries: Country[] = [
        { code: 'US', name: 'United States' },
        { code: 'GB', name: 'United Kingdom' },
        { code: 'FR', name: 'France' },
        { code: 'DE', name: 'Germany' },
        { code: 'JP', name: 'Japan' },
      ];

      for (const country of validCountries) {
        expect(country).toHaveProperty('code');
        expect(country).toHaveProperty('name');
        expect(typeof country.code).toBe('string');
        expect(typeof country.name).toBe('string');
        expect(country.code).toHaveLength(2);
        expect(country.name.length).toBeGreaterThan(0);
      }
    });

    it('should enforce 2-character country codes', () => {
      const validCountry: Country = { code: 'US', name: 'United States' };
      expect(validCountry.code).toHaveLength(2);

      // This would cause a TypeScript error if uncommented:
      // const invalidCountry: Country = { code: 'USA', name: 'United States' };
    });

    it('should enforce required properties', () => {
      const validCountry: Country = { code: 'US', name: 'United States' };

      expect(validCountry.code).toBeDefined();
      expect(validCountry.name).toBeDefined();

      // These would cause TypeScript errors if uncommented:
      // const missingCode: Country = { name: 'United States' };
      // const missingName: Country = { code: 'US' };
    });
  });

  describe('FormData type', () => {
    const validFormData: FormData = {
      acceptTerms: true,
      age: 25,
      confirmPassword: 'SecureP@ss123',
      country: 'United States',
      email: 'john.doe@example.com',
      formType: 'react-hook-form',
      gender: 'male',
      id: 'test-id-123',
      name: 'John Doe',
      password: 'SecureP@ss123',
      picture: 'profile.jpg',
      timestamp: Date.now(),
    };

    it('should accept valid FormData objects', () => {
      expect(validFormData).toHaveProperty('id');
      expect(validFormData).toHaveProperty('formType');
      expect(validFormData).toHaveProperty('name');
      expect(validFormData).toHaveProperty('email');
      expect(validFormData).toHaveProperty('password');
      expect(validFormData).toHaveProperty('confirmPassword');
      expect(validFormData).toHaveProperty('age');
      expect(validFormData).toHaveProperty('gender');
      expect(validFormData).toHaveProperty('country');
      expect(validFormData).toHaveProperty('acceptTerms');
      expect(validFormData).toHaveProperty('picture');
      expect(validFormData).toHaveProperty('timestamp');
    });

    it('should enforce correct data types for FormData properties', () => {
      expect(typeof validFormData.id).toBe('string');
      expect(typeof validFormData.formType).toBe('string');
      expect(typeof validFormData.name).toBe('string');
      expect(typeof validFormData.email).toBe('string');
      expect(typeof validFormData.password).toBe('string');
      expect(typeof validFormData.confirmPassword).toBe('string');
      expect(typeof validFormData.age).toBe('number');
      expect(typeof validFormData.gender).toBe('string');
      expect(typeof validFormData.country).toBe('string');
      expect(typeof validFormData.acceptTerms).toBe('boolean');
      expect(typeof validFormData.picture).toBe('string');
      expect(typeof validFormData.timestamp).toBe('number');
    });

    it('should accept both form types', () => {
      const reactHookForm: FormData = {
        ...validFormData,
        formType: 'react-hook-form',
      };

      const uncontrolledForm: FormData = {
        ...validFormData,
        formType: 'uncontrolled',
      };

      expect(reactHookForm.formType).toBe('react-hook-form');
      expect(uncontrolledForm.formType).toBe('uncontrolled');
    });

    it('should accept all valid gender values', () => {
      for (const gender of genders) {
        const formDataWithGender: FormData = {
          ...validFormData,
          gender,
        };

        expect(genders).toContain(formDataWithGender.gender);
      }
    });

    it('should accept empty picture string', () => {
      const formWithoutPicture: FormData = {
        ...validFormData,
        picture: '',
      };

      expect(formWithoutPicture.picture).toBe('');
      expect(typeof formWithoutPicture.picture).toBe('string');
    });

    it('should enforce positive age', () => {
      const validAges = [1, 18, 25, 65, 100];

      for (const age of validAges) {
        const formWithAge: FormData = {
          ...validFormData,
          age,
        };

        expect(formWithAge.age).toBeGreaterThan(0);
        expect(Number.isInteger(formWithAge.age)).toBe(true);
      }
    });

    it('should accept reasonable timestamp values', () => {
      const currentTime = Date.now();
      const pastTime = currentTime - 1000;
      const futureTime = currentTime + 1000;

      for (const timestamp of [pastTime, currentTime, futureTime]) {
        const formWithTimestamp: FormData = {
          ...validFormData,
          timestamp,
        };

        expect(formWithTimestamp.timestamp).toBeGreaterThan(0);
        expect(typeof formWithTimestamp.timestamp).toBe('number');
      }
    });

    it('should enforce boolean acceptTerms', () => {
      const formWithTrue: FormData = {
        ...validFormData,
        acceptTerms: true,
      };

      const formWithFalse: FormData = {
        ...validFormData,
        acceptTerms: false,
      };

      expect(formWithTrue.acceptTerms).toBe(true);
      expect(formWithFalse.acceptTerms).toBe(false);
      expect(typeof formWithTrue.acceptTerms).toBe('boolean');
      expect(typeof formWithFalse.acceptTerms).toBe('boolean');
    });
  });

  describe('Type compatibility', () => {
    it('should maintain compatibility between Country and FormData', () => {
      const country: Country = { code: 'US', name: 'United States' };
      const formData: FormData = {
        acceptTerms: true,
        age: 25,
        confirmPassword: 'password123',
        country: country.name,
        email: 'test@example.com',
        formType: 'react-hook-form',
        gender: 'male',
        id: 'test-123',
        name: 'Test User',
        password: 'password123',
        picture: '',
        timestamp: Date.now(),
      };

      expect(typeof formData.country).toBe('string');
      expect(formData.country).toBe(country.name);
    });

    it('should work with arrays of FormData', () => {
      const formDataArray: FormData[] = [
        {
          acceptTerms: true,
          age: 20,
          confirmPassword: 'pass1',
          country: 'Country 1',
          email: 'user1@example.com',
          formType: 'react-hook-form',
          gender: 'male',
          id: '1',
          name: 'User 1',
          password: 'pass1',
          picture: '',
          timestamp: Date.now(),
        },
        {
          acceptTerms: false,
          age: 30,
          confirmPassword: 'pass2',
          country: 'Country 2',
          email: 'user2@example.com',
          formType: 'uncontrolled',
          gender: 'female',
          id: '2',
          name: 'User 2',
          password: 'pass2',
          picture: '',
          timestamp: Date.now(),
        },
      ];

      expect(Array.isArray(formDataArray)).toBe(true);
      expect(formDataArray).toHaveLength(2);

      for (const [_index, formData] of formDataArray.entries()) {
        expect(formData).toHaveProperty('id');
        expect(formData).toHaveProperty('formType');
        expect(formData).toHaveProperty('name');
        expect(typeof formData.id).toBe('string');
        expect(typeof formData.age).toBe('number');
        expect(typeof formData.acceptTerms).toBe('boolean');
      }
    });
  });

  describe('Type constraints', () => {
    it('should enforce string ID format', () => {
      const formData: FormData = {
        acceptTerms: true,
        age: 25,
        confirmPassword: 'password',
        country: 'Test Country',
        email: 'test@example.com',
        formType: 'react-hook-form',
        gender: 'male',
        id: 'unique-id-123',
        name: 'Test',
        password: 'password',
        picture: '',
        timestamp: 1_234_567_890,
      };

      expect(typeof formData.id).toBe('string');
      expect(formData.id.length).toBeGreaterThan(0);

      // This would cause a TypeScript error if uncommented:
      // const invalidId: FormData = { ...formData, id: 123 };
    });

    it('should enforce valid form types', () => {
      const validTypes: FormData['formType'][] = ['react-hook-form', 'uncontrolled'];

      for (const formType of validTypes) {
        const formData: FormData = {
          acceptTerms: true,
          age: 25,
          confirmPassword: 'password',
          country: 'Test',
          email: 'test@example.com',
          formType,
          gender: 'male',
          id: 'test',
          name: 'Test',
          password: 'password',
          picture: '',
          timestamp: Date.now(),
        };

        expect(['react-hook-form', 'uncontrolled']).toContain(formData.formType);
      }

      // This would cause a TypeScript error if uncommented:
      // const invalidFormType: FormData = { ...formData, formType: 'invalid-type' };
    });
  });
});
