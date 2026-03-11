export default function Pagination({
  handlePageChange = () => {},
  pageNumbers = [],
  totalItems = 0,
  pagination = 0,
  currentPage = 1   
}) {
  // Pagination component is intentionally minimal to match dashboard theme.
  // It is intentionally defensive to avoid crashes when props are missing.

  const pageSize = pagination > 0 ? pagination : totalItems || 1;
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(totalItems, currentPage * pageSize);

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < pageNumbers.length;

  return (
    <nav aria-label="Pagination" className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm text-slate-500">
        Showing <span className="font-semibold text-slate-700">{startItem}</span> to <span className="font-semibold text-slate-700">{endItem}</span> of <span className="font-semibold text-slate-700">{totalItems}</span>
      </div>

      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => hasPrev && handlePageChange(currentPage - 1)}
          disabled={!hasPrev}
          className={
            "inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-teal-500 " +
            (!hasPrev ? "cursor-not-allowed text-slate-300" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900")
          }
        >
          Previous
        </button>

        <div className="inline-flex items-center rounded-lg border border-gray-200 bg-white shadow-sm">
          {pageNumbers.map((page) => (
            <button
              onClick={() => handlePageChange(page)}
              key={page}
              type="button"
              className={
                "px-3 py-2 text-xs font-medium transition focus:outline-none " +
                (page === currentPage
                  ? "bg-teal-500 text-white"
                  : "text-slate-700 hover:bg-slate-100")
              }
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => hasNext && handlePageChange(currentPage + 1)}
          disabled={!hasNext}
          className={
            "inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-teal-500 " +
            (!hasNext ? "cursor-not-allowed text-slate-300" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900")
          }
        >
          Next
        </button>
      </div>
    </nav>
  );
}
