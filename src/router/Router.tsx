import type { JSX } from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router';

import AboutPage from '@/pages/AboutPage';
import App from '@/pages/App';
import DetailedPage from '@/pages/DetailedPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { PATHS } from '@/router/constants';

const router = createBrowserRouter([
  {
    children: [
      {
        element: <DetailedPage />,
        path: 'detailed/:id',
      },
    ],
    element: <App />,
    // TBD: add fallback element
    // errorElement: ,
    path: PATHS.main,
  },
  {
    element: <AboutPage />,
    path: PATHS.about,
  },
  {
    element: <NotFoundPage />,
    path: PATHS.joker,
  },
]);

export const Router = (): JSX.Element => <RouterProvider router={router} />;
