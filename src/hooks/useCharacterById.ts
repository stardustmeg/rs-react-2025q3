import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import type { Character, TransformedCharacter } from '@/types';

import { fetchCharacterById } from '@/services/api';
import { isHttpError } from '@/types/helpers';
import { getErrorMessage } from '@/utils';

const NOT_FOUND_ERROR_CODE = 404;

interface CharacterState {
  character: null | TransformedCharacter;
  error: null | string;
  loading: boolean;
}

interface UseCharacterReturn extends CharacterState {
  retry: () => void;
}

// eslint-disable-next-line max-lines-per-function
export const useCharacterById = (): UseCharacterReturn => {
  const { id } = useParams<{ id: string }>();

  const [state, setState] = useState<CharacterState>({
    character: null,
    error: null,
    loading: false,
  });

  const loadCharacter = (characterId: string): void => {
    setState({ character: null, error: null, loading: true });

    fetchCharacterById(characterId)
      .then((character: Character) => {
        const { gender, id, image, name, origin, species, status } = character;

        const info = [
          { label: 'Gender', value: gender },
          { label: 'Origin', value: origin.name },
          { label: 'Species', value: species },
          { label: 'Status', value: status },
        ] as const;

        setState({
          character: {
            gender,
            id: String(id),
            image,
            info,
            name,
            origin: origin.name,
            species,
            status,
          },
          error: null,
          loading: false,
        });
      })
      .catch((error: unknown) => {
        setState({
          character: null,
          error: isHttpError(error) && error.status === NOT_FOUND_ERROR_CODE ? null : getErrorMessage(error),
          loading: false,
        });
      });
  };

  useEffect(() => {
    if (id) {
      loadCharacter(id);
    }
  }, [id]);

  return {
    ...state,
    retry: (): void => {
      if (id) {
        loadCharacter(id);
      }
    },
  };
};
