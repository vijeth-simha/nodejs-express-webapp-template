import { Router } from "express";
import {  FileType } from "../../../interfaces";


const multer  = require('multer')
const storage = multer.diskStorage({
  destination:(req:Request, file:File, cb:any)=>{
    cb(null, './public/img/course-images')
  },
  filename:function (req:Request, file:FileType, cb:any) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + "-" + file.originalname)
  }
})
const upload = multer({ storage:storage });


const {verifyAccessToken} = require("../../../helpers/JWTHelperUtils")

const courseController =  require('../../../controllers/courseController');

const CourseRoutes = Router();

CourseRoutes.get("/get-all-courses",courseController.getAllCourses);

CourseRoutes.get("/course/:id",courseController.getCourse);

CourseRoutes.post("/add-course",verifyAccessToken,upload.single('courseImage'),courseController.addCourse);
CourseRoutes.put("/edit-course/:id",verifyAccessToken,upload.single('courseImage'),courseController.editCourse);
CourseRoutes.delete("/delete-course/:id",verifyAccessToken,courseController.deleteCourse);




export default CourseRoutes;