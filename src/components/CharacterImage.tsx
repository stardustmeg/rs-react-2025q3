import React, { PureComponent } from 'react';

import fallbackImage from '@/assets/png/placeholder.png';
import Skeleton from '@/components/Skeleton';

interface Props {
  alt: string;
  src: string;
}

interface State {
  loaded: boolean;
}

class CharacterImage extends PureComponent<Props, State> {
  private static readonly DEFAULT_ALT_TEXT = 'Character image not available';

  public override state = { loaded: false };

  public override render(): React.ReactNode {
    const { alt, src } = this.props;
    const { loaded } = this.state;

    return (
      <div className="relative h-full min-h-56 w-full min-w-56 overflow-hidden rounded">
        {!loaded && <Skeleton />}
        <img
          alt={alt}
          className={`h-full w-full object-cover transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          onError={this.handleError}
          onLoad={this.markAsLoaded}
          src={src}
        />
      </div>
    );
  }

  private readonly handleError = (event: React.SyntheticEvent<HTMLImageElement>): void => {
    event.currentTarget.src = fallbackImage;
    event.currentTarget.alt = CharacterImage.DEFAULT_ALT_TEXT;
    this.markAsLoaded();
  };

  private readonly markAsLoaded = (): void => {
    this.setState({ loaded: true });
  };
}

export default CharacterImage;
