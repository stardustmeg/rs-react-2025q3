/* eslint-disable perfectionist/sort-objects */
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

import ErrorFallback from '@/components/ErrorFallback';
import Loader from '@/components/Loader/Loader';

const App = lazy(() => import('@/pages/App'));
const CharacterDetailedInfo = lazy(() => import('@/components/CharacterDetailedInfo'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorFallback />,
    children: [
      {
        path: ':id',
        element: <CharacterDetailedInfo />,
      },
    ],
  },
  {
    path: 'about',
    element: <AboutPage />,
    errorElement: <ErrorFallback />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
    errorElement: <ErrorFallback />,
  },
]);

export const Router: React.FC = () => (
  <Suspense fallback={<Loader />}>
    <RouterProvider router={router} />
  </Suspense>
);
