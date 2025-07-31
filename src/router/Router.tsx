import { lazy, Suspense } from 'react';
import { createBrowserRouter, createMemoryRouter, type LoaderFunction, redirect, RouterProvider } from 'react-router';

import ErrorFallback from '@/components/ErrorFallback';
import Loader from '@/components/Loader/Loader';
import { ThemeProvider } from '@/contexts/ThemeContext';

const App = lazy(() => import('@/pages/App'));
const CharacterDetailedInfoPage = lazy(() => import('@/pages/CharacterDetailedInfoPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

const loader: LoaderFunction = ({ params }) => {
  const { id } = params;
  if (!/^\d+$/.test(id ?? '')) {
    return redirect('/404');
  }
  return null;
};

export const routerConfig = [
  {
    children: [
      {
        element: <CharacterDetailedInfoPage />,
        loader,
        path: ':id',
      },
    ],
    element: <App />,
    errorElement: <ErrorFallback />,
    path: '/',
  },
  {
    element: <AboutPage />,
    errorElement: <ErrorFallback />,
    path: 'about',
  },
  {
    element: <NotFoundPage />,
    path: '404',
  },
  {
    element: <NotFoundPage />,
    path: '*',
  },
];

export const createRouter = (initialEntries: string[]): ReturnType<typeof createMemoryRouter> =>
  createMemoryRouter(routerConfig, { initialEntries });

export const Router: React.FC = () => (
  <ThemeProvider>
    <Suspense fallback={<Loader />}>
      <RouterProvider router={createBrowserRouter(routerConfig)} />
    </Suspense>
  </ThemeProvider>
);
