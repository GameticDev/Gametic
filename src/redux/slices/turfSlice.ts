

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addTurf, fetchTurfs, updateTurf, deleteTurf } from '../actions/turfActions';
import { TurfData } from '@/types/turf';

interface TurfState {
  turfs: TurfData[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: TurfState = {
  turfs: [],
  loading: false,
  error: null,
  success: false,
};

const turfSlice = createSlice({
  name: 'turf',
  initialState,
  reducers: {
    resetTurfState(state) {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTurf.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addTurf.fulfilled, (state, action: PayloadAction<TurfData>) => {
        state.loading = false;
        state.success = true;
        if (action.payload) {
          state.turfs = [action.payload, ...state.turfs];
          // state.turfs.unshift(action.payload); 
        }
      })
      // .addCase(addTurf.rejected, (state, action: PayloadAction<any>) => {
      //   state.loading = false;
      //   state.error = action.payload?.message ?? 'Failed to add turf';
      // })

      .addCase(addTurf.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload ?? 'Failed to add turf';
})


      .addCase(fetchTurfs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTurfs.fulfilled, (state, action: PayloadAction<TurfData[]>) => {
        state.loading = false;
        state.turfs = action.payload;
      })
      .addCase(fetchTurfs.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message ?? 'Failed to fetch turfs';
      })

      .addCase(updateTurf.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTurf.fulfilled, (state, action: PayloadAction<TurfData>) => {
        state.loading = false;
        state.success = true;
        const index = state.turfs.findIndex(t => t._id === action.payload._id);
        if (index !== -1) {
          state.turfs[index] = action.payload;
        }
      })
      .addCase(updateTurf.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message ?? 'Failed to update turf';
      })

      .addCase(deleteTurf.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTurf.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.success = true;
        state.turfs = state.turfs.filter(t => t._id !== action.payload);
      })
      .addCase(deleteTurf.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message ?? 'Failed to delete turf';
      });
  },
});

export const { resetTurfState } = turfSlice.actions;
export default turfSlice.reducer;

