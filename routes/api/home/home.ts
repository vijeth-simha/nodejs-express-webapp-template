import { Router } from "express";

const homeController =  require('../../../controllers/homeController');

const HomeRoutes = Router();

HomeRoutes.get("/get-all-info",homeController.getAllInfo);



export default HomeRoutes;