import React, { Component } from 'react';

interface Props {
  onSubmit: (query: string) => void;
}

interface State {
  query: string;
}

class Search extends Component<Props, State> {
  public override state: State = {
    query: localStorage.getItem('search')?.trim() ?? '',
  };

  public handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ query: event.target.value.trimStart() });
  };

  public handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    this.setState((previous) => {
      const trimmed = previous.query.trim();
      const saved = localStorage.getItem('search')?.trim() ?? '';

      if (trimmed === saved) {
        return;
      }

      this.saveQuery(trimmed);
      this.props.onSubmit(trimmed);
      return { query: trimmed };
    });
  };

  public override render(): React.ReactNode {
    return (
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleChange} placeholder="Search characters..." value={this.state.query} />
        <button type="submit">Search</button>
      </form>
    );
  }

  private readonly saveQuery = (query: string): void => {
    localStorage.setItem('search', query);
  };
}

export default Search;
