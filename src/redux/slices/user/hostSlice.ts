import { fetchAllMatches, fetchMatchById } from "@/redux/actions/user/hostActions";
import { createSlice } from "@reduxjs/toolkit";

interface UserRef {
  _id: string;
  username: string;
}

interface TurfRef {
  _id: string;
  name: string;
  city: string;
  area: string;
  location: string;
}

export interface Match {
  _id: string;
  userId: UserRef;
  title: string;
  sports:
    | "football"
    | "cricket"
    | "basketball"
    | "badminton"
    | "tennis"
    | "volleyball"
    | "hockey";
  maxPlayers: number;
  joinedPlayers: string[];
  turfId: TurfRef;
  date: Date;
  startTime: string;
  endTime: string;
  paymentPerPerson: number;
  status: "open" | "full" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface HostState {
  matches: Match[];
  match: Match | null;
  loading: boolean;
  error: string | null;
}
const INITIAL_STATE: HostState = {
  matches: [],
  match: null,
  loading: false,
  error: null,
};

const hostSlice = createSlice({
  name: "host",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMatches.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.matches = action.payload.matches;
      })
      .addCase(fetchAllMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "someting wrong";
      })
      .addCase(fetchMatchById.pending,(state)=>{
        state.loading = true;
      })
      .addCase(fetchMatchById.fulfilled,(state,action)=>{
        state.loading = false;
        state.match = action.payload.match;
      })
      .addCase(fetchMatchById.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload || "something wrong"
      })
  },
});

export default hostSlice.reducer;
