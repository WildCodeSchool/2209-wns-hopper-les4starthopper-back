import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import { graphql, GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { CommentResolver } from "../graphql/resolvers/Comments";
import datasource from "../utils";
import {
  createCity,
  deleteCities,
  deleteCity,
  getCities,
  getCity,
  updateCity,
} from "../utils/testCity";
import { City } from "../Entities/City";
import { CityResolver } from "../graphql/resolvers/Cities";

let schema: GraphQLSchema;
let cityId: number;
let name: string;

beforeAll(async () => {
  // connect to DB
  await datasource.initialize();
  // compute GraphQL schema
  schema = await buildSchema({
    resolvers: [CityResolver],
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

describe("cities", () => {
  describe("check cities creation", () => {
    it("creates a new city", async () => {
      const result = await graphql({
        schema,
        source: createCity,
        variableValues: {
          data: {
            name: "test city name xxx",
          },
        },
      });
      cityId = result?.data?.createCity?.id;
      name = result?.data?.createCity?.name;
      expect(result?.data?.createCity).toBeTruthy();
    });

    it("find all cities in db", async () => {
      const cities = await datasource.getRepository(City).find({});
      expect(Array.isArray(cities)).toBeTruthy();
    });

    it("check if the city is correctly updated", async () => {
      const result = await graphql({
        schema,
        source: updateCity,
        variableValues: {
          cityId: 5,
          name: "test UPDATE city name TEST TEST",
        },
      });
      expect(result.data?.updateComment?.name !== name);
    });

    it("check if the selected city is correctly deleted from DB", async () => {
      const result = await graphql({
        schema,
        source: deleteCity,
        variableValues: {
          cityId: cityId,
        },
      });
      expect(result.data?.deleteCity?.id).toBeNull();
    });

    it("check if all cities are correctly deleted from DB", async () => {
      const result = await graphql({
        schema,
        source: deleteCities,
      });
      expect(result.data?.deleteCities?.id).toBeNull();
    });
  });
});
