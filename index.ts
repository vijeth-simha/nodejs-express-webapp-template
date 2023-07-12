import express, { Express, Request, Response } from "express";
import "reflect-metadata";
import { hostname, port } from "./constants/constant";
import { AppDataSource } from "./db";
import {
  AboutUsRoutes,
  AuthRoutes,
  ContactRoutes,
  CourseRoutes,
  HomeRoutes,
} from "./routes/api";
import { DashboardRoutes, PublicCourseRoutes,PublicAboutUsRoutes, ImageSliderRoutes } from "./routes/public";
import PublicContactRoutes from "./routes/public/contact/contact";
import ImageRoutes from "./routes/api/image/image";
var expressLayouts = require("express-ejs-layouts");
const path = require("path");
var cors = require('cors')


const app: Express = express();
app.use(express.json());


var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

app.set("views","./views");
app.set("view engine", "ejs");
app.use(expressLayouts);

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req: Request, res: Response) => {
  // res.send("hello + TypeScript Server");
  res.render("pages/login");
});

app.use("/api/auth", AuthRoutes);
app.use("/api/v1/courses", CourseRoutes);
app.use("/api/v1/contact", ContactRoutes);
app.use("/api/v1/about", AboutUsRoutes);
app.use("/api/v1/image", ImageRoutes);
app.use("/api/v1/home", HomeRoutes);

// Public Routes
app.use("/dashboard", DashboardRoutes);
app.use("/courses", PublicCourseRoutes);
app.use("/about", PublicAboutUsRoutes);
app.use("/contact", PublicContactRoutes);
app.use("/image", ImageSliderRoutes);

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const initiate = () => {
  AppDataSource.initialize()
    .then(() => {
      // here you can start to work with your database
      console.log("connection successfull");
    })
    .catch((error) => console.log(error));
};
initiate();
