import "reflect-metadata";

////////// REST API //////////
import { upload } from "./rest/routes";
import bodyParser from "body-parser";
import express from "express";
import cors from 'cors';
import { seedDatabase } from "./utils/seeder";

const app = express();
const http = require('http').createServer(app)
const port = 3002;
const io = require('socket.io')(http)

app.use(cors({ origin: "http://localhost:3000" }))
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/image-upload", upload);

const expressServer = () => {
  app.listen(3001, () => {
    console.log("💻✳️  SERVER STARTED ON PORT 3001 ✳️ 💻");
  });
};

let users: any = []

io.on("connection", (socket: any) => {
  console.log(`🟢: ${socket.id} user just connected!`);

  socket.on('message', (data: any) => {
    io.emit('messageResponse', data);
  });

  socket.on('typing', (data: any) => socket.broadcast.emit('typingResponse', data));

  socket.on('newUser', (data: any) => {
    console.log("🚀 ~ file: index.ts:70 ~ socket.on ~ data:", data)
    users.push(data)
    io.emit('newUserResponse', users);
  });

  socket.on('disconnect', () => {
    users = users.filter((user: any) => {
      return user.socketID !== socket.id
    })
    io.emit('newUserResponse', users);
    console.log(`🔴: A user disconnected : ${users}`);
    socket.disconnect();
  });
  socket.emit("connection", null);
});

http.listen(port, () => {
  console.log(`🍃 🍃 🍃 [WEBSOCKET SERVER STARTED ON PORT ${port}] 🍃 🍃 🍃`);
});

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
import { authChecker } from "./graphql/auth";

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
  expressServer();
  console.log(`Server is running, GraphQL Playground available at ${url}`);
  await datasource.initialize();
  console.log("connected to BDD !!!!");
  await seedDatabase();
}
bootstrap();
