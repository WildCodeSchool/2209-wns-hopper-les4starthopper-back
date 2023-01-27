import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { ObjectType, Field, ID, InputType } from "type-graphql";
import { User } from "./User";
import { Comment } from "./Comment";
import { Picture } from "./Picture";
import { City } from "./City";
import { Category } from "./Category";

@Entity()
@ObjectType()
export class PointOfInterest {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { nullable: true })
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  latitude: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  longitude: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  created_at: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  updated_at: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  cityId: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  userId: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  adress: string;

  // @Column()
  // @Field()
  // created_by: User;

  // @Column({ nullable: true })
  // @Field({ nullable: true })
  // updated_by: User;

  @ManyToOne(() => User, (user) => user.pointOfInterests, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @Field(() => User, { nullable: true })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.pointOfInterest, {
    onDelete: "CASCADE",
    nullable: true,
  })
  @Field(() => [Comment], { nullable: true })
  comments: Comment[];

  @OneToMany(() => Picture, (picture) => picture.pointOfInterest, {
    nullable: true,
  })
  @Field(() => [Picture], { nullable: true })
  pictures: Picture[];

  @ManyToOne(() => City, (city) => city.pointOfInterests, {
    onDelete: "CASCADE",
    nullable: true,
  })
  @Field(() => City, { nullable: true })
  city: City;

  @ManyToMany(() => Category, (category) => category.pointOfInterests, {
    cascade: true,
    nullable: true,
  })
  @JoinTable()
  @Field(() => [Category], { nullable: true })
  categories: Category[];
}

@InputType()
export class PointOfInterestInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  adress: string;

  @Field({ nullable: true })
  userId: number;

  @Field({ nullable: true })
  cityId: number;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  latitude: string;

  @Field({ nullable: true })
  longitude: string;

  @Field({ nullable: true })
  created_at: Date;

  @Field({ nullable: true })
  updated_at: Date;
}

@InputType()
export class CategoriesPOIInput {
  @Field({ nullable: true })
  categoriesId: number;
}
