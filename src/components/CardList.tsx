import React, { PureComponent } from 'react';

import type { Character } from '@/types';

import CharacterCard from '@/components/CharacterCard';
import ErrorFallback from '@/components/ErrorFallback';
import Loader from '@/components/Loader';
import NoResultsFound from '@/components/NoResultsFound';
import { fetchCharacters } from '@/services/api';
import HttpError from '@/services/utils/httpError';
import { getErrorMessage } from '@/utils';

const NOT_FOUND_ERROR_CODE = 404;

interface Props {
  search: string;
}

interface State {
  characters: Character[];
  error: null | string;
  loading: boolean;
}

class CardList extends PureComponent<Props, State> {
  public override state: State = { characters: [], error: null, loading: false };

  public override componentDidMount(): void {
    this.loadCharacters(this.props.search);
  }

  public override componentDidUpdate(previousProps: Props): void {
    if (previousProps.search !== this.props.search) {
      this.loadCharacters(this.props.search);
    }
  }

  public override render(): React.ReactNode {
    const { characters, error, loading } = this.state;

    if (loading) {
      return <Loader />;
    }
    if (error) {
      return <ErrorFallback onRetry={this.handleRetry} />;
    }
    if (!characters.length) {
      return <NoResultsFound />;
    }

    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {characters.map((char) => (
          <CharacterCard character={char} key={char.id} />
        ))}
      </div>
    );
  }

  private readonly handleRetry = (): void => {
    this.loadCharacters(this.props.search);
  };

  private loadCharacters(query: string): void {
    this.setState({ error: null, loading: true });

    fetchCharacters({ name: query })
      .then((data) => {
        this.setState({ characters: data.results ?? [], loading: false });
      })
      .catch((error: unknown) => {
        if (error instanceof HttpError && error.status === NOT_FOUND_ERROR_CODE) {
          this.setState({ characters: [], loading: false });
        } else {
          this.setState({ characters: [], error: getErrorMessage(error), loading: false });
        }
      });
  }
}

export default CardList;
