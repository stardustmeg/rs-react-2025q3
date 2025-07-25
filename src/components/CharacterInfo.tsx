import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import CharacterImage from '@/components/CharacterImage';
import Drawer from '@/components/Drawer';
import ErrorFallback from '@/components/ErrorFallback';
import Loader from '@/components/Loader/Loader';
import NoResultsFound from '@/components/NoResultsFound';
import { useCharacterById } from '@/hooks/useCharacterById';

const CharacterInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(!!id);

  const { character, error, loading, retry } = useCharacterById();

  const handleCloseDrawer = (): void => {
    setIsDrawerOpen(false);
    navigate('/');
  };

  return (
    <Drawer handleCloseDrawer={handleCloseDrawer} isDrawerOpen={isDrawerOpen}>
      {loading && <Loader />}
      {error && <ErrorFallback onRetry={retry} />}
      {!loading && !error && !character && <NoResultsFound />}
      {!loading && !error && character && (
        <div data-testid="character-details" style={{ margin: 'auto', maxWidth: 400 }}>
          <div className="mt-16 flex flex-col items-center bg-white p-2">
            <h2 className="mb-4 text-center text-2xl font-semibold text-gray-900">{character.name}</h2>
            <CharacterImage alt={character.name} src={character.image} />
          </div>

          <div className="flex-1 space-y-4 overflow-auto bg-white p-6">
            {character.info.map(({ label, value }) => (
              <div className="flex justify-between border-b border-gray-200 pb-2" key={label}>
                <span className="font-medium text-gray-700">{label}</span>
                <span className="text-gray-900">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Drawer>
  );
};

export default CharacterInfo;
