import React, { type JSX } from 'react';

import CharacterCard from '@/components/CharacterCard';
import ErrorFallback from '@/components/ErrorFallback';
import Loader from '@/components/Loader/Loader';
import NoResultsFound from '@/components/NoResultsFound';
import { useCharacters } from '@/hooks/useCharacters';

interface Props {
  search: string;
}

const CardList = ({ search }: Props): JSX.Element => {
  const { characters, error, loading, retry } = useCharacters(search);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorFallback onRetry={retry} />;
  }
  if (characters && !characters.length) {
    return <NoResultsFound />;
  }

  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      data-testid="card-list"
    >
      {characters?.map((char) => (
        <CharacterCard character={char} key={char.id} />
      ))}
    </div>
  );
};

export default React.memo(CardList);
