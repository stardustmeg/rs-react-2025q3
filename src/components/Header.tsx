import React, { Component } from 'react';

import Search from '@/components/Search';

class Header extends Component {
  public override render(): React.ReactNode {
    return (
      <div className="fixed left-0 top-0 z-50 w-full bg-blue-400 px-6 py-4 shadow-md">
        <Search />
      </div>
    );
  }
}

export default Header;
