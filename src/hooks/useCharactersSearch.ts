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
  setStatus: (status: FetchStatus) => void;
  status: FetchStatus;
  totalPages: number;
}

export const useCharactersSearch = (search: string, page: number): UseCharactersReturn => {
  const [characters, setCharacters] = useState<TransformedCharacter[]>([]);
  const [status, setStatus] = useState<FetchStatus>({ status: 'loading' });
  const [totalPages, setTotalPages] = useState(1);

  const loadCharacters = (query: string, pageNumber: number): void => {
    fetchCharacters({ name: query, page: pageNumber })
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
        setTotalPages(data.info?.pages ?? 1);
      })
      .catch((error: unknown) => {
        if (isHttpError(error) && error.status === NOT_FOUND_ERROR_CODE) {
          setCharacters([]);
          setTotalPages(1);
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

  useEffect(() => {
    loadCharacters(search, page);
  }, [search, page]);

  return { characters, setStatus, status, totalPages };
};
