import { configureStore } from "@reduxjs/toolkit";
import turfReducer from "./slices/turfSlice";
import authReducer from './slices/authantication/authanticationSlice';
import adminUserReducer from "./slices/admin/userSlice";
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
    auth: authReducer,
    turf: turfReducer,
    adminUsers: adminUserReducer,
    adminVenues: adminVenueReducer,
  
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



