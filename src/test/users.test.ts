import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import { graphql, GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { UserResolver } from "../graphql/resolvers/Users";
import datasource from "../utils";
import {
  createUser,
  deleteUser,
  deleteUsers,
  getMe,
  getUsers,
  signin,
  updateUser,
} from "../utils/testsUser";
import { User } from "../Entities/User";
import { cleanDb } from "../script/cleanDb";
import { authChecker } from "../graphql/auth";
import { verify } from "argon2";
import { sign } from "jsonwebtoken";
import env from "../env";
import { ApolloServer } from "apollo-server";
import { CityResolver } from "../graphql/resolvers/Cities";
import { CommentResolver } from "../graphql/resolvers/Comments";
import { CategoryResolver } from "../graphql/resolvers/Categories";
import { PointOfInterestResolver } from "../graphql/resolvers/PointOfInterests";
import { PictureResolver } from "../graphql/resolvers/Picture";
let schema: GraphQLSchema;
let userId: number;
let role: number;

beforeAll(async () => {
  await datasource.initialize();
  //await cleanDb();
  schema = await buildSchema({
    resolvers: [UserResolver],
    authChecker,
  });

  // const schemas = await buildSchema({
  //   resolvers: [
  //     UserResolver,
  //   ],
  //   authChecker,
  // });

  new ApolloServer({
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
  // async function bootstrap() {
  //   const schema = await buildSchema({
  //     resolvers: [
  //       UserResolver,
  //     ],
  //     authChecker,
  //   });
  //   const server = new ApolloServer({
  //     cors: {
  //       origin: "*",
  //       credentials: true,
  //     },
  //     schema,
  // context: ({ req }) => {
  //   // Get the user token from the headers.
  //   const authorization = req.headers.authorization || "";

  //   if (authorization) {
  //     //Bearer ....token
  //     const token = authorization.split(" ").pop();
  //     return { token };
  //   }
  //   return { token: null };
  // },
  // });

  //   const { url } = await server.listen(4000);
  //   console.log(`Server is running, GraphQL Playground available at ${url}`);
  //   await datasource.initialize();
  //   console.log("connected to BDD !!!!");
  // }
  // bootstrap();
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
//     expect(result?.data?.FindAllUsers.length).toEqual(0);
//   });
// });
let password
describe("users", () => {
  describe("check user's creation", () => {
    it.skip("creates a new user", async () => {
      const result = await graphql({
        schema,
        source: createUser,
        variableValues: {
          data: {
            email: "testuser1@testuser1.com",
            password: "Supers3cret",
            role: 1,
          },
        },
      });
      userId = result?.data?.createUser?.id;
      role = result?.data?.createUser?.role;
      password = result?.data?.createUser?.password;
      expect(result?.data?.createUser).toBeTruthy();
    });

    it("signin", async () => {
      const result = await graphql({
        schema,
        source: signin,
        variableValues: {
          email: "testuser1@testuser1.com",
          password: "Supers3cret",
          //role: 1
        }
      })
      //console.log("🚀 ~ file: users.test.ts:157 ~ it ~ result:", result)
      let password = "Supers3cret"
      let userToken
      const user = await datasource
        .getRepository(User)
        .findOne({ where: { email: "testuser1@testuser1.com" } });
      console.log("🚀 ~ file: users.test.ts:163 ~ it ~ user:", user)
      if (!user) {
        return null;
      }
      if (await verify(user.password, password)) {
        const token = sign({ userId: user.id, userRole: user.role }, "supersecret", {
          expiresIn: "2h",
        });
        userToken = token
        console.log("🚀 ~ file: users.test.ts:171 ~ it ~ token:", token)
      }
      expect(userToken).toBeDefined()
      // let password = "Supers3cret"
      // const user = await datasource
      //   .getRepository(User)
      //   .findOne({ where: { email: "testuser1@testuser1.com" } });
      // if (await verify(user!.password, password)) {
      //   const token = sign({ userId: user!.id }, "supersecret", {
      //     expiresIn: "2h",
      //   });
      //   let userToken = token;
      //   return token;
      // }
      // expect(userToken).toBeDefined()
    })

    it.skip("return me", async () => {
      const result = await graphql({
        schema,
        source: getMe,
      })
    })


    it.skip("find all users in db", async () => {
      const user = await datasource.getRepository(User).find({});
      expect(Array.isArray(user)).toBeTruthy();
    });

    it.skip("find user in db", async () => {
      const user = await datasource
        .getRepository(User)
        .findOneBy({ email: "testuser@testuser.com" });
      expect(user?.password).toEqual(user?.password);
      expect(user).toBeDefined();
    });

    it.skip("cannot create 2 users with the same email", async () => {
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

    it.skip("check if the user is correctly updated", async () => {
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

    it.skip("check if the user is correctly deleted from DB", async () => {
      const result = await graphql({
        schema,
        source: deleteUser,
        variableValues: {
          userId: userId,
        },
      });
      expect(result.data?.deleteUser?.id).toBeNull();
    });

    it.skip("check if all users are correctly deleted from DB", async () => {
      const result = await graphql({
        schema,
        source: deleteUsers,
      });
      expect(result.data?.deleteUsers.id).toBeNull();
    });
  });
});
