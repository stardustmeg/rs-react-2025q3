import React from 'react';

import errorImage from '@/assets/png/rick_and_morty.png';

const ErrorFallback: React.FC = () => (
  <div className="flex flex-col items-center justify-center space-y-6 p-6 text-center">
    <img alt="Error illustration" className="h-auto w-64" src={errorImage} />
    <p className="max-w-md text-lg text-custom-red">
      Oops! Something went wrong.
      <br />
      Please try again.
    </p>
  </div>
);

export default ErrorFallback;
