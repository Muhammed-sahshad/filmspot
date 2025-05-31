import "../../../shared/configs/dotenv"
import axios from 'axios';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IMovieController } from './IMoviesController';
import { StatusCodes } from 'http-status-codes';

const OMDB_API_KEY = process.env.OMDB_API_KEY!;
const OMDB_BASE_URL = 'https://www.omdbapi.com/';

export class MovieController implements IMovieController {
  getMovies = asyncHandler(async (req: Request, res: Response) => {
    const query = req.query.query as string;
    const page = req.query.page || '1';

    console.log(query, page)
    
    const response = await axios.get(OMDB_BASE_URL, {
        params: {
            apikey: OMDB_API_KEY,
            s: query,
            page,
        },
    });
    
    if (response.data.Response === 'False') {
      res.status(404).json({ message: response.data.Error });
      return;
    }

    res.status(StatusCodes.OK).json({
      results: response.data.Search,
      totalResults: parseInt(response.data.totalResults),
      currentPage: parseInt(page as string),
    });
  });
}
