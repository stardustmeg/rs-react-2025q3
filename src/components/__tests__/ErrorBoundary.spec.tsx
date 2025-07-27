import type { JSX } from 'react';

import { render, screen } from '@testing-library/react';
import { noop } from '@vitest/utils';
import { describe, expect, it, vi } from 'vitest';

import ErrorBoundary from '@/components/ErrorBoundary';

const ProblemChild = (): JSX.Element => {
  throw new Error('Test error');
};

describe('ErrorBoundary component', () => {
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Safe Child</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText('Safe Child')).toBeInTheDocument();
  });

  it('catches error and shows fallback UI', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(noop);

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>,
    );

    expect(screen.getByText(/Congrats! It was successfully handled/i)).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });

  it('logs error and error info on componentDidCatch', () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(noop);

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>,
    );

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('ErrorBoundary caught an error:'),
      expect.any(Error),
      expect.any(Object),
    );

    consoleWarnSpy.mockRestore();
  });
});
