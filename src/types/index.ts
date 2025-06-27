export interface ApiResponse<T> {
  data: T;
  status: number;
  statusMessage: string;
}

export interface Character extends ResourceBase {
  episode: string[];
  gender: 'Female' | 'Genderless' | 'Male' | 'unknown';
  image: string;
  location: CharacterLocation;
  origin: CharacterLocation;
  species: string;
  status: 'Alive' | 'Dead' | 'unknown';
  type: string;
}

export interface CharacterFilter {
  /**
   * 'Female' | 'Male' | 'Genderless' | 'unknown'
   */
  gender?: string;
  name?: string;
  page?: number;
  species?: string;
  /**
   * 'Dead' | 'Alive' | 'unknown'
   */
  status?: string;
  type?: string;
}

export interface CharacterLocation {
  name: string;
  url: string;
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

export interface ResourceBase {
  created: string;
  id: number;
  name: string;
  url: string;
}
