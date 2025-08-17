'use client';

import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import LanguageSwitchButton from '@/components/LanguageSwitchButton';
import { routing, usePathname, useRouter } from '@/i18n/routing';

const LanguageSwitch: React.FC = () => {
  const locale = useLocale();
  const router = useRouter();
  const locales = routing.locales;
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleLanguageChange = (newLocale: typeof locale): void => {
    const params = searchParams.toString();
    const url = params ? `${pathname}?${params}` : pathname;
    router.push(url, { locale: newLocale });
  };

  return (
    <div className="flex space-x-2">
      {locales.map((l) => (
        <LanguageSwitchButton handleLanguageChange={handleLanguageChange} key={l} label={l} locale={locale} />
      ))}
    </div>
  );
};

export default LanguageSwitch;
