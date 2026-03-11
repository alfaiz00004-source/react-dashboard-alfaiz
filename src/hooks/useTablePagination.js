// hooks/useTablePagination.js
import { useState, useMemo } from "react";

export default function useTablePagination(data, itemsPerPage = 5) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(totalItems, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    const clamped = Math.max(1, Math.min(page, totalPages || 1));
    setCurrentPage(clamped);
  };

  return { currentPage, totalPages, pageNumbers, paginatedData, handlePageChange, startItem, endItem, totalItems };
}