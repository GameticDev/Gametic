import {
  fetchLocations,
  Location,
  updateUserLocation,
} from "@/redux/actions/user/locationActions";
import { createSlice } from "@reduxjs/toolkit";

interface LocationState {
  locations: Location[];
  loading: boolean;
  preferredLocation: string;
  error: string | null;
}

const INITIAL_STATE: LocationState = {
  locations: [],
  preferredLocation: "",
  loading: false,
  error: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.locations = action.payload.locations;
      })
      .addCase(fetchLocations.rejected, (state) => {
        state.loading = false;
        state.error = "something worng";
      })
      .addCase(updateUserLocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.preferredLocation = action.payload.preferredLocation;
      })
      .addCase(updateUserLocation.rejected, (state) => {
        state.loading = false;
        state.error = "something worng";
      });
  },
});

export default locationSlice.reducer;
