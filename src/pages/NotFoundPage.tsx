import React from 'react';
import { Link } from 'react-router';

import errorImage from '@/assets/png/rick_and_morty_eyes.png';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-6 text-center">
      <img alt="Error illustration" className="h-auto max-w-2/3" src={errorImage} />
      <h1 className="text-3xl font-bold text-custom-dark-night dark:text-dark-text">404 - Page Not Found</h1>

      <p className="max-w-md text-lg text-shadow-custom-dark-night dark:text-gray-300">
        It is not the page you are looking for.
      </p>

      <Link
        className="text-chocolate text-xl font-bold transition-all duration-300 hover:underline dark:text-custom-green dark:hover:text-custom-yellow"
        to="/"
      >
        Go back to Main
      </Link>
    </div>
  );
};

export default NotFoundPage;
