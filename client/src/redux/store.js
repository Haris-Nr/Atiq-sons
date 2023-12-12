import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Features/auth/authSlice'
<<<<<<< HEAD

export const store = configureStore({
  reducer: {
    auth:authReducer
=======
import employeeReducer from './Features/Employees/employeeSlice'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    employees:employeeReducer
>>>>>>> 131a352 (bilal)
  },
  // middleware: (getDefaultMiddleware) =>
  // getDefaultMiddleware({
  //   serializableCheck: false,
  // }),
})