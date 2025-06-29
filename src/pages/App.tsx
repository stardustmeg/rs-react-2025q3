import React, { Component } from 'react';

import type { Character } from '@/types';

import portal from '@/assets/gif/portal-rick-and-morty.gif';
import errorImage from '@/assets/png/rick_and_morty.png';
import CardList from '@/components/CardList';
import ErrorButton from '@/components/ErrorButton';
import Header from '@/components/Header';
import { fetchCharacters } from '@/services/api';
import { getTrimmedSearchQuery } from '@/services/localStorage';
import { getErrorMessage } from '@/utils';

interface State {
  characters: Character[];
  error: null | string;
  loading: boolean;
}

class App extends Component<object, State> {
  public override state = { characters: [], error: null, loading: false };

  public override componentDidMount(): void {
    const search = getTrimmedSearchQuery();
    this.preloadMedia();
    this.loadCharacters(search);
  }

  public override render(): React.ReactNode {
    const { characters, loading } = this.state;
    return (
      <div className="w-full p-10">
        <Header onSearch={this.loadCharacters} />
        <CardList characters={characters} loading={loading} />
        <ErrorButton wrapperClass="fixed bottom-10 right-0" />
      </div>
    );
  }

  private readonly loadCharacters = (query: string): void => {
    this.setState({ error: null, loading: true });

    fetchCharacters({ name: query })
      .then((data) => {
        this.setState({ characters: data.results ?? [], loading: false });
      })
      .catch((error: unknown) => {
        this.setState({ characters: [], error: getErrorMessage(error), loading: false });
      });
  };

  private preloadMedia(): void {
    const imagesToPreload = [portal, errorImage];

    for (const source of imagesToPreload) {
      const img = new Image();
      img.src = source;
    }
  }
}

export default App;
