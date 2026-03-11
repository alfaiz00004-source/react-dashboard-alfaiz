// features/analytics/analyticsSelectors.js
// Selector functions used to compute derived dashboard metrics (KPIs, chart data, etc.)
// using memoized selectors from Redux Toolkit.
import { createSelector } from "@reduxjs/toolkit";

// Base selectors
const ordersSelector = (state) => state.orders.orders;
const usersSelector = (state) => state.users.users;

// --- Cards / KPIs ---

export const selectTotalUsers = createSelector(
  [usersSelector],
  (users) => users.length
);

export const selectTotalOrders = createSelector(
  [ordersSelector],
  (orders) => orders.length
);

const parseAmount = (amount) => {
  const str = String(amount);
  return Number(str.replace("$", "")) || 0;
};

export const selectTotalRevenue = createSelector(
  [ordersSelector],
  (orders) =>
    orders.reduce(
      (total, order) => total + parseAmount(order.amount),
      0
    )
);

export const selectPendingOrders = createSelector(
  [ordersSelector],
  (orders) => orders.filter((order) => order.status === "Processing").length
);

// --- Revenue data per month for charts ---
export const selectRevenueData = createSelector(
  [ordersSelector],
  (orders) => {
    const revenueByMonth = {};

    orders.forEach((order) => {
      const month = order.createdAt?.slice(0, 7) || "Unknown";
      if (!revenueByMonth[month]) revenueByMonth[month] = 0;
      revenueByMonth[month] += parseAmount(order.amount);
    });

    return Object.keys(revenueByMonth).map((month) => ({
      month,
      revenue: revenueByMonth[month],
    }));
  }
);

// --- Users growth data per month for charts ---
export const selectUsersGrowth = createSelector(
  [usersSelector],
  (users) => {
    const growthByMonth = {};

    users.forEach((user) => {
      const month = user.createdAt?.slice(0, 7) || "Unknown";
      if (!growthByMonth[month]) growthByMonth[month] = 0;
      growthByMonth[month]++;
    });

    return Object.keys(growthByMonth).map((month) => ({
      month,
      users: growthByMonth[month],
    }));
  }
);

// --- Orders by status for pie/doughnut charts ---
export const selectOrdersByStatus = createSelector(
  [ordersSelector],
  (orders) => {
    const statusCount = {};

    orders.forEach((order) => {
      if (!statusCount[order.status]) statusCount[order.status] = 0;
      statusCount[order.status]++;
    });

    return Object.keys(statusCount).map((status) => ({
      name: status,
      value: statusCount[status],
    }));
  }
);

// --- Recent orders (optional for dashboard table) ---
export const selectRecentOrders = createSelector(
  [ordersSelector],
  (orders) => {
    // Last 5 orders
    return [...orders].sort((a, b) => b.id - a.id).slice(0, 5);
  }
);