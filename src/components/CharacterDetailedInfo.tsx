import { useTranslations } from 'next-intl';
import { JSX } from 'react';

import type { Character } from '@/types/index';

import { cn } from '@/utils/index';

interface CharacterDetailedInfoProps {
  character: Character;
  size?: 'lg' | 'sm';
}

export default function CharacterDetailedInfo({ character, size = 'lg' }: CharacterDetailedInfoProps): JSX.Element {
  const t = useTranslations('character');
  const { gender, origin, species, status } = character;

  const info = [
    { label: t('gender'), value: gender },
    { label: t('origin'), value: origin.name },
    { label: t('species'), value: species },
    { label: t('status'), value: status },
  ];
  return (
    <div
      className={cn([
        'bg-white text-gray-700 dark:bg-dark-card dark:text-dark-text',
        { 'flex-1 space-y-4 overflow-auto p-6': size === 'lg' },
        { 'space-y-2 p-4 text-sm': size === 'sm' },
      ])}
    >
      {info.map(({ label, value }) => (
        <div className="flex justify-between gap-2 border-b border-gray-200 pb-2 dark:border-dark-border" key={label}>
          <span className="font-medium">{label}</span>
          <span className="text-right">{value}</span>
        </div>
      ))}
    </div>
  );
}
