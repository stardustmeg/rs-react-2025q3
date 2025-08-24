import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { type JSX, useState } from 'react';
import { useForm } from 'react-hook-form';

import type { FormData } from '@/types/form';
import type { FormSchema } from '@/validation/schemas';

import { FormFooter } from '@/components/form/FormFooter';
import { PasswordStrengthBar } from '@/components/form/password/PasswordStrengthBar';
import { TogglePasswordVisibilityButton } from '@/components/form/password/TogglePasswordVisibilityButton';
import { genders } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { addSubmission } from '@/store/slices/formSlice';
import styles from '@/styles/Form.module.css';
import { capitalize } from '@/utils';
import { checkPasswordStrength, type PasswordStrengthResult } from '@/utils/checkPasswordStrength';
import { fileToBase64, validateFile } from '@/utils/fileUtils';
import { formSchema } from '@/validation/schemas';

interface ReactHookFormProps {
  onClose: () => void;
}

export function ReactHookForm({ onClose }: ReactHookFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.countries);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrengthResult>({
    criteria: {
      hasLower: false,
      hasNumber: false,
      hasSpecial: false,
      hasUpper: false,
    },
    score: 0,
    strength: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    clearErrors,
    formState: { errors, isValid },
    handleSubmit,
    register,
    setError,
    setValue,
    watch,
  } = useForm<FormSchema>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const watchedPassword = watch('password');

  if (watchedPassword) {
    const strengthResult = checkPasswordStrength(watchedPassword);
    if (strengthResult.strength !== passwordStrength.strength) {
      setPasswordStrength(strengthResult);
    }
  }

  const togglePasswordVisibility = (): void => {
    setShowPassword((previous) => !previous);
  };

  const toggleConfirmPasswordVisibility = (): void => {
    setShowConfirmPassword((previous) => !previous);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0];
    if (file) {
      clearErrors('picture');

      const validation = validateFile(file);
      if (!validation.isValid) {
        setError('picture', { message: validation.error });
        return;
      }

      try {
        const base64 = await fileToBase64(file);
        setValue('picture', base64);
      } catch {
        setError('picture', { message: 'Failed to process image' });
      }
    }
  };

  const onSubmit = async (data: FormSchema): Promise<void> => {
    setIsSubmitting(true);
    try {
      const submission: FormData = {
        id: crypto.randomUUID(),
        ...data,
        formType: 'react-hook-form',
        timestamp: Date.now(),
      };

      dispatch(addSubmission(submission));
      onClose();
    } catch (error) {
      console.warn('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} data-testid="rhf-form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formGroup}>
        <label htmlFor="rhf-name">Name *</label>
        <input id="rhf-name" type="text" {...register('name')} className={clsx(errors.name && styles.error)} />
        {errors.name && <span className={styles.errorMessage}>{errors.name.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="rhf-age">Age *</label>
        <input
          autoComplete="age"
          id="rhf-age"
          type="number"
          {...register('age', { valueAsNumber: true })}
          className={clsx(errors.age && styles.error)}
        />
        {errors.age && <span className={styles.errorMessage}>{errors.age.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="rhf-email">Email *</label>
        <input id="rhf-email" type="text" {...register('email')} className={clsx(errors.email && styles.error)} />
        {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="rhf-password">Password *</label>
        <div className={styles.passwordInputContainer}>
          <input
            autoComplete="new-password"
            id="rhf-password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            className={clsx(errors.password && styles.error)}
          />
          <TogglePasswordVisibilityButton
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          />
        </div>
        {passwordStrength.strength && (
          <PasswordStrengthBar score={passwordStrength.score} strength={passwordStrength.strength} />
        )}
        {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="rhf-confirmPassword">Confirm Password *</label>
        <div className={styles.passwordInputContainer}>
          <input
            autoComplete="new-password"
            data-testid="rhf-confirm-password"
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            {...register('confirmPassword')}
            className={clsx(errors.confirmPassword && styles.error)}
          />
          <TogglePasswordVisibilityButton
            showPassword={showConfirmPassword}
            togglePasswordVisibility={toggleConfirmPasswordVisibility}
          />
        </div>
        {errors.confirmPassword && <span className={styles.errorMessage}>{errors.confirmPassword.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="rhf-gender">Gender *</label>
        <select id="rhf-gender" {...register('gender')} className={clsx(errors.gender && styles.error)}>
          {genders.map((gender) => (
            <option key={gender} value={gender}>
              {capitalize(gender)}
            </option>
          ))}
        </select>
        {errors.gender && <span className={styles.errorMessage}>{errors.gender.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="rhf-country">Country *</label>
        <input
          autoComplete="country"
          id="rhf-country"
          type="text"
          {...register('country')}
          className={clsx(errors.country && styles.error)}
          list="rhf-countries-list"
        />
        <datalist data-testid="rhf-countries-list" id="rhf-countries-list">
          {countries.map((country) => (
            <option key={country.code} value={country.name} />
          ))}
        </datalist>
        {errors.country && <span className={styles.errorMessage}>{errors.country.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="rhf-picture">Picture *</label>
        <input
          accept="image/png,image/jpeg,image/jpg"
          className={clsx(errors.picture && styles.error)}
          id="rhf-picture"
          onChange={handleFileChange}
          type="file"
        />
        {errors.picture && <span className={styles.errorMessage}>{errors.picture.message}</span>}
      </div>

      <div className={clsx(styles.formGroup, styles.checkboxGroup)}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" {...register('acceptTerms')} className={clsx(errors.acceptTerms && styles.error)} />
          <span>I accept the Terms and Conditions *</span>
        </label>
        {errors.acceptTerms && <span className={styles.errorMessage}>{errors.acceptTerms.message}</span>}
      </div>

      <FormFooter isSubmitting={isSubmitting} isValid={isValid} onCancel={onClose} />
    </form>
  );
}
