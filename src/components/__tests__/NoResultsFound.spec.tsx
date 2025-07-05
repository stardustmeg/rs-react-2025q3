import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import NoResultsFound from '@/components/NoResultsFound';

describe('NoResultsFound component', () => {
  it('renders the message text', () => {
    render(<NoResultsFound />);
    expect(screen.getByText(/Nothing was found in this dimension/i)).toBeInTheDocument();
    expect(screen.getByText(/Try a different one/i)).toBeInTheDocument();
  });

  it('renders the fallback image with correct alt text', () => {
    render(<NoResultsFound />);
    const image = screen.getByAltText('No results found');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src');
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<NoResultsFound />);
    expect(asFragment()).toMatchSnapshot();
  });
});
