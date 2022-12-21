import { Query, Arg, Resolver, Mutation, ID } from "type-graphql";
import { DeleteResult } from "typeorm";
import {
  PointOfInterest,
  PointOfInterestInput,
} from "../../Entities/PointOfInterest";
import dataSource from "../../utils";

@Resolver()
export class PointOfInterestResolver {
  ///////// QUERY FIND ALL PointOfinterests /////////////
  @Query(() => [PointOfInterest], { nullable: true })
  async PointOfinterests(): Promise<PointOfInterest[]> {
    const PointOfinterests = await dataSource
      .getRepository(PointOfInterest)
      .find({
        relations: ["user", "pictures", "comments", "categories", "city"],
      });
    return PointOfinterests;
  }
  ///////// QUERY FIND ONE PointOfInterest /////////////
  @Query(() => PointOfInterest, { nullable: true })
  async pointOfInterest(
    @Arg("id", () => ID) id: number
  ): Promise<PointOfInterest | null> {
    const pointOfInterest = await dataSource
      .getRepository(PointOfInterest)
      .findOne({ where: { id } });
    return pointOfInterest;
  }
  ///////// MUTATION CREATE CATEGORY /////////////
  @Mutation(() => PointOfInterest)
  async createPointOfInterest(
    @Arg("data") data: PointOfInterestInput
  ): Promise<PointOfInterest> {
    return await dataSource.getRepository(PointOfInterest).save(data);
  }
  ///////// MUTATION DELETE CATEGORY /////////////
  @Mutation(() => PointOfInterest, { nullable: true })
  async deletePointOfInterest(
    @Arg("id", () => ID) id: number
  ): Promise<DeleteResult | null> {
    return await dataSource
      .getRepository(PointOfInterest)
      .createQueryBuilder("pointOfInterests")
      .delete()
      .from(PointOfInterest)
      .where("id = :id", { id })
      .execute();
  }
  ///////// MUTATION DELETE POINT OF INTEREST/////////////
  @Mutation(() => PointOfInterest, { nullable: true })
  async deletePointOfinterests(): Promise<DeleteResult | null> {
    return await dataSource
      .getRepository(PointOfInterest)
      .createQueryBuilder("pointOfInterests")
      .delete()
      .from(PointOfInterest)
      .execute();
  }
}
