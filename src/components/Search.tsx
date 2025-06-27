import React, { Component } from 'react';

interface State {
  query: string;
}

class Search extends Component<object, State> {
  public override state: State = {
    query: localStorage.getItem('search')?.trim() ?? '',
  };

  public handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ query: event.target.value });
  };

  public handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    localStorage.setItem('search', this.state.query);
  };

  public override render(): React.ReactNode {
    return (
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleChange} value={this.state.query} />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default Search;
