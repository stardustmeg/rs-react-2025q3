import type { JSX } from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { noop } from '@vitest/utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { mockCharacters } from '@/__mocks__/mockCharacters';
import CardList from '@/components/CardList';
import { fetchCharacters } from '@/services/api';
import createHttpError from '@/services/utils/httpError';

const mockCharacterRick = mockCharacters[0];
const mockCharacterMorty = mockCharacters[1];
const mockedFetchCharacters = vi.mocked(fetchCharacters);

vi.mock('@/components/CharacterCard', () => ({
  default: ({ character }: { character: typeof mockCharacterRick }): JSX.Element => <div>{character.name}</div>,
}));

vi.mock('@/components/NoResultsFound', () => ({
  default: (): JSX.Element => <div>No Results</div>,
}));

vi.mock('@/components/ErrorFallback', () => ({
  default: ({ onRetry }: { onRetry: () => void }): JSX.Element => <button onClick={onRetry}>Retry</button>,
}));

vi.mock('@/services/api', async () => {
  const original = await vi.importActual('@/services/api');
  return { ...original, fetchCharacters: vi.fn() };
});

describe('CardList component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loader initially', () => {
    mockedFetchCharacters.mockReturnValue(new Promise(noop));

    const { container } = render(<CardList searchQuery="rick" />);
    expect(screen.getByTestId('loader-spinner')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('renders character cards when characters are fetched', async () => {
    mockedFetchCharacters.mockResolvedValue({ results: [mockCharacterRick] });
    const { container } = render(<CardList searchQuery="rick" />);
    await waitFor(() => {
      expect(screen.getByText('Mock Rick Sanchez')).toBeInTheDocument();
    });
    expect(container).toMatchSnapshot();
  });

  it('calls loadCharacters again when search prop changes', async () => {
    mockedFetchCharacters.mockResolvedValueOnce({ results: [mockCharacterRick] });

    const { rerender } = render(<CardList searchQuery="rick" />);
    await waitFor(() => {
      expect(mockedFetchCharacters).toHaveBeenCalledWith({ name: 'rick' });
    });
    await waitFor(() => {
      expect(screen.getByText('Mock Rick Sanchez')).toBeInTheDocument();
    });

    mockedFetchCharacters.mockResolvedValueOnce({ results: [mockCharacterMorty] });

    rerender(<CardList searchQuery="morty" />);
    await waitFor(() => {
      expect(mockedFetchCharacters).toHaveBeenCalledWith({ name: 'morty' });
    });
    await waitFor(() => {
      expect(screen.getByText('Mock Morty Smith')).toBeInTheDocument();
    });
  });

  it('renders NoResultsFound if no characters are returned', async () => {
    mockedFetchCharacters.mockResolvedValue({ results: [] });

    const { container } = render(<CardList searchQuery="unknown" />);
    await waitFor(() => {
      expect(screen.getByText('No Results')).toBeInTheDocument();
    });
    expect(container).toMatchSnapshot();
  });

  it('handles missing results in fetched data gracefully', async () => {
    mockedFetchCharacters.mockResolvedValueOnce({});

    render(<CardList searchQuery="rick" />);
    await waitFor(() => {
      expect(screen.getByText('No Results')).toBeInTheDocument();
    });
  });

  it('renders ErrorFallback for network errors', async () => {
    mockedFetchCharacters.mockRejectedValue(new Error('Network error'));

    const { container } = render(<CardList searchQuery="rick" />);
    await waitFor(() => {
      expect(screen.getByText('Retry')).toBeInTheDocument();
    });
    expect(container).toMatchSnapshot();
  });

  it('renders NoResultsFound for 404 error', async () => {
    const NOT_FOUND_ERROR_CODE = 404;
    mockedFetchCharacters.mockRejectedValue(createHttpError(NOT_FOUND_ERROR_CODE, 'Not Found'));

    const { container } = render(<CardList searchQuery="unknown" />);
    await waitFor(() => {
      expect(screen.getByText('No Results')).toBeInTheDocument();
    });
    expect(container).toMatchSnapshot();
  });

  it('retries fetching data on retry button click', async () => {
    mockedFetchCharacters
      .mockRejectedValueOnce(new Error('First error'))
      .mockResolvedValueOnce({ results: [mockCharacterRick] });

    render(<CardList searchQuery="rick" />);
    await waitFor(() => {
      expect(screen.getByText('Retry')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Retry'));

    await waitFor(() => {
      expect(screen.getByText('Mock Rick Sanchez')).toBeInTheDocument();
    });
  });
});
