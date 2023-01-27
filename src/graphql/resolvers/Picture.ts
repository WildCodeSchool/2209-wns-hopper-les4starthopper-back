import { Query, Arg, Resolver, Mutation, ID } from "type-graphql";
import { DeleteResult } from "typeorm";
import { Picture, PictureInput } from "../../Entities/Picture";
import dataSource from "../../utils";
import { picturesRelation } from "../../utils/relations";

@Resolver()
export class PictureResolver {
  @Query(() => [Picture], { nullable: true })
  async pictures(): Promise<Picture[]> {
    const pictures = await dataSource.getRepository(Picture).find({
      relations: picturesRelation,
    });
    return pictures;
  }

  @Query(() => Picture, { nullable: true })
  async pictureByPOIId(
    @Arg("pointOfInterestId") pointOfInterestId: number
  ): Promise<Picture | null> {
    const pictureByPOIId = await dataSource.getRepository(Picture).findOne({
      where: { pointOfInterestId },
      relations: picturesRelation,
    });
    return pictureByPOIId;
  }

  @Mutation(() => Picture, { nullable: true })
  async uploadPicture(
    @Arg("data") data: PictureInput
  ): Promise<Picture | null> {
    return await dataSource.getRepository(Picture).save(data);
  }

  @Mutation(() => Picture)
  async deletePictures(): Promise<DeleteResult | null> {
    return await dataSource
      .getRepository(Picture)
      .createQueryBuilder("pictures")
      .delete()
      .from(Picture)
      .execute();
  }
}
