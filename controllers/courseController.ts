import { Request, Response } from "express";
import { STATUS_CODES } from "../constants/constant";
import { AppDataSource } from "../db";
import { Course } from "../models";
import { MulterRequest } from "../interfaces";

const getAllCourses = async (req: Request, res: Response) => {
  const courseRepository = AppDataSource.getRepository(Course);
  try {
    const courses: Course[] = await courseRepository.find();
    res.status(STATUS_CODES.success).send(courses);
  } catch (error) {
    console.log(error);
    res.status(STATUS_CODES.error).send("Internal Server Error");
  }
};
const getCourse = async (req: Request, res: Response) => {
  const courseRepository = AppDataSource.getRepository(Course);
  const { id } = req.params;

  try {
    const course: Course | null = await courseRepository.findOneBy({
      id: Number(id),
    });
    res.status(STATUS_CODES.success).send(course);
  } catch (error) {
    console.log(error);
    res.status(STATUS_CODES.error).send("Internal Server Error");
  }
};

const addCourse = async (req: Request, res: Response) => {
  const { filename } = (req as MulterRequest).file;
  if (!filename) {
    res.status(STATUS_CODES.invalid).send("Please enter a valid file");
  }
  const course: Course = req.body;
  course.imagePath = filename;
  course.createdAt = new Date();

  const courseRepository = AppDataSource.getRepository(Course);
  try {
    await courseRepository.save(course);
    res.status(STATUS_CODES.success).send("Course Created Successfully");
  } catch (error) {
    console.log(error);

    res.status(STATUS_CODES.error).send("Internal Server Error");
  }
};

const editCourse = async (req: Request, res: Response) => {
  const courseRepository = AppDataSource.getRepository(Course);

  const { id } = req.params;
  const updatedCourseBody: Course = req.body;
  if ((req as MulterRequest).file) {
    const { filename } = (req as MulterRequest).file;
    updatedCourseBody.imagePath = filename;
  }
  try {
    const course: Course | null = await courseRepository.findOneBy({
      id: Number(id),
    });

    await courseRepository.save({
      ...course,
      ...updatedCourseBody,
    });
    res.status(STATUS_CODES.success).send("Course Updated Successfully");
  } catch (error) {
    console.log(error);
    res.status(STATUS_CODES.error).send("Internal Server Error");
  }
};
const deleteCourse = async (req: Request, res: Response) => {
  const courseRepository = AppDataSource.getRepository(Course);
  const { id } = req.params;
  try {
    await courseRepository.delete(Number(id));
    res.status(STATUS_CODES.success).send("Course Deleted Successfully");
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getAllCourses,
  addCourse,
  getCourse,
  editCourse,
  deleteCourse,
};
