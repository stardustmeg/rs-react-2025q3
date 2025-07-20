import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class MockErrorBoundary extends Component<Props, State> {
  public override state: State = { error: null };

  public static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  public override render(): ReactNode {
    const { error } = this.state;

    if (error !== null) {
      return <div role="alert">Error caught: {error.message}</div>;
    }

    return this.props.children;
  }
}
