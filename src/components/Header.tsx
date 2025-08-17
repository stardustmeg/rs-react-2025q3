import type React from 'react';

import Navigation from '@/components/Navigation';
import Search from '@/components/Search';
import Settings from '@/components/Settings';

interface HeaderProps {
  handleSearch?: (query: string) => void;
  initialSearchQuery?: string;
}

const Header: React.FC<HeaderProps> = ({ handleSearch, initialSearchQuery }) => (
  <header
    className="fixed top-0 left-0 z-50 w-full bg-custom-pink px-6 py-4 shadow-md dark:bg-dark-header"
    data-testid="header"
  >
    <div className="mx-auto flex flex-col flex-wrap items-center justify-between gap-4 md:flex-row">
      <div className="flex items-center gap-4 md:order-1">
        <Navigation />
        <div className="md:hidden">
          <Settings />
        </div>
      </div>

      {handleSearch && (
        <div className="flex flex-1 justify-center md:order-2">
          <Search handleSearch={handleSearch} initialSearchQuery={initialSearchQuery} />
        </div>
      )}

      <div className="hidden items-center md:order-3 md:flex">
        <Settings />
      </div>
    </div>
  </header>
);

export default Header;
