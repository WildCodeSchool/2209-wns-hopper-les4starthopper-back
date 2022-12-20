import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { ObjectType, Field, ID, InputType } from "type-graphql";
import { User } from "./User";
import { PointOfInterest } from "./PointOfInterest";

@Entity()
@ObjectType()
export class City {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  latitude: number;

  @Column()
  @Field()
  longitude: number;

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

  @ManyToOne(() => User, (user) => user.cities)
  @Field(() => User)
  user: User;

  @OneToMany(() => PointOfInterest, (pointOfInterest) => pointOfInterest.city)
  @Field(() => [PointOfInterest])
  pointOfInterests: PointOfInterest[];
}

@InputType()
export class CommentInput {
  @Field()
  name: string;

  @Field()
  latitude: number;

  @Field()
  longitude: number;

  @Field()
  created_at: Date;

  @Field({ nullable: true })
  updated_at: Date;

  @Field()
  created_by: Date;

  @Field({ nullable: true })
  updated_by: Date;
}
