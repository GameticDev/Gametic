export interface User {
  id: string;
  username: string;
  email: string;
  role:"user" | "admin" | "owner"
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// export const initialState: AuthState = {
//   user: null,
//   loading: false,
//   error: null,
// };

export interface RegisterData {
  email: string;
  role: string;
  username?: string;
  picture?: string;
  password?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
}

export interface OtpVerifyPayload {
  email: string;
  otp: string;
}

export interface OtpVerifyResponse {
  message: string;
}

export interface AuthState {
  loading: boolean;
  error: string | null;
  isVerified: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  // Add more fields if needed
}

export interface AuthResponse {
  user: User;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isVerified: boolean;
}

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isVerified: false,
};
