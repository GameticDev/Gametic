import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axiosInstance';
import axiosErrorManager from '@/utils/axiosErrorManager';
import { AuthResponse, LoginData, RegisterData } from '../../../types/authantication';

export const emailCheck = createAsyncThunk<AuthResponse, RegisterData>(
  'auth/emailcheck',
  async (data, { rejectWithValue }) => {
    
    try {
      console.log(data ,"fghjjhg");
      
      const response = await axiosInstance.post<AuthResponse>('api/emailverification', data);
      
      return response.data ;
    } catch (error) {
      console.log(error , "log");
      return rejectWithValue(axiosErrorManager(error));
      
    }
  }
);


export const emailverification = createAsyncThunk<AuthResponse, {email: string; otp: string}>(
  'auth/emailverification',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<AuthResponse>('/api/verifyotp', data);
      return response.data;
    } catch (error) {
      console.log(error);
      
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);



interface RegisterPayload {
  email: string;
  username: string;
  password: string;
  picture: string;
  role: string;
  sing: string;
}

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: RegisterPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/register", userData);
      return response.data;
    } catch (error) {
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
