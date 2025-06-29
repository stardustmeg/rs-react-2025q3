import React, { Component } from 'react';

interface SkeletonProps {
  className?: string;
  colorClass?: string;
}

class Skeleton extends Component<SkeletonProps> {
  public static readonly defaultProps = { className: '', colorClass: 'bg-custom-gray' };

  public override render(): React.ReactNode {
    const { className, colorClass } = this.props;

    return <div className={`absolute inset-0 animate-pulse ${className} ${colorClass}`} />;
  }
}

export default Skeleton;
