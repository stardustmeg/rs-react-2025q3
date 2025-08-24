import { z } from 'zod';

import { genders } from '@/constants';
import { age, DEFAULT_REQUIRED_NUMBER, image, name, password } from '@/validation/constants';

export const fileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= image.MAX_SIZE, `File size must be less than ${image.MAX_SIZE}`)
  .refine((file) => image.SUPPORTED_FORMATS.includes(file.type), 'Only PNG and JPEG files are allowed');

const passwordStrength = z
  .string()
  .min(password.MIN_LENGTH, `Password must be at least ${password.MIN_LENGTH} characters`)
  .regex(password.LOWERCASE, 'Password must contain at least one lowercase letter')
  .regex(password.UPPERCASE, 'Password must contain at least one uppercase letter')
  .regex(password.NUMBER, 'Password must contain at least one number')
  .regex(password.SPECIAL_CHARACTER, 'Password must contain at least one special character');

const pictureBase64Schema = z
  .string()
  .min(DEFAULT_REQUIRED_NUMBER, `Picture is required`)
  .regex(image.FORMATS, 'Invalid image format');

export const formSchema = z
  .object({
    acceptTerms: z.boolean().refine((value) => value, 'You must accept the terms and conditions'),
    age: z
      .number()
      .min(age.MIN, `Age must be greater than ${age.MIN}`)
      .max(age.MAX, `Age must be less than ${age.MAX}`),
    confirmPassword: z.string(),
    country: z.string().min(DEFAULT_REQUIRED_NUMBER, 'Please select a country'),
    email: z.email('Invalid email address'),
    gender: z.enum(genders),
    name: z
      .string()
      .min(name.MIN, `Name must be at least ${name.MIN} characters`)
      .max(name.MAX, `Name must be less than ${name.MAX} characters`)
      .regex(name.START_WITH_UPPERCASE, 'Name must start with an uppercase letter'),
    password: passwordStrength,
    picture: pictureBase64Schema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type FormSchema = z.infer<typeof formSchema>;
