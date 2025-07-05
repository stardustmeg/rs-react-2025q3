import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { Character } from '@/types';

import CharacterCard from '@/components/CharacterCard';

const isElement = (node: ChildNode): node is Element => {
  return node.nodeType === Node.ELEMENT_NODE;
};

const getInfoParagraph = (label: string, value: string): HTMLElement => {
  return screen.getByText((content, element) => {
    if (!element || element.tagName !== 'P') {
      return false;
    }

    const span = [...element.childNodes].find((node): node is Element => {
      if (!isElement(node)) {
        return false;
      }

      return (
        node.tagName === 'SPAN' &&
        node.classList.contains('font-semibold') &&
        !!node.textContent?.trim().startsWith(label)
      );
    });

    if (!span) {
      return false;
    }

    return content.includes(value);
  });
};

const mockCharacter: Character = {
  created: '',
  episode: [],
  gender: 'Male',
  id: 1,
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  location: { name: 'Earth (Replacement Dimension)', url: '' },
  name: 'Rick Sanchez',
  origin: { name: 'Earth (C-137)', url: '' },
  species: 'Human',
  status: 'Alive',
  type: '',
  url: '',
};

const incompleteCharacter: Character = {
  created: '',
  episode: [],
  gender: 'Male',
  id: 2,
  image: '',
  location: { name: '', url: '' },
  name: '',
  origin: { name: '', url: '' },
  species: '',
  status: 'Alive',
  type: '',
  url: '',
};

describe('CharacterCard component', () => {
  it('renders character name and info labels with correct values', () => {
    render(<CharacterCard character={mockCharacter} />);

    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: mockCharacter.name })).toHaveAttribute('src', mockCharacter.image);

    expect(getInfoParagraph('Origin', mockCharacter.origin.name)).toBeInTheDocument();
    expect(getInfoParagraph('Species', mockCharacter.species)).toBeInTheDocument();
    expect(getInfoParagraph('Gender', mockCharacter.gender)).toBeInTheDocument();
    expect(getInfoParagraph('Status', mockCharacter.status)).toBeInTheDocument();
  });

  it('renders empty values when character fields are empty strings', () => {
    render(<CharacterCard character={incompleteCharacter} />);

    expect(screen.getByText(/Origin:/i)).toHaveTextContent('Origin:');
    expect(screen.getByText(/Species:/i)).toHaveTextContent('Species:');
    expect(screen.getByText(/Gender:/i)).toHaveTextContent('Gender:');
    expect(screen.getByText(/Status:/i)).toHaveTextContent('Status:');
  });

  it('renders all info paragraphs', () => {
    render(<CharacterCard character={mockCharacter} />);
    const paragraphs = screen.getAllByText(/:/i);
    const PARAGRAPHS_COUNT = 4;
    expect(paragraphs.length).toBe(PARAGRAPHS_COUNT);
  });

  it('renders the image with correct alt text', () => {
    render(<CharacterCard character={mockCharacter} />);
    const img = screen.getByRole('img', { name: mockCharacter.name });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('alt', mockCharacter.name);
  });

  it('renders labels in the expected order', () => {
    render(<CharacterCard character={mockCharacter} />);
    const paragraphs = screen.getAllByText(/:/i);
    expect(paragraphs[0]).toHaveTextContent('Origin:');
    expect(paragraphs[1]).toHaveTextContent('Species:');
    expect(paragraphs[2]).toHaveTextContent('Gender:');
    expect(paragraphs[3]).toHaveTextContent('Status:');
  });
});
