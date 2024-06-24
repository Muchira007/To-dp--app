import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    role_id: number;
    email: string;
    phone_number: string;
    is_verified: boolean;
    is_deleted: boolean;
    token: string;
    otp_code: number;
    otp_expiry_time: string;
    created_at: string;
    updated_at: string;
  } | null;
  email: string | null;
  error: string | null; // New field to hold error messages
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  email: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<AuthState["user"]>) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.email = action.payload?.email || null; // Update email from user data
      state.error = null; // Clear any previous errors
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.email = null;
      state.error = null; // Clear any previous errors
    },
    register(state, action: PayloadAction<AuthState["email"]>) {
      state.isAuthenticated = true;
      state.email = action.payload;
      state.error = null; // Clear any previous errors
    },
    updateUser(state, action: PayloadAction<Partial<AuthState["user"]>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        state.error = null; // Clear any previous errors
      }
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { login, logout, register, updateUser, setError, clearError } = authSlice.actions;
export default authSlice.reducer;