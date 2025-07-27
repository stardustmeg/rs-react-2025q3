import type { JSX } from 'react';

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { mockTransformedCharacters } from '@/__mocks__/mockTransformedCharacters';
import CardList from '@/components/CardList';

vi.mock('@/components/CharacterCard', () => ({
  default: ({ character }: { character: { name: string } }): JSX.Element => <div>{character.name}</div>,
}));

vi.mock('@/components/NoResultsFound', () => ({
  default: (): JSX.Element => <div>No Results</div>,
}));

describe('CardList component', () => {
  it('renders character cards when characters are present', () => {
    render(<CardList characters={mockTransformedCharacters} />);

    for (const char of mockTransformedCharacters) {
      expect(screen.getByText(char.name)).toBeInTheDocument();
    }

    expect(screen.queryByText('No Results')).not.toBeInTheDocument();
  });

  it('renders NoResultsFound when characters array is empty', () => {
    render(<CardList characters={[]} />);

    expect(screen.getByText('No Results')).toBeInTheDocument();
  });
});
