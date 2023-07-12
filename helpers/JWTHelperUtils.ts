
import { NextFunction, Request, Response } from "express";
import { JwtPayload, SignOptions } from "jsonwebtoken";
import { STATUS_CODES,JSON_WEB_TOKEN_ERROR } from "../constants/constant";
const JWT = require("jsonwebtoken");

module.exports = {
  getAccessToken: (userId:string) => {
    const payload:JwtPayload = {};
    const secretKey:string = "xA4HiUNCVpMslQngrjGg4DPAC0YkkOfw";
    const options:SignOptions = {
      expiresIn: '8h',
      audience:String(userId) //We need to convert to string since id from database will be of type number
    };
    return new Promise((resolve, reject) => {
      JWT.sign(payload, secretKey, options, function (err:Error, token:string) { 
        if (err) {
          reject(err);
        }
        resolve(token);
      });
    });
  },
  verifyAccessToken: (req:Request,res:Response,next:NextFunction) =>{
    const authorization:string  = (req.headers.authorization) as string;
    // if(!authorization) console.log('sdcsd');
    const bearerToken:string[] = authorization?.split(' ');
    const token:string  = bearerToken ?  bearerToken[1] : '';
    JWT.verify(token,"xA4HiUNCVpMslQngrjGg4DPAC0YkkOfw",(err:Error,payload:JwtPayload)=>{
      if(err) {
        const message = err.name === JSON_WEB_TOKEN_ERROR ? 'Unauthorized' : err.message;
        const status = err.name === JSON_WEB_TOKEN_ERROR ? STATUS_CODES.forbidden : STATUS_CODES.unAuthorized;
        return res.status(status).send(message);
      }
      req.body.payload= payload;
      next();
    })
  },
  getRefreshToken: (userId:string) => {
    const payload:JwtPayload = {};
    const secretKey:string = "pD4HiUNCVpMslQngrjGg4DPAC0YllOfw";
    const options:SignOptions = {
      expiresIn: '1y',
      audience:String(userId) //We need to convert to string since id from database will be of type number
    };
    return new Promise((resolve, reject) => {
      JWT.sign(payload, secretKey, options, function (err:Error, token:string) { 
        if (err) {
          reject(err);
        }
        resolve(token);
      });
    });
  },
  verifyRefreshToken: (refreshToken:string)=>{
    const secretKey:string = "pD4HiUNCVpMslQngrjGg4DPAC0YllOfw";
    return new Promise((resolve, reject) => {
      JWT.verify(refreshToken, secretKey, function (err:Error, payload:JwtPayload) { 
        if (err) {
          return reject(err);
        }
        const userId:string | string[] | undefined = payload.aud;
        resolve(userId);
      });
    });
  }
};
