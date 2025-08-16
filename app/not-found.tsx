import type { JSX } from 'react';

import Image from 'next/image';

import errorImage from '@/assets/png/rick_and_morty_eyes.png';
import { Link } from '@/i18n/routing';

export default function NotFound(): JSX.Element {

  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center space-y-6 p-6 text-center">
      <div className="mx-auto flex max-w-[80%] flex-col place-items-center gap-4 transition-all duration-300">
        <Image
          alt="Error illustration"
          className="max-w-2/3 h-auto"
          height={400}
          priority
          src={errorImage}
          width={400}
        />
        <h1 className="text-3xl font-bold text-custom-coal dark:text-custom-gray">Not Found</h1>

        <p className="max-w-md text-lg text-custom-coal dark:text-custom-gray">
          The page you are looking for does not exist.
        </p>

        <Link
          className="text-xl font-bold text-custom-coal transition-all duration-300 hover:underline dark:text-custom-green dark:hover:text-custom-yellow"
          href="/"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
