import React, { type JSX, useState } from 'react';

import fallbackImage from '@/assets/png/placeholder.png';
import Skeleton from '@/components/Skeleton';

const DEFAULT_ALT_TEXT = 'Character image not available';

interface Props {
  alt: string;
  src: string;
}

const CharacterImage = ({ alt, src }: Props): JSX.Element => {
  const [loaded, setLoaded] = useState(false);

  const handleError = (event: React.SyntheticEvent<HTMLImageElement>): void => {
    event.currentTarget.src = fallbackImage;
    event.currentTarget.alt = DEFAULT_ALT_TEXT;
    markAsLoaded();
  };

  const markAsLoaded = (): void => {
    setLoaded(true);
  };

  return (
    <div className="relative h-full min-h-56 w-full min-w-56 overflow-hidden rounded">
      {!loaded && <Skeleton />}
      <img
        alt={alt}
        className={`h-full w-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onError={handleError}
        onLoad={markAsLoaded}
        src={src}
      />
    </div>
  );
};

export default React.memo(CharacterImage);
