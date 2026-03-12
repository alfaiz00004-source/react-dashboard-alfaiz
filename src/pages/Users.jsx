import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../components/tables/DataTable";
import DataTableFilter from "../components/tables/DataTableFilter";
import Loader from "../components/common/Loader";
import Pagination from "../components/pagination/Pagination";
import useFilterSortSearch from "../hooks/useFilterSortSearch";
import { fetchUsers } from "../features/users/usersSlice";

// Users page shows a paginated table of users with filtering and sorting.
// The data is fetched from the API and stored in Redux.
export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const usersStatus = useSelector((state) => state.users.status);
  const usersError = useSelector((state) => state.users.error);

  useEffect(() => {
    if (usersStatus === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, usersStatus]);

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" }
  ];

  const sortData = [
    { key: "", title: "All" },
    { key: "nameAsc", title: "Name (A-Z)" },
    { key: "nameDesc", title: "Name (Z-A)" },
    { key: "emailAsc", title: "Email (A-Z)" },
    { key: "emailDesc", title: "Email (Z-A)" },
    { key: "newest", title: "Newest" },
    { key: "oldest", title: "Oldest" },
  ];

  const filterData = [
    {
      key: "role",
      title: "Role",
      options: [
        { value: "", label: "All" },
        { value: "admin", label: "Admin" },
        { value: "manager", label: "Manager" },
        { value: "user", label: "User" }
      ]
    },
    {
      key: "status",
      title: "Status",
      options: [
        { value: "", label: "All" },
        { value: "active", label: "Active" },
        { value: "blocked", label: "Blocked" }
      ]
    }
  ];

  
  // Custom hook that provides filtering, sorting, searching, and pagination logic.
  // It keeps this component clean by abstracting the list manipulation behavior.
  const {
    paginatedData,
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
    data: users,
    itemsPerPage: 20,
    defaultFilters: { role: "", status: "" },
    sortFunctions: {
      nameAsc: (a, b) => a.name.localeCompare(b.name),
      nameDesc: (a, b) => b.name.localeCompare(a.name),
      emailAsc: (a, b) => a.email.localeCompare(b.email),
      emailDesc: (a, b) => b.email.localeCompare(a.email),
      newest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      oldest: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    searchKeys: ["name", "email"],
  });

  return (
    <section className="grid gap-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Users</h2>
          <p className="text-sm text-slate-500">Manage all registered users</p>
        </div>

        
      </header>

      <div className="border border-gray-200 rounded-xl bg-white p-4 overflow-x-auto">
        {usersStatus === "loading" ? (
          <Loader message="Loading users..." />
        ) : usersError ? (
          <div className="py-10 text-center text-sm font-medium text-red-600">
            {usersError}
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

            <DataTable data={paginatedData} columns={columns} emptyText="No users found" />

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