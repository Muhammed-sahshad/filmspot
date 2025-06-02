import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import movieReducer from "../features/movies/moviesSlice";
import { injectStore } from "@/lib/axios";

const store = configureStore({
  reducer: {
    auth: authReducer,
    movie: movieReducer,
  },
});

injectStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store
