import React, { Component } from 'react';

interface Props {
  wrapperClass?: string;
}

interface State {
  hasError: boolean;
}

class ErrorButton extends Component<Props, State> {
  public override state: State = { hasError: false };

  public handleClick = (): void => {
    this.setState((previous) => ({ hasError: !previous.hasError }));
  };

  public override render(): React.ReactNode {
    if (this.state.hasError) {
      throw new Error('Test error thrown from ErrorButton');
    }
    return (
      <div className={this.props.wrapperClass}>
        <button className="mt-4 rounded bg-custom-red px-4 py-2 text-white" onClick={this.handleClick}>
          Throw an Error
        </button>
      </div>
    );
  }
}

export default ErrorButton;
