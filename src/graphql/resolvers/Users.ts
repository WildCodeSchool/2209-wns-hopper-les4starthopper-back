import { Query, Arg, Resolver, Mutation, ID } from "type-graphql";
import { DeleteResult } from "typeorm";
import { User, UserInput } from "../../Entities/User";
import dataSource from "../../utils";
import { hash } from "argon2";
import { usersRelations } from "../../utils/relations";

@Resolver()
export class UserResolver {
  ///////// QUERY FIND ALL USERS /////////////
  @Query(() => [User], { nullable: true })
  async FindAllUsers(): Promise<User[]> {
    const Users = await dataSource.getRepository(User).find({
      relations: usersRelations,
    });
    return Users;
  }
  ///////// QUERY FIND ONE USER /////////////
  @Query(() => User, { nullable: true })
  async FindUser(@Arg("id", () => ID) id: number): Promise<User | null> {
    const user = await dataSource
      .getRepository(User)
      .findOne({ where: { id }, relations: usersRelations });
    return user;
  }
  ///////// MUTATION CREATE USER /////////////
  @Mutation(() => User)
  async createUser(@Arg("data") data: UserInput): Promise<User> {
    data.password = await hash(data.password);
    return await dataSource.getRepository(User).save(data);
  }
  ///////// MUTATION DELETE USER /////////////
  @Mutation(() => User, { nullable: true })
  async deleteUser(
    @Arg("id", () => ID) id: number
  ): Promise<DeleteResult | null> {
    return await dataSource
      .getRepository(User)
      .createQueryBuilder("users")
      .delete()
      .from(User)
      .where("id = :id", { id })
      .execute();
  }
  ///////// MUTATION UPDATE USERS/////////////
  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg("id", () => ID) id: number,
    // @Arg("role") role: number,
    // @Arg("updatedByiD") updatedById: number,
    @Arg("data") data: UserInput
  ): Promise<User | null> {
    const updateUser = await dataSource
      .getRepository(User)
      .findOne({ where: { id } });
    if (updateUser === null) {
      return null;
    }
    if (data.role != null) {
      updateUser.role = data.role;
    }
    updateUser.updatedById = data.updatedById;
    return await dataSource.getRepository(User).save(updateUser);
  }
  ///////// MUTATION DELETE USERS/////////////
  @Mutation(() => User)
  async deleteUsers(): Promise<DeleteResult | null> {
    return await dataSource
      .getRepository(User)
      .createQueryBuilder("users")
      .delete()
      .from(User)
      .execute();
  }
}
