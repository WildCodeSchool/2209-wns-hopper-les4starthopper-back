import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field, ID, InputType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { Comment } from "./Comment";
import { Picture } from "./Picture";
import { Category } from "./Category";
import { PointOfInterest } from "./PointOfInterest";
import { City } from "./City";

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { nullable: true })
  id: number;

  @Column({ unique: true })
  @Field({ nullable: true })
  email: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  password: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  role: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  created_at: Date;

  // @Column({ nullable: true })
  // @Field({ nullable: true })
  // created_by: User;

  @Column({ nullable: true })
  @Field({ nullable: true })
  updated_at: Date;

  // @Column({ nullable: true })
  // @Field({ nullable: true })
  // updated_by: User;

  @OneToMany(() => Comment, (comment) => comment.user, { nullable: true })
  @Field(() => [Comment], { nullable: true })
  comments: Comment[];
  @TypeormLoader((comments: Comment) => comments.userId, { selfKey: true })
  userComments: Comment[];

  @OneToMany(() => Picture, (picture) => picture.user, { nullable: true })
  @Field(() => [Picture], { nullable: true })
  pictures: Picture[];

  @OneToMany(() => Category, (category) => category.user, { nullable: true })
  @Field(() => [Category], { nullable: true })
  categories: Category[];

  @OneToMany(() => PointOfInterest, (pointOfInterest) => pointOfInterest.user, {
    nullable: true,
  })
  @Field(() => [PointOfInterest], { nullable: true })
  pointOfInterests: PointOfInterest[];

  @OneToMany(() => City, (city) => city.user, { nullable: true })
  @Field(() => [City], { nullable: true })
  cities: City[];
}

@InputType()
export class UserInput {
  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  role: number;

  @Field({ nullable: true })
  created_at: Date;

  @Field({ nullable: true })
  updated_at: Date;

  @Field({ nullable: true })
  created_by: Date;

  @Field({ nullable: true })
  updated_by: Date;
}
