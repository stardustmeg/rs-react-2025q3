import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import Drawer from '@/components/Drawer';
import { PATHS } from '@/router/constants';

const CharacterInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(!!id);

  const handleCloseDrawer = (): void => {
    setIsDrawerOpen(false);
    navigate(PATHS.main);
  };

  return (
    <Drawer
      handleCloseDrawer={handleCloseDrawer}
      isDrawerOpen={isDrawerOpen}
    >{`I am the detailed character info on ${id}`}</Drawer>
  );
};

export default CharacterInfo;
