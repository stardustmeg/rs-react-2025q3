import React from 'react';

import { getVisiblePages } from '@/components/helpers';
import { PageButton } from '@/components/PageButton';

interface PaginationProps {
  currentPage: number;
  maxButtons?: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, maxButtons = 5, onPageChange, totalPages }) => {
  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = (page: number): void => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const pages = getVisiblePages(currentPage, totalPages, maxButtons);

  return (
    <nav aria-label="Pagination" className="my-4 flex flex-wrap items-center justify-center gap-2">
      <PageButton ariaLabel="First page" disabled={currentPage === 1} onClick={handlePageChange} page={1}>
        &laquo;
      </PageButton>
      <PageButton
        ariaLabel="Previous page"
        disabled={currentPage === 1}
        onClick={handlePageChange}
        page={currentPage - 1}
      >
        &lsaquo;
      </PageButton>

      {pages.map((page) => (
        <PageButton isActive={page === currentPage} key={page} onClick={handlePageChange} page={page} />
      ))}

      <PageButton
        ariaLabel="Next page"
        disabled={currentPage === totalPages}
        onClick={handlePageChange}
        page={currentPage + 1}
      >
        &rsaquo;
      </PageButton>
      <PageButton
        ariaLabel="Last page"
        disabled={currentPage === totalPages}
        onClick={handlePageChange}
        page={totalPages}
      >
        &raquo;
      </PageButton>
    </nav>
  );
};

export default Pagination;
