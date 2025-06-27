import { Component, type ErrorInfo, type ReactNode } from 'react';

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
    this.setState((previousState: State) => ({
      hasError: !previousState.hasError,
    }));
  };

  public override render(): ReactNode {
    if (this.state.hasError) {
      return (
        <>
          <div className="text-red-600">Something went wrong!</div>
          <button className="mt-4 rounded bg-red-600 px-4 py-2 text-white" onClick={this.handleClick}>
            Repair the site
          </button>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
