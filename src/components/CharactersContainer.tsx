'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import useSWR from 'swr';

import type { Character } from '@/types/index';

import CardList from '@/components/CardList';
import ErrorFallback from '@/components/ErrorFallback';
import Loader from '@/components/Loader/Loader';
import NoResultsFound from '@/components/NoResultsFound';
import Pagination from '@/components/Pagination';
import SelectedCharactersPanel from '@/components/SelectedCharactersPanel';
import { usePathname, useRouter } from '@/i18n/routing';
import { fetchCharacters } from '@/services/api';
import { isHttpError } from '@/types/helpers';
import { cn } from '@/utils/index';

const NOT_FOUND_STATUS = 404;

interface CharactersContainerProps {
  initialPage: number;
  initialSearch: string;
}

const CharactersContainer: React.FC<CharactersContainerProps> = ({
  initialPage,
  initialSearch,
}: CharactersContainerProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);

  const searchQuery = searchParams.get('search') ?? initialSearch;
  const currentPage = Number.parseInt(searchParams.get('page') ?? initialPage.toString(), 10);

  const { data, error, isLoading } = useSWR(
    [`characters`, searchQuery, currentPage],
    () => fetchCharacters({ name: searchQuery, page: currentPage }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const characters = data?.results ?? [];
  const totalPages = data?.info?.pages ?? 1;

  const handlePagination = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', page.toString());

      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  const toggleSelectedCharacter = useCallback((character: Character) => {
    setSelectedCharacters((previous) => {
      const isSelected = previous.some((c) => c.id === character.id);
      return isSelected ? previous.filter((c) => c.id !== character.id) : [...previous, character];
    });
  }, []);

  const clearSelectedCharacters = useCallback(() => {
    setSelectedCharacters([]);
  }, []);

  const isCharacterSelected = useCallback(
    (character: Character) => {
      return selectedCharacters.some((c) => c.id === character.id);
    },
    [selectedCharacters],
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isHttpError(error) && error.status === NOT_FOUND_STATUS) {
    return <NoResultsFound />;
  }

  if (error) {
    return <ErrorFallback />;
  }

  return (
    <div
      className={cn('flex w-full max-w-6xl flex-col items-center space-y-6 pt-20', {
        'pb-20': !!selectedCharacters.length,
      })}
    >
      <Pagination currentPage={currentPage} onPageChange={handlePagination} totalPages={totalPages} />
      <CardList
        characters={characters}
        isCharacterSelected={isCharacterSelected}
        onToggleCharacter={toggleSelectedCharacter}
        priorityCount={4}
      />
      <Pagination currentPage={currentPage} onPageChange={handlePagination} totalPages={totalPages} />

      {!!selectedCharacters.length && (
        <SelectedCharactersPanel onClearSelected={clearSelectedCharacters} selectedCharacters={selectedCharacters} />
      )}
    </div>
  );
};

export default CharactersContainer;
