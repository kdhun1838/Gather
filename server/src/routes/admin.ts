import express, { Request, Response, NextFunction } from "express";
import models from "../models";
import multer from "multer";
import { Op } from "sequelize";
const router = express.Router();

//메인
router.get("/topInfo", async (req: Request, res: Response) => {
  try {
    const userData = await models.users.findAndCountAll({
      attributes: {
        exclude: ["password"],
      },
      nest: true,
    });
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const userDataToday = await models.users.count({
      where: {
        createdAt: {
          [Op.gte]: today,
        },
      },
    });
    userData.today = userDataToday;

    const registerData = await models.registers.findAndCountAll({
      nest: true,
    });
    const registerDataToday = await models.registers.count({
      where: {
        createdAt: {
          [Op.gte]: today,
        },
      },
    });
    registerData.today = registerDataToday;

    const communityData = await models.communitys.findAndCountAll({
      nest: true,
    });
    const communityDataToday = await models.communitys.count({
      where: {
        createdAt: {
          [Op.gte]: today,
        },
      },
    });
    communityData.today = communityDataToday;

    const carouselData = await models.carousels.findAndCountAll({
      nest: true,
    });
    const carouselDataToday = await models.carousels.count({
      where: {
        createdAt: {
          [Op.gte]: today,
        },
      },
    });
    carouselData.today = carouselDataToday;

    res
      .status(200)
      .json({ userData, registerData, communityData, carouselData });
  } catch (error) {
    res.status(500);
  }
});

router.get("/visitor", async (req: Request, res: Response) => {
  console.log("방문자백");
  try {
    const data = await models.visitors.findAll({});

    res.status(200).json(data);
  } catch (error) {
    res.status(500);
  }
});

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
      res.status(200);
    }
  }
);

router.get(
  "/getCarousel",
  async (req: Request, res: Response, next: NextFunction) => {
    const Carousel = await models.carousels.findAll({});
    try {
      res.status(200).json(Carousel);
    } catch (error) {
      res.status(500);
    }
  }
);

router.post(
  "/clickCarousel",
  async (req: Request, res: Response, next: NextFunction) => {
    const carouselNum = req.body.carouselNum;
    try {
      const data = await models.carousels.findOne({
        where: { carouselNum },
      });
      data.count += 1;
      await data.save();
      res.status(200);
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

//유저관리

router.delete("/deleteUser/:userNum", async (req: Request, res: Response) => {
  const userNum = req.params.userNum;
  try {
    await models.users.destroy({
      where: { userNum: Number(userNum) },
    });
    res.status(200);
  } catch (error) {
    res.status(500);
  }
});

router.post("/updateUserGrade", async (req: Request, res: Response) => {
  const { userNum, grade } = req.body;
  console.log("백 userNum", userNum, "grade", grade);
  try {
    if (grade === 2) {
      await models.users.update(
        {
          grade: 1,
        },
        { where: { userNum: Number(userNum) } }
      );
    } else if (grade === 1) {
      await models.users.update(
        {
          grade: 2,
        },
        { where: { userNum: Number(userNum) } }
      );
    }
  } catch (error) {
    res.status(500);
  }
});

export default router;

//모임게시판 관리

router.get("/getRegister", async (req: Request, res: Response) => {
  try {
    const data = await models.registers.findAll({
      include: [
        {
          nest: true,
          model: models.users,
          attributes: ["id", "nick", "name"],
        },
      ],
    });

    const transformedData = data.map((item: any) => {
      const user = item.User;
      const restOfData = {
        id: user.id,
        nick: user.nick,
        name: user.name,
        category: item.category,
        contact: item.contact,
        content: item.content,
        createdAt: item.createdAt,
        favorite: item.favorite,
        meeting: item.meeting,
        period: item.period,
        personnel: item.personnel,
        position: item.position,
        registerNum: item.registerNum,
        state: item.state,
        title: item.title,
        updatedAt: item.updatedAt,
        userNum: item.userNum,
        view: item.view,
      };

      return restOfData;
    });

    res.status(200).json(transformedData);
  } catch (error) {
    res.status(500);
  }
});

// 커뮤니티 관리

router.get("/getCommunity", async (req: Request, res: Response) => {
  console.log("getCommunity백");
  try {
    const data = await models.communitys.findAll({
      include: [
        {
          nest: true,
          model: models.users,
          attributes: ["id", "nick", "name"],
        },
      ],
    });

    const transformedData = data.map((item: any) => {
      const user = item.User;
      const restOfData = {
        communityNum: item.communityNum,
        id: user.id,
        nick: user.nick,
        name: user.name,
        userNum: item.userId,
        title: item.title,
        category: item.category,
        content: item.content,
        detail: item.detail,
        view: item.view,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };

      return restOfData;
    });

    res.status(200).json(transformedData);
  } catch (error) {
    res.status(500);
  }
});
