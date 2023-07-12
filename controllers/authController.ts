import { Request, Response } from "express";
import { JSON_WEB_TOKEN_ERROR, STATUS_CODES } from "../constants/constant";
import { AppDataSource } from "../db";
import { Error } from "../interfaces";
import { User } from "../models";
const bcrypt = require("bcrypt");
const {
  getAccessToken,
  getRefreshToken,
  verifyRefreshToken,
} = require("../helpers/JWTHelperUtils");

const handleNewUserRegistrarion = async (userObjeect: User, res: Response) => {
  const user: User = userObjeect;
  const { email, password } = userObjeect;
  const userRepository = AppDataSource.getRepository(User);
  const isUserExists: User | null = await userRepository.findOneBy({
    email,
  });
  try {
    if (isUserExists === null) {
      const hashedPassword: string = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      user.createdAt = new Date();
      const savedUser: User = await userRepository.save(user);
      const accessToken: string = await getAccessToken(savedUser.id);
      const refreshToken: string = await getRefreshToken(savedUser.id);
      res.status(STATUS_CODES.success).send({ accessToken, refreshToken });
    } else {
      res.status(STATUS_CODES.duplicate).send("User aleady exists");
    }
  } catch (error) {
    const errorNumber: number = (error as Error).errno;
    if(errorNumber===STATUS_CODES.duplicate) {
      res.status(STATUS_CODES.duplicate).send("User aleady exists");
    }
  }
};

const registerNewUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (email && password) {
    handleNewUserRegistrarion(req.body, res);
  } else {
    res
      .status(STATUS_CODES.error)
      .send("Please have a valid email and password");
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userRepository = AppDataSource.getRepository(User);
  const user: User | null = await userRepository.findOneBy({
    email,
  });
  if (user) {
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (isPasswordMatched) {
      const accessToken: string = await getAccessToken(user.id);
      const refreshToken: string = await getRefreshToken(user.id);

      res.status(STATUS_CODES.success).send({ accessToken, refreshToken });
    } else {
      res.status(STATUS_CODES.notFound).send("Invalid email/password");
    }
  } else {
    res.status(STATUS_CODES.notFound).send("User doesnt exist");
  }
};

const getRefToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(STATUS_CODES.unAuthorized).send("Unauthorized");
  try {
    const userId: string = await verifyRefreshToken(refreshToken);
    const accessToken = await getAccessToken(userId);
    const refToken = await getRefreshToken(userId);
    res
      .status(STATUS_CODES.success)
      .send({ accessToken, refreshToken: refToken });
  } catch (error) {
    const err = (error as Error);
    if(err.name ===JSON_WEB_TOKEN_ERROR) {
      res
      .status(STATUS_CODES.invalid)
      .send("invalid token");
    } else {
      res
      .status(STATUS_CODES.error)
      .send("Internal Server Error");
    }
    
  }
};

module.exports = {
  registerNewUser,
  loginUser,
  getRefToken,
};
