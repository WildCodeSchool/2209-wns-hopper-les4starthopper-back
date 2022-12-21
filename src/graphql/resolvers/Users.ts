import { Query, Arg, Resolver, Mutation, ID } from "type-graphql";
import { User, UserInput } from "../../Entities/User";
import dataSource from "../../utils";

@Resolver()
export class UserResolver {
  ///////// QUERY FIND ALL USERS /////////////
  @Query(() => [User], { nullable: true })
  async Users(): Promise<User[]> {
    const Users = await dataSource.getRepository(User).find({
      relations: ["comments", "pictures"],
    });
    return Users;
  }
  ///////// QUERY FIND ONE USERS /////////////
  @Query(() => User, { nullable: true })
  async user(@Arg("id", () => ID) id: number): Promise<User | null> {
    const user = await dataSource
      .getRepository(User)
      .findOne({ where: { id }, relations: ["comments"] });
    return user;
  }
  ///////// MUTATION CREATE USER /////////////
  @Mutation(() => User)
  async createUser(@Arg("data") data: UserInput): Promise<User> {
    return await dataSource.getRepository(User).save(data);
  }
  ///////// MUTATION DELETE USER /////////////
  @Mutation(() => User, { nullable: true })
  async deleteUser(@Arg("id", () => ID) id: number): Promise<User | null> {
    const deleteUser = await dataSource
      .getRepository(User)
      .findOne({ where: { id } });
    if (!deleteUser) {
      return null;
    }
    return await dataSource.getRepository(User).remove(deleteUser);
  }
  ///////// MUTATION DELETE USERS/////////////
  @Mutation(() => [User], { nullable: true })
  async deleteUsers(): Promise<User[] | null> {
    const deleteUsers = await dataSource.getRepository(User).find({});
    if (!deleteUsers) {
      return null;
    }
    return await dataSource.getRepository(User).remove(deleteUsers);
  }
}
