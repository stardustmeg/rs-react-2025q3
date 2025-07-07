import React, { type JSX, useState } from 'react';

import CardList from '@/components/CardList';
import Header from '@/components/Header';
import { getTrimmedSearchQuery } from '@/services/localStorage';

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
