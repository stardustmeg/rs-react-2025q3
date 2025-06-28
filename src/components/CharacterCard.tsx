import React, { Component } from 'react';

import type { Character } from '@/types';

class CharacterCard extends Component<{ character: Character }> {
  public override render(): React.ReactNode {
    const { character } = this.props;
    return (
      <div className="card flex flex-col rounded-lg bg-white p-4 shadow-md">
        <p>{character.name}</p>
        <img alt={character.name} src={character.image} />
      </div>
    );
  }
}

export default CharacterCard;
