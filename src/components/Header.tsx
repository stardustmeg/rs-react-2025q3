import React, { Component } from 'react';

class Header extends Component {
  public override render(): React.ReactNode {
    return (
      <div className="fixed left-0 top-0 z-50 w-full bg-blue-400 px-6 py-4 text-white shadow-md">
        <p className="text-xl font-semibold">I am a header</p>
      </div>
    );
  }
}

export default Header;
