import type { TransformedCharacter } from '@/types';

export const mockIncompleteTransformedCharacter: TransformedCharacter = {
  gender: 'Male',
  id: '2',
  image: '',
  info: [
    { label: 'Gender', value: 'Male' },
    { label: 'Origin', value: 'unknown' },
    { label: 'Species', value: 'Human' },
    { label: 'Status', value: 'Alive' },
  ],
  name: '',
  origin: '',
  species: '',
  status: 'Alive',
};
