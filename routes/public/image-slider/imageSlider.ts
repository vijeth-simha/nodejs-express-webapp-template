import { Request, Response, Router } from "express";
import { AppDataSource } from "../../../db";
import { Image } from "../../../models";

const ImageSliderRoutes = Router();

ImageSliderRoutes.get("/create-image-slider", (req: Request, res: Response) => {
  res.render("pages/image-slider/create-image-slider");
});

ImageSliderRoutes.get("/edit-image-slider/:id", async (req: Request, res: Response)=>{
  const {id} = req.params;
  const imageSliderRepository = await AppDataSource.getRepository(Image);
  const imageSliderInfo:Image | null = await imageSliderRepository.findOneBy({id:Number(id)});
  res.render("pages/image-slider/edit-image-slider",{imageSliderInfo});
})

ImageSliderRoutes.get("/", async (req: Request, res: Response) => {
    const imageSliderRepository = AppDataSource.getRepository(Image);
  try {
    const imageSlidersInfo: Image[] = await imageSliderRepository.find();
    res.render("pages/image-slider/imageSlider", { imageSliders: imageSlidersInfo });
  } catch (error) {}
});

// module.exports = router;
export default ImageSliderRoutes 
