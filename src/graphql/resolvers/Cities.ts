import { Query, Arg, Resolver, Mutation, ID, Authorized } from "type-graphql";
import { DeleteResult } from "typeorm";
import { City, CityInput } from "../../Entities/City";
import dataSource from "../../utils";
import { citiesRelation } from "../../utils/relations";
import { removeAccents } from "../../utils/utils";
@Resolver()
export class CityResolver {
  ///////// QUERY FIND ALL CITIES /////////////
  @Authorized()
  @Query(() => [City], { nullable: true })
  async Cities(): Promise<City[]> {
    const Cities = await dataSource.getRepository(City).find({
      relations: citiesRelation,
    });
    return Cities;
  }
  ///////// QUERY FIND ONE CITY /////////////
  @Authorized()
  @Query(() => City, { nullable: true })
  async city(@Arg("id", () => ID) id: number): Promise<City | null> {
    const city = await dataSource
      .getRepository(City)
      .findOne({ where: { id }, relations: citiesRelation });
    return city;
  }
  //////////  QUERY CITY BY NAME //////////
  @Authorized()
  @Query(() => City, { nullable: true })
  async cityByName(@Arg("name") name: string): Promise<City | null> {
    const lowerCaseName = removeAccents(name.toLowerCase());
    const city = await dataSource.getRepository(City).findOne({
      where: { name: lowerCaseName },
      relations: citiesRelation,
    });
    return city;
  }
  ///////// MUTATION CREATE CITY /////////////
  @Authorized([1])
  @Mutation(() => City)
  async createCity(@Arg("data") data: CityInput): Promise<City> {
    let datas: CityInput = {
      ...data,
      name: removeAccents(data.name.toLowerCase()),
    };
    return await dataSource.getRepository(City).save(datas);
  }
  ////////// MUTATION UPDATE CITY //////////
  @Authorized([1])
  @Mutation(() => City, { nullable: true })
  async updateCity(
    @Arg("id", () => ID) id: number,
    @Arg("data") data: CityInput
  ): Promise<City | null> {
    const updateCity = await dataSource
      .getRepository(City)
      .findOne({ where: { id } });
    if (updateCity === null) {
      return null;
    }
    if (data.name != null || data.longitude != null || data.latitude != null) {
      updateCity.name = removeAccents(data.name.toLowerCase());
      updateCity.longitude = data.longitude;
      updateCity.latitude = data.latitude;
    }
    updateCity.updatedById = data.updatedById;
    return await dataSource.getRepository(City).save(updateCity);
  }
  ///////// MUTATION DELETE CITY /////////////
  @Authorized([1])
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
  @Authorized([1])
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
