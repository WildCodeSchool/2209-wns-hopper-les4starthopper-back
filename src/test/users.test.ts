import { beforeAll, describe, expect, it } from "@jest/globals";
import { graphql, GraphQLSchema, print } from "graphql";
import { buildSchema } from "type-graphql";
import { CommentResolver } from "../graphql/resolvers/Comments";
import { UserResolver } from "../graphql/resolvers/Users";
import datasource from "../utils";
import { createUser } from "./createUser";
import { User } from "../Entities/User";

let schema: GraphQLSchema;

beforeAll(async () => {
  // connect to DB
  await datasource.initialize();

  // purge DB
  try {
    const entities = datasource.entityMetadatas;
    const tableNames = entities
      .map((entity) => `"${entity.tableName}"`)
      .join(", ");
    await datasource.query(`TRUNCATE ${tableNames} CASCADE;`);
    console.log("[TEST DATABASE]: Clean");
  } catch (error) {
    throw new Error(`ERROR: Cleaning test database: ${JSON.stringify(error)}`);
  }

  // compute GraphQL schema
  schema = await buildSchema({
    resolvers: [UserResolver],
  });
});

describe("users", () => {
  describe("user signup", () => {
    it("creates a new user", async () => {
      // check here

      const result = await graphql({
        schema,
        source: createUser,
        variableValues: {
          data: {
            email: "toto@test.com",
            password: "supersecret",
          },
        },
      });

      expect(result?.data?.createUser).toBeTruthy();
    });
    it.skip("creates user in db", async () => {
      const user = await datasource
        .getRepository(User)
        .findOneBy({ email: "toto@test.com" });
      expect(user?.password !== "supersecret").toBe(true);
      expect(user).toBeDefined();
    });
    it.skip("cannot create 2 users with the same email", async () => {
      const result = await graphql({
        schema,
        source: createUser,
        variableValues: {
          data: {
            email: "toto@test.com",
            password: "supersecret",
          },
        },
      });

      expect(result.data?.createUser).toBeFalsy();
      expect(result.errors).toHaveLength(1);
    });
  });
});
