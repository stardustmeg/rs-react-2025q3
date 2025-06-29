import React, { Component } from 'react';

import type { Character } from '@/types';

import CharacterCard from '@/components/CharacterCard';

class CardList extends Component<{ characters: Character[] }> {
  public override render(): React.ReactNode {
    const { characters } = this.props;
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {characters.map((char) => (
          <CharacterCard character={char} key={char.id} />
        ))}
      </div>
    );
  }
}

export default CardList;
