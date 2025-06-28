import React, { Component } from 'react';

import type { Character } from '@/types';

import placeholderImage from '@/assets/png/placeholder.png';

interface State {
  loaded: boolean;
}

class CharacterCard extends Component<{ character: Character }, State> {
  public override state: State = {
    loaded: false,
  };

  public handleImageLoad = (): void => {
    this.setState({ loaded: true });
  };

  public override render(): React.ReactNode {
    const { character } = this.props;
    const { loaded } = this.state;

    return (
      <div className="card flex flex-col rounded-lg bg-white p-4 shadow-md">
        <p className="mb-2 text-center font-semibold">{character.name}</p>
        <div className="relative h-48 w-full overflow-hidden rounded">
          {!loaded && (
            <img
              alt="Loading..."
              className="absolute inset-0 h-full w-full object-cover blur-sm"
              src={placeholderImage}
            />
          )}
          <img
            alt={character.name}
            className={`h-full w-full object-cover transition-opacity duration-300 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={this.handleImageLoad}
            src={character.image}
          />
        </div>
      </div>
    );
  }
}

export default CharacterCard;
