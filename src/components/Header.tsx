import React, { type JSX } from 'react';

import Search from '@/components/Search';

interface Props {
  onSearch: (query: string) => void;
}

const Header = ({ onSearch }: Props): JSX.Element => (
  <div
    className="fixed top-0 left-0 z-50 flex w-full items-center justify-center bg-custom-pink px-6 py-4 shadow-md"
    role="header"
  >
    <Search onSubmit={onSearch} />
  </div>
);

export default React.memo(Header);
