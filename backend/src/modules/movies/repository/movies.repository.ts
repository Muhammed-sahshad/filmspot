import Favourite, { IFavourite } from "../../../shared/models/favourite.model";
import { IMoviesRepository } from "./IMoviesRepository";

export class MoviesRepository implements IMoviesRepository {
  findFavourites(userId: string, imdbIDs: string[]): Promise<IFavourite[] | null> {
    return Favourite.find({
      userId,
      imdbID: { $in: imdbIDs },
    }).select("imdbID");
  }

  findFavourite(userId: string, imdbID: string): Promise<IFavourite | null> {
      return Favourite.findOne({userId, imdbID})
  }

  async createFavourite(data: Partial<IFavourite>): Promise<IFavourite | null> {
      return (await Favourite.create(data)).toObject()
  }

  deleteFavourite(userId: string, imdbID: string): Promise<IFavourite | null> {
      return Favourite.findOneAndDelete({ userId, imdbID }, {new: true});
  }
}
