import React, { type JSX, useState } from 'react';

import portal from '@/assets/gif/portal-rick-and-morty.gif';
import errorImage from '@/assets/png/rick_and_morty.png';
import CardList from '@/components/CardList';
import Header from '@/components/Header';
import { getTrimmedSearchQuery } from '@/services/localStorage';

for (const source of [portal, errorImage]) {
  new Image().src = source;
}

const App = (): JSX.Element => {
  const [search, setSearch] = useState(getTrimmedSearchQuery());

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
