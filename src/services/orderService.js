import api from "./api";

// API helper for fetching orders.
// In a real project, more endpoints (create, update, delete) could be added here.
export const fetchOrdersApi = () => api.get("/carts?limit=100");
