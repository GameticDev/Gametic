
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axiosInstance';
// import { Turf } from '@/types/turf';
import { TurfData } from '@/types/turf';
import axiosErrorManager from '@/utils/axiosErrorManager';


export const addTurf = createAsyncThunk<TurfData, FormData, { rejectValue: string }>(
  'turf/addTurf',
  async (formData, { rejectWithValue }) => {
    console.log(",,,,,,,,",formData)
    try {
      const response = await axiosInstance.post('/owner/addTurf', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data)
      return response.data.Turf;
    } catch (error) {
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);


export const fetchTurfs = createAsyncThunk(
  'turf/fetchTurfs',
  async (ownerId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/owner/getAllturf?ownerId=${ownerId}`);
      return response.data.turf || response.data.allTurf || [];
    } catch (error) {
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);

export const updateTurf = createAsyncThunk<TurfData, { id: string; formData: FormData }, { rejectValue: string }>(
  'turf/updateTurf',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/owner/editTurf/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);


export const deleteTurf = createAsyncThunk(
  'turf/deleteTurf',
  async (turfId: string, { rejectWithValue }) => {
    console.log("shanu,,,,,,,",turfId)
    try {
      await axiosInstance.delete(`/owner/turfs/${turfId}`);
      console.log("turfeeeeee...",turfId)
      return turfId;
    } catch (error) {
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);

export const fetchTurfById = createAsyncThunk<TurfData, string, { rejectValue: string }>(
  'turf/fetchTurfById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/owner/getTurf/${id}`);
      return response.data.Turf;
    } catch (error) {
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);