import React, { Component } from 'react';

import type { Character, Info } from '@/types';

import CardList from '@/components/CardList';
import ErrorButton from '@/components/ErrorButton';
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

  public override render(): React.ReactNode {
    const { characters } = this.state;
    return (
      <div className="app px-6 pt-20">
        <Header />
        <h1 className="mb-4 text-2xl font-bold">Welcome to my React App</h1>
        <p>This is a simple React application</p>
        <ErrorButton />
        <CardList characters={characters} />
      </div>
    );
  }
}

export default App;
