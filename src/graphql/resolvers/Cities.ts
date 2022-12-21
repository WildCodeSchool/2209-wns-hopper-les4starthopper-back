import { Query, Arg, Resolver, Mutation, ID } from "type-graphql";
import { DeleteResult } from "typeorm";
import { City, CityInput } from "../../Entities/City";
import dataSource from "../../utils";

@Resolver()
export class CityResolver {
  ///////// QUERY FIND ALL CITIES /////////////
  @Query(() => [City], { nullable: true })
  async Cities(): Promise<City[]> {
    const Cities = await dataSource.getRepository(City).find({
      relations: ["user", "pointOfInterests"],
    });
    return Cities;
  }
  ///////// QUERY FIND ONE CITY /////////////
  @Query(() => City, { nullable: true })
  async city(@Arg("id", () => ID) id: number): Promise<City | null> {
    const city = await dataSource
      .getRepository(City)
      .findOne({ where: { id } });
    return city;
  }
  ///////// MUTATION CREATE CITY /////////////
  @Mutation(() => City)
  async createCity(@Arg("data") data: CityInput): Promise<City> {
    return await dataSource.getRepository(City).save(data);
  }
  ///////// MUTATION DELETE CITY /////////////
  @Mutation(() => City, { nullable: true })
  async deleteCity(
    @Arg("id", () => ID) id: number
  ): Promise<DeleteResult | null> {
    return await dataSource
      .getRepository(City)
      .createQueryBuilder("cities")
      .delete()
      .from(City)
      .where("id = :id", { id })
      .execute();
  }
  ///////// MUTATION DELETE CITIES/////////////
  @Mutation(() => City, { nullable: true })
  async deleteCities(): Promise<DeleteResult | null> {
    return await dataSource
      .getRepository(City)
      .createQueryBuilder("cities")
      .delete()
      .from(City)
      .execute();
  }
}
