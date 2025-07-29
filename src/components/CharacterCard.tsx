import React from 'react';
import { Link, useSearchParams } from 'react-router';

import type { TransformedCharacter } from '@/types';

import CharacterImage from '@/components/CharacterImage';
import useStore from '@/store';
import { stopPropagation } from '@/utils';

interface CharacterCardProps {
  character: TransformedCharacter;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const { id, image, info, name } = character;
  const [searchParams] = useSearchParams();

  const { isCharacterSelected, toggleSelectedCharacter } = useStore();
  const isSelected = isCharacterSelected(character);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    stopPropagation(event);
    toggleSelectedCharacter(character);
  };

  return (
    <article
      className="mx-auto h-full w-full rounded-lg bg-white p-2 shadow-md transition-transform duration-300 hover:scale-101"
      data-testid="character-card"
    >
      <Link to={`${id}?${searchParams}`}>
        <div className="flex flex-col items-center rounded-t-lg bg-custom-beige p-4">
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
                className="peer-checked:border-bg-custom-blue relative flex h-6 w-6 cursor-pointer items-center justify-center rounded-md border-2 border-gray-300 bg-white transition-all duration-200 peer-checked:bg-custom-blue peer-focus:ring-2 peer-focus:ring-custom-pistachio hover:border-custom-light-gray hover:shadow-md"
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
            <p className="mb-2 text-center text-lg font-semibold">{name}</p>
          </div>
          <CharacterImage alt={name} src={image} />
        </div>
        <div className="space-y-2 rounded-b-lg bg-white py-4 text-sm">
          {info.map(({ label, value }) => (
            <div key={label}>
              <span className="font-semibold">{label}:</span> {value}
            </div>
          ))}
        </div>
      </Link>
    </article>
  );
};

export default CharacterCard;
