export interface Character extends ResourceBase {
  episode: string[];
  gender: CharacterGender;
  image: string;
  location: CharacterLocation;
  origin: CharacterLocation;
  species: string;
  status: CharacterStatus;
  type: string;
}

export interface CharacterFilter {
  gender?: CharacterGender;
  name?: string;
  page?: number;
  species?: string;
  status?: CharacterStatus;
  type?: string;
}

export interface HttpError extends Error {
  status: number;
}

export interface Info<T> {
  info?: {
    count: number;
    next: null | string;
    pages: number;
    prev: null | string;
  };
  results?: T;
}

export interface TransformedCharacter {
  gender: string;
  id: string;
  image: string;
  info: readonly { label: string; value: string }[];
  name: string;
  origin: string;
  species: string;
  status: string;
}

type CharacterGender = 'Female' | 'Genderless' | 'Male' | 'unknown';

interface CharacterLocation {
  name: string;
  url: string;
}

type CharacterStatus = 'Alive' | 'Dead' | 'unknown';

interface ResourceBase {
  created: string;
  id: number;
  name: string;
  url: string;
}
