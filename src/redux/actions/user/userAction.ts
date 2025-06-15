import axiosErrorManager from "@/utils/axiosErrorManager";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
export interface User {
  _id: string;
  username: string;
  email: string;
  picture?: string;
  role: string;
  preferredLocation: string;
}

export interface Match {
  _id: string;
  userId: {
    _id: string;
    username: string;
    email: string;
  };
  title: string;
  sports: string;
  maxPlayers: number;
  joinedPlayers: {
    _id: string;
    username: string;
    email: string;
  }[];
  turfId: string;
  date: string;
  startTime: string;
  endTime: string;
  paymentPerPerson: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserResponse {
  user: {
    user: User;
    hostedMatches: Match[];
    joinedOnlyMatches: Match[];
    preferredLocation: string;
  };
}

export const currentUser = createAsyncThunk<
  { user: UserResponse },
  void,
  { rejectValue: string }
>("user/currentUser", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get("/user");
    return { user: data.user };
  } catch (error) {
    return rejectWithValue(axiosErrorManager(error));
  }
});
