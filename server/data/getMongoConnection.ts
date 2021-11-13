import * as mongoose from "mongoose";

let mongooseClient: typeof mongoose;

const setupListeners = (connection: mongoose.Connection) => {
  connection.on("connected", () => {
    console.log("(re)?connected to mongodb.");
  });
};

export const getMongooseConnection = async () => {
  if (mongooseClient) return mongooseClient.connection;

  mongooseClient = await mongoose.connect(process.env.DB_CONN_STRING);

  setupListeners(mongooseClient.connection);
  return mongooseClient.connection;
};
