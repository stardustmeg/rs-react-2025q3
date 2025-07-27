import type { TransformedCharacter } from '@/types';

import CharacterCard from '@/components/CharacterCard';
import NoResultsFound from '@/components/NoResultsFound';

interface CardListProps {
  characters: TransformedCharacter[];
}

const CardList: React.FC<CardListProps> = ({ characters }: CardListProps) => {
  return (
    <div className="min-h-screen" data-testid="card-list">
      {characters.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {characters.map((char) => (
            <CharacterCard character={char} key={char.id} />
          ))}
        </div>
      ) : (
        <NoResultsFound />
      )}
    </div>
  );
};

export default CardList;
