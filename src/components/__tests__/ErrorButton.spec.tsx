import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MockErrorBoundary } from '@/__mocks__/MockErrorBoundary';
import ErrorButton from '@/components/ErrorButton';

describe('ErrorButton', () => {
  it('renders button initially', () => {
    render(
      <MockErrorBoundary>
        <ErrorButton />
      </MockErrorBoundary>,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('catches error when button clicked', () => {
    render(
      <MockErrorBoundary>
        <ErrorButton />
      </MockErrorBoundary>,
    );

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('alert')).toHaveTextContent('Test error thrown from ErrorButton');
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<ErrorButton />);
    expect(asFragment()).toMatchSnapshot();
  });
});
