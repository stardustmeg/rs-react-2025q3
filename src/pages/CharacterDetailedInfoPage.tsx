import React, { useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';

import CharacterDetails from '@/components/CharacterDetails';
import Drawer from '@/components/Drawer';
import ErrorFallback from '@/components/ErrorFallback';
import Loader from '@/components/Loader/Loader';
import NoResultsFound from '@/components/NoResultsFound';
import { useCharacterById } from '@/hooks/useCharacterById';

const CharacterDetailedInfoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isDrawerOpen = useMemo(() => !!id, [id]);

  const { character, refetch, status } = useCharacterById();

  const handleCloseDrawer = (): void => {
    navigate(`/?${searchParams}`);
  };

  const renderContent = (): React.ReactNode => {
    switch (status.status) {
      case 'loading': {
        return <Loader />;
      }
      case 'ready': {
        return character ? <CharacterDetails character={character} /> : <NoResultsFound />;
      }
      default: {
        return <ErrorFallback />;
      }
    }
  };

  return (
    <Drawer data-testid="character-details" handleCloseDrawer={handleCloseDrawer} isDrawerOpen={isDrawerOpen}>
      <div className="mb-4 flex justify-start">
        <button
          aria-label="Refresh character"
          className="button rounded bg-custom-green px-3 py-2 text-custom-coal shadow-sm dark:bg-custom-green dark:text-white"
          data-testid="refresh-character-button"
          onClick={refetch}
          type="button"
        >
          Refresh
        </button>
      </div>
      {renderContent()}
    </Drawer>
  );
};

export default CharacterDetailedInfoPage;
