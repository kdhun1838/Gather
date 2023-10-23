import express, { Request, Response, NextFunction } from "express";
import models from "../models";
import multer from "multer";
const router = express.Router();

// 캐러셀 관리
const uniqueFileName = (name: string) => {
  const timestamp = Date.now();
  return `${timestamp}-00`;
};

const storage = multer.diskStorage({
  destination(req, file, done) {
    done(null, "../client/public/carousel");
  },
  filename(req, file, done) {
    done(null, uniqueFileName(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 },
});

router.post(
  "/uploadImg",
  upload.single("file"),
  async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).send("업로드실패");
    }
    console.log("하하하", req.file);
    console.log(
      "오오오",
      req.body.content,
      req.body.link,
      req.body.backgroundColor,
      req.body.textColor,
      req.body.onlyImg
    );

    const { content, link, backgroundColor, textColor, onlyImg } = req.body;
    // const newCarousel = await models.carousels.findAll({});

    const newUpload = await models.carousels.create({
      content,
      href: link,
      img: {
        filename: req.file.filename,
        url: `../../images/carousel/${req.file.filename}`,
      },
      backgroundColor,
      textColor,
      onlyImg: Number(onlyImg),
    });
    if (newUpload === null) {
      res.status(400).send("등록실패하였습니다.");
    } else {
      console.log("등록성공");
      res.status(200);
    }
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

router.post(
  "/updateCarousel/",
  upload.single("file"),
  async (req: Request, res: Response, next: NextFunction) => {
    const { content, link, carouselNum, backgroundColor, textColor, onlyImg } =
      req.body;
    console.log(req.body);
    console.log("req.file", req.file);

    try {
      await models.carousels.update(
        {
          content,
          href: link,
          img: {
            filename: req.file?.filename,
            url: `../../images/carousel/${req.file?.filename}`,
          },
          backgroundColor,
          textColor,
          onlyImg: Number(onlyImg),
        },
        { where: { carouselNum } }
      );
      res.status(200);
    } catch (error) {
      res.status(500);
    }
  }
);

router.delete(
  "/deleteCarousel/:carouselNum",
  async (req: Request, res: Response, next: NextFunction) => {
    const carouselNum = req.params.carouselNum;
    console.log("sss");
    try {
      await models.carousels.destroy({
        where: { carouselNum },
      });
      res.status(200);
    } catch (error) {
      res.status(500);
    }
  }
);

export default router;
