import type { FormData } from '@/types/form';

export const mockSubmissions: FormData[] = [
  {
    acceptTerms: true,
    age: 25,
    confirmPassword: 'password123',
    country: 'Country 1',
    email: 'user1@example.com',
    formType: 'react-hook-form',
    gender: 'male',
    id: '1',
    name: 'User One',
    password: 'password123',
    picture: '',
    timestamp: Date.now(),
  },
  {
    acceptTerms: false,
    age: 30,
    confirmPassword: 'password456',
    country: 'Country 2',
    email: 'user2@example.com',
    formType: 'uncontrolled',
    gender: 'female',
    id: '2',
    name: 'User Two',
    password: 'password456',
    picture: '',
    timestamp: Date.now(),
  },
];
