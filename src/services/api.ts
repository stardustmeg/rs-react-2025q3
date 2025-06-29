import type { Character, Info } from '@/types';

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
      throw new Error('Response structure is invalid');
    }

    return data;
  }
}

const apiService = new ApiService();

interface FetchCharactersParameters {
  pageNumber?: number;
  perPage?: number;
  query?: string;
}

export const fetchCharacters = ({
  pageNumber = 1,
  perPage = 20,
  query,
}: FetchCharactersParameters): Promise<Info<Character[]>> => {
  const BASE = 'https://rickandmortyapi.com/api/character';
  const url = query ? `${BASE}/?name=${encodeURIComponent(query)}&page=${pageNumber}&count=${perPage}` : BASE;
  return apiService.get<Info<Character[]>>(url, isCharacterInfo);
};
