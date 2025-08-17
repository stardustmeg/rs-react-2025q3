import { JSX } from 'react';

import { routing } from '@/i18n/routing';
import { cn } from '@/utils/index';

interface LanguageSwitchButtonProps {
  handleLanguageChange: (newLocale: (typeof routing.locales)[number]) => void;
  label: (typeof routing.locales)[number];
  locale: (typeof routing.locales)[number];
}

export default function LanguageSwitchButton({
  handleLanguageChange,
  label,
  locale,
}: LanguageSwitchButtonProps): JSX.Element {
  return (
    <button
      className={cn([
        `button rounded px-2 py-1 text-sm uppercase transition`,
        {
          'bg-custom-blue text-white dark:bg-custom-green dark:text-custom-coal': locale === label,
          'text-white hover:bg-white/10 dark:text-gray-200': locale !== label,
        },
      ])}
      onClick={() => {
        handleLanguageChange(label);
      }}
    >
      {label}
    </button>
  );
}
