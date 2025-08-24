import type { FormData } from '@/types/form';

export const mockValidFormData: FormData = {
  acceptTerms: true,
  age: 25,
  confirmPassword: 'Password123!',
  country: 'United States',
  email: 'test@example.com',
  formType: 'react-hook-form',
  gender: 'male',
  id: 'test-id-123',
  name: 'John Doe',
  password: 'Password123!',
  picture: 'data:image/png;base64,test',
  timestamp: Date.now(),
};
