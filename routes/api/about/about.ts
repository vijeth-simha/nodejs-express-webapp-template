import { Router } from "express";
import { FileType } from "../../../interfaces";
const { verifyAccessToken } = require("../../../helpers/JWTHelperUtils");

const aboutController = require("../../../controllers/aboutUsController");

const multer = require("multer");
// const storage = multer.memoryStorage()
// const upload = multer({ storage:storage });
const storage = multer.diskStorage({
  destination: (req: Request, file: File, cb: any) => {
    cb(null, "./public/img/teams");
  },
  filename: function (req: Request, file: FileType, cb: any) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

const AboutUsRoutes = Router();

AboutUsRoutes.post(
  "/add-about-us",
  verifyAccessToken,
  upload.single("aboutUsImage"),
  aboutController.createAboutUsInfo
);

AboutUsRoutes.get(
  "/get-about-us-info",
  aboutController.getAboutUsInfo
);

AboutUsRoutes.post(
  "/add-team-member",
  verifyAccessToken,
  upload.single("aboutUsImage"),
  aboutController.addTeam
);
AboutUsRoutes.put(
  "/edit-team-member/:id",
  verifyAccessToken,
  upload.single("aboutUsImage"),
  aboutController.editTeamMember
);
AboutUsRoutes.delete(
  "/delete-team-member/:id",
  verifyAccessToken,
  aboutController.deleteTeamMember
);
AboutUsRoutes.post(
  "/update-why-choose-us",
  verifyAccessToken,
  aboutController.updateWhyChooseUs
);



export default AboutUsRoutes;
