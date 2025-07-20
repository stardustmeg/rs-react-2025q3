import { setupServer } from 'msw/node';

import { handlers } from '@/__tests__/msw/handlers';

export const server = setupServer(...handlers);
