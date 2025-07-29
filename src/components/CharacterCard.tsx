import React from 'react';
import { Link, useSearchParams } from 'react-router';

import type { TransformedCharacter } from '@/types';

import CharacterImage from '@/components/CharacterImage';
import useStore from '@/store';

interface CharacterCardProps {
  character: TransformedCharacter;
}

const handleCheckboxClick = (event: React.MouseEvent): void => {
  event.stopPropagation();
};

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const { id, image, info, name } = character;
  const [searchParams] = useSearchParams();

  const { isCharacterSelected, toggleSelectedCharacter } = useStore();
  const isSelected = isCharacterSelected(character);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.stopPropagation();
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
            <div className="flex place-content-center">
              <input
                checked={isSelected}
                data-testid="character-checkbox"
                onChange={handleCheckboxChange}
                onClick={handleCheckboxClick}
                type="checkbox"
              />
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
