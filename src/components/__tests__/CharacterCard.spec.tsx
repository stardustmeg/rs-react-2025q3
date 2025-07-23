import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import type { TransformedCharacter } from '@/types';

import { mockIncompleteTransformedCharacter } from '@/__mocks__/mockIncompleteTransformedCharacter';
import { mockTransformedCharacters } from '@/__mocks__/mockTransformedCharacters';
import CharacterCard from '@/components/CharacterCard';

const mockCharacter: TransformedCharacter = mockTransformedCharacters[0];

describe('CharacterCard component', () => {
  it.skip('renders empty values when character fields are empty strings', () => {
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

  it.skip('renders character name and info labels with correct values', () => {
    render(
      <MemoryRouter>
        <CharacterCard character={mockCharacter} />
      </MemoryRouter>,
    );

    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: mockCharacter.name })).toHaveAttribute('src', mockCharacter.image);

    expect(screen.getByText(mockCharacter.info[0].value)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.info[1].value)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.info[2].value)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.info[3].value)).toBeInTheDocument();
  });

  it.skip('renders the image with correct alt text', () => {
    render(<CharacterCard character={mockCharacter} />);
    const img = screen.getByRole('img', { name: mockCharacter.name });

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('alt', mockCharacter.name);
  });

  it.skip('renders labels in the expected order', () => {
    render(<CharacterCard character={mockCharacter} />);

    const paragraphs = screen.getAllByText(/:/i);

    expect(paragraphs[0]).toHaveTextContent('Origin:');
    expect(paragraphs[1]).toHaveTextContent('Species:');
    expect(paragraphs[2]).toHaveTextContent('Gender:');
    expect(paragraphs[3]).toHaveTextContent('Status:');
  });

  it.skip('matches snapshot', () => {
    const { asFragment } = render(<CharacterCard character={mockCharacter} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
