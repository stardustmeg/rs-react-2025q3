import React, { Component } from 'react';

import type { Character } from '@/types';

import fallbackImage from '@/assets/png/placeholder.png';

interface State {
  loaded: boolean;
}

class CharacterCard extends Component<{ character: Character }, State> {
  public override state: State = {
    loaded: false,
  };

  public handleImageError = (event: React.SyntheticEvent<HTMLImageElement>): void => {
    event.currentTarget.src = fallbackImage;
    event.currentTarget.alt = 'Image not available';
    this.setState({ loaded: true });
  };

  public handleImageLoad = (): void => {
    this.setState({ loaded: true });
  };

  public override render(): React.ReactNode {
    const { character } = this.props;
    const { loaded } = this.state;

    const mainColor = '#bbbbbb';

    return (
      <div className="card flex flex-col rounded-lg bg-white p-4 shadow-md">
        <p className="mb-2 text-center font-semibold">{character.name}</p>
        <div className="relative h-48 min-w-[192px] overflow-hidden rounded">
          {!loaded && <div className="absolute inset-0 animate-pulse" style={{ backgroundColor: mainColor }} />}
          <img
            alt={character.name}
            className={`h-full w-full object-cover transition-opacity duration-300 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
            onError={this.handleImageError}
            onLoad={this.handleImageLoad}
            src={character.image}
          />
        </div>
      </div>
    );
  }
}

export default CharacterCard;
