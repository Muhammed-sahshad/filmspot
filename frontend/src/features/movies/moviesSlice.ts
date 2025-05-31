import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchMovies } from "./moviesApi";
import type { Movie } from "../../types/movie";
import type { AxiosError } from "axios";

interface MovieState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  totalResults: number;
  currentPage: number;
}

const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
  totalResults: 0,
  currentPage: 1,
};

export const searchMovies = createAsyncThunk<
  { results: Movie[]; totalResults: number; currentPage: number },
  { search: string; page?: number }
>("movies/search", async ({ search, page = 1 }, thunkAPI) => {
  try {
    const data = await fetchMovies(search, page);
    return data;
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err?.message || "Failed to fetch movies");
  }
});

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    resetMovies: (state) => {
      state.movies = [];
      state.totalResults = 0;
      state.currentPage = 1;
      state.error = null;
    },
     setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results;
        state.totalResults = action.payload.totalResults;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(searchMovies.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetMovies, setPage } = movieSlice.actions;
export default movieSlice.reducer;
