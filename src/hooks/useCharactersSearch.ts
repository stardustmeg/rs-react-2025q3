import { useEffect, useState } from 'react';

import type { Character, TransformedCharacter } from '@/types';

import { fetchCharacters } from '@/services/api';
import { isHttpError } from '@/types/helpers';
import { getErrorMessage } from '@/utils';

const NOT_FOUND_ERROR_CODE = 404;

interface CharactersState {
  characters: TransformedCharacter[];
  error: null | string;
  loading: boolean;
}

interface UseCharactersReturn extends CharactersState {
  retry: () => void;
}

export const useCharactersSearch = (search: string): UseCharactersReturn => {
  const [state, setState] = useState<CharactersState>({ characters: [], error: null, loading: false });

  const loadCharacters = (query: string): void => {
    setState((previous) => ({ ...previous, error: null, loading: true }));

    fetchCharacters({ name: query })
      .then((data) => {
        const transformed = (data.results ?? []).map((character: Character): TransformedCharacter => {
          const { gender, id, image, name, origin, species, status } = character;

          const info = [
            { label: 'Gender', value: gender },
            { label: 'Origin', value: origin.name },
            { label: 'Species', value: species },
            { label: 'Status', value: status },
          ] as const;

          return { gender, id: String(id), image, info, name, origin: origin.name, species, status };
        });

        setState({ characters: transformed, error: null, loading: false });
      })
      .catch((error: unknown) => {
        setState({
          characters: [],
          error: isHttpError(error) && error.status === NOT_FOUND_ERROR_CODE ? null : getErrorMessage(error),
          loading: false,
        });
      });
  };

  useEffect(() => {
    loadCharacters(search);
  }, [search]);

  return {
    ...state,
    retry: (): void => {
      loadCharacters(search);
    },
  };
};
