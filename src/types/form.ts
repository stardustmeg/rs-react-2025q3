import type { genders } from '@/constants';

export interface Country {
  code: string;
  name: string;
}

export interface FormData {
  acceptTerms: boolean;
  age: number;
  confirmPassword: string;
  country: string;
  email: string;
  formType: FormType;
  gender: Gender;
  id: string;
  name: string;
  password: string;
  picture: string;
  timestamp: number;
}

type FormType = 'react-hook-form' | 'uncontrolled';

type Gender = (typeof genders)[number];
