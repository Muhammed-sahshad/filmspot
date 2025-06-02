import { AxiosError } from "axios";
import apiClient from "../../lib/axios";
import { toast } from "sonner";

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await apiClient.post("/auth/login", { email, password });
    console.log(res.data)
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Login Failed");
    }

    throw new Error("An unknown error occurred while login");
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

    throw new Error("An unknown error occurred while singup");
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

    throw new Error("An unknown error occurred while refreshing token")
  }
}

export const logoutUser = async() => {
  try {
    const res = await apiClient.post("/auth/logout")
    toast.info("logged out successfully")
    return res.data
  } catch (error) {
    if(error instanceof AxiosError){
      throw new Error(error.response?.data?.message || "Logout Failed")
    }

    throw new Error("An unknown error occurred while logging out")
  }
}
