import { useCallback } from 'react';

import type { TransformedCharacter } from '@/types';

import { useCharactersQuery } from '@/hooks/queries/useCharactersQuery';
import { useSearch } from '@/hooks/useSearch';
import { isHttpError } from '@/types/helpers';

const NOT_FOUND_ERROR_CODE = 404;

interface FetchStatus {
  status: 'error' | 'loading' | 'ready';
}

interface UseCharactersReturn {
  characters: TransformedCharacter[];
  handlePagination: (page: number) => void;
  handleSearch: (search: string) => void;
  refresh: () => void;
  searchPage: number;
  searchQuery: string;
  status: FetchStatus;
  totalPages: number;
}

export const useCharactersSearch = (): UseCharactersReturn => {
  const { searchPage, searchQuery, setSearchPage, setSearchParams } = useSearch();

  const { characters, error, isError, isLoading, refetch, totalPages } = useCharactersQuery({
    name: searchQuery,
    page: searchPage,
  });

  const handleSearch = useCallback(
    (currentSearch: string): void => {
      setSearchParams(1, currentSearch);
    },
    [setSearchParams],
  );

  const handlePagination = useCallback(
    (newPage: number): void => {
      setSearchPage(newPage);
    },
    [setSearchPage],
  );

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

  const finalCharacters = isError && isHttpError(error) && error.status === NOT_FOUND_ERROR_CODE ? [] : characters;

  const finalTotalPages = isError && isHttpError(error) && error.status === NOT_FOUND_ERROR_CODE ? 1 : totalPages;

  return {
    characters: finalCharacters,
    handlePagination,
    handleSearch,
    refresh: (): void => {
      refetch();
    },
    searchPage,
    searchQuery,
    status,
    totalPages: finalTotalPages,
  };
};
