import React, { Component } from 'react';

import type { Character, Info } from '@/types';

import CardList from '@/components/CardList';
import Header from '@/components/Header';

interface State {
  characters: Character[];
  error: null | string;
  loading: boolean;
}

class App extends Component<object, State> {
  public override state: State = {
    characters: [],
    error: null,
    loading: false,
  };

  public override componentDidMount(): void {
    const search = localStorage.getItem('search')?.trim() ?? '';
    this.fetchCharacters(search);
  }

  public fetchCharacters = (query: string): void => {
    this.setState({ error: null, loading: true });

    const url = query
      ? `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(query)}`
      : `https://rickandmortyapi.com/api/character`;

    fetch(url)
      .then((result) => {
        if (!result.ok) {
          throw new Error(`Error ${result.status}: ${result.statusText}`);
        }
        return result.json();
      })
      .then((data: Info<Character[]>) => {
        this.setState({ characters: data.results ?? [], loading: false });
      })
      .catch((error: unknown) => {
        this.setState({ error: error instanceof Error ? error.message : 'Unknown error', loading: false });
      });
  };

  public handleSearchSubmit = (query: string): void => {
    localStorage.setItem('search', query);
    this.fetchCharacters(query);
  };

  public override render(): React.ReactNode {
    const { characters } = this.state;
    return (
      <div className="app px-6 pt-20">
        <Header onSearch={this.handleSearchSubmit} />
        <CardList characters={characters} />
      </div>
    );
  }
}

export default App;
