import "reflect-metadata";

import { DataSource } from "typeorm";

import { User } from "../entities/User";
import { VacationRequest } from "../entities/VacationRequest";

export const AppDataSource = new DataSource({
  type: "postgres",

  host: "localhost",

  port: 5432,

  username: "postgres",

  password: "postgres",

  database: "vacation_management",

  synchronize: true,

  logging: false,

  entities: [User, VacationRequest],
});