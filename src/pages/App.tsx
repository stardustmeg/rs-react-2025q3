import React, { useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router';

import CardList from '@/components/CardList';
import ErrorFallback from '@/components/ErrorFallback';
import Header from '@/components/Header';
import Loader from '@/components/Loader/Loader';
import Pagination from '@/components/Pagination';
import { useCharactersSearch } from '@/hooks/useCharactersSearch';

const App: React.FC = () => {
  const [searchParameters, setSearchParameters] = useSearchParams();

  const urlSearch = searchParameters.get('search') ?? '';
  const urlPage = Number.parseInt(searchParameters.get('page') ?? '1', 10);

  useEffect(() => {
    const hasPage = searchParameters.has('page');
    if (!hasPage) {
      const parameters: Record<string, string> = { page: '1' };
      if (urlSearch) {
        parameters.search = urlSearch;
      }
      setSearchParameters(parameters, { replace: true });
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { characters, setStatus, status, totalPages } = useCharactersSearch(urlSearch, urlPage);

  const handleSearch = (currentSearch: string): void => {
    setStatus({ status: 'loading' });
    if (currentSearch) {
      setSearchParameters({ page: '1', search: currentSearch });
    } else {
      setSearchParameters({ page: '1' });
    }
  };

  const handlePageChange = (newPage: number): void => {
    setStatus({ status: 'loading' });
    if (urlSearch) {
      setSearchParameters({ page: newPage.toString(), search: urlSearch });
    } else {
      setSearchParameters({ page: newPage.toString() });
    }
  };

  return (
    <div className="w-full p-10">
      <Header handleSearch={handleSearch} initialSearchQuery={urlSearch} />
      {status.status === 'ready' ? (
        <>
          <Pagination currentPage={urlPage} onPageChange={handlePageChange} totalPages={totalPages} />
          <CardList characters={characters} />
          <Pagination currentPage={urlPage} onPageChange={handlePageChange} totalPages={totalPages} />
        </>
      ) : status.status === 'loading' ? (
        <Loader />
      ) : (
        <ErrorFallback />
      )}
      <Outlet />
    </div>
  );
};

export default App;
