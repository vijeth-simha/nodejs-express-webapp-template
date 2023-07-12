import { DataSource } from "typeorm";
import { About, Contact, Course, Image, User } from "./models";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "<<YOUR_HOST>>",
  port: 5214,
  username: "<<YOUR_USERNAME>>",
  password: "<<YOUR_PASSWORD>>",
  database: "<<YOUR_DATABASENAME>>",
  synchronize: true,
  logging: false,
  entities: [User,Course,Contact,About,Image],
});