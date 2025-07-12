import type { JSX } from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import { noop } from '@vitest/utils';
import { describe, expect, it, vi } from 'vitest';

import Header from '@/components/Header';

vi.mock('@/components/Search', () => ({
  default: ({ handleSearch }: { handleSearch: (query: string) => void }): JSX.Element => (
    <input
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          handleSearch('test query');
        }
      }}
    />
  ),
}));

describe('Header component', () => {
  it('renders the header element', () => {
    render(<Header handleSearch={noop} initialSearchQuery="" />);

    const header = screen.getByRole('header');

    expect(header).toBeInTheDocument();
  });

  it('renders the Search component inside header', () => {
    render(<Header handleSearch={noop} initialSearchQuery="" />);

    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
  });

  it('calls onSearch when Search is submitted', () => {
    const onSearchMock = vi.fn();
    render(<Header handleSearch={onSearchMock} initialSearchQuery="" />);

    const input = screen.getByRole('textbox');

    fireEvent.keyDown(input, { charCode: 13, code: 'Enter', key: 'Enter' });

    expect(onSearchMock).toHaveBeenCalledWith('test query');
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Header handleSearch={noop} initialSearchQuery="" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
