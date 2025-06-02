import { AxiosError } from "axios";
import apiClient from "../../lib/axios";
import { toast } from "sonner";

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

export const toggleMovieFav = async(imdbID: string) => {
    try {
        const res = await apiClient.post("/movies/favourite", {imdbID})
        if(res.data.movie.fav){
            toast.success("movie added to fav")
        }else{
            toast.info("movie removed from fav")
        }
        return res.data
    } catch (error) {
        toast.warning("Please login first")
        if(error instanceof AxiosError){
            throw new Error(error.response?.data?.message || "Failed to toggle favourite")
        }

        throw new Error("An unknown error occurred while toggling favourite")  
    }
}