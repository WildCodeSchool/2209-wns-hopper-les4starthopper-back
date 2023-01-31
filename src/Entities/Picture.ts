import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ObjectType, Field, ID, InputType } from "type-graphql";
import { User } from "./User";
import { PointOfInterest } from "./PointOfInterest";
import { CreateDateColumn } from "typeorm/decorator/columns/CreateDateColumn";
import { UpdateDateColumn } from "typeorm/decorator/columns/UpdateDateColumn";

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
  createdById: number;

  @CreateDateColumn({ nullable: true })
  @Field({ nullable: true })
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  @Field({ nullable: true })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.pictures, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @Field(() => User, { nullable: true })
  createdBy: User;

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
  createdById: number;

  @Field({ nullable: true })
  userId: number;

  @Field({ nullable: true })
  pointOfInterestId: number;

  @Field({ nullable: true })
  created_at: Date;

  @Field({ nullable: true })
  updated_at: Date;
}
