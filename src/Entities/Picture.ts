import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ObjectType, Field, ID, InputType } from "type-graphql";
import { User } from "./User";
import { PointOfInterest } from "./PointOfInterest";

@Entity()
@ObjectType()
export class Picture {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { nullable: true })
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  url: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  pointOfInterestId: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  userId: number;

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

  @ManyToOne(() => User, (user) => user.pictures, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @Field(() => User, { nullable: true })
  user: User;

  @ManyToOne(
    () => PointOfInterest,
    (pointOfInterest) => pointOfInterest.pictures,
    { nullable: true, onDelete: "CASCADE" }
  )
  @Field(() => PointOfInterest, { nullable: true })
  pointOfInterest: PointOfInterest;
}

@InputType()
export class PictureInput {
  @Field({ nullable: true })
  url: string;

  @Field({ nullable: true })
  userId: number;

  @Field({ nullable: true })
  pointOfInterestId: number;

  @Field({ nullable: true })
  created_at: Date;

  @Field({ nullable: true })
  updated_at: Date;

  // @Field()
  // created_by: Date;

  // @Field({ nullable: true })
  // updated_by: Date;
}
