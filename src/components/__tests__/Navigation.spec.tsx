import type { JSX } from 'react';

import { render, screen } from '@testing-library/react';
import { noop } from '@vitest/utils';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import Header from '@/components/Header';
import { PATHS } from '@/router/constants';

const renderWithRouter = (ui: JSX.Element): ReturnType<typeof render> => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('Navigation component', () => {
  it('renders the About link with correct href', () => {
    renderWithRouter(<Header handleSearch={noop} initialSearchQuery="" />);
    const link = screen.getByRole('link', { name: /about/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', PATHS.about);
  });
});
