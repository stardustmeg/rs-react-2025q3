'use client';

import type { JSX } from 'react';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import myPhoto from '@/assets/png/my-photo.png';
import { Link } from '@/i18n/routing';

export default function AboutPage(): JSX.Element {
  const t = useTranslations('about');

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-4">
      <div className="flex max-w-[80%] flex-col place-items-center gap-4 transition-all duration-300">
        <Image
          alt="Meg's Avatar"
          className="mb-4 h-32 w-32 rounded-full border-2 border-custom-pink"
          height={128}
          priority
          src={myPhoto}
          width={128}
        />
        <a
          className="text-xl font-bold text-custom-dark-night transition-all duration-300 hover:underline dark:text-custom-green dark:hover:text-custom-pistachio"
          href="https://github.com/stardustmeg"
          rel="noopener noreferrer"
          target="_blank"
        >
          {t('githubProfile')}
        </a>
        <p className="text-center text-custom-coal dark:text-custom-gray">{t('description')}</p>

        <a
          className="text-xl font-bold text-custom-chocolate transition-all duration-300 hover:underline dark:text-custom-yellow dark:hover:text-custom-blue"
          href="https://rs.school/courses/reactjs"
          rel="noopener noreferrer"
          target="_blank"
        >
          {t('rsSchoolCourse')}
        </a>

        <Link
          className="text-xl font-bold text-custom-dark-night transition-all duration-300 hover:underline dark:text-custom-green dark:hover:text-custom-pistachio"
          href="/"
        >
          {t('backHome')}
        </Link>
      </div>
    </div>
  );
}
