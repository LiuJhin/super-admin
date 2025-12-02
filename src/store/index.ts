import { configureStore } from '@reduxjs/toolkit'
import layoutReducer from './layoutSlice'
import authReducer from './authSlice'

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
