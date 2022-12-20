import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { ObjectType, Field, ID, InputType } from "type-graphql";
import { User } from "./User";
import { Comment } from "./Comment";
import { Picture } from "./Picture";
import { City } from "./City";
import { Category } from "./Category";

@Entity()
@ObjectType()
export class PointOfInterest {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;

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

  @ManyToOne(() => User, (user) => user.pointOfInterests)
  @Field(() => User)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.pointOfInterest)
  @Field(() => [Comment])
  comments: Comment[];

  @OneToMany(() => Picture, (picture) => picture.pointOfInterest)
  @Field(() => [Picture])
  pictures: Picture[];

  @ManyToOne(() => City, (city) => city.pointOfInterests)
  @Field(() => [City])
  city: City;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}

@InputType()
export class CommentInput {
  @Field()
  name: string;

  @Field()
  description: string;

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
