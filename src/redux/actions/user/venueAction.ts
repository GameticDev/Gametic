import { Venue } from "@/redux/slices/admin/venueSlice";
import axiosErrorManager from "@/utils/axiosErrorManager";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllVenues = createAsyncThunk<
  { allVenues: Venue[]; totalVenues: number; totalActiveVenues: number },
  { page: number; limit: number; search: string },
  { rejectValue: string }
>(
  "venuesUser/fetchAllVenues",
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/getAllVenues?page=${page}&limit=${limit}&search=${search}`
      );
      console.log(response.data)
      return {
        allVenues: response.data.venues,
        totalVenues: response.data.totalVenues,
        totalActiveVenues: response.data.totalActiveVenues,
      };
    } catch (error) {
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);
