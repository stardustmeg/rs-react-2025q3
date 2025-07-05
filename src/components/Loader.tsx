import React, { PureComponent } from 'react';

const LOADER_SIZE = { lg: 'lg', md: 'md', sm: 'sm' } as const;

type LoaderSizeType = (typeof LOADER_SIZE)[keyof typeof LOADER_SIZE];

interface Props {
  size?: LoaderSizeType;
}

class Loader extends PureComponent<Props> {
  public static readonly defaultProps = { size: LOADER_SIZE.lg };

  public override render(): React.ReactNode {
    return (
      <div className="fixed inset-0 z-20 flex items-center justify-center bg-custom-dark-night/10 backdrop-blur-sm">
        <div
          className={`animate-spin rounded-full border-solid border-custom-green border-t-transparent ${this.getSizeClasses()}`}
          data-testid="loader-spinner"
        />
      </div>
    );
  }

  private getSizeClasses(): string {
    const { size } = this.props;
    switch (size) {
      case LOADER_SIZE.lg: {
        return 'w-24 h-24 border-6';
      }
      case LOADER_SIZE.sm: {
        return 'w-8 h-8 border-2';
      }
      default: {
        return 'w-16 h-16 border-4';
      }
    }
  }
}

export default Loader;
