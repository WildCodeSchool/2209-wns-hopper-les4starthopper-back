import {
  Query,
  Arg,
  Resolver,
  Mutation,
  ID,
  Ctx,
  Authorized,
} from "type-graphql";
import { DeleteResult } from "typeorm";
import { User, UserInput } from "../../Entities/User";
import dataSource from "../../utils";
import { hash, verify } from "argon2";
import { usersRelations } from "../../utils/relations";
import { sign, verify as jwtVerify } from "jsonwebtoken";
import { IContext } from "../auth";

import env from "../../env";

@Resolver()
export class UserResolver {
  ///////// QUERY FIND ALL USERS /////////////
  @Authorized([1])
  @Query(() => [User], { nullable: true })
  async FindAllUsers(): Promise<User[]> {
    return await dataSource.getRepository(User).find({
      relations: usersRelations,
    });
  }

  ///////// QUERY FIND ONE USER /////////////
  @Authorized([1])
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

  ///////////// MUTATION SIGNIN //////////////
  @Mutation(() => String, { nullable: true })
  async signin(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<string | null> {
    try {
      const user = await dataSource
        .getRepository(User)
        .findOne({ where: { email } });
      if (!user) {
        return null;
      }
      if (await verify(user.password, password)) {

        const token = sign({ userId: user.id, userRole: user.role }, 'supersecret', {
          expiresIn: "2h",
        });
        return token;
      } else {
        return null;
      }
    } catch {
      return null;
    }
  }

  ///////// QUERY FIND USER CONNECTED /////////////
  @Authorized()
  @Query(() => User, { nullable: true })
  async GetMe(@Ctx() context: IContext): Promise<User | null> {
    return context.user;
  }

  ///////// MUTATION DELETE USER /////////////
  @Authorized([1])
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
  @Authorized()
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
  @Authorized([1])
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
