import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axiosInstance';

interface BookingPayload {
  userId: string;
  turfId: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  amount: number;
  status?: string;
  paymentStatus?: string;
}

export const createBooking = createAsyncThunk<
  any, // Replace with BookingData if you have a type
  BookingPayload,
  { rejectValue: string }
>(
  'booking/createBooking',
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/bookings', {
        ...bookingData,
        status: 'pending',
        paymentStatus: 'pending',
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
