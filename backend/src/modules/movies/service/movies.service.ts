import { IFavourite } from "../../../shared/models/favourite.model";
import { IMoviesRepository } from "../repository/IMoviesRepository";
import { Movie } from "../types/Movie";
import { IMoviesService } from "./IMoviesService";

export class MoviesService implements IMoviesService {
  constructor(private repo: IMoviesRepository) {}
  async toggleFavourite(userId: string, imdbID: string, movie: Movie) {
    const fav = await this.repo.findFavourite(userId, imdbID);

    if (fav) {
      return await this.repo.deleteFavourite(userId, imdbID);
    } else {
      const favMovie = await this.repo.createFavourite({ ...movie, userId });
      return {
        ...favMovie,
        fav: true
      } as IFavourite
    }
  }

  async findFavourites(userId: string, imdbIDs: string[]) {
    const favs = await this.repo.findFavourites(userId, imdbIDs);
    if (!favs) {
      throw new Error(" cannot find favourites");
    }

    return favs;
  }
}
