import { Link } from 'react-router';

import type { TransformedCharacter } from '@/types';

import CharacterImage from '@/components/CharacterImage';

interface CharacterCardProps {
  character: TransformedCharacter;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }: CharacterCardProps) => {
  const { id, image, info, name } = character;

  return (
    <Link to={id}>
      <article
        className="mx-auto w-68 rounded-lg bg-white p-2 shadow-md transition-transform duration-300 hover:scale-101"
        data-testid="character-card"
      >
        <div className="flex flex-col items-center rounded-t-lg bg-custom-beige p-4">
          <p className="mb-2 text-center text-lg font-semibold">{name}</p>
          <CharacterImage alt={name} src={image} />
        </div>
        <div className="space-y-2 rounded-b-lg bg-white py-4 text-sm">
          {info.map(({ label, value }) => (
            <div key={label}>
              <span className="font-semibold">{label}:</span> {value}
            </div>
          ))}
        </div>
      </article>
    </Link>
  );
};

export default CharacterCard;
