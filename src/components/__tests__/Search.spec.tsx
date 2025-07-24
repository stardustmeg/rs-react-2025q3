import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { noop } from '@vitest/utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Search from '@/components/Search';
import { useLocalStorage } from '@/hooks/useLocalStorage';

vi.mock('@/hooks/useLocalStorage');

describe('Search component', () => {
  const mockOnSubmit = vi.fn();
  let mockSearchQuery = '';
  const mockSetSearchQuery = vi.fn().mockImplementation((newValue: string) => {
    mockSearchQuery = newValue;
    vi.mocked(useLocalStorage).mockImplementation(() => [mockSearchQuery, mockSetSearchQuery]);
  });

  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchQuery = '';
    vi.mocked(useLocalStorage).mockImplementation(() => [mockSearchQuery, mockSetSearchQuery]);
  });

  const setup = (initialQuery = ''): void => {
    mockSearchQuery = initialQuery;
    render(<Search handleSearch={mockOnSubmit} initialSearchQuery={initialQuery} />);
  };

  it('renders with initial query from localStorage', () => {
    setup('Rick');
    const input = screen.getByPlaceholderText('Search characters...');

    expect(input).toHaveValue('Rick');
  });

  it('updates input on change', () => {
    setup();
    const input = screen.getByPlaceholderText('Search characters...');

    fireEvent.change(input, { target: { value: 'Morty' } });

    expect(input).toHaveValue('Morty');
  });

  it('clears input and submits on clear button click', () => {
    setup('Bird');
    const clearButton = screen.getByRole('button', { name: /clear search/i });

    fireEvent.click(clearButton);

    const input = screen.getByPlaceholderText('Search characters...');

    expect(input).toHaveValue('');
  });

  it('submits trimmed query on form submit', () => {
    setup('');
    const input = screen.getByPlaceholderText('Search characters...');
    const submitButton = screen.getByText(/search/i);

    fireEvent.change(input, { target: { value: '  Summer  ' } });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith('Summer');
  });

  // TBD: move to app
  // it('does not submit if query is unchanged', () => {
  //   setup('Pickle');
  //   const submitButton = screen.getByText(/search/i);

  //   fireEvent.click(submitButton);

  //   expect(mockOnSubmit).not.toHaveBeenCalled();
  // });

  it('does not render clear button if input is empty', () => {
    setup('');
    const clearButton = screen.queryByRole('button', { name: /clear search/i });

    expect(clearButton).not.toBeInTheDocument();
  });

  it('renders clear button if input is non-empty', () => {
    setup('Evil Morty');
    const clearButton = screen.getByRole('button', { name: /clear search/i });

    expect(clearButton).toBeInTheDocument();
  });

  it('trims input value correctly before submission', () => {
    setup('');
    const input = screen.getByPlaceholderText('Search characters...');
    const submitButton = screen.getByText(/search/i);

    fireEvent.change(input, { target: { value: '   Rick   ' } });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith('Rick');
  });

  // TBD: move to app
  // it('does not submit if input trimmed is equal to saved query', () => {
  //   setup('Rick');
  //   const input = screen.getByPlaceholderText('Search characters...');
  //   const submitButton = screen.getByText(/search/i);

  //   fireEvent.change(input, { target: { value: ' Rick ' } });
  //   fireEvent.click(submitButton);

  //   expect(mockOnSubmit).not.toHaveBeenCalled();
  // });

  it('clear button is not rendered after input is cleared', () => {
    setup('Summer');
    const clearButton = screen.getByRole('button', { name: /clear search/i });

    fireEvent.click(clearButton);

    expect(screen.queryByRole('button', { name: /clear search/i })).not.toBeInTheDocument();
  });

  it('matches snapshot', () => {
    vi.mocked(useLocalStorage).mockImplementation(() => ['Summer', mockSetSearchQuery]);
    const { asFragment } = render(<Search handleSearch={noop} initialSearchQuery="Summer" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
