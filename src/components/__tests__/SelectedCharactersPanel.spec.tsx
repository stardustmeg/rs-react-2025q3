import { fireEvent, render, screen } from '@testing-library/react';
import { noop } from '@vitest/utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { mockTransformedCharacters } from '@/__mocks__/mockTransformedCharacters';
import SelectedCharactersPanel from '@/components/SelectedCharactersPanel';

const mockClearSelectedCharacters = vi.fn();
vi.mock('@/store', () => ({
  default: vi.fn(() => ({
    clearSelectedCharacters: mockClearSelectedCharacters,
  })),
}));

const mockCreateObjectURL = vi.fn(() => 'mock-url');
const mockRevokeObjectURL = vi.fn();
global.URL.createObjectURL = mockCreateObjectURL;
global.URL.revokeObjectURL = mockRevokeObjectURL;

global.Blob = vi.fn().mockImplementation((content: BlobPart[], options?: BlobPropertyBag) => ({
  content,
  options,
})) as unknown as typeof Blob;

describe('SelectedCharactersPanel', () => {
  const selectedCharacters = mockTransformedCharacters.slice(0, 2);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the panel with correct selected count', () => {
    render(<SelectedCharactersPanel selectedCharacters={selectedCharacters} />);

    expect(screen.getByText('2 selected')).toBeInTheDocument();
  });

  it('renders Unselect All button', () => {
    render(<SelectedCharactersPanel selectedCharacters={selectedCharacters} />);

    const unselectButton = screen.getByRole('button', { name: /unselect all/i });
    expect(unselectButton).toBeInTheDocument();
  });

  it('renders Download CSV button', () => {
    render(<SelectedCharactersPanel selectedCharacters={selectedCharacters} />);

    const downloadButton = screen.getByRole('button', { name: /download csv/i });
    expect(downloadButton).toBeInTheDocument();
  });

  it('calls clearSelectedCharacters when Unselect All is clicked', () => {
    render(<SelectedCharactersPanel selectedCharacters={selectedCharacters} />);

    const unselectButton = screen.getByRole('button', { name: /unselect all/i });
    fireEvent.click(unselectButton);

    expect(mockClearSelectedCharacters).toHaveBeenCalled();
  });

  it('downloads CSV when Download CSV button is clicked', () => {
    render(<SelectedCharactersPanel selectedCharacters={selectedCharacters} />);

    const downloadButton = screen.getByRole('button', { name: /download csv/i });
    fireEvent.click(downloadButton);

    expect(global.Blob).toHaveBeenCalledWith(
      [expect.stringContaining('"ID","Name","Status","Species","Gender","Origin"')],
      {
        type: 'text/csv;charset=utf-8;',
      },
    );
    expect(mockCreateObjectURL).toHaveBeenCalled();
  });

  it('shows correct count for single character', () => {
    render(<SelectedCharactersPanel selectedCharacters={[selectedCharacters[0]]} />);

    expect(screen.getByText('1 selected')).toBeInTheDocument();
  });

  it('shows correct count for multiple characters', () => {
    render(<SelectedCharactersPanel selectedCharacters={mockTransformedCharacters} />);

    expect(screen.getByText(`${mockTransformedCharacters.length} selected`)).toBeInTheDocument();
  });

  it('generates correct CSV filename based on character count', () => {
    render(<SelectedCharactersPanel selectedCharacters={selectedCharacters} />);

    const downloadLink = screen.getByLabelText('Download CSV') as HTMLAnchorElement;
    expect(downloadLink).toBeInTheDocument();

    const clickSpy = vi.spyOn(downloadLink, 'click').mockImplementation(noop);

    const downloadButton = screen.getByRole('button', { name: /download csv/i });
    fireEvent.click(downloadButton);

    expect(downloadLink.download).toBe('2-characters.csv');
    expect(clickSpy).toHaveBeenCalled();

    clickSpy.mockRestore();
  });
});
