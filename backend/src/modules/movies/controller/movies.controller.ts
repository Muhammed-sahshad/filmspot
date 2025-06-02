import "../../../shared/configs/dotenv";
import axios from "axios";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { IMoviesController } from "./IMoviesController";
import { StatusCodes } from "http-status-codes";
import { IMoviesService } from "../service/IMoviesService";
import { extractMovieFields } from "../../../shared/helpers/movie.helper";

const OMDB_API_KEY = process.env.OMDB_API_KEY!;
const OMDB_BASE_URL = "https://www.omdbapi.com/";

export class MoviesController implements IMoviesController {
  constructor(private service: IMoviesService) {}
  getMovies = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id as string;
    const query = req.query.query as string;
    const page = req.query.page || "1";

    const response = await axios.get(OMDB_BASE_URL, {
      params: {
        apikey: OMDB_API_KEY,
        s: query,
        page,
      },
    });

    if (response.data.Response === "False") {
      if(response.data.Error === "Movie not found!"){
        res.status(StatusCodes.OK).json({results:[]})
        return
      }
      res.status(404).json({ message: response.data.Error});
      return;
    }

    if (userId) {
      const movies = response.data.Search;
      const imdbIDs = movies.map((movie: any) => movie.imdbID);

      const favs = await this.service.findFavourites(userId, imdbIDs);

      const favSet = new Set(favs.map((fav) => fav.imdbID));

      const modifiedMovies = movies.map((movie: any) => ({
        ...movie,
        fav: favSet.has(movie.imdbID),
      }));

      res.status(StatusCodes.OK).json({
        results: modifiedMovies,
        totalResults: parseInt(response.data.totalResults),
        currentPage: parseInt(page as string),
      });
    } else {
      res.status(StatusCodes.OK).json({
        results: response.data.Search,
        totalResults: parseInt(response.data.totalResults),
        currentPage: parseInt(page as string),
      });
    }
  });

  toggleFavourite = asyncHandler(async (req: Request, res: Response) => {
    const { imdbID } = req.body;
    const userId = req.user?.id as string;
    const response = await axios.get(OMDB_BASE_URL, { params: { apikey: OMDB_API_KEY, i: imdbID } });
    if (response.data.Response === "False") {
      res.status(404).json({ message: response.data.Error });
      return;
    }

    const movie = extractMovieFields(response.data);
    const toggleMovie = await this.service.toggleFavourite(userId, imdbID, movie);
    res.status(StatusCodes.OK).json({ message: "movie favourite toggled successfully", movie: toggleMovie });
  });
}
