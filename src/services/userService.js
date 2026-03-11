import api from "./api";

// API helper for fetching users.
// The service layer keeps network calls separate from UI logic.
export const fetchUsersApi = () => api.get("/users?limit=100");
