import { AxiosError } from "axios";
import apiClient from "../../lib/axios";

export const fetchMovies = async(query: string, page: number) => {
    try {
        console.log(query, page)
        const res = await apiClient.get("/movies/search", {
            params:{
                query,
                page
            }
        })

        return res.data
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error(error.response?.data?.message || "Failed to fetch movies")
        }

        throw new Error("An unknown error occurred while fetching movies")
    }
}