import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";
import axiosErrorManager from "@/utils/axiosErrorManager";
import { Match } from "@/redux/slices/user/hostSlice";
interface FetchMatchesArgs {
  page: number;
  limit: number;
  search: string;
}

interface FetchMatchesResponse {
  matches: Match[];
}

export const fetchAllMatches = createAsyncThunk<
  FetchMatchesResponse,
  FetchMatchesArgs,
  { rejectValue: string }
>(
  "host/fetchAllMatches",
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/all-matches?page=${page}&limit=${limit}&search=${search}`
      );
      const matches: Match[] = data.matches;
      return { matches };
    } catch (error) {
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);

export const fetchMatchById = createAsyncThunk<
  { match: Match },
  { matchId: string },
  { rejectValue: string }
>("host/fetchMatchById", async ({ matchId }, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get(`/match/${matchId}`);
    return { match: data.match };
  } catch (error) {
    return rejectWithValue(axiosErrorManager(error));
  }
});
