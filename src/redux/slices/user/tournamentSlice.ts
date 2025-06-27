import { TournamentDetail } from "@/app/(root)/(user-routes)/home/tournament/[id]/page";
import {
  fetchAllTournaments,
  fetchTournamentById,
} from "@/redux/actions/user/tournamentActions";
import { createSlice } from "@reduxjs/toolkit";

interface TournamentState {
  tournament: TournamentDetail | null;
  tournaments: TournamentDetail[];
  totalTournaments: number;
  loading: boolean;
  error: string | null;
}

const INITIAL_STATE: TournamentState = {
  tournament: null,
  tournaments: [],
  totalTournaments: 0,
  loading: false,
  error: null,
};

const tournamentSlice = createSlice({
  name: "tournament",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTournamentById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTournamentById.fulfilled, (state, action) => {
        state.loading = false;
        state.tournament = action.payload.data;
        state.error = null;
      })
      .addCase(fetchTournamentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "something wrong";
      })
      .addCase(fetchAllTournaments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllTournaments.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.tournaments = action.payload.tournaments;
        state.totalTournaments = action.payload.totalTournaments;
        state.error = null;
      })
      .addCase(fetchAllTournaments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "something wrong";
      });
  },
});

export default tournamentSlice.reducer;
