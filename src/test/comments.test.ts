import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import { graphql, GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { CommentResolver } from "../graphql/resolvers/Comments";
import datasource from "../utils";
import {
  createComment,
  deleteComment,
  deleteComments,
  getComments,
  updateComment,
} from "../utils/testComment";
import { Comment } from "../Entities/Comment";

let schema: GraphQLSchema;
let commentId: number;
let comment: string;

beforeAll(async () => {
  // connect to DB
  await datasource.initialize();
  // compute GraphQL schema
  schema = await buildSchema({
    resolvers: [CommentResolver],
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
    it.skip("creates a new comment", async () => {
      const result = await graphql({
        schema,
        source: createComment,
        variableValues: {
          data: {
            comment: "test comment",
            userId: 324,
          },
        },
      });
      commentId = result?.data?.createComment?.id;
      comment = result?.data?.createComment?.comment;
      expect(result?.data?.createComment).toBeTruthy();
    });

    it.skip("find all comments in db", async () => {
      const comments = await datasource.getRepository(Comment).find({});
      expect(Array.isArray(comments)).toBeTruthy();
    });

    it.skip("check if the comment is correctly updated", async () => {
      const result = await graphql({
        schema,
        source: updateComment,
        variableValues: {
          commentId: commentId,
          comment: "test UPDATE comment",
        },
      });
      expect(result.data?.updateComment?.comment !== comment);
    });

    it.skip("check if the selected comment is correctly deleted from DB", async () => {
      const result = await graphql({
        schema,
        source: deleteComment,
        variableValues: {
          commentId: 61,
        },
      });
      expect(result.data?.deleteComment?.id).toBeNull();
    });

    it("check if all comments are correctly deleted from DB", async () => {
      const result = await graphql({
        schema,
        source: deleteComments,
      });
      expect(result.data?.deleteComments.id).toBeNull();
    });
  });
});
