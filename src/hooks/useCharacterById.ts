import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import type { Character, TransformedCharacter } from '@/types';

import { transformCharacter } from '@/hooks/helpers/transformCharacter';
import { fetchCharacterById } from '@/services/api';
import { isHttpError } from '@/types/helpers';

const NOT_FOUND_ERROR_CODE = 404;

interface FetchStatus {
  status: 'error' | 'loading' | 'ready';
}

interface UseCharacterByIdReturn {
  character: null | TransformedCharacter;
  setStatus: (status: FetchStatus) => void;
  status: FetchStatus;
}

export const useCharacterById = (): UseCharacterByIdReturn => {
  const { id } = useParams<{ id: string }>();

  const [character, setCharacter] = useState<null | TransformedCharacter>(null);
  const [status, setStatus] = useState<FetchStatus>({ status: 'loading' });

  const loadCharacter = (characterId: string): void => {
    setStatus({ status: 'loading' });
    setCharacter(null);

    fetchCharacterById(characterId)
      .then((character: Character) => {
        const transformed = transformCharacter(character);

        setCharacter(transformed);
        setStatus({ status: 'ready' });
      })
      .catch((error: unknown) => {
        if (isHttpError(error) && error.status === NOT_FOUND_ERROR_CODE) {
          setCharacter(null);
          setStatus({ status: 'ready' });
        } else {
          setStatus({ status: 'error' });
        }
      });
  };

  useEffect(() => {
    if (id) {
      loadCharacter(id);
    }
  }, [id]);

  return { character, setStatus, status };
};
