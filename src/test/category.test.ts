import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import { graphql, GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { CategoryResolver } from "../graphql/resolvers/Categories";
import datasource from "../utils";
import {
  Categories,
  getCategory,
  createCategory,
  deleteCategories,
  deleteCategory,
  updateCategory,
} from "../utils/testCategory";
import { Category } from "../Entities/Category";

let schema: GraphQLSchema;
let categoryId: number;
let name: string;
let icon: string;

beforeAll(async () => {
  // connect to DB
  await datasource.initialize();
  // compute GraphQL schema
  schema = await buildSchema({
    resolvers: [CategoryResolver],
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

describe("category", () => {
  describe("check category creation", () => {
    it("creates a new category", async () => {
      const result = await graphql({
        schema,
        source: createCategory,
        variableValues: {
          data: {
            name: "test category name xxx",
            icon: "test category icon",
          },
        },
      });
      categoryId = result?.data?.createCategory?.id;
      name = result?.data?.createCategory?.name;
      icon = result?.data?.createCategory?.icon;
      expect(result?.data?.createCategory).toBeTruthy();
    });

    it("find all categories in db", async () => {
      const categories = await datasource.getRepository(Category).find({});
      expect(Array.isArray(categories)).toBeTruthy();
    });

    it("check if the category is correctly updated", async () => {
      const result = await graphql({
        schema,
        source: updateCategory,
        variableValues: {
          categoryId: categoryId,
          name: "test UPDATE name",
          icon: "test UPDATE ICON",
        },
      });
      expect(
        result.data?.updateCategory?.name !== name &&
          result?.data?.updateCategory?.icon !== icon
      );
    });

    it("check if the selected category is correctly deleted from DB", async () => {
      const result = await graphql({
        schema,
        source: deleteCategory,
        variableValues: {
          categoryId: categoryId,
        },
      });
      expect(result.data?.deleteCategory?.id).toBeNull();
    });

    it("check if all categories are correctly deleted from DB", async () => {
      const result = await graphql({
        schema,
        source: deleteCategories,
      });
      expect(result.data?.deleteCategories?.id).toBeNull();
    });
  });
});
