import React, { Component } from 'react';

import portal from '@/assets/gif/portal-rick-and-morty.gif';

class NoResultsFound extends Component {
  public override render(): React.ReactNode {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 p-6 text-center">
        <p className="max-w-md text-lg text-custom-dark-night">
          Nothing was found in this dimension.
          <br />
          Try a different one.
        </p>
        <img alt="No results found" className="h-auto w-64" src={portal} />
      </div>
    );
  }
}

export default NoResultsFound;
