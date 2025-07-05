import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

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

  it('renders the Retry button only if onRetry is provided', () => {
    const retryMock = vi.fn();
    render(<ErrorFallback onRetry={retryMock} />);

    const button = screen.getByRole('button', { name: /retry/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(retryMock).toHaveBeenCalledTimes(1);
  });

  it('does not render the Retry button if onRetry is not provided', () => {
    render(<ErrorFallback />);
    const button = screen.queryByRole('button', { name: /retry/i });
    expect(button).not.toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<ErrorFallback />);
    expect(asFragment()).toMatchSnapshot();
  });
});
