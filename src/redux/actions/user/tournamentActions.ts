import { TournamentDetail } from "@/app/(root)/(user-routes)/home/tournament/[id]/page";
import axiosErrorManager from "@/utils/axiosErrorManager";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface FetchTournamentArgs {
  page: number;
  limit: number;
  search: string;
  sport: string;
  location: string;
}
interface Tournament {
  title: string;
  description: string;
  sport: string;
  turf: string;
  dateFrom: string;
  dateTo: string;
  teamManager: string;
  maxTeams: number;
  maxPlayers: number;
  joinedTeams: string[];
  entryFee: number;
  prizePool: number;
  status: string;
  image: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const createTournament = createAsyncThunk<
  { tournament: Tournament },
  { formData: globalThis.FormData },
  { rejectValue: string }
>("tournament/createTournament", async ({ formData }, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post("/createTournament", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data.tournament;
  } catch (error) {
    return rejectWithValue(axiosErrorManager(error));
  }
});

export const fetchTournamentById = createAsyncThunk<
  { data: TournamentDetail },
  { id: string | undefined },
  { rejectValue: string }
>("tournament/fetchTournamentById", async ({ id }, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get(`/tournamentById/${id}`);
    return { data: data.data };
  } catch (error) {
    return rejectWithValue(axiosErrorManager(error));
  }
});

export const fetchAllTournaments = createAsyncThunk<
  { tournaments: TournamentDetail[]; totalTournaments: number },
  FetchTournamentArgs,
  { rejectValue: string }
>(
  "tournament/fetchAllTournaments",
  async ({ page, limit, search, sport, location }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/getAllTournament?page=${page}&limit=${limit}&search=${search}&sport=${sport}&location=${location}`
      );
      return {
        tournaments: data.data.tournaments,
        totalTournaments: data.data.total,
      };
    } catch (error) {
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);
