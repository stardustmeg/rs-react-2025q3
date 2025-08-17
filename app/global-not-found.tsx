import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { type JSX } from 'react';

import '@/app/globals.css';
import errorImage from '@/assets/png/rick_and_morty_eyes.png';

export default function NotFound(): JSX.Element {
  const t = useTranslations('notFound');

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center space-y-6 p-6 text-center">
          <div className="flex max-w-[80%] flex-col place-items-center gap-4 transition-all duration-300">
            <Image
              alt="Error illustration"
              className="h-auto max-w-2/3"
              height={400}
              priority
              src={errorImage}
              width={400}
            />
            <h1 className="text-3xl font-bold text-custom-coal">{t('title')}</h1>

            <p className="max-w-md text-lg text-custom-coal">{t('description')}</p>

            <Link className="text-xl font-bold text-custom-coal transition-all duration-300 hover:underline" href="/">
              {t('backHome')}
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
