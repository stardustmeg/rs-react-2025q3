import type { Character, Info } from '..';

export const isCharacter = (object: unknown): object is Character =>
  typeof object === 'object' && object != null && 'id' in object && 'name' in object;

export const isCharacterInfo = (object: unknown): object is Info<Character[]> =>
  typeof object === 'object' &&
  object != null &&
  'results' in object &&
  Array.isArray(object.results) &&
  object.results.every((item) => isCharacter(item));
