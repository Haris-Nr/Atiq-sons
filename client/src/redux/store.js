import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Features/auth/authSlice'
import fetchReducer from './Features/auth/fetchSlice'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    fetch:fetchReducer
  },
})