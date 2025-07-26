import React from 'react';
import { Outlet } from 'react-router';

import CardList from '@/components/CardList';
import ErrorFallback from '@/components/ErrorFallback';
import Header from '@/components/Header';
import Loader from '@/components/Loader/Loader';
import Pagination from '@/components/Pagination';
import { useCharactersSearch } from '@/hooks/useCharactersSearch';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useSearchPage } from '@/hooks/useSearchPage';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useLocalStorage();
  const [searchPage, setSearchPage] = useSearchPage();

  const { characters, status, totalPages } = useCharactersSearch(searchQuery, searchPage);

  const handleSearch = (currentSearch: string): void => {
    setSearchPage(1);
    setSearchQuery(currentSearch);
  };

  const handlePageChange = (newPage: number): void => {
    setSearchPage(newPage);
  };

  return (
    <div className="w-full p-10">
      <Header handleSearch={handleSearch} initialSearchQuery={searchQuery} />
      {status.status === 'ready' ? (
        <>
          <Pagination currentPage={searchPage} onPageChange={handlePageChange} totalPages={totalPages} />
          <CardList characters={characters} />
          <Pagination currentPage={searchPage} onPageChange={handlePageChange} totalPages={totalPages} />
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
