import React from 'react';
import { Outlet } from 'react-router';

import CardList from '@/components/CardList';
import ErrorFallback from '@/components/ErrorFallback';
import Header from '@/components/Header';
import Loader from '@/components/Loader/Loader';
import Pagination from '@/components/Pagination';
import { useCharactersSearch } from '@/hooks/useCharactersSearch';

const App: React.FC = () => {
  const { characters, handlePagination, handleSearch, searchPage, searchQuery, status, totalPages } =
    useCharactersSearch();

  return (
    <div className="w-full p-10">
      <Header handleSearch={handleSearch} initialSearchQuery={searchQuery} />
      {status.status === 'ready' ? (
        <>
          <Pagination currentPage={searchPage} onPageChange={handlePagination} totalPages={totalPages} />
          <CardList characters={characters} />
          <Pagination currentPage={searchPage} onPageChange={handlePagination} totalPages={totalPages} />
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
