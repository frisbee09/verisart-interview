import { Model, model, ObjectId, Schema, Types } from "mongoose";

/**
 * Raw document type
 */
export interface ICertificate {
  imgUrl: string;
  title: string;
  artistId: Types.ObjectId;
  year: number;
  dateAdded: Date;
}

/**
 * Any virtuals can go here
 */
export interface CertificateModel extends ICertificate {}

const CertificateSchema = new Schema<ICertificate>({
  imgUrl: String,
  title: String,
  artistId: Schema.Types.ObjectId,
  year: Number,
  dateAdded: Date,
});

export const Certificate = model<
  ICertificate,
  Model<ICertificate, {}, CertificateModel>
>("certificates", CertificateSchema);
