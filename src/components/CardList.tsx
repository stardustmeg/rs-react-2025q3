import type { Character } from '@/types/index';

import CharacterCard from '@/components/CharacterCard';
import NoResultsFound from '@/components/NoResultsFound';

interface CardListProps {
  characters: Character[];
  isCharacterSelected: (character: Character) => boolean;
  onToggleCharacter: (character: Character) => void;
  priorityCount?: number;
}

const CardList: React.FC<CardListProps> = ({
  characters,
  isCharacterSelected,
  onToggleCharacter,
  priorityCount = 0,
}: CardListProps) => {
  return (
    <div className="min-h-screen">
      {characters.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {characters.map((char, index) => (
            <CharacterCard
              character={char}
              isSelected={isCharacterSelected(char)}
              key={char.id}
              onToggle={() => {
                onToggleCharacter(char);
              }}
              priority={index < priorityCount}
            />
          ))}
        </div>
      ) : (
        <NoResultsFound />
      )}
    </div>
  );
};

export default CardList;
