import type React from 'react';
import type { FieldErrors } from 'react-hook-form';

import type { genders } from '@/constants';
import type { FormSchema } from '@/validation/schemas';

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

export type FormErrors = Partial<Record<keyof FormSchema, string>>;

export type HTMLInputType = React.HTMLInputTypeAttribute;

export type UniversalErrors = FieldErrors<FormSchema> | FormErrors;

type FormType = 'react-hook-form' | 'uncontrolled';

type Gender = (typeof genders)[number];
