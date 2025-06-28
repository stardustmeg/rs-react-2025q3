import React, { Component } from 'react';

import type { Character } from '@/types';

import CharacterImage from '@/components/CharacterImage';

class CharacterCard extends Component<{ character: Character }> {
  public override render(): React.ReactNode {
    const { character } = this.props;

    return (
      <div className="card flex flex-col rounded-lg bg-white p-4 shadow-md">
        <p className="mb-2 text-center font-semibold">{character.name}</p>
        <CharacterImage alt={character.name} src={character.image} />
      </div>
    );
  }
}

export default CharacterCard;
