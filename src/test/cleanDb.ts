import { buildSchema } from "type-graphql";
import { UserResolver } from "../graphql/resolvers/Users";
import datasource from "../utils";

export const cleanDb = async () => {
  try {
    const entities = datasource.entityMetadatas;
    const tableNames = entities
      .map((entity) => `"${entity.tableName}"`)
      .join(", ");
    await datasource.query(`TRUNCATE ${tableNames} CASCADE;`);
    console.log("[TEST DATABASE]: Clean");
  } catch (error) {
    throw new Error(`ERROR: Cleaning test database: ${JSON.stringify(error)}`);
  }
};
