import React, { Component } from 'react';

import type { Character } from '@/types';

import CharacterCard from '@/components/CharacterCard';
import Loader from '@/components/Loader';
import NoResultsFound from '@/components/NoResultsFound';

interface Props {
  characters: Character[];
  loading: boolean;
}

class CardList extends Component<Props> {
  public override render(): React.ReactNode {
    const { characters, loading } = this.props;

    if (loading) {
      return <Loader />;
    }

    if (!characters.length) {
      return <NoResultsFound />;
    }

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
