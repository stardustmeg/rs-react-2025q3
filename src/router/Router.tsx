import { createBrowserRouter, RouterProvider } from 'react-router';

import CharacterInfo from '@/components/CharacterInfo';
import AboutPage from '@/pages/AboutPage';
import App from '@/pages/App';
import NotFoundPage from '@/pages/NotFoundPage';
import { PATHS } from '@/router/constants';

const router = createBrowserRouter([
  {
    children: [
      {
        element: <CharacterInfo />,
        path: ':id',
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

export const Router: React.FC = () => <RouterProvider router={router} />;
