import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsersApi } from "../../services/userService";

// Redux slice managing user list and async request state.
// In a real app, the data would come from a backend; here we normalize the API shape
// and add some randomized fields for demo purposes.
const initialState = {
  users: [],
  status: 'idle',
  error: null,
};

const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const normalizeUser = (user) => ({
  id: user.id,
  name: `${user.firstName} ${user.lastName}`,
  email: user.email,
  // Demo-only fields to show variety in the UI
  role: randomPick(["Admin", "Manager", "User"]),
  status: randomPick(["Active", "Blocked"]),
  createdAt: user.birthDate?.slice(0, 10) || new Date().toISOString().slice(0, 10),
});

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await fetchUsersApi();
    // Normalize API users before storing in state
    return response.data.users.map(normalizeUser);
  } catch (error) {
    // Add a little context for debugging.
    console.error("Failed to fetch users:", error);
    throw error;
  } finally {
    // cleanup / logging could go here in a real app
  }
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },

    deleteUser: (state, action) => {
      state.users = state.users.filter(
        (user) => user.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message || "Failed to fetch users.";
      });
  },
});

export const { addUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;