export type PasswordStrength = '' | 'Medium' | 'Strong' | 'Weak';

export interface PasswordStrengthResult {
  criteria: {
    hasLower: boolean;
    hasNumber: boolean;
    hasSpecial: boolean;
    hasUpper: boolean;
  };
  score: number;
  strength: PasswordStrength;
}

export const checkPasswordStrength = (password: string): PasswordStrengthResult => {
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const score = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;

  let strength: PasswordStrength = '';
  if (score === 4) {
    strength = 'Strong';
  } else if (score >= 2) {
    strength = 'Medium';
  } else if (score === 1) {
    strength = 'Weak';
  }

  return {
    criteria: {
      hasLower,
      hasNumber,
      hasSpecial,
      hasUpper,
    },
    score,
    strength,
  };
};

export const getPasswordStrengthText = (password: string): string => {
  return checkPasswordStrength(password).strength;
};
