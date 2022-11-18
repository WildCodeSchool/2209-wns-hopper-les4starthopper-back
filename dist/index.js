"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_1 = require("apollo-server");
const Users_1 = require("./graphql/resolvers/Users");
const type_graphql_1 = require("type-graphql");
const utils_1 = __importDefault(require("./utils"));
const PORT = process.env.PORT || 4000;
async function bootstrap() {
    // ... Building schema here
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [Users_1.UserResolver],
    });
    // Create the GraphQL server
    const server = new apollo_server_1.ApolloServer({
        schema,
    });
    // Start the server
    const { url } = await server.listen(PORT);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
    await utils_1.default.initialize();
    console.log("connected to BDD !!!!");
}
bootstrap();
