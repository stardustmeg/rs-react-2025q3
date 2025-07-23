import type React from 'react';

import { Link } from 'react-router';

import Search from '@/components/Search';
import { PATHS } from '@/router/constants';

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
    <Link className="ml-4 text-lg font-bold text-white" to={PATHS.about}>
      About
    </Link>
  </div>
);
export default Header;
