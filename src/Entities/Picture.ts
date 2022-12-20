import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ObjectType, Field, ID, InputType } from "type-graphql";
import { User } from "./User";
import { PointOfInterest } from "./PointOfInterest";

@Entity()
@ObjectType()
export class Picture {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  name: string;

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

  @ManyToOne(() => User, (user) => user.pictures)
  @Field(() => User)
  user: User;

  @ManyToOne(
    () => PointOfInterest,
    (pointOfInterest) => pointOfInterest.pictures
  )
  @Field(() => [PointOfInterest])
  pointOfInterest: PointOfInterest;
}

@InputType()
export class CommentInput {
  @Field()
  name: string;

  @Field()
  created_at: Date;

  @Field({ nullable: true })
  updated_at: Date;

  @Field()
  created_by: Date;

  @Field({ nullable: true })
  updated_by: Date;
}
