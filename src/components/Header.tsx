import React, { type JSX } from 'react';

import Search from '@/components/Search';

interface HeaderProps {
  handleSearch: (query: string) => void;
  initialSearchQuery: string;
}

const Header = ({ handleSearch, initialSearchQuery }: HeaderProps): JSX.Element => (
  <div
    className="fixed top-0 left-0 z-50 flex w-full items-center justify-center bg-custom-pink px-6 py-4 shadow-md"
    role="header"
  >
    <Search handleSearch={handleSearch} initialSearchQuery={initialSearchQuery} />
  </div>
);

export default React.memo(Header);
