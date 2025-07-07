import type { HttpError } from '@/types';

const createHttpError = (status: number, statusText: string): HttpError => {
  const error = new Error(`Error ${status}: ${statusText}`);
  return Object.assign(error, { status });
};

export default createHttpError;
