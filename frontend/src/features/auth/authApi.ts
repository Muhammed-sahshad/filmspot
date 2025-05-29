import { AxiosError } from "axios";
import apiClient from "../../lib/axios";

export const loginUser = async (email: string, password: string) => {
  try {
    console.log(email, password)
    const res = await apiClient.post("/auth/login", { email, password });
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Login Failed");
    }

    throw new Error("An unknown error occurred");
  }
};

export const signupUser = async (name: string, email: string, password: string) => {
  try {
    const res = await apiClient.post("/auth/register", { name, email, password });
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Signup Failed");
    }

    throw new Error("An unknown error occurred");
  }
};

export const refreshAuthToken = async() => {
  try {
    const res = await apiClient.post("/auth/refresh")
    return res.data
  } catch (error) {
    if(error instanceof AxiosError){
      throw new Error(error.response?.data?.message || "Token Refresh Failed")
    }

    throw new Error("An unknown error occurred")
  }
}
