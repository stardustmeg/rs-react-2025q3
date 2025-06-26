import React, { Component } from 'react';

import Header from '@/components/Header';

class App extends Component {
  public override render(): React.ReactNode {
    return (
      <div className="app px-6 pt-20">
        <Header />
        <h1 className="mb-4 text-2xl font-bold">Welcome to my React App</h1>
        <p>This is a simple React application</p>
      </div>
    );
  }
}

export default App;
