import React, { type JSX } from 'react';

interface Props {
  className?: string;
  colorClass?: string;
}

const Skeleton = ({ className = '', colorClass = 'bg-custom-gray' }: Props): JSX.Element => (
  <div className={`absolute inset-0 animate-pulse ${className} ${colorClass}`} role="presentation" />
);

export default React.memo(Skeleton);
