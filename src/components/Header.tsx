import React, { Component } from 'react';

import ErrorButton from '@/components/ErrorButton';
import Search from '@/components/Search';

interface Props {
  onSearch: (query: string) => void;
}

class Header extends Component<Props> {
  public override render(): React.ReactNode {
    return (
      <div className="fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-blue-400 px-6 py-4 shadow-md">
        <Search onSubmit={this.props.onSearch} />
        <ErrorButton />
      </div>
    );
  }
}

export default Header;
