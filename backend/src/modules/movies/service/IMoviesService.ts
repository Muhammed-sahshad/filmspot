import { IFavourite } from "../../../shared/models/favourite.model";
import { Movie } from "../types/Movie";

export interface IMoviesService {
  toggleFavourite(userId: string, imdbID: string, movie: Movie): Promise<IFavourite | null>
  findFavourites(userId: string, imdbIDs: string[]): Promise<IFavourite [] >
}