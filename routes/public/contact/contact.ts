import { Request, Response, Router } from "express";
import { AppDataSource } from "../../../db";
import { Contact } from "../../../models";

const PublicContactRoutes = Router();

PublicContactRoutes.get("/", async(req: Request, res: Response) => {
  const contactRepository = AppDataSource.getRepository(Contact);
  try {
    const contactInfo = await contactRepository.find()
    res.render("pages/contact",{contactInfo});
  } catch (error) {
    
  }  
});

// module.exports = router;
export default PublicContactRoutes 
