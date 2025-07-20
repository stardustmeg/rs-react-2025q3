import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Loader from '@/components/Loader/Loader';

describe('Loader component', () => {
  it('renders', () => {
    render(<Loader />);
    const spinner = screen.getByTestId('loader-spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Loader />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('has proper accessibility attributes', () => {
    render(<Loader />);
    const spinner = screen.getByTestId('loader-spinner');
    expect(spinner).toHaveAttribute('aria-label', 'Orange and tan hamster running in a metal wheel');
  });
});
