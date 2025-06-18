import {
  Booking,
  currentUser,
  Match,
  User,
} from "@/redux/actions/user/userAction";
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: User | null;
  hostedMatches: Match[] | null;
  joinedOnlyMatches: Match[] | null;
  preferredLocation: string;
  loading: boolean;
  error: string | null;
  bookings: Booking[] | null;
}

const INITIAL_STATE: UserState = {
  user: null,
  hostedMatches: null,
  joinedOnlyMatches: null,
  preferredLocation: "",
  bookings: null,
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
        state.user = action.payload.user; // Ensure this matches User type
        state.hostedMatches = action.payload.hostedMatches;
        state.joinedOnlyMatches = action.payload.joinedOnlyMatches;
        state.preferredLocation = action.payload.preferredLocation;
        state.bookings = action.payload.bookings;
      })
      .addCase(currentUser.rejected, (state) => {
        state.loading = false;
        state.error = "soemthing wrong";
      });
  },
});

export default userSlice.reducer;
