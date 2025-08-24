import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Header } from '@/components/Header';

describe('Header Component', () => {
  it('renders header with correct structure', () => {
    render(<Header />);

    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
    expect(header.className).toMatch(/appHeader/);
  });

  it('renders main heading with correct text', () => {
    render(<Header />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('React Forms Application');
  });

  it('has proper semantic structure', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    const heading = screen.getByRole('heading', { level: 1 });

    expect(header).toContainElement(heading);
  });
});
