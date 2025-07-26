import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

type SearchPage = [searchPage: number, setSearchPage: (page: number) => void];

export const useSearhPage = (): SearchPage => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchPage = Number.parseInt(searchParams.get('page') ?? '1', 10);

  useEffect(() => {
    const hasPage = searchParams.has('page');
    if (!hasPage) {
      const parameters: Record<string, string> = { page: '1' };
      setSearchParams(parameters, { replace: true });
    }
  }, []);

  const setSearchPage = (page: number): void => {
    setSearchParams({ page: String(page) });
  };

  return [searchPage, setSearchPage];
};
