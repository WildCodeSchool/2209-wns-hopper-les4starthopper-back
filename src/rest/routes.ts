import express, { Request, Response } from "express";
const router = express.Router();
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import datasource from "../utils";
import { Picture } from "../Entities/Picture";
import fs from "fs";
import env from "../env";

cloudinary.config({
  cloud_name: env.CLOUD_NAME,
  api_key: env.CLOUDINARY_KEY,
  api_secret: env.CLOUDINARY_KEY_SECRET,
  secure: true,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const uploading = multer({ storage: storage });

export const upload = router.post(
  "/",
  uploading.single("image"),
  async (req: Request, res: Response) => {
    const PoiId = req.body.PoiId;
    console.log("🚀 ~ file: routes.ts:32 ~ PoiId:", PoiId)
    try {
      const imageUpload = await cloudinary.uploader.upload(req.file!.path);
      const savePicture = { url: imageUpload.url, pointOfInterestId: PoiId };
      const picture = await datasource
        .getRepository(Picture)
        .save(savePicture)
        .then(() => {
          fs.unlinkSync(req.file!.path);
        });
      res.status(200).json({
        picture,
        success: true,
        file: imageUpload.secure_url,
        PoiId,
        message: "File uploaded successfully.",
      });
    } catch (e) {
      console.log(e);
    }
  }
);
