import express, { Request, Response, NextFunction } from "express";
import models from "../models";
import multer from "multer";
import { Op } from "sequelize";
import moment from "moment";
import cron from "node-cron";

const router = express.Router();

interface DateCounts {
  [date: string]: {
    registerDataCount: number;
    communityDataCount: number;
    userDataCount: number;
  };
}
//메인
router.get("/getMessages", async (req: Request, res: Response) => {
  try {
    const messages = await models.messages.findAll({
      where: {
        state: 0,
      },
      include: [
        {
          model: models.users,
          attributes: ["nick", "grade"],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 6,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500);
  }
});

router.post("/postMessages", async (req: Request, res: Response) => {
  try {
    const { text, userNum } = req.body;
    const data = await models.messages.create({
      content: text,
      userNum,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500);
  }
});

router.post("/postDelete/:messageNum", async (req: Request, res: Response) => {
  try {
    const messageNum = req.params.messageNum;
    console.log("번호", messageNum);

    const deleteData = await models.messages.update(
      { state: 1 },
      {
        where: { messageNum },
      }
    );

    res.status(200).json(deleteData);
  } catch (error) {
    res.status(500);
  }
});

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
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);

    const data = await models.visitors.findAll({
      where: {
        date: {
          [Op.between]: [oneWeekAgo, today],
        },
      },
      order: [["date", "ASC"]],
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500);
  }
});
router.get("/weekRegister", async (req, res) => {
  try {
    const currentDate = new Date();
    const oneWeekAgo = new Date(currentDate);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);

    const registerData = await models.registers.findAll({
      where: {
        createdAt: {
          [Op.between]: [oneWeekAgo, currentDate],
        },
      },
    });
    const registerFormatData = registerData.map((item: any) => ({
      ...item.dataValues,
      createdAt: new Date(item.createdAt.getTime()).toISOString().slice(0, 10),
    }));

    const communityData = await models.communitys.findAll({
      where: {
        createdAt: {
          [Op.between]: [oneWeekAgo, currentDate],
        },
      },
    });
    const communityFormatData = communityData.map((item: any) => ({
      ...item.dataValues,
      createdAt: new Date(item.createdAt.getTime()).toISOString().slice(0, 10),
    }));

    const userData = await models.users.findAll({
      where: {
        createdAt: {
          [Op.between]: [oneWeekAgo, currentDate],
        },
      },
    });
    const userFormatData = userData.map((item: any) => ({
      ...item.dataValues,
      createdAt: new Date(item.createdAt.getTime()).toISOString().slice(0, 10),
    }));

    const dateCounts: DateCounts = {};
    for (
      let i = new Date(oneWeekAgo);
      i <= currentDate;
      i.setDate(i.getDate() + 1)
    ) {
      const formattedDate = new Date(i.getTime()).toISOString().slice(0, 10);
      dateCounts[formattedDate] = {
        registerDataCount: registerFormatData.filter(
          (item: any) => item.createdAt === formattedDate
        ).length,
        communityDataCount: communityFormatData.filter(
          (item: any) => item.createdAt === formattedDate
        ).length,
        userDataCount: userFormatData.filter(
          (item: any) => item.createdAt === formattedDate
        ).length,
      };
    }

    let totalRegisterDataCount = 0;
    let totalCommunityDataCount = 0;
    let totalUserDataCount = 0;

    for (let i = 0; i < 7; i++) {
      const formattedDate = new Date(
        oneWeekAgo.getTime() + i * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .slice(0, 10);

      totalRegisterDataCount += dateCounts[formattedDate].registerDataCount;
      totalCommunityDataCount += dateCounts[formattedDate].communityDataCount;
      totalUserDataCount += dateCounts[formattedDate].userDataCount;
    }

    const result = Object.keys(dateCounts)
      .sort()
      .reverse()
      .map((date) => ({
        date,
        registerDataCount: dateCounts[date].registerDataCount,
        communityDataCount: dateCounts[date].communityDataCount,
        userDataCount: dateCounts[date].userDataCount,
      }));
    result.push({
      date: "최근 7일 합계",
      registerDataCount: totalRegisterDataCount,
      communityDataCount: totalCommunityDataCount,
      userDataCount: totalUserDataCount,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// 캐러셀 관리
const uniqueFileName = (name: string) => {
  const timestamp = Date.now();
  return `${timestamp}-00.jpg`;
};

const storage = multer.diskStorage({
  destination(req, file, done) {
    done(null, "../client/public");
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
        url: `../../images/${req.file.filename}`,
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

router.get("/getUserDetail/:userNum", async (req: Request, res: Response) => {
  const userNum = req.params.userNum;
  try {
    const User = await models.users.findOne({ where: { userNum } });
    const data = {
      id: User.id,
      name: User.name,
      nick: User.nick,
      email: User.email,
      tel: User.tel,
      age: User.age,
      grade: User.grade,
      addr: User.addr,
      gender: User.gender,
    };
    res.status(200).json(data);
  } catch (error) {
    res.status(500);
  }
});

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

const createOrUpdateVisitorRecord = async () => {
  try {
    const currentDate = new Date();
    const currentDateString = new Date(
      currentDate.getTime() + 9 * 60 * 60 * 1000
    )
      .toISOString()
      .split("T")[0];
    const existingRecord = await models.visitors.findOne({
      where: { date: currentDateString },
    });

    if (existingRecord) {
      console.log(`이미 레코드가 존재합니다. date: ${currentDateString}`);
    } else {
      const newVisitorRecord = {
        visitor_count: 0,
        user_count: 0,
        total_count: 0,
        date: currentDateString,
      };

      await models.visitors.create(newVisitorRecord);
      console.log(`새로운 레코드를 추가했습니다. date: ${currentDateString}`);
    }
  } catch (e) {
    console.error("오류가 발생했습니다:", e);
  }
};

cron.schedule("0 0 * * *", () => {
  createOrUpdateVisitorRecord();
});

export default router;
