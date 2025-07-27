import type { JSX } from 'react';

import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { createRouter } from '@/router/Router';

vi.mock('@/pages/AboutPage', () => ({
  default: (): JSX.Element => <div>About Page</div>,
}));
vi.mock('@/pages/NotFoundPage', () => ({
  default: (): JSX.Element => <div>Not Found Page</div>,
}));
vi.mock('@/pages/App', () => ({
  default: (): JSX.Element => <div>App Page</div>,
}));
vi.mock('@/pages/CharacterDetailedInfo', () => ({
  default: (): JSX.Element => <div>Character Detailed Info Page</div>,
}));

beforeEach(() => {
  vi.resetAllMocks();
});

describe('Router', () => {
  test('renders AboutPage for /about', async () => {
    const router = createRouter(['/about']);
    render(<RouterProvider router={router} />);
    expect(await screen.findByText('About Page')).toBeInTheDocument();
  });

  test('redirects to NotFoundPage for invalid ID', async () => {
    const router = createRouter(['/abc']);
    render(<RouterProvider router={router} />);
    expect(await screen.findByText('Not Found Page')).toBeInTheDocument();
  });

  test('renders NotFoundPage for /404', async () => {
    const router = createRouter(['/404']);
    render(<RouterProvider router={router} />);
    expect(await screen.findByText('Not Found Page')).toBeInTheDocument();
  });

  test('renders NotFoundPage for unknown route', async () => {
    const router = createRouter(['/does-not-exist']);
    render(<RouterProvider router={router} />);
    expect(await screen.findByText('Not Found Page')).toBeInTheDocument();
  });
});
