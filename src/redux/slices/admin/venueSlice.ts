import { fetchAllVenues } from "@/redux/actions/admin/venuesAction";
import { createSlice } from "@reduxjs/toolkit";

export interface Venue {
  _id?: string;
  name: string;
  city: string;
  area: string;
  address: string;
  turfType: string;
  size: string;
  image: string[];
  hourlyRate: number;
  status: string;
  availability: string;
  isDelete: boolean;
  averageRating: number;
  ratings: any[];
  bookings: any[];
  createdAt: { $date: string };
  updatedAt: { $date: string };
  __v: number;
}

interface VenueState {
  venues: Venue[];
  totalVenues: number;
  totalActiveVenues: number;
  loading: boolean;
  error: string | null;
}

const INITIAL_STATE: VenueState = {
  venues: [],
  totalVenues: 0,
  totalActiveVenues: 0,
  loading: false,
  error: null,
};

const venueSlice = createSlice({
  name: "venue",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVenues.pending, (state) => {
        state.loading = true;
        console.log(state.loading)
      })
      .addCase(fetchAllVenues.fulfilled, (state, action) => {
        state.loading = false;
        state.venues = action.payload.allVenues;
        state.totalVenues = action.payload.totalVenues;
        state.totalActiveVenues = action.payload.totalActiveVenues;
      })
      .addCase(fetchAllVenues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something wrong";
      });
  },
});

export default venueSlice.reducer;
