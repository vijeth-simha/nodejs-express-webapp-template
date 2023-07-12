import { Request } from "express";

export default interface MetaData {
  includes?: String;
  requirements?: string;
}


export interface Team {
  id:string;
  name: string;
  socialLinks:String[];
  title:string;
  description:string;
  profilePic: string;
  createdAt: Date
}

export interface Service {
  title: string;
  description: string;
}

export interface FileType {
  fieldname: string;
  /** Name of the file on the uploader's computer. */
  originalname: string;
  /**
   * Value of the `Content-Transfer-Encoding` header for this file.
   * @deprecated since July 2015
   * @see RFC 7578, Section 4.7
   */
  encoding: string;
  /** Value of the `Content-Type` header for this file. */
  mimetype: string;
  /** Size of the file in bytes. */
  size: number;

  /** `DiskStorage` only: Directory to which this file has been uploaded. */
  destination: string;
  /** `DiskStorage` only: Name of this file within `destination`. */
  filename: string;
  /** `DiskStorage` only: Full path to the uploaded file. */
  path: string;
  /** `MemoryStorage` only: A Buffer containing the entire file. */
  buffer: Blob;
}

export default interface MulterRequest extends Request {
  file: FileType;
}