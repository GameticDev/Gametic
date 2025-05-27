
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axiosInstance';
// import { Turf } from '@/types/turf';
import { TurfData } from '@/types/turf';


export const addTurf = createAsyncThunk<TurfData, FormData, { rejectValue: string }>(
  'turf/addTurf',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/owner/addTurf', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data)
      return response.data.Turf;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const fetchTurfs = createAsyncThunk(
  'turf/fetchTurfs',
  async (ownerId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/owner/getAllturf?ownerId=${ownerId}`);
      console.log("Fetched turfs response:", response.data);
      
      // Adjust this based on your actual API response structure
      return response.data.turf || response.data.allTurf || [];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateTurf = createAsyncThunk(
  'turf/updateTurf',
  async ({ id, formData }: { id: string; formData: FormData }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.patch(`/owner/editTurf/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteTurf = createAsyncThunk(
  'turf/deleteTurf',
  async (turfId: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/owner/turfs/${turfId}`);
      return turfId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchTurfById = createAsyncThunk<TurfData, string, { rejectValue: string }>(
  'turf/fetchTurfById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/owner/getTurf/${id}`);
      return response.data.Turf;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);