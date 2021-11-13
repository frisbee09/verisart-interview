import { Model, model, Schema } from "mongoose";

/**
 * Raw document type
 */
export interface IArtist {
  firstName: string;
  lastName: string;
}

/**
 * Any virtuals can go here
 */
export interface ArtistModel extends IArtist {}

const ArtistSchema = new Schema<IArtist>({
  firstName: String,
  lastName: String,
});

export const Artist = model<IArtist, Model<IArtist, {}, ArtistModel>>(
  "Artists",
  ArtistSchema
);
