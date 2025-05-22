import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axiosInstance';
import axiosErrorManager from '@/utils/axiosErrorManager';
import { AuthResponse, LoginData, RegisterData } from '../../../types/authantication';

export const registerUser = createAsyncThunk<AuthResponse, RegisterData>(
  'auth/registerUser',
  async (data, { rejectWithValue }) => {
    
    try {
      const response = await axiosInstance.post<AuthResponse>('api/register', data);
      return response.data ;
    } catch (error) {
      console.log(error , "log");
      return rejectWithValue(axiosErrorManager(error));
      
    }
  }
);

export const loginUser = createAsyncThunk<AuthResponse, LoginData>(
  'auth/loginUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<AuthResponse>('/api/login', data);
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);
