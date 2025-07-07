import React, { type JSX, useState } from 'react';

import ClearButton from '@/components/ClearButton';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface SearchProps {
  onSubmit: (query: string) => void;
}

const Search = ({ onSubmit }: SearchProps): JSX.Element => {
  const [searchQuery, setSearchQuery] = useLocalStorage();
  const [query, setQuery] = useState(searchQuery);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
  };

  const handleClear = (): void => {
    setQuery('');
    submitQuery('');
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    submitQuery(query);
  };

  const submitQuery = (currentQuery: string): void => {
    const trimmed = currentQuery.trim();
    const saved = searchQuery;

    if (trimmed !== saved) {
      setSearchQuery(trimmed);
      onSubmit(trimmed);
    }
  };

  return (
    <form className="flex w-full items-center justify-center gap-2 p-1 sm:w-1/2 lg:w-1/3" onSubmit={handleSubmit}>
      <div className="relative w-full">
        <input
          className="w-full rounded border border-custom-green bg-custom-blue p-2 pr-7 text-sm text-custom-dark-night shadow-sm focus:border-custom-green focus:ring-2 focus:ring-custom-green focus:outline-none"
          onChange={handleChange}
          placeholder="Search characters..."
          type="text"
          value={query}
        />
        <ClearButton onClick={handleClear} visible={!!query} />
      </div>
      <button className="button rounded bg-custom-yellow px-4 py-2 text-custom-coal shadow-sm" type="submit">
        Search
      </button>
    </form>
  );
};

export default React.memo(Search);
