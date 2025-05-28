import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axiosInstance';

// interface TurfData {
//   name: string;
//   location: string;
//   type: string;
//   size: string;
//   city: string;
//   area: string;
//   address: string;
//   hourlyRate: number;
//   images: File[];
//   amenities: string[];
//   availability: { day: string; startTime: string; endTime: string }[];
//   pricing: { slot: string; price: number }[];
//   paymentOptions: { online: boolean; cash: boolean };
//   status: 'active' | 'inactive';
// }
interface TurfFormData {
  name: string;
  city: string;
  area: string;
  address: string;
  turfType: string;
  size: string;
  hourlyRate: number;
  images: File[];
  status?: string;
}

export const addTurf = createAsyncThunk(
  'turf/addTurf',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      // Convert FormData to plain object for debugging
      const formDataObj: Record<string, any> = {};
      formData.forEach((value, key) => {
        formDataObj[key] = value;
      });
      console.log("Submitting form data:", formDataObj);

      const response = await axiosInstance.post('/owner/addTurf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Error in addTurf:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Failed to add turf'
      );
    }
  }
);

export const fetchTurfs = createAsyncThunk('turf/fetchTurfs', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/owner/getTurfs'); // Make sure your backend has this route
    return response.data; // should return array of turfs
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});