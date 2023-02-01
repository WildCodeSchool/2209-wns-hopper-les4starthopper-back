import "reflect-metadata";

////////// REST API //////////
import { upload } from "./rest/routes";
import bodyParser from "body-parser";
import express from "express";

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/image-upload", upload);
const expressServer = () => {
  app.listen(3000, () => {
    console.log("💻✳️  SERVER STARTED ON PORT 3000✳️ 💻");
  });
};
////////// XXXXXXX //////////
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

const PORT = env.PORT;
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
    cors: {
      origin: "*",
      credentials: true,
    },
    schema,
  });

  const { url } = await server.listen(PORT);
  expressServer();
  console.log(`Server is running, GraphQL Playground available at ${url}`);
  await datasource.initialize();
  console.log("connected to BDD !!!!");
}
bootstrap();
