import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Search from '@/components/Search';
import { getTrimmedSearchQuery, saveSearchQuery } from '@/services/localStorage';

vi.mock('@/services/localStorage');

describe('Search component', () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const setup = (initialQuery = ''): void => {
    const getTrimmedSearchQueryMock = vi.mocked(getTrimmedSearchQuery);
    getTrimmedSearchQueryMock.mockReturnValue(initialQuery);

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
    expect(saveSearchQuery).toHaveBeenCalledWith('');
  });

  it('submits trimmed query on form submit', () => {
    setup('');

    const input = screen.getByPlaceholderText('Search characters...');
    const submitButton = screen.getByText(/search/i);

    fireEvent.change(input, { target: { value: '  Summer  ' } });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith('Summer');
    expect(saveSearchQuery).toHaveBeenCalledWith('Summer');
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

  it('does not call onSubmit or saveSearchQuery on empty submit', () => {
    setup('');
    const submitButton = screen.getByText(/search/i);
    fireEvent.click(submitButton);
    expect(mockOnSubmit).not.toHaveBeenCalled();
    expect(saveSearchQuery).not.toHaveBeenCalled();
  });

  it('trims input value correctly before submission', () => {
    setup('');
    const input = screen.getByPlaceholderText('Search characters...');
    const submitButton = screen.getByText(/search/i);

    fireEvent.change(input, { target: { value: '   Rick   ' } });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith('Rick');
    expect(saveSearchQuery).toHaveBeenCalledWith('Rick');
  });

  it('handleClear calls submitQuery exactly once', () => {
    setup('Summer');
    const clearButton = screen.getByRole('button', { name: /clear search/i });
    fireEvent.click(clearButton);
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(saveSearchQuery).toHaveBeenCalledTimes(1);
  });

  it('does not submit if input trimmed is equal to saved query', () => {
    setup('Rick');
    const input = screen.getByPlaceholderText('Search characters...');
    const submitButton = screen.getByText(/search/i);

    fireEvent.change(input, { target: { value: ' Rick ' } });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).not.toHaveBeenCalled();
    expect(saveSearchQuery).not.toHaveBeenCalled();
  });

  it('clear button is not rendered after input is cleared', () => {
    setup('Summer');
    const clearButton = screen.getByRole('button', { name: /clear search/i });
    fireEvent.click(clearButton);
    expect(screen.queryByRole('button', { name: /clear search/i })).not.toBeInTheDocument();
  });
});
