import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field, ID, InputType } from "type-graphql";
import { Comment } from "./Comment";
import { Picture } from "./Picture";
import { Category } from "./Category";
import { PointOfInterest } from "./PointOfInterest";
import { City } from "./City";

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column()
  @Field()
  role: number;

  @Column()
  @Field()
  created_at: Date;

  @Column()
  @Field()
  created_by: User;

  @Column({ nullable: true })
  @Field({ nullable: true })
  updated_at: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  updated_by: User;

  @OneToMany(() => Comment, (comment) => comment.user)
  @Field(() => [Comment])
  comments: Comment[];

  @OneToMany(() => Picture, (picture) => picture.user)
  @Field(() => [Picture])
  pictures: Picture[];

  @OneToMany(() => Category, (category) => category.user)
  @Field(() => [Category])
  categories: Category[];

  @OneToMany(() => PointOfInterest, (pointOfInterest) => pointOfInterest.user)
  @Field(() => [PointOfInterest])
  pointOfInterests: PointOfInterest[];

  @OneToMany(() => City, (city) => city.user)
  @Field(() => [City])
  cities: City[];
}

@InputType()
export class CommentInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  role: number;

  @Field()
  created_at: Date;

  @Field({ nullable: true })
  updated_at: Date;

  @Field()
  created_by: Date;

  @Field({ nullable: true })
  updated_by: Date;
}
