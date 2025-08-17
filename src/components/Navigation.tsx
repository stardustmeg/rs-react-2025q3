import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';

const Navigation: React.FC = () => {
  const t = useTranslations('nav');

  return (
    <nav className="flex items-center gap-2">
      <div className="flex space-x-4">
        <Link className="text-white transition hover:text-white/80 dark:text-gray-200 dark:hover:text-white" href="/">
          {t('home')}
        </Link>
        <Link
          className="text-white transition hover:text-white/80 dark:text-gray-200 dark:hover:text-white"
          href="/about"
        >
          {t('about')}
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
