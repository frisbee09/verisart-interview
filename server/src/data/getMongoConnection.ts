import * as mongoose from "mongoose";

let mongooseClient: typeof mongoose;

const url = process.env.DB_HOST || "";
const db = process.env.DB_NAME || "";

export const getMongooseConnection = async () => {
  if (mongooseClient) return mongooseClient.connection;

  mongooseClient = await mongoose.connect(`${url}/${db}`);

  return mongooseClient.connection;
};
