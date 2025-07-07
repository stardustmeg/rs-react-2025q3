import { useEffect, useState } from 'react';

import type { Character } from '@/types';

import { fetchCharacters } from '@/services/api';
import { isHttpError } from '@/types/helpers';
import { getErrorMessage } from '@/utils';

const NOT_FOUND_ERROR_CODE = 404;

interface CharactersState {
  characters: Character[];
  error: null | string;
  loading: boolean;
}

interface UseCharactersReturn extends CharactersState {
  retry: () => void;
}

export const useCharacters = (search: string): UseCharactersReturn => {
  const [state, setState] = useState<CharactersState>({ characters: [], error: null, loading: false });

  const loadCharacters = (query: string): void => {
    setState((previous) => ({ ...previous, error: null, loading: true }));

    fetchCharacters({ name: query })
      .then((data) => {
        setState({ characters: data.results ?? [], error: null, loading: false });
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
