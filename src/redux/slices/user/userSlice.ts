import { currentUser, UserResponse } from "@/redux/actions/user/userAction";
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: UserResponse | null;
  loading: boolean;
  error: string | null;
}

const INITIAL_STATE: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(currentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(currentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(currentUser.rejected, (state) => {
        state.loading = false;
        state.error = "soemthing wrong";
      });
  },
});

export default userSlice.reducer;
