import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { ObjectType, Field, ID, InputType } from "type-graphql";
import { User } from "./User";
import { PointOfInterest } from "./PointOfInterest";

@Entity()
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { nullable: true })
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  userId: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  icon: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  created_at: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  updated_at: Date;

  // @Column()
  // @Field()
  // created_by: User;

  // @Column({ nullable: true })
  // @Field({ nullable: true })
  // updated_by: User;

  @ManyToOne(() => User, (user) => user.categories, { nullable: true })
  @Field(() => User, { nullable: true })
  user: User;

  @ManyToMany(() => PointOfInterest, { nullable: true })
  @JoinTable()
  pointOfInterests: PointOfInterest[];
}

@InputType()
export class CategoryInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  userId: number;

  @Field({ nullable: true })
  icon: string;

  @Field({ nullable: true })
  created_at: Date;

  @Field({ nullable: true })
  updated_at: Date;

  // @Field()
  // created_by: User;

  // @Field({ nullable: true })
  // updated_by: User;
}
