export const DEFAULT_REQUIRED_NUMBER = 1;

export const password = {
  LOWERCASE: /.*[a-z].*/,
  MIN_LENGTH: 8,
  NUMBER: /.*\d.*/,
  SPECIAL_CHARACTER: /.*[!@#$%^&*(),.?":{}|<>].*/,
  UPPERCASE: /.*[A-Z].*/,
};

export const image = {
  FORMATS: /^data:image\/(png|jpeg|jpg);base64,/,
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_FORMATS: ['image/png', 'image/jpeg', 'image/jpg'],
};

export const age = {
  MAX: 120,
  MIN: 1,
};

export const name = {
  MAX: 100,
  MIN: 2,
  START_WITH_UPPERCASE: /^[A-Z]/,
};
