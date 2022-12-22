import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ObjectType, Field, ID, InputType } from "type-graphql";
import { User } from "./User";
import { PointOfInterest } from "./PointOfInterest";

@Entity()
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { nullable: true })
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  comment: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  note: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  created_at: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  updated_at: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  userId: number;

  // @Column()
  // @Field()
  // created_by: User;

  // @Column({ nullable: true })
  // @Field({ nullable: true })
  // updated_by: User;

  @ManyToOne(() => User, (user) => user.comments, { nullable: true })
  @Field(() => User, { nullable: true })
  user: User;

  @ManyToOne(
    () => PointOfInterest,
    (pointOfInterest) => pointOfInterest.comments,
    { nullable: true }
  )
  @Field(() => [PointOfInterest], { nullable: true })
  pointOfInterest: PointOfInterest;
}

@InputType()
export class CommentInput {
  @Field({ nullable: true })
  userId: number;

  @Field({ nullable: true })
  comment: string;

  @Field({ nullable: true })
  note: number;

  @Field({ nullable: true })
  created_at: Date;

  @Field({ nullable: true })
  updated_at: Date;

  // @Field()
  // created_by: Date;

  // @Field({ nullable: true })
  // updated_by: Date;
}
