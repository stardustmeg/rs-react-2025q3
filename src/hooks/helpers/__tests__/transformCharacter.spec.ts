import { describe, expect, it } from 'vitest';

import type { Character } from '@/types';

import { mockCharacters } from '@/__mocks__/mockCharacters';
import { transformCharacter } from '@/hooks/helpers/transformCharacter';

describe('transformCharacter', () => {
  const mockCharacter: Character = mockCharacters[0];

  it('should transform character with all required fields', () => {
    const result = transformCharacter(mockCharacter);

    expect(result).toEqual({
      gender: mockCharacter.gender,
      id: String(mockCharacter.id),
      image: mockCharacter.image,
      info: [
        { label: 'Gender', value: mockCharacter.gender },
        { label: 'Origin', value: mockCharacter.origin.name },
        { label: 'Species', value: mockCharacter.species },
        { label: 'Status', value: mockCharacter.status },
      ],
      name: mockCharacter.name,
      origin: mockCharacter.origin.name,
      species: mockCharacter.species,
      status: mockCharacter.status,
    });
  });

  it('should convert numeric id to string', () => {
    const result = transformCharacter(mockCharacter);

    expect(result.id).toBe('1');
    expect(typeof result.id).toBe('string');
  });

  it('should create info array with correct labels and values', () => {
    const result = transformCharacter(mockCharacter);

    expect(result.info).toHaveLength(4);
    expect(result.info[0]).toEqual({ label: 'Gender', value: 'Male' });
    expect(result.info[1]).toEqual({ label: 'Origin', value: 'Mock Earth (C-137)' });
    expect(result.info[2]).toEqual({ label: 'Species', value: 'Human' });
    expect(result.info[3]).toEqual({ label: 'Status', value: 'Alive' });
  });

  it('should extract origin name from origin object', () => {
    const result = transformCharacter(mockCharacter);

    expect(result.origin).toBe(mockCharacter.origin.name);
    expect(result.origin).toBe('Mock Earth (C-137)');
  });

  it('should handle character with empty origin name', () => {
    const characterWithEmptyOrigin: Character = {
      ...mockCharacter,
      origin: { name: '', url: '' },
    };

    const result = transformCharacter(characterWithEmptyOrigin);

    expect(result.origin).toBe('');
    expect(result.info[1].value).toBe('');
  });

  it('should handle character with unknown origin', () => {
    const characterWithUnknownOrigin: Character = {
      ...mockCharacter,
      origin: { name: 'unknown', url: '' },
    };

    const result = transformCharacter(characterWithUnknownOrigin);

    expect(result.origin).toBe('unknown');
    expect(result.info[1].value).toBe('unknown');
  });

  it('should preserve all original character properties', () => {
    const result = transformCharacter(mockCharacter);

    expect(result.name).toBe(mockCharacter.name);
    expect(result.gender).toBe(mockCharacter.gender);
    expect(result.species).toBe(mockCharacter.species);
    expect(result.status).toBe(mockCharacter.status);
    expect(result.image).toBe(mockCharacter.image);
  });
});
