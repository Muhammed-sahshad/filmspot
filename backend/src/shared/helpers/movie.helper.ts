import { Movie } from "../../modules/movies/types/Movie";

export const extractMovieFields = (data: any): Movie => ({
  imdbID: data.imdbID,
  Title: data.Title,
  Year: data.Year,
  Type: data.Type,
  Poster: data.Poster,
});