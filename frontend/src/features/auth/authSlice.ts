import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/user";
import { loginUser, refreshAuthToken, signupUser } from "./authApi";
import type { AuthResponse } from "./types";
import type { AxiosError } from "axios";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk<AuthResponse, { email: string; password: string }>(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const {user} = await loginUser(email, password);
      localStorage.setItem("loggedIn", "true")
      return user
    } catch (error) {
      const err = error as AxiosError
      return thunkAPI.rejectWithValue(err?.message || "Login failed");
    }
  }
);

export const signup = createAsyncThunk<AuthResponse, { name: string; email: string; password: string }>(
  "auth/signup",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const {user} = await signupUser(name, email, password);
      return user
    } catch (error) {
      const err = error as AxiosError
      return thunkAPI.rejectWithValue(err?.message || "Signup Fialed");
    }
  }
);

export const refreshToken = createAsyncThunk<AuthResponse>(
  "auth/refreshToken",
  async(_,thunkAPI) => {
    try {
      const {user} = await refreshAuthToken()
      return user
    } catch (error) {
      const err = error as AxiosError
      return thunkAPI.rejectWithValue(err?.message || "Token Refresh Failed")
    }
  } 
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
    // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        console.log(action.payload)
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
    // SIGNUP
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(signup.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
    // REFRESH TOKEN
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(refreshToken.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
