import { Request, Response } from "express";
import { STATUS_CODES } from "../constants/constant";
import { AppDataSource } from "../db";
import { About, Course, Image } from "../models";



const getAllInfo = async (req: Request, res: Response) => {
    const aboutUsRepository = AppDataSource.getRepository(About);
    const courseRepository = AppDataSource.getRepository(Course);
    const imageRepository = AppDataSource.getRepository(Image);
    const imageSliderInfo: Image[]  = await imageRepository.find();
    const courses: Course[] = await courseRepository.find();
    const info: About | null = await aboutUsRepository.findOneBy({
        id: Number(1),
    });

    const allInfo = {
        sliders: imageSliderInfo,
        courseInfo: courses,
        aboutUsInfo: info
    }
    try {
      res.status(STATUS_CODES.success).send(allInfo);
    } catch (error) {
      res.status(STATUS_CODES.error).send("Internal Server Error");
    }
  };

  module.exports = {
    getAllInfo,
  }