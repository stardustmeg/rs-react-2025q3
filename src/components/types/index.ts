import type { JSX } from 'react';

export interface FieldConfig {
  label: string;
  value: JSX.Element | number | string;
}
