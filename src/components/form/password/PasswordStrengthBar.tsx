import type { JSX } from 'react';

import type { PasswordStrength } from '@/utils/checkPasswordStrength';

import styles from '@/styles/PasswordStrengthBar.module.css';

interface PasswordStrengthBarProps {
  score: number;
  strength: PasswordStrength;
}

const getStrengthColor = (strength: PasswordStrength): string => {
  switch (strength) {
    case 'Medium': {
      return '#d97706';
    }
    case 'Strong': {
      return '#16a34a';
    }
    case 'Weak': {
      return '#dc2626';
    }
    default: {
      return '#d1d5db';
    }
  }
};

const getStrengthLabel = (strength: PasswordStrength): string => {
  switch (strength) {
    case 'Medium': {
      return 'Medium strength';
    }
    case 'Strong': {
      return 'Strong password';
    }
    case 'Weak': {
      return 'Weak password';
    }
    default: {
      return 'Enter password';
    }
  }
};

export function PasswordStrengthBar({ score, strength }: PasswordStrengthBarProps): JSX.Element {
  const percentage = (score / 4) * 100;

  return (
    <div className={styles.strengthContainer} data-testid="password-strength-container">
      <div className={styles.strengthBar} data-testid="password-strength-bar">
        <div
          className={styles.strengthFill}
          data-testid="password-strength-fill"
          style={{
            backgroundColor: getStrengthColor(strength),
            width: `${percentage}%`,
          }}
        />
      </div>
      <span className={styles.strengthText} data-testid="password-strength-text">
        {getStrengthLabel(strength)}
      </span>
    </div>
  );
}
