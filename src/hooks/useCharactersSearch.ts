import { useEffect, useState } from 'react';

import type { Character, TransformedCharacter } from '@/types';

import { fetchCharacters } from '@/services/api';
import { isHttpError } from '@/types/helpers';

const NOT_FOUND_ERROR_CODE = 404;

interface FetchStatus {
  status: 'error' | 'loading' | 'ready';
}

interface UseCharactersReturn {
  characters: TransformedCharacter[];
  retry: () => void;
  setStatus: (status: FetchStatus) => void;
  status: FetchStatus;
}

export const useCharactersSearch = (search: string): UseCharactersReturn => {
  const [characters, setCharacters] = useState<TransformedCharacter[]>([]);
  const [status, setStatus] = useState<FetchStatus>({ status: 'loading' });

  const loadCharacters = (query: string): void => {
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

        setCharacters(transformed);
      })
      .catch((error: unknown) => {
        if (isHttpError(error) && error.status === NOT_FOUND_ERROR_CODE) {
          setCharacters([]);
        } else {
          throw error;
        }
      })
      .then(() => {
        setStatus({ status: 'ready' });
      })
      .catch(() => {
        setStatus({ status: 'error' });
      });
  };

  const retry = (): void => {
    loadCharacters(search);
  };

  useEffect(() => {
    loadCharacters(search);
  }, [search]);

  return { characters, retry, setStatus, status };
};
