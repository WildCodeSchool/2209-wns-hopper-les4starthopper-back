import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import { graphql, GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { UserResolver } from "../graphql/resolvers/Users";
import datasource from "../utils";
import {
  createUser,
  deleteUser,
  deleteUsers,
  getUsers,
  updateUser,
} from "../utils/testsUser";
import { User } from "../Entities/User";
import { cleanDb } from "./cleanDb";

let schema: GraphQLSchema;
let userId: number;
let role: number;

beforeAll(async () => {
  // connect to DB
  await datasource.initialize();
  // compute GraphQL schema
  schema = await buildSchema({
    resolvers: [UserResolver],
  });
});

// afterAll(async () => {
//   // clean db after tests
//   await cleanDb();
// });

// describe("cleanBD", () => {
//   it("check if db is empty", async () => {
//     await cleanDb();
//     const result = await graphql({
//       schema,
//       source: getUsers,
//     });
//     expect(result?.data?.Users.length).toEqual(0);
//   });
// });

describe("users", () => {
  describe("check user's creation", () => {
    it("creates a new user", async () => {
      const result = await graphql({
        schema,
        source: createUser,
        variableValues: {
          data: {
            email: "testuser1@testuser1.com",
            password: "supersecret",
            role: 1,
          },
        },
      });
      userId = result?.data?.createUser?.id;
      role = result?.data?.createUser?.role;
      expect(result?.data?.createUser).toBeTruthy();
    });

    it("find all users in db", async () => {
      const user = await datasource.getRepository(User).find({});
      expect(Array.isArray(user)).toBeTruthy();
    });

    it("find user in db", async () => {
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

    it("check if the user is correctly updated", async () => {
      const result = await graphql({
        schema,
        source: updateUser,
        variableValues: {
          userId: userId,
          role: 4,
        },
      });
      expect(result.data?.updateUser?.role !== role);
    });

    it("check if the user is correctly deleted from DB", async () => {
      const result = await graphql({
        schema,
        source: deleteUser,
        variableValues: {
          userId: userId,
        },
      });
      expect(result.data?.deleteUser?.id).toBeNull();
    });

    it("check if all users are correctly deleted from DB", async () => {
      const result = await graphql({
        schema,
        source: deleteUsers,
      });
      console.log("🚀 ~ file: users.test.ts:120 ~ it ~ result", result);
      expect(result.data?.deleteUsers.id).toBeNull();
    });
  });
});
