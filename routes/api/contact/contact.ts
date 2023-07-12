import { Router } from "express";
const {verifyAccessToken} = require("../../../helpers/JWTHelperUtils")

const contactController =  require('../../../controllers/contactController');

const ContactRoutes = Router();

ContactRoutes.post("/add-contact",contactController.saveContactInfo);
ContactRoutes.delete("/delete-contact/:id",verifyAccessToken,contactController.deleteContact);



export default ContactRoutes;