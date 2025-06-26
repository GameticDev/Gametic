import axiosErrorManager from "@/utils/axiosErrorManager";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
export interface User {
  _id: string;
  username: string;
  email: string;
  picture?: string;
  role: string;
  phone:string;
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

export interface Booking {
  _id: string;
  userId: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  paymentStatus: "pending" | "paid" | "refunded";
  amount: number;
  createdAt: Date;
  bookingType: "normal" | "host";
  turf: {
    _id: string;
    name: string;
    city: string;
    area: string;
    location: string;
    turfType:
      | "football"
      | "cricket"
      | "multi-sport"
      | "swimming"
      | "basketball"
      | "badminton"
      | "tennis"
      | "volleyball"
      | "hockey";
  };
}

export interface UserResponse {
  user: User;
  hostedMatches: Match[];
  joinedOnlyMatches: Match[];
  preferredLocation: string;
}

export const currentUser = createAsyncThunk<
  {
    user: User;
    hostedMatches: Match[];
    joinedOnlyMatches: Match[];
    preferredLocation: string;
    bookings: Booking[];
  },
  void,
  { rejectValue: string }
>("user/currentUser", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get("/user");
    return {
      user: data.user.user,
      hostedMatches: data.user.hostedMatches,
      joinedOnlyMatches: data.user.joinedOnlyMatches,
      preferredLocation: data.user.preferredLocation,
      bookings: data.user.bookings,
    };
  } catch (error) {
    return rejectWithValue(axiosErrorManager(error));
  }
});



