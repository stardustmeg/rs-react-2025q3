import { useQuery } from '@tanstack/react-query';

import type { TransformedCharacter } from '@/types';

import { transformCharacter } from '@/hooks/helpers/transformCharacter';
import { queryKeys } from '@/hooks/queries/keys';
import { fetchCharacterById } from '@/services/api';

interface UseCharacterQueryResult {
  character: null | TransformedCharacter;
  error: Error | null;
  isError: boolean;
  isLoading: boolean;
  refetch: () => void;
}

export const useCharacterQuery = (id: string): UseCharacterQueryResult => {
  const { data, error, isError, isLoading, refetch } = useQuery({
    enabled: Boolean(id),
    queryFn: () => fetchCharacterById(id),
    queryKey: queryKeys.characters.detail(id),
  });

  const character = data ? transformCharacter(data) : null;

  return {
    character,
    error,
    isError,
    isLoading,
    refetch: (): void => {
      void refetch();
    },
  };
};
