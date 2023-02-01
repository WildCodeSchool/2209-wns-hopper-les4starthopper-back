import express, { Request, Response } from "express";
const router = express.Router();
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import datasource from "../utils";
import { Picture } from "../Entities/Picture";
import fs from "fs";

cloudinary.config({
  cloud_name: "dr48z55jf",
  api_key: "354296771728286",
  api_secret: "qeBv_u3FmxNq9qpyIR5J5f8vgxI",
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
  async (req: any, res: Response) => {
    const PoiId = req.body.id;
    try {
      const imageUpload = await cloudinary.uploader.upload(req.file.path);
      const savePicture = { ...imageUpload, pointOfInterestId: PoiId };
      const picture = await datasource
        .getRepository(Picture)
        .save(savePicture)
        .then(() => {
          fs.unlinkSync(req.file.path);
        });
      res.status(200).json({
        picture,
        success: true,
        file: imageUpload.secure_url,
        message: "File uploaded successfully.",
      });
    } catch (e) {
      console.log(e);
    }
  }
);
