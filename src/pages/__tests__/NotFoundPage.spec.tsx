import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';

import NotFoundPage from '@/pages/NotFoundPage';

vi.mock('@/assets/png/rick_and_morty_eyes.png', () => ({
  default: 'test-error-image.png',
}));

describe('NotFoundPage', () => {
  const renderNotFoundPage = (): ReturnType<typeof render> => {
    return render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );
  };

  it('renders the 404 error image with correct attributes', () => {
    renderNotFoundPage();
    const errorImage = screen.getByAltText('Error illustration');
    expect(errorImage).toBeInTheDocument();
    expect(errorImage).toHaveAttribute('src', 'test-error-image.png');
  });

  it('displays the correct error heading', () => {
    renderNotFoundPage();
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('404 - Page Not Found');
  });

  it('shows the descriptive error message', () => {
    renderNotFoundPage();
    const message = screen.getByText('It is not the page you are looking for.');
    expect(message).toBeInTheDocument();
  });

  it('contains a working link back to the home page', () => {
    renderNotFoundPage();
    const homeLink = screen.getByRole('link', { name: 'Go back to Main' });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
    expect(homeLink).toHaveClass('hover:underline');
  });
});
