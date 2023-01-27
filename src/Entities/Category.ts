import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from "typeorm";
import { ObjectType, Field, ID, InputType } from "type-graphql";
import { User } from "./User";
import { PointOfInterest } from "./PointOfInterest";
import { CreateDateColumn } from "typeorm/decorator/columns/CreateDateColumn";
import { UpdateDateColumn } from "typeorm/decorator/columns/UpdateDateColumn";

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

  @CreateDateColumn({ nullable: true })
  @Field({ nullable: true })
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
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

  @ManyToMany(
    () => PointOfInterest,
    (pointOfInterest) => pointOfInterest.categories,
    { nullable: true }
  )
  @Field(() => [PointOfInterest], { nullable: true })
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
