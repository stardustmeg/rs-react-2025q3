import { useCallback, useEffect, useState } from 'react';

import type { TransformedCharacter } from '@/types';

import { transformCharacter } from '@/hooks/helpers/transformCharacter';
import { useSearch } from '@/hooks/useSearch';
import { fetchCharacters } from '@/services/api';
import { isHttpError } from '@/types/helpers';

const NOT_FOUND_ERROR_CODE = 404;

interface FetchStatus {
  status: 'error' | 'loading' | 'ready';
}

interface UseCharactersReturn {
  characters: TransformedCharacter[];
  handlePagination: (page: number) => void;
  handleSearch: (search: string) => void;
  searchPage: number;
  searchQuery: string;
  status: FetchStatus;
  totalPages: number;
}

export const useCharactersSearch = (): UseCharactersReturn => {
  const { searchPage, searchQuery, setSearchPage, setSearchQuery } = useSearch();
  const [characters, setCharacters] = useState<TransformedCharacter[]>([]);
  const [status, setStatus] = useState<FetchStatus>({ status: 'loading' });
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = useCallback(
    (currentSearch: string): void => {
      setStatus({ status: 'loading' });
      setSearchQuery(currentSearch);
    },
    [setSearchQuery],
  );

  const handlePagination = useCallback(
    (newPage: number): void => {
      setStatus({ status: 'loading' });
      setSearchPage(newPage);
    },
    [setSearchPage],
  );

  const loadCharacters = useCallback(async (query: string, page: number): Promise<void> => {
    try {
      setStatus({ status: 'loading' });
      const data = await fetchCharacters({ name: query, page });

      const transformed = (data.results ?? []).map((c) => transformCharacter(c));

      setCharacters(transformed);
      setTotalPages(data.info?.pages ?? 1);
      setStatus({ status: 'ready' });
    } catch (error: unknown) {
      if (isHttpError(error) && error.status === NOT_FOUND_ERROR_CODE) {
        setCharacters([]);
        setTotalPages(1);
        setStatus({ status: 'ready' });
      } else {
        setStatus({ status: 'error' });
      }
    }
  }, []);

  useEffect(() => {
    loadCharacters(searchQuery, searchPage);
  }, [loadCharacters, searchQuery, searchPage]);

  return { characters, handlePagination, handleSearch, searchPage, searchQuery, status, totalPages };
};
