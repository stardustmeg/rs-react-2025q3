import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import Drawer from '@/components/Drawer';
import ErrorFallback from '@/components/ErrorFallback';
import Loader from '@/components/Loader/Loader';
import NoResultsFound from '@/components/NoResultsFound';
import { useCharacterById } from '@/hooks/useCharacterById';

const CharacterInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(!!id);

  const handleCloseDrawer = (): void => {
    setIsDrawerOpen(false);
    navigate('/');
  };

  return (
    <Drawer
      handleCloseDrawer={handleCloseDrawer}
      isDrawerOpen={isDrawerOpen}
    >{`I am the detailed character info on ${id}`}</Drawer>
  );
};

export default CharacterInfo;
