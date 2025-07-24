import type React from 'react';

import { Link } from 'react-router';

import { PATHS } from '@/router/constants';

const Header: React.FC = () => (
  <nav className="flex space-x-4">
    <Link className="text-white transition hover:text-white/80" to={PATHS.about}>
      About
    </Link>
  </nav>
);

export default Header;
