
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import turfReducer from "./slices/turfSlice";
import adminUserReducer from "./slices/admin/userSlice";
import turfDetailsReducer from './slices/turfDetailsSlice';

 const store = configureStore({
  reducer: {
    auth: authReducer,
    turf: turfReducer,
    adminUsers: adminUserReducer,
    turfDetails: turfDetailsReducer,
 

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;

