import { useEffect, useState } from 'react';

const LS_PREFIX = 'stardustmeg_8c0a1a24-b273-4b98-91c6-c7d623fc53f1';

const getFullKey = (key: string): string => `${key}_${LS_PREFIX}`;

export const useLocalStorage = <T>(key: string, defaultValue: T): [T, (value: T) => void] => {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(getFullKey(key));
    if (storedValue === null) {
      return defaultValue;
    }

    try {
      return JSON.parse(storedValue) as T;
    } catch {
      return storedValue as unknown as T;
    }
  });

  useEffect(() => {
    const valueToStore = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(getFullKey(key), valueToStore);
  }, [key, value]);

  return [value, setValue];
};

type UseLocalStorageReturnType = [string, (value: string) => void];

export const useLocalStorageSearch = (): UseLocalStorageReturnType => {
  const LS_SEARCH_KEY = 'search';
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
