import React from 'react';
import { Outlet } from 'react-router';

import portal from '@/assets/gif/portal-rick-and-morty.gif';
import errorImage from '@/assets/png/rick_and_morty.png';
import CardList from '@/components/CardList';
import Header from '@/components/Header';
import { useLocalStorage } from '@/hooks/useLocalStorage';

for (const source of [portal, errorImage]) {
  new Image().src = source;
}

const App: React.FC = () => {
  const [savedSearchQuery, setSavedSearchQuery] = useLocalStorage();

  const handleSearch = (currentSearch: string): void => {
    if (currentSearch === savedSearchQuery) {
      return;
    }
    setSavedSearchQuery(currentSearch);
  };

  return (
    <div className="w-full p-10">
      <Header handleSearch={handleSearch} initialSearchQuery={savedSearchQuery} />
      <CardList searchQuery={savedSearchQuery} />
      <Outlet />
    </div>
  );
};

export default App;
