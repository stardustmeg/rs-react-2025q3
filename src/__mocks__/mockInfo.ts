import type { Character, Info } from '@/types';

import { mockCharacters } from '@/__mocks__/mockCharacters';

export const mockInfo: Info<Character[]> = {
  info: { count: 0, next: null, pages: 0, prev: null },
  results: mockCharacters,
};
