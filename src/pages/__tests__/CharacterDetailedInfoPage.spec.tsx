import { fireEvent, render, screen } from '@testing-library/react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { afterEach, beforeAll, describe, expect, it, type Mock, vi } from 'vitest';

import { useCharacterById } from '@/hooks/useCharacterById';
import CharacterDetailedInfoPage from '@/pages/CharacterDetailedInfoPage';
import { QueryProvider } from '@/providers/QueryProvider';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useParams: vi.fn(),
    useSearchParams: vi.fn(),
  };
});

vi.mock('@/hooks/useCharacterById', () => ({
  useCharacterById: vi.fn(),
}));

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();

  Object.defineProperty(HTMLDialogElement.prototype, 'open', {
    get: function (this: HTMLDialogElement) {
      return Object.prototype.hasOwnProperty.call(this.dataset, 'open');
    },
    set: function (this: HTMLDialogElement, value: boolean) {
      if (value) {
        this.dataset.open = '';
      } else {
        delete this.dataset.open;
      }
    },
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('CharacterDetailedInfo component', () => {
  it('renders Loader when status is loading', () => {
    (useParams as Mock).mockReturnValue({ id: '1' });
    (useSearchParams as Mock).mockReturnValue([new URLSearchParams('q=test')]);
    (useNavigate as Mock).mockReturnValue(vi.fn());
    (useCharacterById as Mock).mockReturnValue({ character: null, status: { status: 'loading' } });

    render(
      <QueryProvider>
        <CharacterDetailedInfoPage />
      </QueryProvider>,
    );
    expect(screen.getByTestId('loader-spinner')).toBeInTheDocument();
  });

  it('renders CharacterDetails when status is ready and character exists', () => {
    (useParams as Mock).mockReturnValue({ id: '1' });
    (useSearchParams as Mock).mockReturnValue([new URLSearchParams('q=test')]);
    (useNavigate as Mock).mockReturnValue(vi.fn());
    (useCharacterById as Mock).mockReturnValue({
      character: { id: 1, image: 'rick.png', info: [], name: 'Rick Sanchez' },
      status: { status: 'ready' },
    });

    render(
      <QueryProvider>
        <CharacterDetailedInfoPage />
      </QueryProvider>,
    );
    expect(screen.getByText(/rick sanchez/i)).toBeInTheDocument();
  });

  it('renders NoResultsFound when status is ready but character is null', () => {
    (useParams as Mock).mockReturnValue({ id: '1' });
    (useSearchParams as Mock).mockReturnValue([new URLSearchParams()]);
    (useNavigate as Mock).mockReturnValue(vi.fn());
    (useCharacterById as Mock).mockReturnValue({ character: null, status: { status: 'ready' } });

    render(
      <QueryProvider>
        <CharacterDetailedInfoPage />
      </QueryProvider>,
    );
    expect(screen.getByText(/nothing was found/i)).toBeInTheDocument();
  });

  it('renders ErrorFallback on error', () => {
    (useParams as Mock).mockReturnValue({ id: '1' });
    (useSearchParams as Mock).mockReturnValue([new URLSearchParams()]);
    (useNavigate as Mock).mockReturnValue(vi.fn());
    (useCharacterById as Mock).mockReturnValue({ character: null, status: { status: 'error' } });

    render(
      <QueryProvider>
        <CharacterDetailedInfoPage />
      </QueryProvider>,
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('calls navigate when drawer is closed', () => {
    const mockNavigate = vi.fn();
    (useParams as Mock).mockReturnValue({ id: '1' });
    (useSearchParams as Mock).mockReturnValue([new URLSearchParams('q=test')]);
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (useCharacterById as Mock).mockReturnValue({ character: null, status: { status: 'ready' } });

    render(
      <QueryProvider>
        <CharacterDetailedInfoPage />
      </QueryProvider>,
    );
    fireEvent.click(screen.getByTestId('drawer-panel'));
    expect(mockNavigate).toHaveBeenCalledWith('/?q=test');
  });
});
