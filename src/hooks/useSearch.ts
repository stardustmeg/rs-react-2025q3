import { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';

import { buildUrlParams } from '@/hooks/helpers/buildUrlParams';
import { useLocalStorage, useLocalStorageSearch } from '@/hooks/useLocalStorage';

interface SearchReturn {
  searchPage: number;
  searchQuery: string;
  setSearchPage: (page: number) => void;
  setSearchParams: (page: number, query: string) => void;
  setSearchQuery: (query: string) => void;
}

export const useSearch = (): SearchReturn => {
  const [searchParams, setSearchParamsRouter] = useSearchParams();
  const [localSearchQuery, setLocalSearchQuery] = useLocalStorageSearch();
  const [localPage, setLocalPage] = useLocalStorage('page', 1);

  const searchPage = useMemo(() => {
    const urlPage = searchParams.get('page');
    return urlPage ? Number.parseInt(urlPage, 10) || 1 : localPage;
  }, [searchParams, localPage]);

  const searchQuery = useMemo(() => {
    return searchParams.get('search') ?? localSearchQuery;
  }, [searchParams, localSearchQuery]);

  useEffect(() => {
    const hasPage = searchParams.has('page');
    const hasSearch = searchParams.has('search');

    if (!hasPage || (!hasSearch && localSearchQuery)) {
      const parameters = buildUrlParams(searchPage, searchQuery);
      setSearchParamsRouter(parameters, { replace: true });
    }
  }, [searchParams, setSearchParamsRouter, localSearchQuery, searchQuery, searchPage]);

  const setSearchPage = useCallback(
    (page: number): void => {
      setLocalPage(page);
      const params = buildUrlParams(page, searchQuery);
      setSearchParamsRouter(params);
    },
    [searchQuery, setLocalPage, setSearchParamsRouter],
  );

  const setSearchQuery = useCallback(
    (query: string): void => {
      setLocalSearchQuery(query);
      setLocalPage(1);
      const params = buildUrlParams(1, query);
      setSearchParamsRouter(params);
    },
    [setLocalSearchQuery, setLocalPage, setSearchParamsRouter],
  );

  const setSearchParams = useCallback(
    (page: number, query: string): void => {
      setLocalSearchQuery(query);
      setLocalPage(page);
      const params = buildUrlParams(page, query);
      setSearchParamsRouter(params);
    },
    [setLocalSearchQuery, setLocalPage, setSearchParamsRouter],
  );

  return { searchPage, searchQuery, setSearchPage, setSearchParams, setSearchQuery };
};
