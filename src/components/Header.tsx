import React, { PureComponent } from 'react';

import Search from '@/components/Search';

interface Props {
  onSearch: (query: string) => void;
}

class Header extends PureComponent<Props> {
  public override render(): React.ReactNode {
    return (
      <div className="fixed top-0 left-0 z-50 flex w-full items-center justify-center bg-custom-pink px-6 py-4 shadow-md">
        <Search onSubmit={this.props.onSearch} />
      </div>
    );
  }
}

export default Header;
