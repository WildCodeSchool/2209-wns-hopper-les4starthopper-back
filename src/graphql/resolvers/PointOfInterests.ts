import { Query, Arg, Resolver, Mutation, ID, Authorized } from "type-graphql";
import { DeleteResult } from "typeorm";
import { Category } from "../../Entities/Category";
import {
  PointOfInterest,
  PointOfInterestInput,
} from "../../Entities/PointOfInterest";
import dataSource from "../../utils";
import { pointOfInterestRelations } from "../../utils/relations";

@Resolver()
export class PointOfInterestResolver {
  ///////// QUERY FIND ALL PointOfinterests /////////////
  @Authorized()
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
  @Authorized()
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
  @Authorized([1])
  @Mutation(() => PointOfInterest)
  async createPointOfInterest(
    @Arg("data") data: PointOfInterestInput,
    @Arg("categoryId") categoryId: number
  ): Promise<PointOfInterest> {
    const category: any = await dataSource
      .getRepository(Category)
      .findOne({ where: { id: categoryId } });
    const datas = { ...data, categories: [category] };
    return await dataSource.getRepository(PointOfInterest).save(datas);
  }
  ///////// MUTATION DELETE POINT IF INTEREST /////////////
  @Authorized([1])
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
  @Authorized([1])
  @Mutation(() => PointOfInterest, { nullable: true })
  async updatePointOfInterest(
    @Arg("id", () => ID) id: number,
    @Arg("data") data: PointOfInterestInput
  ): Promise<PointOfInterest | null> {
    const updatePointOfInterest = await dataSource
      .getRepository(PointOfInterest)
      .findOne({ where: { id } });
    if (updatePointOfInterest === null) {
      return null;
    }
    if (data.description != null) {
      updatePointOfInterest.description = data.description;
    }
    updatePointOfInterest.updatedById = data.updatedById;
    return await dataSource
      .getRepository(PointOfInterest)
      .save(updatePointOfInterest);
  }

  ///////// MUTATION DELETE POINT OF INTEREST/////////////
  @Authorized([1])
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
