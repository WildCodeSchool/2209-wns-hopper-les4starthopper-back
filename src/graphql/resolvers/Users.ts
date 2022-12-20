import { Query, Arg, Resolver, Mutation, ID } from "type-graphql";
import { User } from "../../Entities/User";
import dataSource from "../../utils";

@Resolver()
export class UserResolver {
  ///////// QUERY FIND ALL USERS /////////////
  @Query(() => [User], { nullable: true })
  async Users(): Promise<User[]> {
    const Users = await dataSource
      .getRepository(User)
      .find({ relations: ["comments"] });
    return Users;
  }
}
