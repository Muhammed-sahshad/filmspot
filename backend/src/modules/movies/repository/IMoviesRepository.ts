import { IFavourite } from "../../../shared/models/favourite.model";

export interface IMoviesRepository {
    findFavourite(userId: string, imdbID: string): Promise<IFavourite | null>
    findFavourites(userId: string, imdbID: string []): Promise<IFavourite [] | null>
    createFavourite(data: Partial<IFavourite>): Promise<IFavourite | null>
    deleteFavourite(userId: string, imdbID: string): Promise<IFavourite | null>
}