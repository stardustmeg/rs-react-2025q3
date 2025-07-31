import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';

import AboutPage from '@/pages/AboutPage';

vi.mock('@/assets/png/my-photo.png', () => ({
  default: 'test-image-path.png',
}));

describe('AboutPage', () => {
  const renderAboutPage = (): ReturnType<typeof render> => {
    return render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    );
  };

  it('renders the page title', () => {
    renderAboutPage();
    expect(screen.getByRole('heading', { name: 'About Me' })).toBeInTheDocument();
  });

  it('displays the avatar image with correct attributes', () => {
    renderAboutPage();
    const avatar = screen.getByAltText("Meg's Avatar");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'test-image-path.png');
  });

  it('contains a link to GitHub profile with correct attributes', () => {
    renderAboutPage();
    const githubLink = screen.getByRole('link', { name: 'My GitHub Profile' });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/stardustmeg');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('displays the about me text content', () => {
    renderAboutPage();
    const aboutText = screen.getByText(/Hi! I'm Meg and I'm obsessed with front-end development/i);
    expect(aboutText).toBeInTheDocument();
  });

  it('contains a link to RS School course with correct attributes', () => {
    renderAboutPage();
    const courseLink = screen.getByRole('link', { name: 'RS School React Course' });
    expect(courseLink).toBeInTheDocument();
    expect(courseLink).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    expect(courseLink).toHaveAttribute('target', '_blank');
    expect(courseLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has a link to navigate back to home', () => {
    renderAboutPage();
    const homeLink = screen.getByRole('link', { name: 'Go back to Main' });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
