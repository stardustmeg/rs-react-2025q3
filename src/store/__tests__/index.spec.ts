import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { mockTransformedCharacters } from '@/__mocks__/mockTransformedCharacters';

import useStore from '..';

describe('useStore', () => {
  const [character1, character2, character3] = mockTransformedCharacters;

  beforeEach(() => {
    useStore.getState().clearSelectedCharacters();
  });

  it('should initialize with empty selectedCharacters array', () => {
    const { result } = renderHook(() => useStore());

    expect(result.current.selectedCharacters).toEqual([]);
  });

  it('should add character to selected characters', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.addSelectedCharacter(character1);
    });

    expect(result.current.selectedCharacters).toHaveLength(1);
    expect(result.current.selectedCharacters[0]).toEqual(character1);
  });

  it('should not add duplicate character', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.addSelectedCharacter(character1);
      result.current.addSelectedCharacter(character1);
    });

    expect(result.current.selectedCharacters).toHaveLength(1);
  });

  it('should remove character from selected characters', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.addSelectedCharacter(character1);
      result.current.addSelectedCharacter(character2);
    });

    expect(result.current.selectedCharacters).toHaveLength(2);

    act(() => {
      result.current.removeSelectedCharacter(character1);
    });

    expect(result.current.selectedCharacters).toHaveLength(1);
    expect(result.current.selectedCharacters[0]).toEqual(character2);
  });

  it('should clear all selected characters', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.addSelectedCharacter(character1);
      result.current.addSelectedCharacter(character2);
      result.current.addSelectedCharacter(character3);
    });

    expect(result.current.selectedCharacters).toHaveLength(3);

    act(() => {
      result.current.clearSelectedCharacters();
    });

    expect(result.current.selectedCharacters).toEqual([]);
  });

  it('should check if character is selected', () => {
    const { result } = renderHook(() => useStore());

    expect(result.current.isCharacterSelected(character1)).toBe(false);

    act(() => {
      result.current.addSelectedCharacter(character1);
    });

    expect(result.current.isCharacterSelected(character1)).toBe(true);
    expect(result.current.isCharacterSelected(character2)).toBe(false);
  });

  it('should toggle character selection - add when not selected', () => {
    const { result } = renderHook(() => useStore());

    expect(result.current.isCharacterSelected(character1)).toBe(false);

    act(() => {
      result.current.toggleSelectedCharacter(character1);
    });

    expect(result.current.isCharacterSelected(character1)).toBe(true);
    expect(result.current.selectedCharacters).toHaveLength(1);
  });

  it('should toggle character selection - remove when selected', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.addSelectedCharacter(character1);
    });

    expect(result.current.isCharacterSelected(character1)).toBe(true);

    act(() => {
      result.current.toggleSelectedCharacter(character1);
    });

    expect(result.current.isCharacterSelected(character1)).toBe(false);
    expect(result.current.selectedCharacters).toHaveLength(0);
  });

  it('should handle multiple characters correctly', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.addSelectedCharacter(character1);
      result.current.addSelectedCharacter(character2);
    });

    expect(result.current.selectedCharacters).toHaveLength(2);
    expect(result.current.isCharacterSelected(character1)).toBe(true);
    expect(result.current.isCharacterSelected(character2)).toBe(true);
    expect(result.current.isCharacterSelected(character3)).toBe(false);
  });

  it('should maintain character order when adding', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.addSelectedCharacter(character3);
      result.current.addSelectedCharacter(character1);
      result.current.addSelectedCharacter(character2);
    });

    expect(result.current.selectedCharacters[0]).toEqual(character3);
    expect(result.current.selectedCharacters[1]).toEqual(character1);
    expect(result.current.selectedCharacters[2]).toEqual(character2);
  });
});
