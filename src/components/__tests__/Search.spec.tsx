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
    render(<Search onSubmit={mockOnSubmit} />);
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
    expect(mockOnSubmit).toHaveBeenCalledWith('');
    expect(mockSetSearchQuery).toHaveBeenCalledWith('');
  });

  it('submits trimmed query on form submit', () => {
    setup('');
    const input = screen.getByPlaceholderText('Search characters...');
    const submitButton = screen.getByText(/search/i);

    fireEvent.change(input, { target: { value: '  Summer  ' } });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith('Summer');
    expect(mockSetSearchQuery).toHaveBeenCalledWith('Summer');
  });

  it('does not submit if query is unchanged', () => {
    setup('Pickle');
    const submitButton = screen.getByText(/search/i);

    fireEvent.click(submitButton);

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

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

  it('does not call onSubmit or setSearchQuery on empty submit', () => {
    setup('');
    const submitButton = screen.getByText(/search/i);

    fireEvent.click(submitButton);

    expect(mockOnSubmit).not.toHaveBeenCalled();
    expect(mockSetSearchQuery).not.toHaveBeenCalled();
  });

  it('trims input value correctly before submission', () => {
    setup('');
    const input = screen.getByPlaceholderText('Search characters...');
    const submitButton = screen.getByText(/search/i);

    fireEvent.change(input, { target: { value: '   Rick   ' } });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith('Rick');
    expect(mockSetSearchQuery).toHaveBeenCalledWith('Rick');
  });

  it('handleClear calls submitQuery exactly once', () => {
    setup('Summer');
    const clearButton = screen.getByRole('button', { name: /clear search/i });

    fireEvent.click(clearButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockSetSearchQuery).toHaveBeenCalledTimes(1);
  });

  it('does not submit if input trimmed is equal to saved query', () => {
    setup('Rick');
    const input = screen.getByPlaceholderText('Search characters...');
    const submitButton = screen.getByText(/search/i);

    fireEvent.change(input, { target: { value: ' Rick ' } });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).not.toHaveBeenCalled();
    expect(mockSetSearchQuery).not.toHaveBeenCalled();
  });

  it('clear button is not rendered after input is cleared', () => {
    setup('Summer');
    const clearButton = screen.getByRole('button', { name: /clear search/i });

    fireEvent.click(clearButton);

    expect(screen.queryByRole('button', { name: /clear search/i })).not.toBeInTheDocument();
  });

  it('matches snapshot', () => {
    vi.mocked(useLocalStorage).mockImplementation(() => ['Summer', mockSetSearchQuery]);
    const { asFragment } = render(<Search onSubmit={noop} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
