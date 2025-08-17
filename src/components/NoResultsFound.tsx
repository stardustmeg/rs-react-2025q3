'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

import portalImage from '@/assets/gif/portal-rick-and-morty.gif';

const NoResultsFound: React.FC = () => {
  const t = useTranslations('search');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-6 p-6 text-center">
      <p className="max-w-md text-lg text-custom-coal dark:text-dark-text">{t('noResults')}</p>
      <Image alt="No results found" className="h-auto w-64" height={256} priority src={portalImage} width={256} />
    </div>
  );
};

export default NoResultsFound;
