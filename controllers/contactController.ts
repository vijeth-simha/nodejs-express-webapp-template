import { Request, Response } from "express";
import { STATUS_CODES } from "../constants/constant";
import { AppDataSource } from "../db";
import { Contact } from "../models";



const saveContactInfo = async (req: Request, res: Response) => {
    const contact: Contact = req.body;
    const contactRepository = AppDataSource.getRepository(Contact);
    contact.createdAt = new Date();
    try {
      await contactRepository.save(contact);
      res.status(STATUS_CODES.success).send("Conact Created Successfully");
    } catch (error) {
      console.log(error);
      
      res.status(STATUS_CODES.error).send("Internal Server Error");
    }
  };

  const deleteContact =async (req:Request,res:Response) => {
    const {id} = req.params;
    const contactRepository = AppDataSource.getRepository(Contact);
    try {
      await contactRepository.delete({id:Number(id)});
      res.status(STATUS_CODES.success).send("Contact Deleted Successfully");
    } catch (error) {
      
    }
  }

  module.exports = {
    saveContactInfo,
    deleteContact
  }