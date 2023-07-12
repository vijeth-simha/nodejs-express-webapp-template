import { Request, Response } from "express";
import { STATUS_CODES } from "../constants/constant";
import { AppDataSource } from "../db";
import { Image } from "../models";
import { MulterRequest } from "../interfaces";

const fs = require('fs')

const getAllImageSliders = async (req: Request, res: Response) => {
  const imageRepository = AppDataSource.getRepository(Image);
  try {
    const imageSliderInfo: Image[] = await imageRepository.find();
    res.status(STATUS_CODES.success).send(imageSliderInfo);
  } catch (error) {
    console.log(error);
    res.status(STATUS_CODES.error).send("Internal Server Error");
  }
};

const getImageSlider = async (req: Request, res: Response) => {
  const imageRepository = AppDataSource.getRepository(Image);
  const { id } = req.params;

  try {
    const imageSliderInfo: Image | null = await imageRepository.findOneBy({
      id: Number(id),
    });
    res.status(STATUS_CODES.success).send(imageSliderInfo);
  } catch (error) {
    console.log(error);
    res.status(STATUS_CODES.error).send("Internal Server Error");
  }
};


const addImage = async (req: Request, res: Response) => {
  const imageInfo: Image = req.body;
  const { filename } = (req as MulterRequest).file;
  if (!filename) {
    res.status(STATUS_CODES.invalid).send("Please enter a valid file");
  }
  imageInfo.imagePath = filename;
  imageInfo.createdAt = new Date();

  const imageRepository = AppDataSource.getRepository(Image);
  try {
    await imageRepository.save(imageInfo);
    res.status(STATUS_CODES.success).send("Image slider added successfully");
  } catch (error) {
    console.log(error);
    res.status(STATUS_CODES.error).send("Internal Server Error");
  }
};

const editImageSlider = async (req: Request, res: Response) => {
  const imageSliderRepository = AppDataSource.getRepository(Image);

  const { id } = req.params;
  const updatedImageSliderBody: Image = req.body;
  if ((req as MulterRequest).file) {
    const { filename } = (req as MulterRequest).file;
    updatedImageSliderBody.imagePath = filename;
  }
  try {
    const imageSliderInfo: Image | null = await imageSliderRepository.findOneBy({
      id: Number(id),
    });

    await imageSliderRepository.save({
      ...imageSliderInfo,
      ...updatedImageSliderBody,
    });
    res.status(STATUS_CODES.success).send("Image Slider Updated Successfully");
  } catch (error) {
    console.log(error);
    res.status(STATUS_CODES.error).send("Internal Server Error");
  }
};

const deleteImageSlider = async (req: Request, res: Response) => {
  const imageSliderRepository = AppDataSource.getRepository(Image);
  const { id } = req.params;
  try {
    const imageSliderInfo: Image | null = await imageSliderRepository.findOneBy({
      id: Number(id),
    });
    const path = './public/img/image-sliders/'+imageSliderInfo?.imagePath
    fs.unlink(path, (err:Error) => {
      if (err) {
        console.error(err)
        return
      }
      //file removed
    })
    await imageSliderRepository.delete(Number(id));
    res.status(STATUS_CODES.success).send("Image Slider Deleted Successfully");
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  addImage,
  deleteImageSlider,
  editImageSlider,
  getAllImageSliders,
  getImageSlider
};
