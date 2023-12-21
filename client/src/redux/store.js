import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Features/auth/authSlice'
import fetchReducer from './Features/auth/fetchSlice'
import employeeReducer from './Features/Employees/employeeSlice'
import productReducer from './Features/Product/productSlice'
import logReducer from './Features/auth/logSlice'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    fetch:fetchReducer,
    log:logReducer,
    employee:employeeReducer,
    product:productReducer,
  },
});