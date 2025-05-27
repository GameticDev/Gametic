import { configureStore } from "@reduxjs/toolkit";
import turfReducer from "./slices/turfSlice";
import adminUserReducer from "./slices/admin/userSlice";
import authReducer from "./slices/authantication/authanticationSlice";
import adminVenueReducer from "./slices/admin/venueSlice";
import turfDetailsReducer from './slices/turfDetailsSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
export const store = configureStore({
  reducer: {
    turf: turfReducer,
    adminUsers: adminUserReducer,
    adminVenues: adminVenueReducer,
    auth: authReducer,
    turfDetails: turfDetailsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export type AppStore = typeof store;



