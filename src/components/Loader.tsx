import React, { Component } from 'react';

import { LOADER_SIZE, type LoaderSize } from '@/components/constants';

interface LoaderProps {
  size?: LoaderSize;
}

class Loader extends Component<LoaderProps> {
  public static readonly defaultProps = { size: LOADER_SIZE.LG };

  public override render(): React.ReactNode {
    return (
      <div className="fixed inset-0 z-20 flex items-center justify-center bg-custom-dark-night/10 backdrop-blur-sm">
        <div
          className={`animate-spin rounded-full border-solid border-custom-green border-t-transparent ${this.getSizeClasses()}`}
        />
      </div>
    );
  }

  private getSizeClasses(): string {
    const { size } = this.props;
    switch (size) {
      case LOADER_SIZE.LG: {
        return 'w-24 h-24 border-6';
      }
      case LOADER_SIZE.SM: {
        return 'w-8 h-8 border-2';
      }
      default: {
        return 'w-16 h-16 border-4';
      }
    }
  }
}

export default Loader;
