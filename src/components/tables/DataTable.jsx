// Simple reusable table component used across the dashboard.
// It renders a set of columns and rows, and supports an empty state.
export default function DataTable({ data, columns, emptyText }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-96">

        <thead>
          <tr className="border-b border-gray-200 text-slate-500 text-sm">
            {columns.map((col) => (
              <th key={col.key} className="text-left py-2">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-2 text-center text-slate-500">
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id} className="border-b border-gray-100">
                {columns.map((col) => (
                  <td key={col.key} className="py-2">
                    {item[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>

      </table>
    </div>
  );
}