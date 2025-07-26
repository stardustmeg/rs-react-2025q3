import React, { useState } from 'react';

import fallbackImage from '@/assets/png/placeholder.png';
import Skeleton from '@/components/Skeleton';
import { cn } from '@/utils';

const DEFAULT_ALT_TEXT = 'Character image not available';

interface CharacterImageProps {
  alt: string;
  src: string;
}

const CharacterImage: React.FC<CharacterImageProps> = ({ alt, src }) => {
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
    <div className="relative h-full min-h-73 w-full overflow-hidden rounded">
      {!loaded && <Skeleton />}
      <img
        alt={alt}
        className={cn([
          'h-full w-full object-cover transition-opacity duration-300',
          { 'opacity-0': !loaded, 'opacity-100': loaded },
        ])}
        onError={handleError}
        onLoad={markAsLoaded}
        src={src}
      />
    </div>
  );
};

export default CharacterImage;
