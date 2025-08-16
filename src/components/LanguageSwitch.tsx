'use client';

import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { usePathname, useRouter } from '@/i18n/routing';

const LanguageSwitch: React.FC = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleLanguageChange = (newLocale: 'en' | 'ru'): void => {
    const params = searchParams.toString();
    const url = params ? `${pathname}?${params}` : pathname;
    router.push(url, { locale: newLocale });
  };

  return (
    <div className="flex space-x-2">
      <button
        className={`rounded px-2 py-1 text-sm transition ${
          locale === 'en' ? 'bg-custom-blue text-white' : 'text-white hover:bg-white/10 dark:text-gray-200'
        }`}
        onClick={() => { handleLanguageChange('en'); }}
      >
        EN
      </button>
      <button
        className={`rounded px-2 py-1 text-sm transition ${
          locale === 'ru' ? 'bg-custom-blue text-white' : 'text-white hover:bg-white/10 dark:text-gray-200'
        }`}
        onClick={() => { handleLanguageChange('ru'); }}
      >
        RU
      </button>
    </div>
  );
};

export default LanguageSwitch;
