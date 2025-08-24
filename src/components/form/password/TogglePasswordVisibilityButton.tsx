import type { JSX } from 'react';

import styles from '@/styles/Form.module.css';

interface TogglePasswordVisibilityButtonProps {
  showPassword: boolean;
  togglePasswordVisibility: () => void;
}

export function TogglePasswordVisibilityButton({
  showPassword,
  togglePasswordVisibility,
}: TogglePasswordVisibilityButtonProps): JSX.Element {
  return (
    <button
      aria-label={showPassword ? 'Hide password' : 'Show password'}
      className={styles.passwordToggle}
      onClick={() => {
        togglePasswordVisibility();
      }}
      type="button"
    >
      {showPassword ? '🙈' : '👁️'}
    </button>
  );
}
