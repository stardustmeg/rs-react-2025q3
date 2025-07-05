import type { JSX } from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Header from '@/components/Header';

const noop = (): void => void 0;

vi.mock('@/components/Search', () => ({
  default: ({ onSubmit }: { onSubmit: (query: string) => void }): JSX.Element => (
    <input
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          onSubmit('test query');
        }
      }}
    />
  ),
}));

describe('Header component', () => {
  it('renders the header element', () => {
    render(<Header onSearch={noop} />);
    const header = screen.getByRole('header');
    expect(header).toBeInTheDocument();
  });

  it('renders the Search component inside header', () => {
    render(<Header onSearch={noop} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('calls onSearch when Search is submitted', () => {
    const onSearchMock = vi.fn();
    render(<Header onSearch={onSearchMock} />);
    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { charCode: 13, code: 'Enter', key: 'Enter' });
    expect(onSearchMock).toHaveBeenCalledWith('test query');
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Header onSearch={noop} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
