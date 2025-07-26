import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import type { Character, TransformedCharacter } from '@/types';

import { fetchCharacterById } from '@/services/api';
import { isHttpError } from '@/types/helpers';
import { getErrorMessage } from '@/utils';

const NOT_FOUND_ERROR_CODE = 404;

interface FetchStatus {
  status: 'error' | 'loading' | 'ready';
}

interface UseCharacterByIdReturn {
  character: null | TransformedCharacter;
  error: null | string;
  setStatus: (status: FetchStatus) => void;
  status: FetchStatus;
}

export const useCharacterById = (): UseCharacterByIdReturn => {
  const { id } = useParams<{ id: string }>();

  const [character, setCharacter] = useState<null | TransformedCharacter>(null);
  const [error, setError] = useState<null | string>(null);
  const [status, setStatus] = useState<FetchStatus>({ status: 'loading' });

  const loadCharacter = (characterId: string): void => {
    setStatus({ status: 'loading' });
    setError(null);
    setCharacter(null);

    fetchCharacterById(characterId)
      .then((character: Character) => {
        const { gender, id, image, name, origin, species, status } = character;

        const info = [
          { label: 'Gender', value: gender },
          { label: 'Origin', value: origin.name },
          { label: 'Species', value: species },
          { label: 'Status', value: status },
        ] as const;

        setCharacter({
          gender,
          id: String(id),
          image,
          info,
          name,
          origin: origin.name,
          species,
          status,
        });
        setStatus({ status: 'ready' });
      })
      .catch((error: unknown) => {
        if (isHttpError(error) && error.status === NOT_FOUND_ERROR_CODE) {
          setCharacter(null);
          setError(null);
          setStatus({ status: 'ready' });
        } else {
          setError(getErrorMessage(error));
          setStatus({ status: 'error' });
        }
      });
  };

  useEffect(() => {
    if (id) {
      loadCharacter(id);
    }
  }, [id]);

  return { character, error, setStatus, status };
};
