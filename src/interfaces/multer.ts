import { Request } from "express";

export interface MulterRequest extends Request {
  files?: {
    avatarUrl?: Express.Multer.File[];
  };
}
