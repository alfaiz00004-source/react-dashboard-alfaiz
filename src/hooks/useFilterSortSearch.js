import { useState, useMemo } from "react";
import useDebounce from "./useDebounce";

// Custom hook to share filter/sort/search/pagination logic across list pages.
// It returns ready-to-render paginated data plus handlers for UI controls.
export default function useFilterSortSearch({
  data,
  itemsPerPage = 5,
  defaultFilters = {},
  defaultSortKey = "",
  sortFunctions = {},
  searchKeys = null,
  debounceDelay = 500,
}) {
  // --- State ---
  const [filters, setFilters] = useState(defaultFilters);
  const [sortKey, setSortKey] = useState(defaultSortKey);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, debounceDelay);

  const [currentPage, setCurrentPage] = useState(1);

  // --- Reset ---
  const resetAll = () => {
    setFilters(defaultFilters);
    setSortKey(defaultSortKey);
    setSearchTerm("");
    setCurrentPage(1);
  };

  // --- Filter + Search + Sort Logic ---
  const filteredSortedData = useMemo(() => {
    const baseData = Array.isArray(data) ? [...data] : [];

    // Apply sort
    const sorted = sortKey && sortFunctions[sortKey] ? [...baseData].sort(sortFunctions[sortKey]) : baseData;

    // Apply filters
    const filtered = Object.entries(filters).reduce((acc, [key, value]) => {
      if (!value) return acc;
      const normalizedValue = String(value).toLowerCase();
      return acc.filter((item) => {
        const itemValue = item?.[key];
        if (itemValue === undefined || itemValue === null) return false;
        return String(itemValue).toLowerCase() === normalizedValue;
      });
    }, sorted);

    // Apply search
    if (!debouncedSearchTerm) return filtered;

    const term = debouncedSearchTerm.toLowerCase();
    return filtered.filter((item) => {
      const searchSource = searchKeys
        ? searchKeys.map((key) => String(item?.[key] ?? "")).join(" ")
        : Object.values(item).join(" ");
      return searchSource.toLowerCase().includes(term);
    });
  }, [data, filters, sortKey, debouncedSearchTerm, sortFunctions, searchKeys]);

  // --- Pagination ---
  const totalItems = filteredSortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages]
  );

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredSortedData.slice(start, start + itemsPerPage);
  }, [filteredSortedData, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    const clamped = Math.max(1, Math.min(page, totalPages || 1));
    setCurrentPage(clamped);
  };

  // --- Handlers ---
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset page on filter
  };

  const handleSortChange = (value) => {
    setSortKey(value);
    setCurrentPage(1); // Reset page on sort
  };

  const handleSearchChange = (e) => {
    const value = typeof e === "string" ? e : e?.target?.value ?? "";
    setSearchTerm(value);
    setCurrentPage(1); // Reset page on search
  };

  return {
    paginatedData,
    filteredSortedData,
    filters,
    sortKey,
    searchTerm,
    currentPage,
    totalPages,
    pageNumbers,
    itemsPerPage,
    handleFilterChange,
    handleSortChange,
    handleSearchChange,
    handlePageChange,
    resetAll,
    totalItems,
  };
}