import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type { AuthResponse } from "./types";
import { loginUser, logoutUser, refreshAuthToken, signupUser } from "./authApi";

export const login = createAsyncThunk<AuthResponse, { email: string; password: string }>(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const { user } = await loginUser(email, password);
      localStorage.setItem("loggedIn", "true");
      return user;
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err?.message || "Login failed");
    }
  }
);

export const signup = createAsyncThunk<AuthResponse, { name: string; email: string; password: string }>(
  "auth/signup",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const { user } = await signupUser(name, email, password);
      return user;
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err?.message || "Signup Failed");
    }
  }
);

export const refreshToken = createAsyncThunk<AuthResponse>(
  "auth/refreshToken",
  async (_, thunkAPI) => {
    try {
      const { user } = await refreshAuthToken();
      return user;
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err?.message || "Token Refresh Failed");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutUser();
      localStorage.removeItem("loggedIn");
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err?.message || "Logout Failed");
    }
  }
);
