import type React from 'react';

import Navigation from '@/components/Navigation';
import Search from '@/components/Search';
import ThemeSwitch from '@/components/ThemeSwitch';

interface HeaderProps {
  handleSearch: (query: string) => void;
  initialSearchQuery: string;
  onRefresh?: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleSearch, initialSearchQuery, onRefresh }) => (
  <header
    className="fixed top-0 left-0 z-50 w-full bg-custom-pink px-6 py-4 shadow-md dark:bg-dark-header"
    data-testid="header"
  >
    <div className="mx-auto flex flex-col flex-wrap items-center justify-between gap-4 md:flex-row">
      <div className="flex items-center gap-4 md:order-1">
        {onRefresh && (
          <button
            aria-label="Refresh data"
            className="button rounded bg-custom-green px-3 py-2 text-custom-coal shadow-sm dark:bg-custom-green dark:text-white"
            data-testid="refresh-button"
            onClick={onRefresh}
            type="button"
          >
            Refresh
          </button>
        )}
        <Navigation />
        <div className="md:hidden">
          <ThemeSwitch />
        </div>
      </div>

      <div className="flex flex-1 justify-center md:order-2">
        <Search handleSearch={handleSearch} initialSearchQuery={initialSearchQuery} />
      </div>

      <div className="hidden items-center gap-2 md:order-3 md:flex">
        <ThemeSwitch />
      </div>
    </div>
  </header>
);

export default Header;
