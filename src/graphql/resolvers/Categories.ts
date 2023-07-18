import { Query, Arg, Resolver, Mutation, ID, Authorized } from "type-graphql";
import { DeleteResult } from "typeorm";
import { Category, CategoryInput } from "../../Entities/Category";
import dataSource from "../../utils";
import { categoriesRelations } from "../../utils/relations";

@Resolver()
export class CategoryResolver {
  ///////// QUERY FIND ALL Categories /////////////
  // @Authorized()
  @Query(() => [Category], { nullable: true })
  async Categories(): Promise<Category[]> {
    const Categories = await dataSource.getRepository(Category).find({
      relations: categoriesRelations,
    });
    return Categories;
  }
  ///////// QUERY FIND ONE CATEGORY /////////////
  // @Authorized()
  @Query(() => Category, { nullable: true })
  async category(@Arg("id", () => ID) id: number): Promise<Category | null> {
    const category = await dataSource
      .getRepository(Category)
      .findOne({ where: { id }, relations: categoriesRelations });
    return category;
  }
  ///////// MUTATION CREATE CATEGORY /////////////
  // @Authorized([1])
  @Mutation(() => Category)
  async createCategory(@Arg("data") data: CategoryInput): Promise<Category> {
    return await dataSource.getRepository(Category).save(data);
  }
  ///////// MUTATION UPDATE CATEGORY/////////////
  @Mutation(() => Category, { nullable: true })
  // @Authorized([1])
  async updateCategory(
    @Arg("id", () => ID) id: number,
    @Arg("data") data: CategoryInput
  ): Promise<Category | null> {
    const updateCategory = await dataSource
      .getRepository(Category)
      .findOne({ where: { id } });
    if (updateCategory === null) {
      return null;
    }
    if (data.icon != null && data.name != null) {
      updateCategory.icon = data.icon;
      updateCategory.name = data.name;
    }
    updateCategory.updatedById = data.updatedById;
    return await dataSource.getRepository(Category).save(updateCategory);
  }

  ///////// MUTATION DELETE CATEGORY /////////////
  // @Authorized([1])
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
  // @Authorized([1])
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
