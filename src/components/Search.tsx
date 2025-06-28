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
    this.setState({ query: event.target.value });
  };

  public handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    this.props.onSubmit(this.state.query);
  };

  public override render(): React.ReactNode {
    return (
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleChange} placeholder="Search characters..." value={this.state.query} />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default Search;
