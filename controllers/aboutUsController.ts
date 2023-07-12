import { Request, Response } from "express";
import { STATUS_CODES } from "../constants/constant";
import { AppDataSource } from "../db";
import { About } from "../models";
import { randomUUID } from "crypto";
import { MulterRequest, Team } from "../interfaces";




const createAboutUsInfo = async (req: Request, res: Response) => {
  const aboutUsInfo: About = req.body;
  const aboutUsRepository = AppDataSource.getRepository(About);
  try {
    const aboutUs = await aboutUsRepository.find();
    if (aboutUs.length === 0) {
      aboutUsInfo.createdAt = new Date();
      await aboutUsRepository.save(aboutUsInfo);
    } else {
      const about: About | null = await aboutUsRepository.findOneBy({
        id: 1,
      });
      await aboutUsRepository.save({
        ...about,
        ...aboutUsInfo,
      });
    }
    res.status(STATUS_CODES.success).send("About Created Successfully");
  } catch (error) {
    console.log(error);
    res.status(STATUS_CODES.error).send("Internal Server Error");
  }
};


const getAboutUsInfo = async (req: Request, res: Response) => {
  const aboutUsRepository = AppDataSource.getRepository(About);
  try {
    const aboutUs = await aboutUsRepository.find();
    res.status(STATUS_CODES.success).send(aboutUs);
  } catch (error) {
    console.log(error);
    res.status(STATUS_CODES.error).send("Internal Server Error");
  }
};

const addTeam = async (req: Request, res: Response) => {
  const { filename,originalname,buffer,mimetype } = (req as MulterRequest).file;
  const teamInfo: Team = req.body;
  const aboutUsRepository = AppDataSource.getRepository(About);
  const info: About | null = await aboutUsRepository.findOneBy({
    id: Number(1),
  });
  try {
    if (info) {
      const updatedInfo: About = { ...info };
      teamInfo.id = randomUUID();
      teamInfo.createdAt = new Date()
      teamInfo.profilePic = filename;
      if(!updatedInfo.team) {
        updatedInfo.team = [];
      } else{
        updatedInfo.team.push(teamInfo);
      }
      // const params:PutObjectRequest = {
      //   Bucket:"node-web-app",
      //   Key:originalname,
      //   Body: buffer,
      //   ContentType: mimetype
      // }
      // const commands = new PutObjectCommand(params);
      // s3.send(commands);
      
      await aboutUsRepository.save(updatedInfo);
      res.status(STATUS_CODES.success).send("Team Member created Successfully");
    }
  } catch (error) {
    console.log(error);
  }
};


const updateWhyChooseUs = async (req: Request, res: Response) => {
  const whyChooseUsInfo = req.body;
  const aboutUsRepository = AppDataSource.getRepository(About);
  const info: About | null = await aboutUsRepository.findOneBy({
    id: Number(1),
  });
  try {
    if (info) {
      info.whyChooseUsDescription = whyChooseUsInfo.whyChooseUsDescription;
      info.whyChooseUs = whyChooseUsInfo.whyChooseUs;      
      await aboutUsRepository.save(info);
      res.status(STATUS_CODES.success).send("Updated Successfully");
    }
  } catch (error) {
    console.log(error);
  }
};


const editTeamMember = async (req: Request, res: Response) => {
  const {id} = req.params;
  const teamInfo: Team = req.body;
  const aboutUsRepository = AppDataSource.getRepository(About);
  const info: About | null = await aboutUsRepository.findOneBy({
    id: Number(1),
  });

  
  if ((req as MulterRequest).file) {
    const { filename } = (req as MulterRequest).file;
    teamInfo.profilePic = filename;
  }

  try {
    if (info) {
      const updatedInfo: About = { ...info };
      const newTeamInfo:Team[]  = [...updatedInfo.team].map(item=> {
        if(item.id ===id) {
          const updatedTeamMemberInfo ={...item,...teamInfo};
          return updatedTeamMemberInfo;       
        }
        return item;
      });
      updatedInfo.team = newTeamInfo;
      await aboutUsRepository.save(updatedInfo);
      res.status(STATUS_CODES.success).send("Team Updated Successfully");
    }
  } catch (error) {
    console.log(error);
  }
};


const deleteTeamMember = async (req: Request, res: Response) => {
  const {id} = req.params;
  const aboutUsRepository = AppDataSource.getRepository(About);
  const info: About | null = await aboutUsRepository.findOneBy({
    id: Number(1),
  });
  try {
    if (info) {
      const updatedInfo: About = { ...info };
      const newTeamInfo:Team[] = [...updatedInfo.team].filter(item=> item.id !==id);
      updatedInfo.team = newTeamInfo;      
      await aboutUsRepository.save(updatedInfo);
      res.status(STATUS_CODES.success).send("Team Member Deleted Successfully");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createAboutUsInfo,
  addTeam,
  deleteTeamMember,
  editTeamMember,
  updateWhyChooseUs,
  getAboutUsInfo
};
