'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

import errorImage from '@/assets/png/rick_and_morty.png';

const ErrorFallback: React.FC = () => {
  const t = useTranslations('search');

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-6 text-center">
      <Image alt="Error illustration" className="h-auto w-64" height={256} priority src={errorImage} width={256} />
      <p className="max-w-md text-lg text-custom-red dark:text-red-400">{t('error')}</p>
    </div>
  );
};

export default ErrorFallback;
