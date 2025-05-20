import { configureStore } from "@reduxjs/toolkit";
import turfReducer from "./slices/turfSlice";
import adminUserReducer from "./slices/admin/userSlice";
import authReducer from './slices/authantication/authanticationSlice'

export const store = configureStore({
  reducer: {
    turf: turfReducer,
    adminUsers: adminUserReducer,
    auth:authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
