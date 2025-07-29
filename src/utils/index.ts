import type { ChangeEvent } from 'react';

import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const getErrorMessage = (error: unknown): string => (error instanceof Error ? error.message : 'Unknown error');

export const stopPropagation = (event: ChangeEvent<HTMLInputElement> | React.MouseEvent): void => {
  event.stopPropagation();
};

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
