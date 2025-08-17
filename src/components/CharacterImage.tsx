'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useState } from 'react';

import fallbackImage from '@/assets/png/placeholder.png';
import Skeleton from '@/components/Skeleton';
import { cn } from '@/utils/index';

interface CharacterImageProps {
  alt: string;
  priority?: boolean;
  src: string;
}

const CharacterImage: React.FC<CharacterImageProps> = ({ alt, priority = false, src }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const t = useTranslations('character');

  return (
    <div className="relative h-full min-h-56 w-full min-w-56 overflow-hidden rounded">
      {!loaded && !error && <Skeleton />}
      <Image
        alt={error ? t('imageNotAvailable') : alt}
        className={cn([
          'h-full w-full object-cover transition-opacity duration-300',
          { 'opacity-0': !loaded && !error, 'opacity-100': loaded || error },
        ])}
        height={300}
        onError={() => {
          setError(true);
        }}
        onLoad={() => {
          setLoaded(true);
        }}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        src={error ? fallbackImage : src}
        width={300}
      />
    </div>
  );
};

export default CharacterImage;
