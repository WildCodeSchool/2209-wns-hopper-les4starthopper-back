import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import { graphql, GraphQLSchema, print } from "graphql";
import { buildSchema } from "type-graphql";
import { UserResolver } from "../graphql/resolvers/Users";
import datasource from "../utils";
import { createUser } from "./createUser";
import { getUsers } from "./createUser";
import { User } from "../Entities/User";
import { cleanDb } from "./cleanDb";

let schema: GraphQLSchema;

beforeAll(async () => {
  // connect to DB
  await datasource.initialize();
  // clean db before tests
  await cleanDb();
  // compute GraphQL schema
  schema = await buildSchema({
    resolvers: [UserResolver],
  });
});

afterAll(async () => {
  // clean db after tests
  await cleanDb();
});

describe("cleanBD", () => {
  it("check if db is empty", async () => {
    await cleanDb();
    const result = await graphql({
      schema,
      source: getUsers,
    });
    expect(result?.data?.Users.length).toEqual(0);
  });
});

describe("users", () => {
  describe("user signup", () => {
    it("creates a new user", async () => {
      const result = await graphql({
        schema,
        source: createUser,
        variableValues: {
          data: {
            email: "testuser1@testuser1.com",
            password: "supersecret",
          },
        },
      });
      expect(result?.data?.createUser).toBeTruthy();
    });

    it("creates user in db", async () => {
      const user = await datasource
        .getRepository(User)
        .findOneBy({ email: "testuser@testuser.com" });
      expect(user?.password).toEqual(user?.password);
      expect(user).toBeDefined();
    });

    it("cannot create 2 users with the same email", async () => {
      const result = await graphql({
        schema,
        source: createUser,
        variableValues: {
          data: {
            email: "testuser1@testuser1.com",
            password: "supersecret",
          },
        },
      });

      expect(result.data?.createUser).toBeFalsy();
      expect(result.errors).toHaveLength(1);
    });
  });
});
