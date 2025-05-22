import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { genrateOTP, googleLogin, loginUser, registerUser } from '../../actions/authantication/authanticationAction';
import { AuthResponse, User } from '../../../types/authantication';


interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser(state) {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.user = action.payload.user;
        console.log(action.payload.user)
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        console.log(action.payload.user)
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(genrateOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(genrateOTP.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(genrateOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export const { logoutUser, clearError } = authSlice.actions;
export default authSlice.reducer;
