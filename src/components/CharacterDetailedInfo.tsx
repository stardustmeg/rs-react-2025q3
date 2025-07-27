import React, { useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';

import CharacterDetails from '@/components/CharacterDetails';
import Drawer from '@/components/Drawer';
import ErrorFallback from '@/components/ErrorFallback';
import Loader from '@/components/Loader/Loader';
import NoResultsFound from '@/components/NoResultsFound';
import { useCharacterById } from '@/hooks/useCharacterById';

const CharacterDetailedInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isDrawerOpen = useMemo(() => !!id, [id]);

  const { character, status } = useCharacterById();

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
      {renderContent()}
    </Drawer>
  );
};

export default CharacterDetailedInfo;
