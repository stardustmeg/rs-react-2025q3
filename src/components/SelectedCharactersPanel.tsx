import React from 'react';

import type { TransformedCharacter } from '@/types';

import { downloadCSV } from '@/components/helpers/downloadCsv';
import useStore from '@/store';

interface SelectedCharactersPanelProps {
  selectedCharacters: TransformedCharacter[];
}

const SelectedCharactersPanel: React.FC<SelectedCharactersPanelProps> = ({ selectedCharacters }) => {
  const { clearSelectedCharacters } = useStore();

  const handleUnselectAll = (): void => {
    clearSelectedCharacters();
  };

  const handleDownloadCSV = (): void => {
    downloadCSV(selectedCharacters);
  };

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 rounded-t-3xl border-t-2 border-gray-200 bg-white shadow-lg dark:border-dark-border dark:bg-dark-card">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="rounded-full bg-custom-blue px-3 py-1 text-sm font-medium text-custom-coal dark:bg-dark-border dark:text-dark-text">
              {selectedCharacters.length} selected
            </div>
          </div>

          <div className="flex place-items-center space-x-3">
            <div>
              <button
                className="button rounded px-4 py-2 text-gray-600 dark:text-gray-300 dark:hover:text-dark-text"
                onClick={handleUnselectAll}
              >
                Unselect All
              </button>
            </div>

            <div>
              <button
                className="button rounded bg-custom-pink px-4 py-2 font-medium text-white shadow-sm dark:bg-custom-pink"
                onClick={handleDownloadCSV}
              >
                Download CSV
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedCharactersPanel;
