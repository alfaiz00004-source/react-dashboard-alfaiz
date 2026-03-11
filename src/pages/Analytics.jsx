import { useEffect } from 'react';
import StateCard from '../components/cards/StatCard';
import { analyticsCards } from "../config/analyticsCards";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../features/users/usersSlice';
import { fetchOrders } from '../features/orders/ordersSlice';
import { selectUsersGrowth, selectOrdersByStatus, selectTotalUsers, selectTotalOrders, selectTotalRevenue, selectPendingOrders, selectRevenueData } from '../features/analytics/analyticsSelector';
import SalesChart from '../components/charts/SalesChart'
import OrderStatusChart from '../components/charts/OrderStatusChart'
import Loader from '../components/common/Loader'

export default function Analytics() {
  const dispatch = useDispatch();
  const usersStatus = useSelector((state) => state.users.status);
  const ordersStatus = useSelector((state) => state.orders.status);
  const usersError = useSelector((state) => state.users.error);
  const ordersError = useSelector((state) => state.orders.error);

  useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, usersStatus]);

  useEffect(() => {
    if (ordersStatus === 'idle') {
      dispatch(fetchOrders());
    }
  }, [dispatch, ordersStatus]);

  const totalUsers = useSelector(selectTotalUsers);
  const totalOrders = useSelector(selectTotalOrders);
  const totalRevenue = useSelector(selectTotalRevenue);
  const pendingOrders = useSelector(selectPendingOrders);
  const revenueData = useSelector(selectRevenueData);

  const averageOrderValue = totalOrders > 0 ? `$${(totalRevenue / totalOrders).toFixed(2)}` : "-";
  const conversionRate = totalUsers > 0 ? `${((totalOrders / totalUsers) * 100).toFixed(1)}%` : "-";

  const sortedRevenue = [...revenueData].sort((a, b) => a.month.localeCompare(b.month));
  const growthRate = sortedRevenue.length >= 2
    ? `${(((sortedRevenue[sortedRevenue.length - 1].revenue - sortedRevenue[sortedRevenue.length - 2].revenue) / Math.max(sortedRevenue[sortedRevenue.length - 2].revenue, 1)) * 100).toFixed(1)}%`
    : "-";

  const analyticsData = {
    monthlyRevenue: `$${totalRevenue}`,
    growthRate,
    completedOrders: totalOrders - pendingOrders,
    activeUsers: totalUsers,
    avgOrderValue: averageOrderValue,
    conversionRate,
  };

  const cards = analyticsCards.map(card => ({
    ...card,
    value: analyticsData[card.key]
  }));

  const salesData = useSelector(selectUsersGrowth);
  const orderStatusData = useSelector(selectOrdersByStatus);

  const hasError = usersStatus === 'failed' || ordersStatus === 'failed';
  const isLoading = [usersStatus, ordersStatus].some(
    (status) => status === 'idle' || status === 'loading'
  );

  if (hasError) {
    return (
      <section className="grid gap-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
          <h2 className="text-lg font-bold">Something went wrong</h2>
          <p className="mt-2 text-sm">{usersError || ordersError}</p>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="grid gap-6">
        <Loader message="Loading analytics data..." />
      </section>
    );
  }

  

  
  return (
    <section className="grid gap-6">
      <header>
        <h2 className="text-xl font-bold text-slate-900">Analytics</h2>
        <p className="text-sm text-slate-500">
          Monitor performance and insights
        </p>
      </header>

      {/* Stats Cards */}

      <StateCard cards={cards}/>
      

      {/* Analytics Overview */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <div className="border border-gray-200 rounded-xl bg-white p-4">
          <h3 className="text-base font-bold mb-3">Traffic Overview</h3>

          
            <div className="grid gap-5">
      <SalesChart data={salesData} title="Monthly User Growth" dataKey="users" />
    </div>
          
        </div>

        <div className="border border-gray-200 rounded-xl bg-white p-4">
          <h3 className="text-base font-bold mb-3">Sales Performance</h3>

          
            <OrderStatusChart data={orderStatusData} title='Order Status Distribution'/>
          
        </div>
      </div>

      {/* Activity */}
      <div className="border border-gray-200 rounded-xl bg-white p-4">
        <h3 className="text-base font-bold mb-3">Recent Activity</h3>

        <ul className="list-disc pl-4 text-sm text-slate-700 grid gap-2">
          <li>New user registered from Germany</li>
          <li>Order #1024 completed successfully</li>
          <li>Marketing campaign generated 430 new visitors</li>
          <li>Payment received for order #1025</li>
        </ul>
      </div>
    </section>
  );
}
