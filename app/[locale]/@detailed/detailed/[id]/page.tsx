import { notFound } from 'next/navigation';
import { type JSX, Suspense } from 'react';

import CharacterDetails from '@/components/CharacterDetails';
import Drawer from '@/components/Drawer';
import Loader from '@/components/Loader/Loader';
import { fetchCharacterById } from '@/services/api';

interface CharacterPageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export default async function CharacterPage({ params }: CharacterPageProps): Promise<JSX.Element> {
  const { id } = await params;

  return (
    <Suspense fallback={<Loader />}>
      <CharacterData id={id} />
    </Suspense>
  );
}

async function CharacterData({ id }: { id: string }): Promise<JSX.Element> {
  if (!/^\d+$/.test(id)) {
    notFound();
  }

  try {
    const character = await fetchCharacterById(id);
    return (
      <Drawer>
        <CharacterDetails character={character} />
      </Drawer>
    );
  } catch {
    notFound();
  }
}
