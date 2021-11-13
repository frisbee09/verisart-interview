import "core-js/stable";
import "regenerator-runtime/runtime";

import * as express from "express";
import { graphqlHTTP } from "express-graphql";
import { getMongooseConnection } from "./data/getMongoConnection";
import gqlSchema from "./schema";
import { resolve } from "path";

getMongooseConnection().then(() => {
  const app = express();
  const publicFolder = resolve(process.cwd(), "public");
  console.log(`Serving static 🖼️ from ${publicFolder}`);
  app.use("/static", express.static(publicFolder));
  app.use(
    "/graphql",
    graphqlHTTP({
      schema: gqlSchema,
      graphiql: true,
    })
  );
  app.listen(3001);
  console.log(`Listening on 3001`);
});
