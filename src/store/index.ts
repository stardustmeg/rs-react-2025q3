import { create } from 'zustand';

import type { TransformedCharacter } from '@/types';

interface CharacterStore {
  addSelectedCharacter: (character: TransformedCharacter) => void;
  clearSelectedCharacters: () => void;
  isCharacterSelected: (character: TransformedCharacter) => boolean;
  removeSelectedCharacter: (character: TransformedCharacter) => void;
  selectedCharacters: TransformedCharacter[];
  toggleSelectedCharacter: (character: TransformedCharacter) => void;
}

const useStore = create<CharacterStore>((set, get) => ({
  addSelectedCharacter: (character: TransformedCharacter): void => {
    set((state) => ({
      selectedCharacters: state.selectedCharacters.some((c) => c.id === character.id)
        ? state.selectedCharacters
        : [...state.selectedCharacters, character],
    }));
  },

  clearSelectedCharacters: (): void => {
    set({ selectedCharacters: [] });
  },

  isCharacterSelected: (character: TransformedCharacter): boolean => {
    return get().selectedCharacters.some((c) => c.id === character.id);
  },

  removeSelectedCharacter: (character: TransformedCharacter): void => {
    set((state) => ({
      selectedCharacters: state.selectedCharacters.filter((c) => c.id !== character.id),
    }));
  },

  selectedCharacters: [],

  toggleSelectedCharacter: (character: TransformedCharacter): void => {
    const { addSelectedCharacter, isCharacterSelected, removeSelectedCharacter } = get();

    if (isCharacterSelected(character)) {
      removeSelectedCharacter(character);
    } else {
      addSelectedCharacter(character);
    }
  },
}));

export default useStore;
