import type { FormData } from '@/types/form';

export const mockSubmission: FormData = {
  acceptTerms: true,
  age: 25,
  confirmPassword: 'password123',
  country: 'Test Country',
  email: 'test@example.com',
  formType: 'react-hook-form',
  gender: 'male',
  id: 'test-id',
  name: 'Test User',
  password: 'password123',
  picture: '',
  timestamp: Date.now(),
};
