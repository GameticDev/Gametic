import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createBooking } from '../actions/bookingActions';

interface BookingState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: BookingState = {
  loading: false,
  error: null,
  success: false,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    resetBookingState(state) {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createBooking.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Booking failed';
      });
  },
});

export const { resetBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;
