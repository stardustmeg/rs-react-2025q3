import React, { Component } from 'react';

import portal from '@/assets/gif/portal-rick-and-morty.gif';
import errorImage from '@/assets/png/rick_and_morty.png';
import CardList from '@/components/CardList';
import Header from '@/components/Header';
import { getTrimmedSearchQuery } from '@/services/localStorage';

interface State {
  search: string;
}

class App extends Component<object, State> {
  public override state = { search: getTrimmedSearchQuery() };

  public override componentDidMount(): void {
    this.preloadMedia();
  }

  public override render(): React.ReactNode {
    const { search } = this.state;
    return (
      <div className="w-full p-10">
        <Header onSearch={this.handleSearch} />
        <CardList search={search} />
      </div>
    );
  }

  private readonly handleSearch = (search: string): void => {
    this.setState({ search });
  };

  private preloadMedia(): void {
    for (const source of [portal, errorImage]) {
      const img = new Image();
      img.src = source;
    }
  }
}

export default App;
