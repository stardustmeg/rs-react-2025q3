import React, { Component } from 'react';

import { getTrimmedSearchQuery, saveSearchQuery } from '@/services/localStorage';

interface Props {
  onSubmit: (query: string) => void;
}

interface State {
  query: string;
}

class Search extends Component<Props, State> {
  public override state: State = { query: getTrimmedSearchQuery() };

  public handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ query: event.target.value });
  };

  public handleClear = (): void => {
    this.setState({ query: '' });
    this.props.onSubmit('');
    saveSearchQuery('');
  };

  public handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    this.setState((previous) => {
      const trimmed = previous.query.trim();
      const saved = getTrimmedSearchQuery();

      if (trimmed === saved) {
        return;
      }

      saveSearchQuery(trimmed);
      this.props.onSubmit(trimmed);
      return { query: trimmed };
    });
  };

  public override render(): React.ReactNode {
    return (
      <form className="flex items-center justify-center gap-2" onSubmit={this.handleSubmit}>
        <div className="relative w-70">
          <input
            className="w-full rounded border border-custom-green bg-custom-blue p-2 pr-7 text-sm text-custom-dark-night shadow-sm focus:border-custom-green focus:ring-2 focus:ring-custom-green focus:outline-none"
            onChange={this.handleChange}
            placeholder="Search characters..."
            type="text"
            value={this.state.query}
          />
          {this.state.query && (
            <button
              aria-label="Clear search"
              className="absolute top-1/2 right-2 -translate-y-1/2 button text-custom-coal hover:text-custom-pink focus:text-custom-pink"
              onClick={this.handleClear}
              type="button"
            >
              ✕
            </button>
          )}
        </div>
        <button className="button rounded bg-custom-yellow px-4 py-2 text-custom-coal shadow-sm" type="submit">
          Search
        </button>
      </form>
    );
  }
}

export default Search;
