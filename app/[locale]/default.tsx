import { type JSX, Suspense } from 'react';

import HomePage from '@/components/HomePage';
import Loader from '@/components/Loader/Loader';

interface HomePageServerProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default async function HomePageServer({ searchParams }: HomePageServerProps): Promise<JSX.Element> {
  const params = await searchParams;
  const search = params.search ?? '';
  const page = Number.parseInt(params.page ?? '1', 10);

  return (
    <Suspense fallback={<Loader />}>
      <HomePage initialPage={page} initialSearch={search} />
    </Suspense>
  );
}
