import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Pagination from '@/components/Pagination';

describe('Pagination component', () => {
  it('should not render if totalPages is 1 or less', () => {
    const { container } = render(<Pagination currentPage={1} onPageChange={vi.fn()} totalPages={1} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders navigation buttons and page buttons', () => {
    render(<Pagination currentPage={2} onPageChange={vi.fn()} totalPages={5} />);
    expect(screen.getByLabelText(/first page/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/previous page/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/next page/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last page/i)).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('disables first and previous buttons on first page', () => {
    render(<Pagination currentPage={1} onPageChange={vi.fn()} totalPages={5} />);
    expect(screen.getByLabelText(/first page/i)).toBeDisabled();
    expect(screen.getByLabelText(/previous page/i)).toBeDisabled();
  });

  it('disables next and last buttons on last page', () => {
    render(<Pagination currentPage={5} onPageChange={vi.fn()} totalPages={5} />);
    expect(screen.getByLabelText(/next page/i)).toBeDisabled();
    expect(screen.getByLabelText(/last page/i)).toBeDisabled();
  });

  it('calls onPageChange with correct page when clicking a page button', () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={2} onPageChange={onPageChange} totalPages={5} />);
    const PAGE_NUMBER = 4;
    fireEvent.click(screen.getByText(PAGE_NUMBER.toString()));
    expect(onPageChange).toHaveBeenCalledWith(PAGE_NUMBER);
  });

  it('calls onPageChange with correct page when clicking navigation buttons', () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={3} onPageChange={onPageChange} totalPages={5} />);
    fireEvent.click(screen.getByLabelText(/first page/i));
    expect(onPageChange).toHaveBeenCalledWith(1);
    fireEvent.click(screen.getByLabelText(/previous page/i));
    expect(onPageChange).toHaveBeenCalledWith(2);
    fireEvent.click(screen.getByLabelText(/next page/i));
    const PAGE_BEFORE_LAST = 4;
    expect(onPageChange).toHaveBeenCalledWith(PAGE_BEFORE_LAST);
    fireEvent.click(screen.getByLabelText(/last page/i));
    const LAST_PAGE = 5;
    expect(onPageChange).toHaveBeenCalledWith(LAST_PAGE);
  });

  it('does not call onPageChange when clicking the current page button', () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={3} onPageChange={onPageChange} totalPages={5} />);
    fireEvent.click(screen.getByText('3'));
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('renders maxButtons number of page buttons', () => {
    render(<Pagination currentPage={5} maxButtons={3} onPageChange={vi.fn()} totalPages={20} />);
    const buttons = screen.getAllByRole('button').filter((button) => /^[0-9]+$/.test(button.textContent ?? ''));
    const EXPECTED_PAGES_LENGTH = 3;
    expect(buttons.length).toBe(EXPECTED_PAGES_LENGTH);
  });
});
