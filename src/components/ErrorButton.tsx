import React, { Component } from 'react';

interface State {
  hasError: boolean;
}

class ErrorButton extends Component {
  public override state: State = { hasError: false };

  public handleClick = (): void => {
    this.setState((previousState: State) => ({
      hasError: !previousState.hasError,
    }));
  };

  public override render(): React.ReactNode {
    if (this.state.hasError) {
      throw new Error('Test error thrown from ErrorButton');
    }
    return (
      <button className="mt-4 rounded bg-red-600 px-4 py-2 text-white" onClick={this.handleClick}>
        Throw Error
      </button>
    );
  }
}

export default ErrorButton;
