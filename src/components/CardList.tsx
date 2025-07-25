import type { TransformedCharacter } from '@/types';

import CharacterCard from '@/components/CharacterCard';
import NoResultsFound from '@/components/NoResultsFound';

interface CardListProps {
  characters: TransformedCharacter[];
}

const CardList: React.FC<CardListProps> = ({ characters }: CardListProps) => {
  return (
    <div className="min-h-screen">
      <div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        data-testid="card-list"
      >
        {characters.length ? (
          characters.map((char) => <CharacterCard character={char} key={char.id} />)
        ) : (
          <NoResultsFound />
        )}
      </div>
    </div>
  );
};

export default CardList;
