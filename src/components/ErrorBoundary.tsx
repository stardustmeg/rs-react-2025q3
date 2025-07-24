import { type ErrorInfo, PureComponent, type ReactNode } from 'react';

import errorImage from '@/assets/png/rick_and_morty.png';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends PureComponent<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state = { hasError: false };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.warn('ErrorBoundary caught an error:', error, errorInfo);
  }

  public override render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex flex-wrap-reverse items-center justify-center gap-4 text-center">
          <img alt="Error illustration" className="mb-4 w-80" src={errorImage} />
          <div className="flex flex-col gap-4">
            <div className="text-custom-chocolate">Congrats! It was successfully handled</div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
