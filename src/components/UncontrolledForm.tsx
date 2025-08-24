import clsx from 'clsx';
import { type JSX, useRef, useState } from 'react';
import { z } from 'zod';

import type { FormData } from '@/types/form';

import { FormFooter } from '@/components/FormFooter';
import { PasswordStrengthBar } from '@/components/PasswordStrengthBar';
import { TogglePasswordVisibilityButton } from '@/components/TogglePasswordVisibilityButton';
import { genders } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { addSubmission } from '@/store/slices/formSlice';
import styles from '@/styles/Form.module.css';
import { capitalize } from '@/utils';
import { checkPasswordStrength, type PasswordStrengthResult } from '@/utils/checkPasswordStrength';
import { fileToBase64, validateFile } from '@/utils/fileUtils';
import { formSchema } from '@/validation/schemas';

type FormErrors = Record<string, string>;

interface UncontrolledFormProps {
  onClose: () => void;
}

export function UncontrolledForm({ onClose }: UncontrolledFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.countries);

  const [errors, setErrors] = useState<FormErrors>({});
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

  const formReference = useRef<HTMLFormElement>(null);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const password = event.target.value;
    const strengthResult = checkPasswordStrength(password);
    setPasswordStrength(strengthResult);
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword((previous) => !previous);
  };

  const toggleConfirmPasswordVisibility = (): void => {
    setShowConfirmPassword((previous) => !previous);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);

      const pictureFile = formData.get('picture') as File;
      let pictureBase64 = '';

      if (pictureFile.size > 0) {
        const validation = validateFile(pictureFile);
        if (!validation.isValid) {
          setErrors({ picture: validation.error ?? 'Invalid file' });
          setIsSubmitting(false);
          return;
        }
        pictureBase64 = await fileToBase64(pictureFile);
      }

      const formValues = {
        acceptTerms: formData.get('acceptTerms') === 'on',
        age: Number(formData.get('age')),
        confirmPassword: formData.get('confirmPassword'),
        country: formData.get('country'),
        email: formData.get('email'),
        gender: formData.get('gender'),
        name: formData.get('name'),
        password: formData.get('password'),
        picture: pictureBase64,
      };

      const validatedData = formSchema.parse(formValues);

      const submission: FormData = {
        id: crypto.randomUUID(),
        ...validatedData,
        formType: 'uncontrolled',
        timestamp: Date.now(),
      };

      dispatch(addSubmission(submission));
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: FormErrors = {};
        for (const issue of error.issues) {
          if (issue.path.length > 0) {
            fieldErrors[issue.path[0] as string] = issue.message;
          }
        }
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} noValidate onSubmit={handleSubmit} ref={formReference}>
      <div className={styles.formGroup}>
        <label htmlFor="uncontrolled-name">Name *</label>
        <input className={clsx(errors.name && styles.error)} id="uncontrolled-name" name="name" type="text" />
        {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="uncontrolled-age">Age *</label>
        <input
          className={clsx(errors.age && styles.error)}
          id="uncontrolled-age"
          max="120"
          min="1"
          name="age"
          type="number"
        />
        {errors.age && <span className={styles.errorMessage}>{errors.age}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="uncontrolled-email">Email *</label>
        <input className={clsx(errors.email && styles.error)} id="uncontrolled-email" name="email" type="text" />
        {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="uncontrolled-password">Password *</label>
        <div className={styles.passwordInputContainer}>
          <input
            className={clsx(errors.password && styles.error)}
            id="uncontrolled-password"
            name="password"
            onChange={handlePasswordChange}
            type={showPassword ? 'text' : 'password'}
          />
          <TogglePasswordVisibilityButton
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          />
        </div>
        {passwordStrength.strength && (
          <PasswordStrengthBar score={passwordStrength.score} strength={passwordStrength.strength} />
        )}
        {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="uncontrolled-confirmPassword">Confirm Password *</label>
        <div className={styles.passwordInputContainer}>
          <input
            className={clsx(errors.confirmPassword && styles.error)}
            id="uncontrolled-confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
          />
          <TogglePasswordVisibilityButton
            showPassword={showConfirmPassword}
            togglePasswordVisibility={toggleConfirmPasswordVisibility}
          />
        </div>
        {errors.confirmPassword && <span className={styles.errorMessage}>{errors.confirmPassword}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="uncontrolled-gender">Gender *</label>
        <select className={clsx(errors.gender && styles.error)} id="uncontrolled-gender" name="gender">
          {genders.map((gender) => (
            <option key={gender} value={gender}>
              {capitalize(gender)}
            </option>
          ))}
        </select>
        {errors.gender && <span className={styles.errorMessage}>{errors.gender}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="uncontrolled-country">Country *</label>
        <input
          className={clsx(errors.country && styles.error)}
          id="uncontrolled-country"
          list="countries-list"
          name="country"
          type="text"
        />
        <datalist id="countries-list">
          {countries.map((country) => (
            <option key={country.code} value={country.name} />
          ))}
        </datalist>
        {errors.country && <span className={styles.errorMessage}>{errors.country}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="uncontrolled-picture">Picture *</label>
        <input
          accept="image/png,image/jpeg,image/jpg"
          className={clsx(errors.picture && styles.error)}
          id="uncontrolled-picture"
          name="picture"
          type="file"
        />
        {errors.picture && <span className={styles.errorMessage}>{errors.picture}</span>}
      </div>

      <div className={clsx(styles.formGroup, styles.checkboxGroup)}>
        <label className={styles.checkboxLabel}>
          <input className={clsx(errors.acceptTerms && styles.error)} name="acceptTerms" type="checkbox" />
          <span>I accept the Terms and Conditions *</span>
        </label>
        {errors.acceptTerms && <span className={styles.errorMessage}>{errors.acceptTerms}</span>}
      </div>

      <FormFooter isSubmitting={isSubmitting} onCancel={onClose} />
    </form>
  );
}
