import type { Character, CharacterFilter, Info } from '@/types';

import createHttpError from '@/services/utils/httpError';
import { isCharacterInfo } from '@/types/helpers';

const WRONG_STRUCTURE_ERROR_MESSAGE = 'Response structure is invalid';

type Validator<T> = (data: unknown) => data is T;

const apiFetch = async <T>(url: string, validate: Validator<T>): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw createHttpError(response.status, response.statusText);
  }

  const data: unknown = await response.json();

  if (!validate(data)) {
    throw new Error(WRONG_STRUCTURE_ERROR_MESSAGE);
  }

  return data;
};

export const fetchCharacters = ({ name, page = 1 }: CharacterFilter): Promise<Info<Character[]>> => {
  const BASE = 'https://rickandmortyapi.com/api/character';
  const url = name ? `${BASE}/?name=${encodeURIComponent(name)}&page=${page}` : `${BASE}/?page=${page}`;
  return apiFetch<Info<Character[]>>(url, isCharacterInfo);
};

export const isCharacter = (data: unknown): data is Character => {
  return typeof data === 'object' && data !== null && 'id' in data && 'name' in data;
};

export const fetchCharacterById = (id: string): Promise<Character> => {
  const url = `https://rickandmortyapi.com/api/character/${id}`;
  return apiFetch<Character>(url, isCharacter);
};
