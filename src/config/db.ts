import { DataSource } from "typeorm";
import { config } from "./config";

export const AppDataSource = new DataSource({
  type: config.DB.TYPE,
  host: config.DB.HOST,
  port: config.DB.PORT,
  username: config.DB.USER,
  password: config.DB.PASSWORD,
  database: config.DB.DATABASE,
  synchronize: false,
  logging: true,
  entities: ["src/entity/**/*.ts", "src/entity/**/*.js"],
  migrations: ["src/migration/**/*.ts", "src/migration/**/*.js"],
});
