import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";
import axiosErrorManager from "@/utils/axiosErrorManager";
import {
  AuthResponse,
  LoginData,
  RegisterData,
} from "../../../types/authantication";

export const registerUser = createAsyncThunk<AuthResponse, RegisterData>(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data, "hoobaa");
      const response = await axiosInstance.post<AuthResponse>(
        "api/register",
        data
      );
      console.log(response.data, "bnm,");
      return response.data;
    } catch (error) {
      console.log(error, "log");
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);

export const loginUser = createAsyncThunk<AuthResponse, LoginData>(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<AuthResponse>(
        "/login",
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (credential: string, { rejectWithValue }) => {
    try {
      console.log(credential)
      const response = await axiosInstance.post(
        "/auth/google",
        { credential }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);
export const genrateOTP = createAsyncThunk(
  "auth/genrateOTP",
  async (email:string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/genaraetotp",
        {email}
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);
export const verifyOTP = createAsyncThunk(
  "auth/genrateOTP",
  async (email:string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/genaraetotp",
        {email}
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);
