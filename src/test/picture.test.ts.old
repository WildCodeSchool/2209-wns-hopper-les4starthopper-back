import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import { graphql, GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { PictureResolver } from "../graphql/resolvers/Picture";
import datasource from "../utils";
import {
  createPicture,
  getPictures,
  deletePictures,
} from "../utils/testPicture";
import { Picture } from "../Entities/Picture";

let schema: GraphQLSchema;
let pictureId: number;
let url: string;

beforeAll(async () => {
  // connect to DB
  await datasource.initialize();
  // compute GraphQL schema
  schema = await buildSchema({
    resolvers: [PictureResolver],
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

describe("comments", () => {
  describe("check comments creation", () => {
    it("creates a new comment", async () => {
      const result = await graphql({
        schema,
        source: createPicture,
        variableValues: {
          data: {
            url: "test url",
            //userId: 324,
          },
        },
      });
      pictureId = result?.data?.createPicture?.id;
      url = result?.data?.uploadPicture?.url;
      expect(result?.data?.uploadPicture).toBeTruthy();
    });

    it("find all comments in db", async () => {
      const pictures = await datasource.getRepository(Picture).find({});
      expect(Array.isArray(pictures)).toBeTruthy();
    });

    it("check if all comments are correctly deleted from DB", async () => {
      const result = await graphql({
        schema,
        source: deletePictures,
      });
      expect(result.data?.deletePictures.id).toBeNull();
    });
  });
});
