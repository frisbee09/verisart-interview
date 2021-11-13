export type IArtist = Partial<{
  _id: string;
  firstName: string;
  lastName: string;
}>;

export type ICertificate = Partial<{
  _id: string;
  imgUrl: string;
  title: string;
  artist: IArtist;
  year: number;
  dateAdded: Date;
}>;
