import { configureStore } from "@reduxjs/toolkit";
import turfReducer from "./slices/turfSlice";
import adminUserReducer from "./slices/admin/userSlice";
import authReducer from './slices/authantication/authanticationSlice'
import adminVenueReducer from "./slices/admin/venueSlice";
export const store = configureStore({
  reducer: {
    turf: turfReducer,
    adminUsers: adminUserReducer,
    adminVenues: adminVenueReducer,
    auth:authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

