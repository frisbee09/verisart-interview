import * as mongoose from "mongoose";

let mongooseClient: typeof mongoose;

const connectionString = process.env.DB_CONN_STRING || "";

export const getMongooseConnection = async () => {
  if (mongooseClient) return mongooseClient.connection;

  mongooseClient = await mongoose.connect(connectionString);

  return mongooseClient.connection;
};
