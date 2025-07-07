import React, { type JSX, useEffect, useState } from 'react';

import portal from '@/assets/gif/portal-rick-and-morty.gif';
import errorImage from '@/assets/png/rick_and_morty.png';
import CardList from '@/components/CardList';
import Header from '@/components/Header';
import { getTrimmedSearchQuery } from '@/services/localStorage';

const preloadMedia = (): void => {
  for (const source of [portal, errorImage]) {
    const img = new Image();
    img.src = source;
  }
};

const App = (): JSX.Element => {
  const [search, setSearch] = useState(getTrimmedSearchQuery());

  useEffect(() => {
    preloadMedia();
  }, []);

  const handleSearch = (search: string): void => {
    setSearch(search);
  };

  return (
    <div className="w-full p-10">
      <Header onSearch={handleSearch} />
      <CardList search={search} />
    </div>
  );
};

export default React.memo(App);
