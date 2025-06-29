import React, { PureComponent } from 'react';

import type { Character } from '@/types';

import CharacterImage from '@/components/CharacterImage';

const LABELS = { gender: 'Gender', origin: 'Origin', species: 'Species', status: 'Status' } as const;

type LabelsType = (typeof LABELS)[keyof typeof LABELS];

interface Props {
  character: Character;
}

class CharacterCard extends PureComponent<Props> {
  public override render(): React.ReactNode {
    const { character } = this.props;
    const { gender, image, name, origin, species, status } = character;

    const info: [label: LabelsType, value: string][] = [
      [LABELS.origin, origin.name],
      [LABELS.species, species],
      [LABELS.gender, gender],
      [LABELS.status, status],
    ];

    return (
      <div className="mx-auto w-68 rounded-lg bg-white p-2 shadow-md transition-transform duration-300 hover:scale-101">
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
      </div>
    );
  }
}

export default CharacterCard;
