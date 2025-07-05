import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Loader from '@/components/Loader';

describe('Loader component', () => {
  it('renders with default size (lg)', () => {
    render(<Loader />);
    const spinner = screen.getByTestId('loader-spinner');
    expect(spinner).toHaveClass('w-24 h-24 border-6');
  });

  it('renders with size lg', () => {
    render(<Loader size="lg" />);
    const spinner = screen.getByTestId('loader-spinner');
    expect(spinner).toHaveClass('w-24 h-24 border-6');
  });

  it('renders with size md', () => {
    render(<Loader size="md" />);
    const spinner = screen.getByTestId('loader-spinner');
    expect(spinner).toHaveClass('w-16 h-16 border-4');
  });

  it('renders with size sm', () => {
    render(<Loader size="sm" />);
    const spinner = screen.getByTestId('loader-spinner');
    expect(spinner).toHaveClass('w-8 h-8 border-2');
  });
});
