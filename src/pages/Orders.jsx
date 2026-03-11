import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../components/tables/DataTable";
import DataTableFilter from "../components/tables/DataTableFilter";
import Loader from "../components/common/Loader";
import Pagination from "../components/pagination/Pagination";
import useFilterSortSearch from "../hooks/useFilterSortSearch";
import { fetchOrders } from "../features/orders/ordersSlice";

export default function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const ordersStatus = useSelector((state) => state.orders.status);
  const ordersError = useSelector((state) => state.orders.error);

  useEffect(() => {
    if (ordersStatus === "idle") {
      dispatch(fetchOrders());
    }
  }, [dispatch, ordersStatus]);

  const columns = [
    { key: "orderId", label: "Order ID" },
    { key: "client", label: "Client" },
    { key: "amount", label: "Amount" },
    { key: "status", label: "Status" },
  ];

  const sortData = [
    { key: "", title: "All" },
    { key: "orderIdAsc", title: "Order ID (A-Z)" },
    { key: "orderIdDesc", title: "Order ID (Z-A)" },
    { key: "clientAsc", title: "Client (A-Z)" },
    { key: "clientDesc", title: "Client (Z-A)" },
    { key: "amountAsc", title: "Amount (Low-High)" },
    { key: "amountDesc", title: "Amount (High-Low)" },
    { key: "newest", title: "Newest" },
    { key: "oldest", title: "Oldest" },
  ];

  const filterData = [
    {
      key: "status",
      title: "Status",
      options: [
        { value: "", label: "All" },
        { value: "completed", label: "Completed" },
        { value: "processing", label: "Processing" },
        { value: "shipped", label: "Shipped" },
      ],
    },
  ];

  const {
    paginatedData: paginatedOrders,
    totalItems,
    currentPage,
    pageNumbers,
    itemsPerPage,
    handlePageChange,
    handleFilterChange,
    handleSortChange,
    handleSearchChange,
    resetAll,
  } = useFilterSortSearch({
    data: orders,
    itemsPerPage: 20,
    defaultFilters: { status: "" },
    sortFunctions: {
      orderIdAsc: (a, b) => a.orderId.localeCompare(b.orderId),
      orderIdDesc: (a, b) => b.orderId.localeCompare(a.orderId),
      clientAsc: (a, b) => a.client.localeCompare(b.client),
      clientDesc: (a, b) => b.client.localeCompare(a.client),
      amountAsc: (a, b) => a.amount - b.amount,
      amountDesc: (a, b) => b.amount - a.amount,
      newest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      oldest: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    searchKeys: ["orderId", "client", "amount"],
  });

  return (
    <section className="grid gap-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Orders</h2>
          <p className="text-sm text-slate-500"> Track and manage customer orders </p>
        </div>
      </header>

      <div className="border border-gray-200 rounded-xl bg-white p-4 overflow-x-auto">
        {ordersStatus === "loading" ? (
          <Loader message="Loading orders..." />
        ) : ordersError ? (
          <div className="py-10 text-center text-sm font-medium text-red-600">
            {ordersError}
          </div>
        ) : (
          <>
            <DataTableFilter
              handleSortChange={handleSortChange}
              sortData={sortData}
              filterData={filterData}
              handleFilterChange={handleFilterChange}
              onReset={resetAll}
              onSearchChange={handleSearchChange}
            />

            <DataTable data={paginatedOrders} columns={columns} emptyText="No orders found" />

            <div className="mt-6">
              <Pagination
                handlePageChange={handlePageChange}
                totalItems={totalItems}
                pageNumbers={pageNumbers}
                currentPage={currentPage}
                pagination={itemsPerPage}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
