import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ErrorFallback from '@/components/ErrorFallback';

describe('ErrorFallback component', () => {
  it('renders the error message and image', () => {
    render(<ErrorFallback />);

    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/Please try again/i)).toBeInTheDocument();

    const image = screen.getByAltText('Error illustration');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src');
  });
});
