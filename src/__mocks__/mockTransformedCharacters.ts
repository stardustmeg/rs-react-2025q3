import type { TransformedCharacter } from '@/types';

export const mockTransformedCharacters: TransformedCharacter[] = [
  {
    gender: 'Male',
    id: '1',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    info: [
      { label: 'Gender', value: 'Male' },
      { label: 'Origin', value: 'Mock Earth (C-137)' },
      { label: 'Species', value: 'Human' },
      { label: 'Status', value: 'Alive' },
    ],
    name: 'Mock Rick Sanchez',
    origin: 'Mock Earth (C-137)',
    species: 'Human',
    status: 'Alive',
  },
  {
    gender: 'Male',
    id: '2',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    info: [
      { label: 'Gender', value: 'Male' },
      { label: 'Origin', value: 'Mock unknown' },
      { label: 'Species', value: 'Human' },
      { label: 'Status', value: 'Alive' },
    ],
    name: 'Mock Morty Smith',
    origin: 'Mock unknown',
    species: 'Human',
    status: 'Alive',
  },
  {
    gender: 'Female',
    id: '3',
    image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
    info: [
      { label: 'Gender', value: 'Female' },
      { label: 'Origin', value: 'Mock Earth (Replacement Dimension)' },
      { label: 'Species', value: 'Human' },
      { label: 'Status', value: 'Alive' },
    ],
    name: 'Mock Summer Smith',
    origin: 'Mock Earth (Replacement Dimension)',
    species: 'Human',
    status: 'Alive',
  },
  {
    gender: 'Female',
    id: '4',
    image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
    info: [
      { label: 'Gender', value: 'Female' },
      { label: 'Origin', value: 'Mock Earth (Replacement Dimension)' },
      { label: 'Species', value: 'Human' },
      { label: 'Status', value: 'Alive' },
    ],
    name: 'Mock Beth Smith',
    origin: 'Mock Earth (Replacement Dimension)',
    species: 'Human',
    status: 'Alive',
  },
];
