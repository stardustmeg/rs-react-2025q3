import { fileSchema } from '@/validation/schemas';

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      resolve(reader.result as string);
    });
    reader.addEventListener('error', () => {
      reject(new Error('Failed to read file'));
    });
  });
};

export const validateFile = (file: File): { error?: string; isValid: boolean } => {
  const result = fileSchema.safeParse(file);

  if (!result.success) {
    return { error: result.error.issues[0]?.message ?? 'Invalid file', isValid: false };
  }

  return { isValid: true };
};
