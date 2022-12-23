import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import { graphql, GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { PointOfInterestResolver } from "../graphql/resolvers/PointOfInterests";
import datasource from "../utils";
import {
  PointOfinterests,
  createPointOfInterest,
  deletePointOfInterest,
  deletePointOfinterests,
  pointOfInterest,
  updatePointOfInterest,
} from "../utils/testPointOfInterest";
import { PointOfInterest } from "../Entities/PointOfInterest";

let schema: GraphQLSchema;
let poiId: number;
let description: string;

beforeAll(async () => {
  // connect to DB
  await datasource.initialize();
  // compute GraphQL schema
  schema = await buildSchema({
    resolvers: [PointOfInterestResolver],
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

describe("point of interests", () => {
  describe("check POI creation", () => {
    it("creates a new POI", async () => {
      const result = await graphql({
        schema,
        source: createPointOfInterest,
        variableValues: {
          data: {
            name: "test city name xxx",
            description: "test description xxx",
          },
        },
      });
      poiId = result?.data?.createPointOfInterest?.id;
      description = result?.data?.createPointOfInterest?.description;
      expect(result?.data?.createPointOfInterest).toBeTruthy();
    });

    it("find all POI in db", async () => {
      const pointOfInterests = await datasource
        .getRepository(PointOfInterest)
        .find({});
      expect(Array.isArray(pointOfInterests)).toBeTruthy();
    });

    it("check if the POI is correctly updated", async () => {
      const result = await graphql({
        schema,
        source: updatePointOfInterest,
        variableValues: {
          poiId: 5,
          description: "test UPDATE DESCRIPTION",
        },
      });
      expect(result.data?.updatePointOfInterest?.description !== description);
    });

    it("check if the selected POI is correctly deleted from DB", async () => {
      const result = await graphql({
        schema,
        source: deletePointOfInterest,
        variableValues: {
          poiId: poiId,
        },
      });
      expect(result.data?.deletePointOfInterest?.id).toBeNull();
    });

    it("check if all points of interest are correctly deleted from DB", async () => {
      const result = await graphql({
        schema,
        source: deletePointOfinterests,
      });
      expect(result.data?.deletePointOfinterests?.id).toBeNull();
    });
  });
});
