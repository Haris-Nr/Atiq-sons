import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Features/auth/authSlice'
import fetchReducer from './Features/auth/fetchSlice'
import employeeReducer from './Features/Employees/employeeSlice'
export const store = configureStore({
  reducer: {
    auth:authReducer,
    fetch:fetchReducer,
    employee:employeeReducer
  },
})