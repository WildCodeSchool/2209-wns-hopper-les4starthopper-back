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

const PORT = process.env.PORT || 4000;

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
  });
  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen(PORT);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
  await datasource.initialize();
  console.log("connected to BDD !!!!");
}
bootstrap();
