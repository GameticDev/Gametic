
import { createSlice } from '@reduxjs/toolkit';
import { addTurf ,fetchTurfs } from '../actions/turfActions';

interface TurfState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: TurfState = {
  loading: false,
  error: null,
  success: false,
};

const turfSlice = createSlice({
  name: 'turf',
  initialState,
  reducers: {
    resetTurfState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTurf.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addTurf.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addTurf.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message || 'Failed to add turf';
        state.error = action.payload as string;
      });
  },
});

export const { resetTurfState } = turfSlice.actions;
export default turfSlice.reducer;
