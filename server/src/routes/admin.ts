import express, { Request, Response, NextFunction } from "express";
import models from "../models";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, done) {
    done(null, "../client/src/images/carousel");
  },
  filename(req, file, done) {
    done(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
});

router.post("/uploadImg", (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send("업로드실패");
  }
  console.log("하하하", req.file);
  res.status(200);
});

export default router;
