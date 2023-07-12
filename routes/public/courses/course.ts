import { Request, Response, Router } from "express";
import { AppDataSource } from "../../../db";
import { Course } from "../../../models";
import { STATUS_CODES } from "../../../constants/constant";

const PublicCourseRoutes = Router();

PublicCourseRoutes.get("/", async (req: Request, res: Response) => {
  const courseRepository = await AppDataSource.getRepository(Course);
  try {
    const courses = await courseRepository.find();
    res.render("pages/courses/courses",{courses});
  } catch (error) {
    console.log(error);
    res.status(STATUS_CODES.error).send("Internal Server Error");
  }
});


PublicCourseRoutes.get("/create-course", async (req: Request, res: Response)=>{
  // const courseRepository = await AppDataSource.getRepository(Course);
  res.render("pages/courses/create-course");
})

PublicCourseRoutes.get("/edit-course/:id", async (req: Request, res: Response)=>{
  const {id} = req.params;
  const courseRepository = await AppDataSource.getRepository(Course);
  const course:Course | null = await courseRepository.findOneBy({id:Number(id)});
  res.render("pages/courses/edit-course",{course});
})

// module.exports = router;
export default PublicCourseRoutes;
