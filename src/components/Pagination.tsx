/* eslint-disable max-lines-per-function */
import React from 'react';

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

  const handlePageClick = (page: number): void => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = (): React.ReactNode => {
    const pages = [];

    let startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage < maxButtons - 1) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    if (startPage > 1) {
      pages.push(
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-200"
          key={1}
          onClick={() => {
            handlePageClick(1);
          }}
        >
          1
        </button>,
      );
      if (startPage > 2) {
        pages.push(
          <span className="px-2 select-none" key="start-ellipsis">
            ...
          </span>,
        );
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      if (page === 1 || page === totalPages) {
        continue;
      }
      pages.push(
        <button
          className={`flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-200 ${
            page === currentPage ? 'bg-custom-pink text-white' : ''
          }`}
          key={page}
          onClick={() => {
            handlePageClick(page);
          }}
        >
          {page}
        </button>,
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span className="px-2 select-none" key="end-ellipsis">
            ...
          </span>,
        );
      }
      pages.push(
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-200"
          key={totalPages}
          onClick={() => {
            handlePageClick(totalPages);
          }}
        >
          {totalPages}
        </button>,
      );
    }

    return pages;
  };

  return (
    <nav aria-label="Pagination" className="my-4 flex items-center justify-center space-x-1">
      <button
        aria-label="First page"
        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-200 disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => {
          handlePageClick(1);
        }}
      >
        &laquo;
      </button>
      <button
        aria-label="Previous page"
        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-200 disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => {
          handlePageClick(currentPage - 1);
        }}
      >
        &lsaquo;
      </button>

      {renderPageNumbers()}

      <button
        aria-label="Next page"
        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-200 disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => {
          handlePageClick(currentPage + 1);
        }}
      >
        &rsaquo;
      </button>
      <button
        aria-label="Last page"
        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-200 disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => {
          handlePageClick(totalPages);
        }}
      >
        &raquo;
      </button>
    </nav>
  );
};

export default Pagination;
