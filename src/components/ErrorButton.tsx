import React, { PureComponent } from 'react';

const ERROR_MESSAGE = 'Test error thrown from ErrorButton';

interface Props {
  wrapperClass?: string;
}

interface State {
  hasError: boolean;
}

class ErrorButton extends PureComponent<Props, State> {
  public override state = { hasError: false };

  public handleClick = (): void => {
    this.setState((previous) => ({ hasError: !previous.hasError }));
  };

  public override render(): React.ReactNode {
    if (this.state.hasError) {
      throw new Error(ERROR_MESSAGE);
    }
    return (
      <div className={this.props.wrapperClass}>
        <button className="mt-4 button rounded bg-custom-red px-4 py-2 text-white" onClick={this.handleClick}>
          Throw an Error
        </button>
      </div>
    );
  }
}

export default ErrorButton;
