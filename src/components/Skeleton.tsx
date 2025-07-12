import React, { type JSX } from 'react';

interface SkeletonProps {
  className?: string;
  colorClass?: string;
}

const Skeleton = ({ className = '', colorClass = 'bg-custom-gray' }: SkeletonProps): JSX.Element => (
  <div className={`absolute inset-0 animate-pulse ${className} ${colorClass}`} role="presentation" />
);

export default React.memo(Skeleton);
