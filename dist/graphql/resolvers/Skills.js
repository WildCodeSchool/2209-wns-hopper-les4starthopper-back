"use strict";
// import { Query, Arg, Resolver, Mutation, ID } from "type-graphql";
// import { Skill } from "../../models/Skill";
// import dataSource from "../../utils";
// @Resolver()
// export class SkillResolver {
//   @Mutation(() => Skill)
//   async createSkill(@Arg("name") name: string): Promise<Skill> {
//     return await dataSource.getRepository(Skill).save({ name });
//   }
//   @Mutation(() => Skill)
//   async deleteSkill(): Promise<any> {
//     return await dataSource
//       .getRepository(Skill)
//       .createQueryBuilder()
//       .delete()
//       .from(Skill)
//       .execute();
//   }
//   @Mutation(() => Skill)
//   async deleteUser(): Promise<any> {
//     return await dataSource
//       .getRepository(Skill)
//       .createQueryBuilder()
//       .delete()
//       .from(Skill)
//       .execute();
//   }
//   @Mutation(() => Skill)
//   async deleteOneSkill(@Arg("id", () => ID) id: number): Promise<any> {
//     return await dataSource
//       .getRepository(Skill)
//       .createQueryBuilder()
//       .delete()
//       .where("id = :id", { id })
//       .execute();
//   }
//   @Query(() => [Skill])
//   async skills(): Promise<Skill[]> {
//     return await dataSource
//       .getRepository(Skill)
//       .find({ relations: ["upvotes", "upvotes.user"] });
//   }
//   @Query(() => Skill, { nullable: true })
//   async skill(@Arg("id") id: number): Promise<Skill | null> {
//     return await dataSource
//       .getRepository(Skill)
//       .findOne({ where: { id }, relations: ["upvotes", "upvotes.user"] });
//   }
// }
