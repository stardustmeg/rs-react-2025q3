import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';

import type { TransformedCharacter } from '@/types';

import { mockIncompleteTransformedCharacter } from '@/__mocks__/mockIncompleteTransformedCharacter';
import { mockTransformedCharacters } from '@/__mocks__/mockTransformedCharacters';
import CharacterCard from '@/components/CharacterCard';

vi.mock('react-router', async () => {
  const actual = await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    useSearchParams: (): [URLSearchParams] => [new URLSearchParams('filter=name')],
  };
});

import useStore from '@/store';

vi.mock('@/store', () => ({
  default: vi.fn(() => ({
    isCharacterSelected: vi.fn(() => false),
    toggleSelectedCharacter: vi.fn(),
  })),
}));

const mockCharacter: TransformedCharacter = mockTransformedCharacters[0];

describe('CharacterCard component', () => {
  it('renders empty values when character fields are empty strings', () => {
    render(
      <MemoryRouter>
        <CharacterCard character={mockIncompleteTransformedCharacter} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Origin:/i)).toHaveTextContent('Origin:');
    expect(screen.getByText(/Species:/i)).toHaveTextContent('Species:');
    expect(screen.getByText(/Gender:/i)).toHaveTextContent('Gender:');
    expect(screen.getByText(/Status:/i)).toHaveTextContent('Status:');
  });

  it('renders character name and info labels with correct values', () => {
    render(
      <MemoryRouter>
        <CharacterCard character={mockCharacter} />
      </MemoryRouter>,
    );

    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: mockCharacter.name })).toHaveAttribute('src', mockCharacter.image);

    for (const { value } of mockCharacter.info) {
      expect(screen.getByText(value)).toBeInTheDocument();
    }
  });

  it('renders the image with correct alt text', () => {
    render(
      <MemoryRouter>
        <CharacterCard character={mockCharacter} />
      </MemoryRouter>,
    );

    const img = screen.getByRole('img', { name: mockCharacter.name });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('alt', mockCharacter.name);
  });

  it('renders checkbox with correct initial state', () => {
    render(
      <MemoryRouter>
        <CharacterCard character={mockCharacter} />
      </MemoryRouter>,
    );

    const checkbox = screen.getByTestId('character-checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('renders selected state when character is selected', () => {
    vi.mocked(useStore).mockReturnValue({
      addSelectedCharacter: vi.fn(),
      clearSelectedCharacters: vi.fn(),
      isCharacterSelected: vi.fn(() => true),
      removeSelectedCharacter: vi.fn(),
      selectedCharacters: [],
      toggleSelectedCharacter: vi.fn(),
    });

    render(
      <MemoryRouter>
        <CharacterCard character={mockCharacter} />
      </MemoryRouter>,
    );

    const checkbox = screen.getByTestId('character-checkbox');
    expect(checkbox).toBeChecked();
  });

  it('creates correct link with search params', () => {
    render(
      <MemoryRouter>
        <CharacterCard character={mockCharacter} />
      </MemoryRouter>,
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/${mockCharacter.id}?filter=name`);
  });

  it('renders character card with correct test id', () => {
    render(
      <MemoryRouter>
        <CharacterCard character={mockCharacter} />
      </MemoryRouter>,
    );

    const card = screen.getByTestId('character-card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('mx-auto', 'h-full', 'w-full', 'rounded-lg');
  });

  it('matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <CharacterCard character={mockCharacter} />
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
