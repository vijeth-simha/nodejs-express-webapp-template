import { StatusCode } from "../interfaces";

export const hostname:string = "127.0.0.1";
export const port:number = 5000;
export const DUPLICATE_ENTRY_ERRORNO:number = 1062;
export const JSON_WEB_TOKEN_ERROR:string = "JsonWebTokenError"
export const STATUS_CODES:StatusCode = {
  success: 200,
  duplicate: 409,
  notFound: 404,
  error: 500,
  unAuthorized:401,
  forbidden: 403,
  invalid: 498
};
