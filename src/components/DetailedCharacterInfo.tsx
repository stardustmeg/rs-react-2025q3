import React, { type JSX } from 'react';

import Drawer from '@/components/Drawer';

const DetailedCharacterInfo = (): JSX.Element => {
  return <Drawer>{'I am the detailed character info'}</Drawer>;
};

export default React.memo(DetailedCharacterInfo);
