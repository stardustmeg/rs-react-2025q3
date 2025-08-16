import React from 'react';

import { cn } from '@/utils/index';

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = 'bg-custom-gray' }) => (
  <div className={cn(['absolute inset-0 animate-pulse', className])} role="presentation" />
);

export default Skeleton;
