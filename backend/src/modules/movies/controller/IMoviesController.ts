import { RequestHandler } from "express";

export interface IMoviesController {
  getMovies: RequestHandler
  toggleFavourite: RequestHandler
}
