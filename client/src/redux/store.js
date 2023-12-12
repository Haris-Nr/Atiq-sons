import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Features/auth/authSlice'
import productReducer from './Features/product/productSlice'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    product:productReducer
  },
})