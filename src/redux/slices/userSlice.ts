import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
  _id: string;
  name: string;
  email: string;
  // Add more user fields as needed
}

interface UserState {
  userInfo: UserInfo | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: UserState = {
  userInfo: null,
  loading: false,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Set user info after login or fetch
    setUserInfo(state, action: PayloadAction<UserInfo>) {
      state.userInfo = action.payload;
      state.success = true;
      state.error = null;
    },
    // Clear user info on logout
    clearUserInfo(state) {
      state.userInfo = null;
      state.success = false;
      state.error = null;
    },
    // Reset error and success flags
    resetUserState(state) {
      state.error = null;
      state.success = false;
    },
  },
  // You can add extraReducers here if you want to handle async thunks for login/logout, fetch user, etc.
});

export const { setUserInfo, clearUserInfo, resetUserState } = userSlice.actions;
export default userSlice.reducer;

