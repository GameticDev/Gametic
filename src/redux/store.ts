
import { configureStore } from '@reduxjs/toolkit';
import turfReducer from './slices/turfSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    turf: turfReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
