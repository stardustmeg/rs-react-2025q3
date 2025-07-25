import React from 'react';
import { Outlet } from 'react-router';

import CardList from '@/components/CardList';
import ErrorFallback from '@/components/ErrorFallback';
import Header from '@/components/Header';
import Loader from '@/components/Loader/Loader';
import { useCharactersSearch } from '@/hooks/useCharactersSearch';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const App: React.FC = () => {
  const [savedSearchQuery, setSavedSearchQuery] = useLocalStorage();
  const { characters, retry, setStatus, status } = useCharactersSearch(savedSearchQuery);

  const handleSearch = (currentSearch: string): void => {
    setStatus({ status: 'loading' });
    setSavedSearchQuery(currentSearch);
  };

  return (
    <div className="w-full p-10">
      <Header handleSearch={handleSearch} initialSearchQuery={savedSearchQuery} />
      {status.status === 'ready' ? (
        <CardList characters={characters} />
      ) : status.status === 'loading' ? (
        <Loader />
      ) : (
        <ErrorFallback onRetry={retry} />
      )}
      <Outlet />
    </div>
  );
};

export default App;
