import { Component, type ErrorInfo, type ReactNode } from 'react';

import errorImage from '@/assets/png/rick_and_morty.png';

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  public override state: State = { hasError: false };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.warn('ErrorBoundary caught an error:', error, errorInfo);
  }

  public handleClick = (): void => {
    this.setState((previous) => ({ hasError: !previous.hasError }));
  };

  public override render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex flex-wrap-reverse items-center justify-center gap-4 text-center">
          <img alt="Error illustration" className="mb-4 w-80" src={errorImage} />
          <div className="flex flex-col gap-4">
            <div className="text-custom-chocolate">Congrats! It was successfully handled</div>
            <button className="button mt-4 rounded bg-custom-red px-4 py-2 text-white" onClick={this.handleClick}>
              Fix it back
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
