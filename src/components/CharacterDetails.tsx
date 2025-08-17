import type { Character } from '@/types/index';

import CharacterDetailedInfo from '@/components/CharacterDetailedInfo';
import CharacterImage from '@/components/CharacterImage';

interface CharacterDetailsProps {
  character: Character;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ character }: CharacterDetailsProps) => {
  const { image, name } = character;

  return (
    <>
      <div className="flex flex-col items-center bg-white p-2 dark:bg-dark-card">
        <h2 className="mb-4 text-center text-2xl font-semibold text-gray-900 dark:text-dark-text">{name}</h2>
        <CharacterImage alt={name} priority src={image} />
      </div>

      <CharacterDetailedInfo character={character} size="lg" />
    </>
  );
};

export default CharacterDetails;
