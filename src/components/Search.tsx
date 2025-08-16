'use client';

import { useTranslations } from 'next-intl';
import React, { useRef, useState } from 'react';

import ClearButton from '@/components/ClearButton';

interface SearchProps {
  handleSearch: (query: string) => void;
  initialSearchQuery?: string;
}

const Search: React.FC<SearchProps> = ({ handleSearch, initialSearchQuery }) => {
  const [query, setQuery] = useState<string>(initialSearchQuery ?? '');
  const inputReference = useRef<HTMLInputElement>(null);
  const t = useTranslations('search');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
  };

  const handleClear = (): void => {
    setQuery('');
    inputReference.current?.focus();
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    handleSearch(query.trim());
  };

  return (
    <form className="md:max-w-2/3 lg:max-w-1/3 flex w-full place-items-center gap-2" onSubmit={handleSubmit}>
      <div className="relative w-full">
        <input
          className="w-full rounded border border-custom-green bg-custom-blue p-2 pr-7 text-sm text-custom-dark-night shadow-sm focus:border-custom-green focus:outline-none focus:ring-2 focus:ring-custom-green dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-custom-green"
          onChange={handleChange}
          placeholder={t('placeholder')}
          ref={inputReference}
          type="text"
          value={query}
        />
        <ClearButton onClick={handleClear} visible={!!query} />
      </div>
      <button
        className="button rounded bg-custom-yellow px-4 py-2 text-custom-coal shadow-sm dark:bg-custom-green dark:text-white"
        type="submit"
      >
        {t('button')}
      </button>
    </form>
  );
};

export default Search;
