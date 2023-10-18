import express, { Request, Response, NextFunction } from "express";
import models from "../models";
import multer from "multer";
const router = express.Router();
const uniqueFileName = (name: string) => {
  const timestamp = Date.now();
  return `${timestamp}-${name}`;
};

const storage = multer.diskStorage({
  destination(req, file, done) {
    done(null, "../client/src/images/carousel");
  },
  filename(req, file, done) {
    done(null, uniqueFileName(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
});

router.post(
  "/uploadImg",
  upload.single("file"),
  async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).send("업로드실패");
    }
    console.log("하하하", req.file);
    const newCarousel = await models.carousels.findAll({});
    console.log("ddddddddddd", newCarousel);
    res.status(200);
  }
);

router.get(
  "/getCarousel",
  async (req: Request, res: Response, next: NextFunction) => {
    const Carousel = await models.carousels.findAll({});
    res.status(200).json(Carousel);
    try {
    } catch (error) {
      res.status(500);
    }
  }
);

export default router;
