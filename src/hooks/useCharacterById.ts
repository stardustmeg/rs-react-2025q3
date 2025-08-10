import { useParams } from 'react-router';

import type { TransformedCharacter } from '@/types';

import { useCharacterQuery } from '@/hooks/queries/useCharacterQuery';
import { isHttpError } from '@/types/helpers';

const NOT_FOUND_ERROR_CODE = 404;

interface FetchStatus {
  status: 'error' | 'loading' | 'ready';
}

interface UseCharacterByIdReturn {
  character: null | TransformedCharacter;
  status: FetchStatus;
}

export const useCharacterById = (): UseCharacterByIdReturn => {
  const { id } = useParams<{ id: string }>();

  const { character, error, isError, isLoading } = useCharacterQuery(id ?? '');

  const status: FetchStatus = ((): FetchStatus => {
    if (isLoading) {
      return { status: 'loading' };
    }
    if (isError) {
      if (isHttpError(error) && error.status === NOT_FOUND_ERROR_CODE) {
        return { status: 'ready' };
      }
      return { status: 'error' };
    }
    return { status: 'ready' };
  })();

  const finalCharacter = isError && isHttpError(error) && error.status === NOT_FOUND_ERROR_CODE ? null : character;

  return { character: finalCharacter, status };
};
