import { useEffect, useState } from 'react';

const LS_SEARCH_KEY = 'search';
const LS_PREFIX = 'stardustmeg_8c0a1a24-b273-4b98-91c6-c7d623fc53f1';

const getFullKey = (key: string): string => {
  return `${LS_PREFIX}_${key}`;
};

type UseLocalStorageReturnType = [string, (value: string) => void];

export const useLocalStorage = (): UseLocalStorageReturnType => {
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    const storedValue = localStorage.getItem(getFullKey(LS_SEARCH_KEY));
    return storedValue?.trim() ?? '';
  });

  useEffect(() => {
    const trimmedValue = searchQuery.trim();
    localStorage.setItem(getFullKey(LS_SEARCH_KEY), trimmedValue);
  }, [searchQuery]);

  return [searchQuery, setSearchQuery];
};
