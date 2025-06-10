import type { RootState } from "@/app/store";
import type { Store } from "@reduxjs/toolkit";
import axios from "axios";

let store: Store<RootState> | null = null;

export const injectStore = (_store: Store<RootState>) => {
  store = _store;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api/",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = store?.getState().auth.accessToken
    if (accessToken && config.headers) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      error.response?.data?.message !== "Invalid refresh token"
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          "/api/auth/refresh",
          { refreshToken: localStorage.getItem("refreshToken") },
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
       console.log(refreshError)
      }
    }

    return Promise.reject(error);
  }
);

export default api;
