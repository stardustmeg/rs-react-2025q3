import type React from 'react';

import { cn } from '@/utils';

interface PageButtonProps {
  ariaLabel?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  isActive?: boolean;
  onClick: (page: number) => void;
  page: number;
}

export const PageButton: React.FC<PageButtonProps> = ({
  ariaLabel,
  children,
  disabled,
  isActive,
  onClick,
  page,
}: {
  ariaLabel?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  isActive?: boolean;
  onClick: (page: number) => void;
  page: number;
}) => (
  <button
    aria-label={ariaLabel}
    className={cn([
      'flex h-8 w-8 items-center justify-center rounded-full hover:cursor-pointer hover:bg-gray-200 disabled:opacity-50 dark:text-dark-text dark:hover:bg-dark-border',
      isActive && 'bg-custom-pink text-white hover:bg-custom-pink dark:bg-custom-pink/80 dark:hover:bg-custom-pink',
    ])}
    disabled={disabled}
    onClick={() => {
      onClick(page);
    }}
  >
    {children ?? page}
  </button>
);
