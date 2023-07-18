import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  OneToOne,
  ManyToOne,
} from "typeorm";
import { ObjectType, Field, ID, InputType } from "type-graphql";
import { Comment } from "./Comment";
import { Picture } from "./Picture";
import { Category } from "./Category";
import { PointOfInterest } from "./PointOfInterest";
import { City } from "./City";
import { IsEmail, Matches } from "class-validator";
import { UpdateDateColumn } from "typeorm/decorator/columns/UpdateDateColumn";

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { nullable: true })
  id: number;

  @Column({ unique: true })
  @Field({ nullable: true })
  email: string;

  @Column({ unique: true })
  @Field({ nullable: true })
  username: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  password: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  role: number;

  @Column({ nullable: true })
  @Field(() => ID, { nullable: true })
  createdById: number;

  @Column({ nullable: true })
  @Field(() => ID, { nullable: true })
  updatedById: number;

  @CreateDateColumn({ nullable: true })
  @Field({ nullable: true })
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  @Field({ nullable: true })
  updated_at: Date;

  @ManyToOne(() => User)
  @Field(() => User, { nullable: true })
  createdBy: User;

  @ManyToOne(() => User)
  @Field(() => User, { nullable: true })
  updatedBy: User;

  @OneToMany(() => Comment, (comment) => comment.createdBy, { nullable: true })
  @Field(() => [Comment], { nullable: true })
  comments: Comment[];

  @OneToMany(() => Picture, (picture) => picture.createdBy, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @Field(() => [Picture], { nullable: true })
  pictures: Picture[];

  @OneToMany(() => Category, (category) => category.createdBy, {
    nullable: true,
  })
  @Field(() => [Category], { nullable: true })
  categories: Category[];

  @OneToMany(
    () => PointOfInterest,
    (pointOfInterest) => pointOfInterest.createdBy,
    {
      nullable: true,
      onDelete: "CASCADE",
    }
  )
  @Field(() => [PointOfInterest], { nullable: true })
  pointOfInterests: PointOfInterest[];

  @OneToMany(() => City, (city) => city.createdBy, { nullable: true })
  @Field(() => [City], { nullable: true })
  cities: City[];
}

@InputType()
export class UserInput {
  @Field({ nullable: true })
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  username: string;

  @Field({ nullable: true })
  // 1 maj ... 8 caractères minimum
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,64}$/)
  password: string;

  @Field({ nullable: true })
  role: number;

  @Field({ nullable: true })
  created_at: Date;

  @Field({ nullable: true })
  createdById: number;

  @Field({ nullable: true })
  updatedById: number;

  @Field({ nullable: true })
  updated_at: Date;
}

