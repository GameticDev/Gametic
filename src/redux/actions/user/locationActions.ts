import axiosErrorManager from "@/utils/axiosErrorManager";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
export interface Location {
  name: string;
  state: string;
}
export interface LocationResponse {
  locations: Location[];
}

export const fetchLocations = createAsyncThunk<
  LocationResponse,
  { search: string },
  { rejectValue: string }
>("location/fetchLocations", async ({ search }, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get(`/getLocations?search=${search}`);
    const locations: Location[] = data.locations;
    return { locations };
  } catch (error) {
    return rejectWithValue(axiosErrorManager(error));
  }
});

export const updateUserLocation = createAsyncThunk<
  { preferredLocation: string },
  { preferredLocation: string },
  { rejectValue: string }
>(
  "location/updateUserLocation",
  async ({ preferredLocation }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch("/update-location", {
        preferredLocation,
      });
      return {
        preferredLocation: data.data.preferredLocation,
      };
    } catch (error) {
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);
