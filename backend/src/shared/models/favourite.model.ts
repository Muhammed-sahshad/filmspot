import { Document, Schema, model } from "mongoose";

export interface IFavourite extends Document {
  userId: string;
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
  fav?: boolean
}

const favouriteSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    imdbID: { type: String, required: true, index: true },
    Title: String,
    Year: String,
    Type: String,
    Poster: String,
  },
  { timestamps: true }
);

export default model<IFavourite>("Favourite", favouriteSchema);
