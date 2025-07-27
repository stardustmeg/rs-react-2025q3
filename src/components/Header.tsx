import type React from 'react';

import Navigation from '@/components/Navigation';
import Search from '@/components/Search';

interface HeaderProps {
  handleSearch: (query: string) => void;
  initialSearchQuery: string;
}

const Header: React.FC<HeaderProps> = ({ handleSearch, initialSearchQuery }) => (
  <header className="fixed top-0 left-0 z-50 w-full bg-custom-pink px-6 py-4 shadow-md" data-testid="header">
    <div className="mx-auto flex flex-wrap items-center justify-center gap-4 md:justify-between">
      <Search handleSearch={handleSearch} initialSearchQuery={initialSearchQuery} />

      <Navigation />
    </div>
  </header>
);

export default Header;
