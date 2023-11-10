import { configureStore } from '@reduxjs/toolkit'
import buttonReducer from './features/Button/buttonSlice'


export const store = configureStore({
  reducer: {
    button:buttonReducer,
  },
})