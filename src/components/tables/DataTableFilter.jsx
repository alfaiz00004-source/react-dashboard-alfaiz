import { ArrowUpDown, Search, SlidersHorizontal, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function DataTableFilter({
  handleSortChange,
  sortData,
  filterData,
  handleFilterChange,
  onReset,
  onSearchChange
}) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const containerRef = useRef(null);
  

  const handleSortOpen = () => {
    setIsSortOpen(prev => !prev);
    setIsFilterOpen(false);
  };

  const handleFilterOpen = () => {
    setIsFilterOpen(prev => !prev);
    setIsSortOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsFilterOpen(false);
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section ref={containerRef} className="mb-4 rounded-xl border border-gray-200 bg-slate-50/80 p-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2.5 shadow-xs transition focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-100">
            <Search className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />

            <input
            
              type="text"
              placeholder="Search records"
              className="w-full min-w-0 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
              onChange={onSearchChange}
            />
          </div>

          <div className="relative">
            <button
              onClick={() => handleFilterOpen()}
              type="button"
              aria-label="Filter"
              title="Filter"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-slate-500 shadow-xs transition hover:border-gray-300 hover:bg-slate-100 hover:text-slate-700"
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-md">
                {filterData.map((item) => (
                  <div key={item.key} className="border-b last:border-none">
                    <p className="px-3 py-2 text-xs font-semibold text-slate-500">
                      {item.title}
                    </p>

                    {item.options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          handleFilterChange(item.key, option.value);
                          setIsFilterOpen(false);
                        }}
                        className="block w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-gray-100"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              aria-label="Sort"
              title="Sort"
              onClick={() => handleSortOpen()}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-slate-500 shadow-xs transition hover:border-gray-300 hover:bg-slate-100 hover:text-slate-700"
            >
              <ArrowUpDown className="h-4 w-4" aria-hidden="true" />
            </button>

            {isSortOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-lg border border-gray-200 bg-white shadow-md">
                {sortData.map((item) => (
                  <button
                    key={item.key}
                    value={item.key}
                    onClick={() => {
                      handleSortChange(item.key);
                      setIsSortOpen(false);
                    }}
                    className="block w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-gray-100"
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            aria-label="Reset"
            title="Reset filters"
            onClick={() => {
              onReset?.();
              setIsFilterOpen(false);
              setIsSortOpen(false);
            }}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-slate-500 shadow-xs transition hover:border-gray-300 hover:bg-slate-100 hover:text-slate-700"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}