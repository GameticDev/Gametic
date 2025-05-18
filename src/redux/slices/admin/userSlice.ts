import { blockUser, fetchAllUser } from "@/redux/actions/admin/userActions";
import { createSlice } from "@reduxjs/toolkit";
import { User } from "lucide-react";

export interface User {
  _id: string;
  username: string;
  email: string;
  isBlocked: boolean;
  role: "user" | "owner" | "admin";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  totalUsers: number;
  totalActiveUser: number;
  totalBannedUsers: number;
}
const INITIAL_STATE: UsersState = {
  users: [],
  totalUsers: 0,
  totalActiveUser: 0,
  totalBannedUsers: 0,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.allUsers;
        state.totalActiveUser = action.payload.totalActiveUser;
        state.totalBannedUsers = action.payload.totalBannedUsers;
        console.log(action.payload)
        state.totalUsers = action.payload.totalUsers;
      })
      .addCase(fetchAllUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something wrong";
      })
      .addCase(blockUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(blockUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(blockUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Someting wrong";
      });
  },
});
export default userSlice.reducer;
