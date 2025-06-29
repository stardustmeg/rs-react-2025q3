import type { Character, CharacterFilter, Info } from '@/types';

import { isCharacterInfo } from '@/types/helpers';

type Validator<T> = (data: unknown) => data is T;

class ApiService {
  public async get<T>(url: string, validate: Validator<T>): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data: unknown = await response.json();

    if (!validate(data)) {
      const errorMessage = `Response structure is invalid`;
      throw new Error(errorMessage);
    }

    return data;
  }
}

const apiService = new ApiService();

export const fetchCharacters = ({ name, page = 1 }: CharacterFilter): Promise<Info<Character[]>> => {
  const base = 'https://rickandmortyapi.com/api/character';
  const url = name ? `${base}/?name=${encodeURIComponent(name)}&page=${page}` : base;
  return apiService.get<Info<Character[]>>(url, isCharacterInfo);
};
