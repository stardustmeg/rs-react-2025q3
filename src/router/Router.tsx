import type { JSX } from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router';

import App from '@/pages/App';
import { PATHS } from '@/router/constants';

const router = createBrowserRouter([
  {
    element: <App />,
    // TBD: add fallback element
    // errorElement: ,
    path: PATHS.main,
  },
]);

export const Router = (): JSX.Element => <RouterProvider router={router} />;
