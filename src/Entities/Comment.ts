import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ObjectType, Field, ID, InputType } from "type-graphql";
import { User } from "./User";
import { PointOfInterest } from "./PointOfInterest";
import { CreateDateColumn } from "typeorm/decorator/columns/CreateDateColumn";
import { UpdateDateColumn } from "typeorm/decorator/columns/UpdateDateColumn";

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

  @CreateDateColumn({ nullable: true })
  @Field({ nullable: true })
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  @Field({ nullable: true })
  updated_at: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  userId: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  createdById: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  updatedById: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  pointOfInterestId: number;

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: "CASCADE",
    nullable: true,
  })
  @Field(() => User, { nullable: true })
  createdBy: User;

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: "CASCADE",
    nullable: true,
  })
  @Field(() => User, { nullable: true })
  updatedBy: User;

  @ManyToOne(
    () => PointOfInterest,
    (pointOfInterest) => pointOfInterest.comments,
    { nullable: true, onDelete: "CASCADE" }
  )
  @Field(() => PointOfInterest, { nullable: true })
  pointOfInterest: PointOfInterest;
}

@InputType()
export class CommentInput {
  @Field({ nullable: true })
  userId: number;

  @Field({ nullable: true })
  createdById: number;

  @Field({ nullable: true })
  updatedById: number;

  @Field({ nullable: true })
  pointOfInterestId: number;

  @Field({ nullable: true })
  comment: string;

  @Field({ nullable: true })
  note: number;

  @Field({ nullable: true })
  created_at: Date;

  @Field({ nullable: true })
  updated_at: Date;
}
