import React from 'react';

import errorImage from '@/assets/png/rick_and_morty.png';

interface ErrorFallbackProps {
  onRetry?: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ onRetry }) => (
  <div className="flex flex-col items-center justify-center space-y-6 p-6 text-center">
    <img alt="Error illustration" className="h-auto w-64" src={errorImage} />
    <p className="max-w-md text-lg text-custom-red">
      Oops! Something went wrong.
      <br />
      Please try again.
    </p>
    {onRetry && (
      <button className="button rounded bg-custom-red px-4 py-2 text-white" onClick={onRetry}>
        Retry
      </button>
    )}
  </div>
);

export default ErrorFallback;
