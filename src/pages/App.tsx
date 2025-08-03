import React from 'react';
import { Outlet } from 'react-router';

import CardList from '@/components/CardList';
import ErrorFallback from '@/components/ErrorFallback';
import Header from '@/components/Header';
import Loader from '@/components/Loader/Loader';
import Pagination from '@/components/Pagination';
import SelectedCharactersPanel from '@/components/SelectedCharactersPanel';
import { useCharactersSearch } from '@/hooks/useCharactersSearch';
import useStore from '@/store';
import { cn } from '@/utils';

const App: React.FC = () => {
  const { characters, handlePagination, handleSearch, searchPage, searchQuery, status, totalPages } =
    useCharactersSearch();

  const { selectedCharacters } = useStore();

  return (
    <div
      className={cn('mt-10 w-full bg-custom-pistachio p-5 transition-colors duration-300 md:mt-0 dark:bg-dark-bg', {
        'mb-10': !!selectedCharacters.length,
      })}
    >
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

      {!!selectedCharacters.length && <SelectedCharactersPanel selectedCharacters={selectedCharacters} />}
    </div>
  );
};

export default App;
