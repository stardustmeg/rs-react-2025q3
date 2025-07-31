import type { Character, TransformedCharacter } from '@/types';

export const transformCharacter = (character: Character): TransformedCharacter => {
  const { gender, id, image, name, origin, species, status } = character;

  const info = [
    { label: 'Gender', value: gender },
    { label: 'Origin', value: origin.name },
    { label: 'Species', value: species },
    { label: 'Status', value: status },
  ] as const;

  return { gender, id: String(id), image, info, name, origin: origin.name, species, status };
};
