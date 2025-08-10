import { useQuery } from '@tanstack/react-query';

import type { CharacterFilter, TransformedCharacter } from '@/types';

import { transformCharacter } from '@/hooks/helpers/transformCharacter';
import { queryKeys } from '@/hooks/queries/keys';
import { fetchCharacters } from '@/services/api';

interface UseCharactersQueryResult {
  characters: TransformedCharacter[];
  error: Error | null;
  isError: boolean;
  isLoading: boolean;
  refetch: () => void;
  totalPages: number;
}

export const useCharactersQuery = (filters: CharacterFilter): UseCharactersQueryResult => {
  const { data, error, isError, isLoading, refetch } = useQuery({
    enabled: true,
    queryFn: () => fetchCharacters(filters),
    queryKey: queryKeys.characters.list(filters),
  });

  const characters = data?.results?.map((character) => transformCharacter(character)) ?? [];
  const totalPages = data?.info?.pages ?? 1;

  return {
    characters,
    error,
    isError,
    isLoading,
    refetch: (): void => {
      void refetch();
    },
    totalPages,
  };
};
