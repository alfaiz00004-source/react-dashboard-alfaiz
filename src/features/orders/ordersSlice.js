import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrdersApi } from "../../services/orderService";

// Redux slice that stores a list of orders and tracks API request status.
// We normalize API data here (and add a few random demo properties) so the UI
// can render consistently across mock datasets.
const initialState = {
  orders: [],
  status: 'idle',
  error: null,
};

const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const randomPastDate = () => {
  const date = new Date();
  const monthsAgo = Math.floor(Math.random() * 6); // 0-5 months back
  date.setMonth(date.getMonth() - monthsAgo);
  date.setDate(1 + Math.floor(Math.random() * 28));
  return date.toISOString().slice(0, 10);
};

const normalizeOrder = (order) => ({
  id: order.id,
  orderId: `ORD${order.id}`,
  client: `User ${order.userId}`,
  amount: order.total,
  // Demo-friendly status values for the UI
  status: randomPick(["Completed", "Processing", "Shipped"]),
  createdAt: order.date?.slice(0, 10) || randomPastDate(),
});

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  try {
    const response = await fetchOrdersApi();
    // Normalize API orders before storing in state
    return response.data.carts.map(normalizeOrder);
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw error;
  } finally {
    // cleanup / logging could go here in a real app
  }
});

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message || "Failed to fetch orders.";
      });
  },
});

export default ordersSlice.reducer;
