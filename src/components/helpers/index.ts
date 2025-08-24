import type { FieldConfig } from '@/components/types';
import type { FormData } from '@/types/form';

import { capitalize } from '@/utils';

export const getFieldConfigs = (submission: FormData): FieldConfig[] => {
  const { acceptTerms, age, confirmPassword, country, email, gender, password, timestamp } = submission;

  return [
    { label: 'Age:', value: age },
    { label: 'Email:', value: email },
    { label: 'Password:', value: password },
    { label: 'Confirm Password:', value: confirmPassword },
    { label: 'Gender:', value: capitalize(gender) },
    { label: 'Country:', value: country },
    { label: 'Terms Accepted:', value: acceptTerms ? 'Yes' : 'No' },
    { label: 'Submitted:', value: new Date(timestamp).toLocaleString() },
  ];
};
