import { Query, Arg, Resolver, Mutation, ID } from "type-graphql";
import { User } from "../../models/User";
import dataSource from "../../utils";

@Resolver()
export class UserResolver {
  ///////// QUERY FIND ALL USERS /////////////
  @Query(() => [User], { nullable: true })
  async Users(): Promise<User[]> {
    const Users = await dataSource.getRepository(User).find({});
    return Users;
  }
}
