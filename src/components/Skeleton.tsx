import React from 'react';

interface SkeletonProps {
  className?: string;
  color?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '', color = '#bbbbbb' }) => {
  return <div className={`absolute inset-0 animate-pulse ${className}`} style={{ backgroundColor: color }} />;
};

export default Skeleton;
