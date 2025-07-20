import React from 'react';

interface SkeletonProps {
  className?: string;
  colorClass?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '', colorClass = 'bg-custom-gray' }) => (
  <div className={`absolute inset-0 animate-pulse ${className} ${colorClass}`} role="presentation" />
);

export default Skeleton;
