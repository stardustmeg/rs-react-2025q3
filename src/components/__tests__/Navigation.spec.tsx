import type { JSX } from 'react';

import { render, screen } from '@testing-library/react';
import { noop } from '@vitest/utils';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';

import Header from '@/components/Header';
import { ThemeProvider } from '@/contexts/ThemeContext';

Object.defineProperty(window, 'matchMedia', {
  value: vi.fn().mockImplementation(() => ({ matches: false })),
  writable: true,
});

vi.mock('@/hooks/useLocalStorage', () => ({
  useLocalStorage: vi.fn(() => ['light', vi.fn()]),
}));

const renderWithProviders = (ui: JSX.Element): ReturnType<typeof render> => {
  return render(
    <MemoryRouter>
      <ThemeProvider>{ui}</ThemeProvider>
    </MemoryRouter>,
  );
};

describe('Navigation component', () => {
  it('renders the About link with correct href', () => {
    renderWithProviders(<Header handleSearch={noop} initialSearchQuery="" />);
    const link = screen.getByRole('link', { name: /about/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/about');
  });
});
