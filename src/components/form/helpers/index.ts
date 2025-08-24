type ErrorType = string | undefined | { message?: string };

export function getErrorMessage(error: ErrorType): string | undefined {
  if (!error) {
    return undefined;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (typeof error === 'object' && 'message' in error) {
    return error.message;
  }

  return undefined;
}
