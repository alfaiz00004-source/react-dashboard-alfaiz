import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../features/users/usersSlice'
import ordersReducer from '../features/orders/ordersSlice'

// Central Redux store configuration.
// The `reducer` key wires feature slices into the global state tree.
export const store = configureStore({
  reducer: {
    users: usersReducer,
    orders: ordersReducer
  },
})