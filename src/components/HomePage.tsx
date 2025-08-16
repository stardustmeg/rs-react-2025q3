'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import CharactersContainer from '@/components/CharactersContainer';
import Header from '@/components/Header';
import { usePathname, useRouter } from '@/i18n/routing';

interface HomePageProps {
  initialPage: number;
  initialSearch: string;
}

const HomePage: React.FC<HomePageProps> = ({ initialPage, initialSearch }: HomePageProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get('search') ?? initialSearch;

  const handleSearch = useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams);
      if (query) {
        params.set('search', query);
      } else {
        params.delete('search');
      }
      params.set('page', '1');

      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  return (
    <div className="flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-start p-5 pt-0">
      <Header handleSearch={handleSearch} initialSearchQuery={searchQuery} />
      <CharactersContainer initialPage={initialPage} initialSearch={initialSearch} />
    </div>
  );
};

export default HomePage;
