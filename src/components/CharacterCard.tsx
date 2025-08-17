'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';

import type { Character } from '@/types/index';

import CharacterDetailedInfo from '@/components/CharacterDetailedInfo';
import CharacterImage from '@/components/CharacterImage';
import { Link } from '@/i18n/routing';
import { stopPropagation } from '@/utils/index';

interface CharacterCardProps {
  character: Character;
  isSelected: boolean;
  onToggle: () => void;
  priority?: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, isSelected, onToggle, priority = false }) => {
  const { id, image, name } = character;

  const searchParams = useSearchParams();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    stopPropagation(event);
    onToggle();
  };

  return (
    <article
      className="mx-auto h-full w-full rounded-lg bg-white p-2 shadow-md transition-all duration-300 hover:scale-101 dark:bg-dark-card dark:shadow-gray-800"
      data-testid="character-card"
    >
      <Link href={`/detailed/${id}?${searchParams.toString()}`} scroll={false}>
        <div className="flex flex-col items-center rounded-t-lg bg-custom-beige p-4 dark:bg-gray-700">
          <div className="flex place-content-center gap-2">
            <div className="relative flex place-content-center">
              <input
                checked={isSelected}
                className="peer sr-only"
                data-testid="character-checkbox"
                id={`checkbox-${id}`}
                onChange={handleCheckboxChange}
                onClick={stopPropagation}
                type="checkbox"
              />
              <label
                className="peer-checked:border-bg-custom-blue relative flex h-6 w-6 cursor-pointer items-center justify-center rounded-md border-2 border-gray-300 bg-white transition-all duration-200 peer-checked:bg-custom-blue peer-focus:ring-2 peer-focus:ring-custom-pistachio hover:border-custom-light-gray hover:shadow-md dark:border-gray-600 dark:bg-gray-800"
                htmlFor={`checkbox-${id}`}
                onClick={stopPropagation}
              >
                <svg
                  className={`h-4 w-4 text-white transition-opacity duration-200 ${
                    isSelected ? 'opacity-100' : 'opacity-0'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <polyline points="20,6 9,17 4,12" />
                </svg>
              </label>
            </div>
            <p className="mb-2 text-center text-lg font-semibold text-custom-coal dark:text-dark-text">{name}</p>
          </div>
          <CharacterImage alt={name} priority={priority} src={image} />
        </div>
        <CharacterDetailedInfo character={character} size="sm" />
      </Link>
    </article>
  );
};

export default CharacterCard;
