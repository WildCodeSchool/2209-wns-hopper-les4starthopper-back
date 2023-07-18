import { ObjectType, Field, Int } from "type-graphql";
import { User } from "../../Entities/User";

@ObjectType()
class PaginationMetadata {
    @Field(() => Int)
    totalItems: number;

    @Field(() => Int)
    totalPages: number;

    @Field(() => Int)
    currentPage: number;
}

@ObjectType()
export default class UserPagination {
    @Field(() => [User])
    items: User[];

    // @Field(() => Int)
    // totalItems: number;

    // @Field(() => Int)
    // totalPages: number;

    // @Field(() => Int)
    // currentPage: number;

    @Field(() => PaginationMetadata)
    pagination: PaginationMetadata;
};
