import type { JSX } from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import { noop } from '@vitest/utils';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';

import Header from '@/components/Header';
import { ThemeProvider } from '@/contexts/ThemeContext';

Object.defineProperty(window, 'matchMedia', {
  value: vi.fn().mockImplementation(() => ({ matches: false })),
  writable: true,
});

vi.mock('@/hooks/useLocalStorage', () => ({
  useLocalStorage: vi.fn(() => ['light', vi.fn()]),
}));

vi.mock('@/components/Search', () => ({
  default: ({ handleSearch }: { handleSearch: (query: string) => void }): JSX.Element => (
    <input
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          handleSearch('test query');
        }
      }}
      type="text"
    />
  ),
}));

const renderWithProviders = (ui: JSX.Element): ReturnType<typeof render> => {
  return render(
    <MemoryRouter>
      <ThemeProvider>{ui}</ThemeProvider>
    </MemoryRouter>,
  );
};

describe('Header component', () => {
  it('renders the header element', () => {
    renderWithProviders(<Header handleSearch={noop} initialSearchQuery="" />);
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });

  it('renders the Search component inside header', () => {
    renderWithProviders(<Header handleSearch={noop} initialSearchQuery="" />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('calls handleSearch when Enter is pressed in Search input', () => {
    const onSearchMock = vi.fn();
    renderWithProviders(<Header handleSearch={onSearchMock} initialSearchQuery="" />);
    const input = screen.getByRole('textbox');

    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onSearchMock).toHaveBeenCalledWith('test query');
  });

  it('matches snapshot', () => {
    const { asFragment } = renderWithProviders(<Header handleSearch={noop} initialSearchQuery="" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
