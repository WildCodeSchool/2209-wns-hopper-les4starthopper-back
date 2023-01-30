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
import { CreateDateColumn } from "typeorm/decorator/columns/CreateDateColumn";
import { UpdateDateColumn } from "typeorm/decorator/columns/UpdateDateColumn";

@Entity()
@ObjectType()
export class City {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { nullable: true })
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  latitude: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  longitude: string;

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

  @ManyToOne(() => User, (user) => user.cities, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @Field(() => User, { nullable: true })
  createdBy: User;

  @ManyToOne(() => User, (user) => user.cities, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @Field(() => User, { nullable: true })
  updatedBy: User;

  @OneToMany(() => PointOfInterest, (pointOfInterest) => pointOfInterest.city, {
    nullable: true,
  })
  @Field(() => [PointOfInterest], { nullable: true })
  pointOfInterests: PointOfInterest[];
}

@InputType()
export class CityInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  userId: number;

  @Field({ nullable: true })
  createdById: number;

  @Field({ nullable: true })
  updatedById: number;

  @Field({ nullable: true })
  latitude: string;

  @Field({ nullable: true })
  longitude: string;

  @Field({ nullable: true })
  created_at: Date;

  @Field({ nullable: true })
  updated_at: Date;
}
