import type React from 'react';

import Search from '@/components/Search';

interface HeaderProps {
  handleSearch: (query: string) => void;
  initialSearchQuery: string;
}

const Header: React.FC<HeaderProps> = ({ handleSearch, initialSearchQuery }) => (
  <div
    className="fixed top-0 left-0 z-50 flex w-full items-center justify-center bg-custom-pink px-6 py-4 shadow-md"
    role="header"
  >
    <Search handleSearch={handleSearch} initialSearchQuery={initialSearchQuery} />
  </div>
);
export default Header;
