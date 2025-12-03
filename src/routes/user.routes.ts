import { Router } from "express";
import { registerUser } from "../controllers/user.controller.ts";
import { upload } from "../middlewares/multer.middleware.ts";

const router = Router();

// MULTIPART FIELDS CONFIG HERE
router.post(
  "/register",
  upload.fields([
    { name: "avatarUrl", maxCount: 1 }
  ]),
  registerUser
);

export default router;
