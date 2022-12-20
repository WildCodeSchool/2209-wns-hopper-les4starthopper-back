import { User } from "./models/User";
import { DataSource } from "typeorm";
import { Comment } from "./Entities/Comment";
import { PointOfInterest } from "./Entities/PointOfInterest";
import { Picture } from "./Entities/Picture";
import { City } from "./Entities/City";
import { Category } from "./Entities/Category";

const datasource = new DataSource({
  type: "postgres",
  host: "db",
  username: "postgres",
  password: "supersecret",
  database: "postgres",
  synchronize: true,
  entities: [User, Comment, PointOfInterest, Picture, City, Category],
  logging: ["query", "error"],
});
export default datasource;
