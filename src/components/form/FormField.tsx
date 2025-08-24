import type { UseFormRegister } from 'react-hook-form';

import clsx from 'clsx';
import { type JSX } from 'react';

import type { HTMLInputType, UniversalErrors } from '@/types/form';
import type { FormSchema } from '@/validation/schemas';

import { getErrorMessage } from '@/components/form/helpers';
import styles from '@/styles/Form.module.css';

interface FormFieldProps {
  accept?: string;
  children?: JSX.Element;
  errors: UniversalErrors;
  id: keyof FormSchema;
  isCheckbox?: boolean;
  label?: string;
  max?: string;
  min?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register?: UseFormRegister<FormSchema>;
  type: HTMLInputType;
  valueAsNumber?: boolean;
}

export function FormField({
  accept,
  children,
  errors,
  id,
  isCheckbox = false,
  label,
  max,
  min,
  onChange,
  register,
  type,
  valueAsNumber = false,
}: FormFieldProps): JSX.Element {
  const errorMessage = getErrorMessage(errors[id]);

  return (
    <div className={clsx(!isCheckbox && styles.formGroup, isCheckbox && styles.checkboxGroup)}>
      {label && <label htmlFor={id}>{label}</label>}
      {children ?? (
        <input
          accept={accept}
          autoComplete={id}
          id={id}
          max={max}
          min={min}
          name={id}
          onChange={onChange}
          type={type}
          {...register?.(id, { valueAsNumber })}
          className={clsx(errorMessage && styles.error)}
        />
      )}
      {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
    </div>
  );
}
