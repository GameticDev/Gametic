
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoggedInUser {
  _id: string;
  username: string;
  email: string;
  role: "user" | "owner" | "admin";
}

interface AuthState {
  userInfo: LoggedInUser | null;
}

const initialState: AuthState = {
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<LoggedInUser>) => {
      state.userInfo = action.payload;
    },
    clearUserInfo: (state) => {
      state.userInfo = null;
    },
  },
});

export const { setUserInfo, clearUserInfo } = authSlice.actions;
export default authSlice.reducer;

