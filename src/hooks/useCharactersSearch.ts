import { useEffect, useState } from 'react';

import type { Character, TransformedCharacter } from '@/types';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useSearchPage } from '@/hooks/useSearchPage';
import { fetchCharacters } from '@/services/api';
import { isHttpError } from '@/types/helpers';

const NOT_FOUND_ERROR_CODE = 404;

interface FetchStatus {
  status: 'error' | 'loading' | 'ready';
}

interface UseCharactersReturn {
  characters: TransformedCharacter[];
  handlePagination: (page: number) => void;
  handleSearch: (search: string) => void;
  searchPage: number;
  searchQuery: string;
  status: FetchStatus;
  totalPages: number;
}

export const useCharactersSearch = (): UseCharactersReturn => {
  const [searchQuery, setSearchQuery] = useLocalStorage();
  const [searchPage, setSearchPage] = useSearchPage();
  const [characters, setCharacters] = useState<TransformedCharacter[]>([]);
  const [status, setStatus] = useState<FetchStatus>({ status: 'loading' });
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = (currentSearch: string): void => {
    setStatus({ status: 'loading' });
    setSearchPage(1);
    setSearchQuery(currentSearch);
    loadCharacters(currentSearch, 1);
  };

  const handlePagination = (newPage: number): void => {
    setStatus({ status: 'loading' });
    setSearchPage(newPage);
    loadCharacters(searchQuery, newPage);
  };

  const loadCharacters = (searchQuery: string, searchPage: number): void => {
    fetchCharacters({ name: searchQuery, page: searchPage })
      .then((data) => {
        const transformed = (data.results ?? []).map((character: Character): TransformedCharacter => {
          const { gender, id, image, name, origin, species, status } = character;

          const info = [
            { label: 'Gender', value: gender },
            { label: 'Origin', value: origin.name },
            { label: 'Species', value: species },
            { label: 'Status', value: status },
          ] as const;

          return { gender, id: String(id), image, info, name, origin: origin.name, species, status };
        });

        setCharacters(transformed);
        setTotalPages(data.info?.pages ?? 1);
      })
      .catch((error: unknown) => {
        if (isHttpError(error) && error.status === NOT_FOUND_ERROR_CODE) {
          setCharacters([]);
          setTotalPages(1);
        } else {
          throw error;
        }
      })
      .then(() => {
        setStatus({ status: 'ready' });
      })
      .catch(() => {
        setStatus({ status: 'error' });
      });
  };

  useEffect(() => {
    loadCharacters(searchQuery, searchPage);
  }, []);

  return { characters, handlePagination, handleSearch, searchPage, searchQuery, status, totalPages };
};
