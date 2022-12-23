import { Query, Arg, Resolver, Mutation, ID } from "type-graphql";
import { DeleteResult } from "typeorm";
import { Comment, CommentInput } from "../../Entities/Comment";
import dataSource from "../../utils";

@Resolver()
export class CommentResolver {
  ///////// QUERY FIND ALL COMMENTS /////////////
  @Query(() => [Comment], { nullable: true })
  async Comments(): Promise<Comment[]> {
    const Comments = await dataSource.getRepository(Comment).find({
      relations: { user: true },
    });
    return Comments;
  }
  ///////// QUERY FIND ONE COMMENT /////////////
  @Query(() => Comment, { nullable: true })
  async Comment(@Arg("id", () => ID) id: number): Promise<Comment | null> {
    const comment = await dataSource
      .getRepository(Comment)
      .findOne({ where: { id }, relations: { user: true } });
    return comment;
  }
  ///////// MUTATION CREATE COMMENT /////////////
  @Mutation(() => Comment)
  async createComment(@Arg("data") data: CommentInput): Promise<Comment> {
    return await dataSource.getRepository(Comment).save(data);
  }

  ///////// MUTATION UPDATE COMMENT /////////////
  @Mutation(() => Comment, { nullable: true })
  async updateComment(
    @Arg("id", () => ID) id: number,
    @Arg("note") note: number,
    @Arg("comment") comment: string
  ): Promise<Comment | null> {
    const updateComment = await dataSource
      .getRepository(Comment)
      .findOne({ where: { id } });
    if (updateComment === null) {
      return null;
    }
    if (note != null || comment != null) {
      updateComment.note = note;
      updateComment.comment = comment;
    }
    return await dataSource.getRepository(Comment).save(updateComment);
  }

  ///////// MUTATION DELETE COMMENT /////////////
  @Mutation(() => Comment, { nullable: true })
  async deleteComment(
    @Arg("id", () => ID) id: number
  ): Promise<DeleteResult | null> {
    return await dataSource
      .getRepository(Comment)
      .createQueryBuilder("Comments")
      .delete()
      .from(Comment)
      .where("id = :id", { id })
      .execute();
  }
  ///////// MUTATION DELETE COMMENTS /////////////
  @Mutation(() => Comment, { nullable: true })
  async deleteComments(): Promise<DeleteResult | null> {
    return await dataSource
      .getRepository(Comment)
      .createQueryBuilder("Comments")
      .delete()
      .from(Comment)
      .execute();
  }
}
