"use strict";
// import { Query, Arg, Resolver, Mutation, ID } from "type-graphql";
// import { Upvote } from "../../models/Upvote";
// import dataSource from "../../utils";
// @Resolver()
// export class UpvoteResolver {
//   @Mutation(() => Upvote)
//   async createUpvote(
//     @Arg("userid", () => ID) userid: number,
//     @Arg("skillId", () => ID) skillId: number
//   ): Promise<Upvote> {
//     const repository = dataSource.getRepository(Upvote);
//     const exitingUpvote = await repository.findOne({
//       where: {
//         skill: { id: skillId },
//         user: { id: userid },
//       },
//     });
//     if (exitingUpvote !== null) {
//       return exitingUpvote;
//     } else {
//       return await repository.save({
//         user: { id: userid },
//         skill: { id: skillId },
//       });
//     }
//   }
//   @Mutation(() => Upvote)
//   async upVote(
//     @Arg("upvoteId", () => ID) upvoteId: number
//   ): Promise<Upvote | null> {
//     const repository = dataSource.getRepository(Upvote);
//     const exitingUpvote = await repository.findOne({
//       where: {
//         id: upvoteId,
//       },
//     });
//     if (exitingUpvote !== null) {
//       exitingUpvote.upvotes = exitingUpvote.upvotes + 1;
//       return await repository.save(exitingUpvote);
//     } else {
//       return null;
//     }
//   }
//   @Query(() => [Upvote])
//   async upvotes(): Promise<Upvote[]> {
//     const upvoting = await dataSource.getRepository(Upvote).find({});
//     return upvoting;
//   }
//   @Query(() => Upvote, { nullable: true })
//   async upvote(@Arg("id") id: number): Promise<Upvote | null> {
//     return await dataSource.getRepository(Upvote).findOne({ where: { id } });
//   }
// }
