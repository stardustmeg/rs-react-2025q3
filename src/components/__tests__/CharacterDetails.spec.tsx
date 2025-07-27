import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { mockTransformedCharacters } from '@/__mocks__/mockTransformedCharacters';
import CharacterDetails from '@/components/CharacterDetails';

const mockCharacter = mockTransformedCharacters[0];

describe('CharacterDetails', () => {
  it('renders character name, image and info details', () => {
    render(<CharacterDetails character={mockCharacter} />);

    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();

    const img = screen.getByAltText(mockCharacter.name) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(mockCharacter.image);

    for (const { label, value } of mockCharacter.info) {
      expect(screen.getByText(label)).toBeInTheDocument();
      expect(screen.getByText(value)).toBeInTheDocument();
    }
  });
});
