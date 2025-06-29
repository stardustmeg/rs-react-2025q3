import React, { Component } from 'react';

import type { Character } from '@/types';

import CardList from '@/components/CardList';
import ErrorButton from '@/components/ErrorButton';
import Header from '@/components/Header';
import Loader from '@/components/Loader';
import { fetchCharacters } from '@/services/api';
import { getTrimmedSearchQuery } from '@/services/localStorage';
import { getErrorMessage } from '@/utils';

interface State {
  characters: Character[];
  error: null | string;
  loading: boolean;
}

class App extends Component<object, State> {
  public override state: State = { characters: [], error: null, loading: false };

  public override componentDidMount(): void {
    const search = getTrimmedSearchQuery();
    this.loadCharacters(search);
  }

  public override render(): React.ReactNode {
    const { characters, loading } = this.state;
    return (
      <div className="w-full p-10">
        <Header onSearch={this.loadCharacters} />
        {loading && <Loader />}
        {/* TBD: add a separate component for not found */}
        {this.state.error && <p className="text-red-500">{this.state.error}</p>}
        {!loading && characters.length === 0 && <p>No characters found.</p>}
        {!loading && characters.length > 0 && <CardList characters={characters} />}

        <ErrorButton wrapperClass="fixed bottom-10 right-0" />
      </div>
    );
  }

  private readonly loadCharacters = (query: string): void => {
    this.setState({ error: null, loading: true });

    fetchCharacters({ query })
      .then((data) => {
        this.setState({ characters: data.results ?? [], loading: false });
      })
      .catch((error: unknown) => {
        this.setState({ characters: [], error: getErrorMessage(error), loading: false });
      });
  };
}

export default App;
