import multer, { DiskStorageOptions, FileFilterCallback } from 'multer';
import { Request } from 'express';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req : Request, file : Express.Multer.File, cb : (error: Error | null, destination: string) => void) => {
    cb(null, path.join(__dirname, '../public/temp')); // Specify the destination directory
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
export const upload = multer({ storage });