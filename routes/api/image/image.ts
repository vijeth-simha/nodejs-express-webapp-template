import { Router } from "express";
import { FileType } from "../../../interfaces";
const { verifyAccessToken } = require("../../../helpers/JWTHelperUtils");

const imageController = require("../../../controllers/imageController");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req: Request, file: File, cb: any) => {
    cb(null, "./public/img/image-sliders");
  },
  filename: function (req: Request, file: FileType, cb: any) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const ImageRoutes = Router();

ImageRoutes.get("/get-all-image-sliders",verifyAccessToken,imageController.getAllImageSliders);

ImageRoutes.get("/image-slider/:id",verifyAccessToken,imageController.getImageSlider);

ImageRoutes.post(
  "/add-image",
  verifyAccessToken,
  upload.single("sliderImage"),
  imageController.addImage
);

ImageRoutes.put(
  "/edit-image-slider/:id",
  verifyAccessToken,
  upload.single("sliderImage"),
  imageController.editImageSlider
);

ImageRoutes.delete(
  "/delete-image-slider/:id",
  verifyAccessToken,
  imageController.deleteImageSlider
);

export default ImageRoutes;
