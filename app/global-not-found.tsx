import type { JSX } from 'react';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function GlobalNotFound(): JSX.Element {
  const t = useTranslations('notFound');

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center space-y-6 p-6 text-center">
          <div className="mx-auto flex max-w-[80%] flex-col place-items-center gap-4 transition-all duration-300">
            <h1 className="text-3xl font-bold text-custom-coal dark:text-custom-gray">{t('title')}</h1>

            <p className="max-w-md text-lg text-custom-coal dark:text-custom-gray">{t('description')}</p>

            <Link
              className="text-xl font-bold text-custom-coal transition-all duration-300 hover:underline dark:text-custom-green dark:hover:text-custom-yellow"
              href="/"
            >
              {t('backHome')}
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
