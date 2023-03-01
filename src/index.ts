import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { UserResolver } from "./graphql/resolvers/Users";
import { CityResolver } from "./graphql/resolvers/Cities";
import { CategoryResolver } from "./graphql/resolvers/Categories";
import { PointOfInterestResolver } from "./graphql/resolvers/PointOfInterests";
import { buildSchema } from "type-graphql";
import datasource from "./utils";
import { CommentResolver } from "./graphql/resolvers/Comments";
import { PictureResolver } from "./graphql/resolvers/Picture";
import env from "./env";
import { authChecker } from "./graphql/auth";

const PORT = env.PORT;
console.log("🚀 ~ file: index.ts:15 ~ PORT", PORT);
async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      CityResolver,
      CommentResolver,
      CategoryResolver,
      PointOfInterestResolver,
      PictureResolver,
    ],
    authChecker: authChecker,
  });
  const server = new ApolloServer({
    cors: {
      origin: "*",
      credentials: true,
    },
    schema,
    context: ({ req }) => {
      // Get the user token from the headers.
      const authorization = req.headers.authorization || "";

      if (authorization) {
        //Bearer ....token
        const token = authorization.split(" ").pop();
        return { token };
      }
      return { token: null };
    },
  });

  const { url } = await server.listen(PORT);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
  await datasource.initialize();
  console.log("connected to BDD !!!!");
}
bootstrap();
