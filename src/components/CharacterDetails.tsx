'use client';

import { useTranslations } from 'next-intl';

import type { Character } from '@/types/index';

import CharacterImage from '@/components/CharacterImage';

interface CharacterDetailsProps {
  character: Character;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ character }: CharacterDetailsProps) => {
  const t = useTranslations('character');
  const { gender, image, name, origin, species, status } = character;

  const info = [
    { label: t('gender'), value: gender },
    { label: t('origin'), value: origin.name },
    { label: t('species'), value: species },
    { label: t('status'), value: status },
  ];

  return (
    <>
      <div className="flex flex-col items-center bg-white p-2 dark:bg-dark-card">
        <h2 className="mb-4 text-center text-2xl font-semibold text-gray-900 dark:text-dark-text">{name}</h2>
        <CharacterImage alt={name} priority src={image} />
      </div>

      <div className="flex-1 space-y-4 overflow-auto bg-white p-6 dark:bg-dark-card">
        {info.map(({ label, value }) => (
          <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-dark-border" key={label}>
            <span className="font-medium text-gray-700 dark:text-gray-300">{label}</span>
            <span className="text-gray-900 dark:text-dark-text">{value}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default CharacterDetails;
