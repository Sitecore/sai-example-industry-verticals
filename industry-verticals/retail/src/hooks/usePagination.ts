import { useMemo } from 'react';

interface UsePaginationProps {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  windowSize?: number; // number of page numbers to show in the middle
}

export function usePagination({
  totalItems,
  currentPage,
  itemsPerPage,
  windowSize = 3,
}: UsePaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const { startPage, endPage, visiblePages } = useMemo(() => {
    let start = Math.max(1, currentPage - Math.floor(windowSize / 2));
    let end = start + windowSize - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - windowSize + 1);
    }

    const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

    return { startPage: start, endPage: end, visiblePages: pages };
  }, [currentPage, totalPages, windowSize]);

  const getPageSlice = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return [startIndex, endIndex];
  };

  return { totalPages, startPage, endPage, visiblePages, getPageSlice };
}
