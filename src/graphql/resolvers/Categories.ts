import { Query, Arg, Resolver, Mutation, ID } from "type-graphql";
import { DeleteResult } from "typeorm";
import { Category, CategoryInput } from "../../Entities/Category";
import dataSource from "../../utils";

@Resolver()
export class CategoryResolver {
  ///////// QUERY FIND ALL Categories /////////////
  @Query(() => [Category], { nullable: true })
  async Categories(): Promise<Category[]> {
    const Categories = await dataSource.getRepository(Category).find({
      relations: ["user", "pointOfInterests"],
    });
    return Categories;
  }
  ///////// QUERY FIND ONE Category /////////////
  @Query(() => Category, { nullable: true })
  async category(@Arg("id", () => ID) id: number): Promise<Category | null> {
    const category = await dataSource
      .getRepository(Category)
      .findOne({ where: { id } });
    return category;
  }
  ///////// MUTATION CREATE CATEGORY /////////////
  @Mutation(() => Category)
  async createCategory(@Arg("data") data: CategoryInput): Promise<Category> {
    return await dataSource.getRepository(Category).save(data);
  }

  ///////// MUTATION UPDATE USERS/////////////
  @Mutation(() => Category, { nullable: true })
  async updateCategory(
    @Arg("id", () => ID) id: number,
    @Arg("icon") icon: string
  ): Promise<Category | null> {
    const updateCategory = await dataSource
      .getRepository(Category)
      .findOne({ where: { id } });
    if (updateCategory === null) {
      return null;
    }
    if (icon != null) {
      updateCategory.icon = icon;
    }
    return await dataSource.getRepository(Category).save(updateCategory);
  }

  ///////// MUTATION DELETE CATEGORY /////////////
  @Mutation(() => Category, { nullable: true })
  async deleteCategory(
    @Arg("id", () => ID) id: number
  ): Promise<DeleteResult | null> {
    return await dataSource
      .getRepository(Category)
      .createQueryBuilder("categories")
      .delete()
      .from(Category)
      .where("id = :id", { id })
      .execute();
  }
  ///////// MUTATION DELETE CATEGORIES/////////////
  @Mutation(() => Category, { nullable: true })
  async deleteCategories(): Promise<DeleteResult | null> {
    return await dataSource
      .getRepository(Category)
      .createQueryBuilder("categories")
      .delete()
      .from(Category)
      .execute();
  }
}
