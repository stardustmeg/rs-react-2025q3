import React, { type JSX, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import Drawer from '@/components/Drawer';

const DetailedCharacterInfo = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(!!id);

  const handleCloseDrawer = (): void => {
    setIsDrawerOpen(false);
    navigate(-1);
  };

  return (
    <Drawer
      handleCloseDrawer={handleCloseDrawer}
      isDrawerOpen={isDrawerOpen}
    >{`I am the detailed character info on ${id}`}</Drawer>
  );
};

export default React.memo(DetailedCharacterInfo);
