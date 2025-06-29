import { type ErrorInfo, PureComponent, type ReactNode } from 'react';

import errorImage from '@/assets/png/rick_and_morty.png';

const CONSOLE_MESSAGE = 'ErrorBoundary caught an error: ';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends PureComponent<Props, State> {
  public override state = { hasError: false };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.warn(CONSOLE_MESSAGE, error, errorInfo);
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
            <button className="mt-4 button rounded bg-custom-red px-4 py-2 text-white" onClick={this.handleClick}>
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
