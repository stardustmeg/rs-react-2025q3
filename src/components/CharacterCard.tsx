import React, { type JSX } from 'react';
import { useNavigate } from 'react-router';

import type { Character } from '@/types';

import CharacterImage from '@/components/CharacterImage';

const LABELS = { gender: 'Gender', origin: 'Origin', species: 'Species', status: 'Status' } as const;

interface CharacterCardProps {
  character: Character;
}

type LabelsType = (typeof LABELS)[keyof typeof LABELS];

const CharacterCard = ({ character }: CharacterCardProps): JSX.Element => {
  const navigate = useNavigate();
  const { gender, id, image, name, origin, species, status } = character;

  const info: [label: LabelsType, value: string][] = [
    [LABELS.origin, origin.name],
    [LABELS.species, species],
    [LABELS.gender, gender],
    [LABELS.status, status],
  ];

  return (
    <article
      className="mx-auto w-68 rounded-lg bg-white p-2 shadow-md transition-transform duration-300 hover:scale-101"
      data-testid="character-card"
      onClick={() => {
        navigate(String(id));
      }}
    >
      <div className="flex flex-col items-center rounded-t-lg bg-custom-beige p-4">
        <p className="mb-2 text-center text-lg font-semibold">{name}</p>
        <CharacterImage alt={name} src={image} />
      </div>
      <div className="space-y-2 rounded-b-lg bg-white py-4 text-sm">
        {info.map(([label, value]) => (
          <p key={label}>
            <span className="font-semibold">{label}:</span> {value}
          </p>
        ))}
      </div>
    </article>
  );
};

export default React.memo(CharacterCard);
