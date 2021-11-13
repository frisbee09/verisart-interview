import * as express from "express";
import { graphqlHTTP } from "express-graphql";
import gqlSchema from "./schema";

export const app = express();
app.use(express.static("server/public"));
app.use(
  "/graphql",
  graphqlHTTP({
    schema: gqlSchema,
    graphiql: true,
  })
);

app.listen(3001);
