import React, { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';

import CharacterImage from '@/components/CharacterImage';
import Drawer from '@/components/Drawer';
import ErrorFallback from '@/components/ErrorFallback';
import Loader from '@/components/Loader/Loader';
import NoResultsFound from '@/components/NoResultsFound';
import { useCharacterById } from '@/hooks/useCharacterById';

const CharacterInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(!!id);

  const { character, status } = useCharacterById();

  const handleCloseDrawer = (): void => {
    setIsDrawerOpen(false);
    navigate(`/?${searchParams}`);
  };

  return (
    <Drawer data-testid="character-details" handleCloseDrawer={handleCloseDrawer} isDrawerOpen={isDrawerOpen}>
      {status.status === 'loading' ? (
        <Loader />
      ) : status.status === 'ready' ? (
        character ? (
          <>
            <div className="flex flex-col items-center bg-white p-2">
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
          </>
        ) : (
          <NoResultsFound />
        )
      ) : (
        <ErrorFallback />
      )}
    </Drawer>
  );
};

export default CharacterInfo;
