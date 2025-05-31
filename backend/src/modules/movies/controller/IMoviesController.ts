import { RequestHandler } from "express";

export interface IMovieController {
  getMovies: RequestHandler
}
