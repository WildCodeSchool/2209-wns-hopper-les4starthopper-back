import { Query, Arg, Resolver, Mutation, ID } from "type-graphql";
import { DeleteResult } from "typeorm";
import {
  PointOfInterest,
  PointOfInterestInput,
} from "../../Entities/PointOfInterest";
import dataSource from "../../utils";
import { pointOfInterestRelations } from "../../utils/relations";

@Resolver()
export class PointOfInterestResolver {
  ///////// QUERY FIND ALL PointOfinterests /////////////
  @Query(() => [PointOfInterest], { nullable: true })
  async PointOfinterests(): Promise<PointOfInterest[]> {
    const PointOfinterests = await dataSource
      .getRepository(PointOfInterest)
      .find({
        relations: pointOfInterestRelations,
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
      .findOne({ where: { id }, relations: pointOfInterestRelations });
    return pointOfInterest;
  }
  ///////// MUTATION CREATE POINT OF INTEREST /////////////
  @Mutation(() => PointOfInterest)
  async createPointOfInterest(
    @Arg("data") data: PointOfInterestInput
  ): Promise<PointOfInterest> {
    return await dataSource.getRepository(PointOfInterest).save(data);
  }
  ///////// MUTATION DELETE POINT IF INTEREST /////////////
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

  ///////// MUTATION UPDATE POINT OF INTEREST/////////////
  @Mutation(() => PointOfInterest, { nullable: true })
  async updatePointOfInterest(
    @Arg("id", () => ID) id: number,
    @Arg("description") description: string
  ): Promise<PointOfInterest | null> {
    const updatePointOfInterest = await dataSource
      .getRepository(PointOfInterest)
      .findOne({ where: { id } });
    if (updatePointOfInterest === null) {
      return null;
    }
    if (description != null) {
      updatePointOfInterest.description = description;
    }
    return await dataSource
      .getRepository(PointOfInterest)
      .save(updatePointOfInterest);
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
