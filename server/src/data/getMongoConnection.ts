import * as mongoose from "mongoose";

let mongooseClient: typeof mongoose;

import dbConfig from "./dbConfig";
const { DB_NAME, DB_HOST } = dbConfig;

export const getMongooseConnection = async () => {
  
  if (mongooseClient) {
    console.log(`Reconnection success`);
    return mongooseClient.connection;
  }

  mongooseClient = await mongoose.connect(`${DB_HOST}${DB_NAME}`, {
    autoIndex: false,
  });
  console.log(`Connection success`);

  return mongooseClient.connection;
};
