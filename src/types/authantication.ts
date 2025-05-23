export interface User {
  id: string;
  username: string;
  email: string;
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
  role : string
  picture ?: "",
  password ?: "",
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
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
