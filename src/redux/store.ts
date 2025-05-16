
import { configureStore } from '@reduxjs/toolkit';
import turfReducer from './slices/turfSlice'

export const store = configureStore({
  reducer: {
    turf: turfReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
