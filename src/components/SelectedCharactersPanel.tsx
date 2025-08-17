'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import type { Character } from '@/types/index';

import { downloadCSVAction } from '@/app/actions/csv';

interface SelectedCharactersPanelProps {
  onClearSelected: () => void;
  selectedCharacters: Character[];
}

const SelectedCharactersPanel: React.FC<SelectedCharactersPanelProps> = ({ onClearSelected, selectedCharacters }) => {
  const t = useTranslations('selected');

  const handleDownloadCSV = async (): Promise<void> => {
    try {
      const result = await downloadCSVAction(selectedCharacters);

      const blob = new Blob([result.csv], { type: result.mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download = result.filename;
      link.style.visibility = 'hidden';
      document.body.append(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.warn('Failed to download CSV:', error);
    }
  };

  const handleDownloadClick = (): void => {
    void handleDownloadCSV();
  };

  return (
    <div
      className="fixed right-0 bottom-0 left-0 z-50 rounded-t-3xl border-t-2 border-gray-200 bg-white shadow-lg dark:border-dark-border dark:bg-dark-card"
      data-scroll-behavior="manual"
    >
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="rounded-full bg-custom-blue px-3 py-1 text-sm font-medium text-custom-coal dark:bg-dark-border dark:text-dark-text">
              {t('count', { count: selectedCharacters.length })}
            </div>
          </div>

          <div className="flex place-items-center space-x-3">
            <div>
              <button
                className="button rounded px-4 py-2 text-gray-600 dark:text-gray-300 dark:hover:text-dark-text"
                onClick={onClearSelected}
              >
                {t('unselectAll')}
              </button>
            </div>

            <div>
              <button
                className="button rounded bg-custom-pink px-4 py-2 font-medium text-white shadow-sm dark:bg-custom-pink"
                onClick={handleDownloadClick}
              >
                {t('downloadCsv')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedCharactersPanel;
