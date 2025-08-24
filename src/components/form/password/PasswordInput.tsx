import clsx from 'clsx';
import { type JSX, useState } from 'react';

import type { UniversalErrors } from '@/types/form';

import { getErrorMessage } from '@/components/form/helpers';
import { PasswordStrengthBar } from '@/components/form/password/PasswordStrengthBar';
import { TogglePasswordVisibilityButton } from '@/components/form/password/TogglePasswordVisibilityButton';
import styles from '@/styles/Form.module.css';
import { checkPasswordStrength, type PasswordStrengthResult } from '@/utils/checkPasswordStrength';

interface PasswordInputProps {
  errors: UniversalErrors;
  id: string;
}
export function PasswordInput({ errors, id }: PasswordInputProps): JSX.Element {
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrengthResult>({
    criteria: { hasLower: false, hasNumber: false, hasSpecial: false, hasUpper: false },
    score: 0,
    strength: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const errorMessage = getErrorMessage(errors.password);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const password = event.target.value;
    const strengthResult = checkPasswordStrength(password);
    setPasswordStrength(strengthResult);
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword((previous) => !previous);
  };
  return (
    <>
      <div className={styles.passwordInputContainer}>
        <input
          autoComplete="new-password"
          className={clsx(errorMessage && styles.error)}
          id={id}
          name={id}
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
    </>
  );
}
