import { Request, Response, Router } from "express";
import { AppDataSource } from "../../../db";
import { About } from "../../../models";

const PublicAboutUsRoutes = Router();

PublicAboutUsRoutes.get("/", async (req: Request, res: Response) => {
  const aboutUsRepository = AppDataSource.getRepository(About);
  try {
    const aboutUsInfo: About[] = await aboutUsRepository.find();
    res.render("pages/about", { aboutUsInfo });
  } catch (error) {}
});


PublicAboutUsRoutes.get("/why-choose-us",async (req: Request, res: Response) => {
  const aboutUsRepository = AppDataSource.getRepository(About);
  try {
    const aboutUsInfo: About[] = await aboutUsRepository.find();
    const whyChooseUsInfo = {
      whyChooseUs: aboutUsInfo[0].whyChooseUs,
      whyChooseUsDescription: aboutUsInfo[0].whyChooseUsDescription
    }    
    res.render("pages/why-choose-us/why-choose-us", { whyChooseUsInfo });
  } catch (error) {}
})

PublicAboutUsRoutes.get("/view-teams", async (req: Request, res: Response) => {
  const aboutUsRepository = AppDataSource.getRepository(About);
  try {
    const aboutUsInfo: About | null = await aboutUsRepository.findOneBy({
      id: 1,
    });
    res.render("pages/team/team", { teams: aboutUsInfo?.team });
  } catch (error) {}
});

PublicAboutUsRoutes.get("/create-team", async (req: Request, res: Response) => {
  try {
    res.render("pages/team/create-team");
  } catch (error) {}
});

PublicAboutUsRoutes.get(
  "/edit-team/:id",
  async (req: Request, res: Response) => {
    const  {id} = req.params;
    try {
      const aboutUsRepository = AppDataSource.getRepository(About);
      const aboutUsInfo: About | null = await aboutUsRepository.findOneBy({
        id: 1,
      });
      const teamMemberInfo = aboutUsInfo?.team.find((item)=>item.id === id);
      res.render("pages/team/edit-team",{teamMemberInfo});
    } catch (error) {}
  }
);

// module.exports = router;
export default PublicAboutUsRoutes;
