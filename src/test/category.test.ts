import { beforeAll, describe, expect, it } from "@jest/globals";
import { graphql, GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { CategoryResolver } from "../graphql/resolvers/Categories";
import { UserResolver } from "../graphql/resolvers/Users";
import datasource from "../utils";
import {
  createCategory,
  deleteCategories,
  deleteCategory,
  updateCategory,
} from "../utils/testCategory";
import { Category } from "../Entities/Category";
import { authChecker } from "../graphql/auth";
import { createUser, deleteUsers, signin } from "../utils/testsUser";
import { User } from "../Entities/User";
import { cleanDb } from "../script/cleanDb";

import { CommentResolver } from "../graphql/resolvers/Comments";
import {
  createCity,
  deleteCities,
  deleteCity,
  updateCity,
} from "../utils/testCity";
import { City } from "../Entities/City";
import { CityResolver } from "../graphql/resolvers/Cities";

import {
  createComment,
  deleteComment,
  deleteComments,
  getComments,
  updateComment,
} from "../utils/testComment";
import { Comment } from "../Entities/Comment";

import { PointOfInterestResolver } from "../graphql/resolvers/PointOfInterests";
import {
  createPointOfInterest,
  deletePointOfInterest,
  deletePointOfinterests,
  pointOfInterest,
  updatePointOfInterest,
} from "../utils/testPointOfInterest";
import { PointOfInterest } from "../Entities/PointOfInterest";
import {
  deleteUser,
  getMe,
  updateUser,
} from "../utils/testsUser";

let schema: GraphQLSchema;
let categoryId: number;
let name: string;
let icon: string;
let userId: number;
let role: number;
let userToken: string;
let password: string;
let cityId: number;
let commentId: number;
let comment: string;
let poiId: number;
let description: string;

beforeAll(async () => {
  // connect to DB
  await datasource.initialize();
  await cleanDb()
  // compute GraphQL schema
  schema = await buildSchema({
    resolvers: [CategoryResolver, UserResolver, CityResolver, CommentResolver, PointOfInterestResolver],
    authChecker
  });
});

describe("▶️ category", () => {
  describe("🔎 check category resolver", () => {
    it("🔸 creates a new user", async () => {
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

    it("🔸 signin", async () => {
      const result = await graphql({
        schema,
        source: signin,
        variableValues: {
          email: "testuser1@testuser1.com",
          password: "Supers3cret",
          role: 1
        }
      })
      userToken = result?.data?.signin
      expect(result?.data?.signin).toBeDefined()
    });

    it("🔸 creates a new category", async () => {
      const result = await graphql({
        schema,
        source: createCategory,
        contextValue: {
          token: userToken
        },
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

    it("🔸 find all categories in db", async () => {
      const categories = await datasource.getRepository(Category).find({});
      expect(Array.isArray(categories)).toBeTruthy();
    });

    it("🔸 check if the category is correctly updated", async () => {
      const result = await graphql({
        schema,
        source: updateCategory,
        contextValue: {
          token: userToken
        },
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

    it("🔸 check if the selected category is correctly deleted from DB", async () => {
      const result = await graphql({
        schema,
        source: deleteCategory,
        contextValue: {
          token: userToken
        },
        variableValues: {
          categoryId: categoryId,
        },
      });
      expect(result.data?.deleteCategory?.id).toBeNull();
    });

    it("🔸 check if all categories are correctly deleted from DB", async () => {
      const result = await graphql({
        schema,
        source: deleteCategories,
        contextValue: {
          token: userToken
        },
      });
      expect(result.data?.deleteCategories?.id).toBeNull();
    });
  });
});

describe("▶️ cities", () => {
  describe("🔎 check cities creation", () => {
    it("🔸 creates a new city", async () => {
      const result = await graphql({
        schema,
        source: createCity,
        contextValue: {
          token: userToken
        },
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

    it("🔸 find all cities in db", async () => {
      const cities = await datasource.getRepository(City).find({});
      expect(Array.isArray(cities)).toBeTruthy();
    });

    it("🔸 check if the city is correctly updated", async () => {
      const result = await graphql({
        schema,
        source: updateCity,
        contextValue: {
          token: userToken
        },
        variableValues: {
          cityId: 5,
          name: "test UPDATE city name TEST TEST",
        },
      });
      expect(result.data?.updateComment?.name !== name);
    });

    it("🔸 check if the selected city is correctly deleted from DB", async () => {
      const result = await graphql({
        schema,
        source: deleteCity,
        contextValue: {
          token: userToken
        },
        variableValues: {
          cityId: cityId,
        },
      });
      expect(result.data?.deleteCity?.id).toBeNull();
    });

    it("🔸 check if all cities are correctly deleted from DB", async () => {
      const result = await graphql({
        schema,
        source: deleteCities,
        contextValue: {
          token: userToken
        },
      });
      expect(result.data?.deleteCities?.id).toBeNull();
    });
  });
});

describe("▶️ comments", () => {
  describe("🔎 check comments creation", () => {

    it("🔸 creates a new comment", async () => {
      const result = await graphql({
        schema,
        source: createComment,
        contextValue: {
          token: userToken
        },
        variableValues: {
          data: {
            comment: "test comment",
            //userId: 324,
            note: 1,
          },
        },
      });
      commentId = result?.data?.createComment?.id;
      comment = result?.data?.createComment?.comment;
      expect(result?.data?.createComment).toBeTruthy();
    });

    it("🔸 find all comments in db", async () => {
      const comments = await datasource.getRepository(Comment).find({});
      expect(Array.isArray(comments)).toBeTruthy();
    });

    it("🔸 check if the comment is correctly updated", async () => {
      const result = await graphql({
        schema,
        source: updateComment,
        contextValue: {
          token: userToken
        },
        variableValues: {
          commentId: commentId,
          comment: "test UPDATE comment",
          note: 5,
        },
      });
      expect(result.data?.updateComment?.comment !== comment);
    });

    it("🔸 check if the selected comment is correctly deleted from DB", async () => {
      const result = await graphql({
        schema,
        source: deleteComment,
        contextValue: {
          token: userToken
        },
        variableValues: {
          commentId: 69,
        },
      });
      expect(result.data?.deleteComment?.id).toBeNull();
    });

    it("🔸 check if all comments are correctly deleted from DB", async () => {
      const result = await graphql({
        schema,
        source: deleteComments,
        contextValue: {
          token: userToken
        },
      });
      expect(result.data?.deleteComments.id).toBeNull();
    });
  });
});

describe("▶️ point of interests", () => {
  describe("🔎 check POI creation", () => {
    it("🔸 creates a new POI", async () => {
      const result = await graphql({
        schema,
        source: createPointOfInterest,
        contextValue: {
          token: userToken
        },
        variableValues: {
          data: {
            name: "test city name xxx",
            description: "test description xxx",
          },
          categoryId: 33,
        },
      });
      poiId = result?.data?.createPointOfInterest?.id;
      description = result?.data?.createPointOfInterest?.description;
      expect(result?.data?.createPointOfInterest).toBeTruthy();
    });

    it("🔸 find all POI in db", async () => {
      const pointOfInterests = await datasource
        .getRepository(PointOfInterest)
        .find({});
      expect(Array.isArray(pointOfInterests)).toBeTruthy();
    });

    it("🔸 check if the POI is correctly updated", async () => {
      const result = await graphql({
        schema,
        source: updatePointOfInterest,
        contextValue: {
          token: userToken
        },
        variableValues: {
          poiId: 5,
          description: "test UPDATE DESCRIPTION",
        },
      });
      expect(result.data?.updatePointOfInterest?.description !== description);
    });

    it("🔸 check if the selected POI is correctly deleted from DB", async () => {
      const result = await graphql({
        schema,
        source: deletePointOfInterest,
        contextValue: {
          token: userToken
        },
        variableValues: {
          poiId: poiId,
        },
      });
      expect(result.data?.deletePointOfInterest?.id).toBeNull();
    });

    it("🔸 check if all points of interest are correctly deleted from DB", async () => {
      const result = await graphql({
        schema,
        source: deletePointOfinterests,
        contextValue: {
          token: userToken
        },
      });
      expect(result.data?.deletePointOfinterests?.id).toBeNull();
    });
  });
});

describe("▶️ users", () => {
  describe("🔎 check user's creation", () => {
    it("🔸 signin", async () => {
      const result = await graphql({
        schema,
        source: signin,
        variableValues: {
          email: "testuser1@testuser1.com",
          password: "Supers3cret",
          role: 1
        }
      })
      userToken = result?.data?.signin
      expect(result?.data?.signin).toBeDefined()
    })

    it("🔸 return me", async () => {
      const result = await graphql({
        schema,
        source: getMe,
        contextValue: {
          token: userToken
        }
      })
      expect(result?.data?.GetMe).toBeDefined();
    })


    it("🔸 find all users in db", async () => {
      const user = await datasource.getRepository(User).find({});
      expect(Array.isArray(user)).toBeTruthy();
    });

    it("🔸 find user in db", async () => {
      const user = await datasource
        .getRepository(User)
        .findOneBy({ email: "testuser1@testuser1.com" });
      expect(user?.password).toEqual(user?.password);
      expect(user).toBeDefined();
    });

    it("🔸 cannot create 2 users with the same email", async () => {
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

    it("🔸 check if the user is correctly updated", async () => {
      const result = await graphql({
        schema,
        source: updateUser,
        contextValue: {
          token: userToken
        },
        variableValues: {
          userId: userId,
          role: 4,
        },
      });
      expect(result.data?.updateUser?.role !== role);
    });

    it("🔸 check if the user is correctly deleted from DB", async () => {
      const result = await graphql({
        schema,
        source: deleteUser,
        contextValue: {
          token: userToken
        },
        variableValues: {
          userId,
        },
      });
      expect(result.data?.deleteUser?.id).toBeNull();
    });

    it("🔸 check if all users are correctly deleted from DB", async () => {
      let expected: string = '';
      const users = await datasource.getRepository(User).find({});
      users === null ? expected = `toBeUndefined()` : `toBeNull()`

      const result = await graphql({
        schema,
        source: deleteUsers,
        contextValue: {
          token: userToken
        }
      });
      expect(result.data?.deleteUsers.id) + `.${expected}`;
    });
  });
});
