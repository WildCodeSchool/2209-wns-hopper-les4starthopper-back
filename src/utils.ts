import { User } from "./Entities/User";
import { DataSource } from "typeorm";

const datasource = new DataSource({
  type: "postgres",
  host: "db",
  username: "postgres",
  password: "supersecret",
  database: "postgres",
  synchronize: true,
  entities: [User],
  logging: ["query", "error"],
});
export default datasource;
