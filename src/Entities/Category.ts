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
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  icon: string;

  @Column()
  @Field()
  created_at: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  updated_at: Date;

  @Column()
  @Field()
  created_by: User;

  @Column({ nullable: true })
  @Field({ nullable: true })
  updated_by: User;

  @ManyToOne(() => User, (user) => user.categories)
  @Field(() => User)
  user: User;

  @ManyToMany(() => PointOfInterest)
  @JoinTable()
  pointofInterests: PointOfInterest[];
}

@InputType()
export class CommentInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  icon: string;

  @Field()
  created_at: Date;

  @Field({ nullable: true })
  updated_at: Date;

  @Field()
  created_by: User;

  @Field({ nullable: true })
  updated_by: User;
}
