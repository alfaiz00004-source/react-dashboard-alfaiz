import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StatCard from '../components/cards/StatCard';
import DataTable from '../components/tables/DataTable';
import Loader from '../components/common/Loader';
import { dashboardCards } from "../config/dashboardCards";
import { fetchUsers } from '../features/users/usersSlice';
import { fetchOrders } from '../features/orders/ordersSlice';
import { selectTotalUsers, selectTotalOrders, selectPendingOrders, selectTotalRevenue, selectRevenueData, selectRecentOrders } from '../features/analytics/analyticsSelector';
import RevenueChart from '../components/charts/RevenueChart'

// Dashboard page pulls data from Redux and renders a set of KPI cards, charts, and tables.
// It also shows loading & error states while the async data fetch is in progress.

export default function Dashboard() {
  const dispatch = useDispatch();

  // Track request status and errors in Redux to show loading / error UI.
  const usersStatus = useSelector((state) => state.users.status);
  const ordersStatus = useSelector((state) => state.orders.status);
  const usersError = useSelector((state) => state.users.error);
  const ordersError = useSelector((state) => state.orders.error);

  // Fetch users the first time this component renders (status starts as 'idle').
  // Redux Toolkit async thunks update `status` to prevent repeated calls.
  useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, usersStatus]);

  // Similar logic for orders.
  useEffect(() => {
    if (ordersStatus === 'idle') {
      dispatch(fetchOrders());
    }
  }, [dispatch, ordersStatus]);

  // Use memoized selectors to generate derived data for charts and cards.
  // These selectors avoid expensive recalculations unless the source slices change.
  const recentOrders = useSelector(selectRecentOrders);
  const totalUsers = useSelector(selectTotalUsers);
  const totalOrders = useSelector(selectTotalOrders);
  const totalRevenue = useSelector(selectTotalRevenue);
  const pendingOrders = useSelector(selectPendingOrders);
  const revenueData = useSelector(selectRevenueData);
  
  // Build columns for the table component.
  const columns = [
    { key: "orderId", label: "Order ID" },
    { key: "client", label: "Client" },
    { key: "amount", label: "Amount" },
    { key: "status", label: "Status" }
  ];

  // Map the pre-defined dashboard card config to values from selectors.
  const analyticsData = {
    revenue: `$${totalRevenue}`,
    users: totalUsers,
    orders: totalOrders,
    pendingOrders: pendingOrders
  };

  const cards = dashboardCards.map(card => ({
    ...card,
    value: analyticsData[card.key]
  }));


  const hasError = usersStatus === 'failed' || ordersStatus === 'failed';
  const isLoading = [usersStatus, ordersStatus].some(
    (status) => status === 'idle' || status === 'loading'
  );

  if (hasError) {
    return (
      <section className="grid gap-5">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
          <h2 className="text-lg font-bold">Something went wrong</h2>
          <p className="mt-2 text-sm">{usersError || ordersError}</p>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="grid gap-5">
        <Loader message="Loading dashboard data..." />
      </section>
    );
  }

  return (
    <section
      aria-labelledby="dashboard-overview-title"
      className="grid gap-5 text-slate-900"
    >
      <header className="border border-gray-200 rounded-xl p-4 bg-linear-to-r from-teal-50 to-white flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-teal-700">
            Performance Dashboard
          </p>

          <h2
            id="dashboard-overview-title"
            className="mt-1 text-xl leading-tight"
          >
            Executive Overview
          </h2>
        </div>

        <p className="text-sm text-slate-600 border border-gray-300 rounded-full py-1 px-3 bg-white">
          Last updated: 08 Mar 2026, 10:30 AM
        </p>
      </header>

      <main className="grid gap-5">
        <section aria-labelledby="kpi-title" className="grid gap-3">
          <h3 id="kpi-title" className="text-base font-bold">
            Key Metrics
          </h3>




             <StatCard
             cards={cards}
             />




          
        </section>

        <section
          aria-labelledby="insights-title"
          className="grid gap-3 grid-cols-1 lg:grid-cols-2"
        >
          <article className="border border-gray-200 rounded-xl bg-white p-4 min-h-56">
            <header className="flex items-center justify-between mb-4 gap-3">
              <h3
                id="insights-title"
                className="text-base font-bold"
              >
                Revenue Trend
              </h3>

              <span className="text-xs text-teal-700 bg-teal-100 py-1 px-2 rounded-full">
                Q1 Overview
              </span>
            </header>

            <div className="grid gap-5">
      <RevenueChart data={revenueData} title="Revenue Trend (Monthly)" />
    </div>
          </article>

          <aside className="border border-gray-200 rounded-xl bg-white p-4 min-h-56">
            <h3 className="mb-3 text-base font-bold">
              Priority Tasks
            </h3>

            <ul className="pl-4 grid gap-2 text-slate-700 list-disc">
              <li>Review pending enterprise contracts before 4:00 PM</li>
              <li>Approve design handoff for mobile checkout update</li>
              <li>Validate analytics export for weekly stakeholder deck</li>
              <li>Follow up with support team on unresolved escalations</li>
            </ul>
          </aside>
        </section>

        <section
          aria-label="Operational overview"
          className="grid gap-3 grid-cols-1 lg:grid-cols-2"
        >
          <article className="border border-gray-200 rounded-xl bg-white p-4">
            <header className="flex justify-between items-center mb-3">
              <h3 className="text-base font-bold">Recent Orders</h3>
              <span className="text-slate-500 text-sm">Today</span>
            </header>


            <DataTable  data={recentOrders} columns={columns}/>
            
          </article>

          <article className="border border-gray-200 rounded-xl bg-white p-4">
            <header className="flex justify-between items-center mb-3">
              <h3 className="text-base font-bold">Team Updates</h3>
              <span className="text-slate-500 text-sm">Internal</span>
            </header>

            <ul className="pl-4 grid gap-2 text-slate-700 list-disc">
              <li>
                Product team published sprint summary with 6 completed stories and 2 carry-forwards.
              </li>
              <li>
                Support QA raised checklist for onboarding flow and shared actionable feedback.
              </li>
              <li>
                Operations confirmed warehouse sync issue resolved in latest backend release.
              </li>
            </ul>
          </article>
        </section>
      </main>

      <footer className="border-t border-gray-200 pt-3 text-slate-500 text-sm">
        Dashboard preview layout for internal UI structure and semantic markup.
      </footer>
    </section>
  );
}
