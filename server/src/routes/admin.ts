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

router.get("/getUserChart/grade", async (req: Request, res: Response) => {
  try {
    const superadmin = await models.users.count({
      where: { grade: 3 },
    });
    const admin = await models.users.count({
      where: { grade: 2 },
    });
    const user = await models.users.count({
      where: { grade: 1 },
    });
    const data = [
      { id: "최고관리자", value: superadmin },
      { id: "관리자", value: admin },
      { id: "일반유저", value: user },
    ];
    res.status(200).json(data);
  } catch (error) {
    res.status(500);
  }
});

router.get("/getUserChart/gender", async (req: Request, res: Response) => {
  try {
    const maleuser = await models.users.count({
      where: { gender: "남" },
    });
    const femaleuser = await models.users.count({
      where: { gender: "여" },
    });
    const data = [
      { id: "남자", value: maleuser },
      { id: "여자", value: femaleuser },
    ];
    res.status(200).json(data);
  } catch (error) {
    res.status(500);
  }
});

router.get("/getUserChart/age", async (req: Request, res: Response) => {
  try {
    const twentylate = await models.users.count({
      where: { age: { [Op.lte]: 20 } },
    });
    const twenty = await models.users.count({
      where: {
        age: {
          [Op.and]: [
            { [Op.gte]: 20 }, // 이상
            { [Op.lt]: 30 }, // 미만
          ],
        },
      },
    });
    const thirty = await models.users.count({
      where: {
        age: {
          [Op.and]: [
            { [Op.gte]: 30 }, // 이상
            { [Op.lt]: 40 }, // 미만
          ],
        },
      },
    });
    const forty = await models.users.count({
      where: {
        age: {
          [Op.and]: [
            { [Op.gte]: 40 }, // 이상
            { [Op.lt]: 50 }, // 미만
          ],
        },
      },
    });
    const fifty = await models.users.count({
      where: {
        age: {
          [Op.and]: [
            { [Op.gte]: 50 }, // 이상
            { [Op.lt]: 60 }, // 미만
          ],
        },
      },
    });
    const sixty = await models.users.count({
      where: {
        age: {
          [Op.gte]: 60,
        },
      },
    });
    const data = [
      { id: "20대 미만", value: twentylate },
      { id: "20대", value: twenty },
      { id: "30대", value: thirty },
      { id: "40대", value: forty },
      { id: "50대", value: fifty },
      { id: "60대 이상", value: sixty },
    ];
    res.status(200).json(data);
  } catch (error) {
    res.status(500);
  }
});

router.get("/getUserChart/month", async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const monthlyData = [];
    for (let month = 1; month <= 12; month++) {
      const startDate = new Date(`${currentYear}-${month}-01`);
      const endDate = new Date(currentYear, month, 0, 23, 59, 59, 999);

      const userCount = await models.users.count({
        where: {
          createdAt: {
            [Op.gte]: startDate,
            [Op.lte]: endDate,
          },
          grade: 1,
        },
      });
      monthlyData.push({
        id: `${month}월`,
        유저: userCount,
      });
    }
    res.status(200).json(monthlyData);
  } catch (error) {
    res.status(500);
  }
});

router.get("/getUserChart/day", async (req, res) => {
  try {
    const currentDate = new Date();
    const oneWeekAgo = new Date(currentDate);
    oneWeekAgo.setDate(currentDate.getDate() - 6); // 일주일 전부터 오늘까지

    const dailyData = [];

    for (let day = 0; day < 7; day++) {
      const date = new Date(oneWeekAgo);
      date.setDate(oneWeekAgo.getDate() + day);

      const formattedDate = `${
        date.getMonth() + 1
      }월 ${date.getDate()}일(${getDayName(date)})`;

      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0); // 날짜의 시작 시간
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999); // 날짜의 끝 시간

      const userCount = await models.users.count({
        where: {
          createdAt: {
            [Op.gte]: startDate,
            [Op.lte]: endDate,
          },
          grade: 1,
        },
      });

      dailyData.push({
        id: formattedDate,
        유저: userCount,
      });
    }
    res.status(200).json(dailyData);
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

router.get(
  "/getRegisterChart/category",
  async (req: Request, res: Response) => {
    try {
      const sport = await models.registers.count({
        where: { category: "운동" },
      });
      const game = await models.registers.count({
        where: { category: "게임" },
      });
      const study = await models.registers.count({
        where: { category: "스터디" },
      });
      const etc = await models.registers.count({
        where: { category: "기타" },
      });
      const data = [
        { id: "운동", value: sport },
        { id: "게임", value: game },
        { id: "스터디", value: study },
        { id: "기타", value: etc },
      ];
      res.status(200).json(data);
    } catch (error) {
      res.status(500);
    }
  }
);

router.get("/getRegisterChart/month", async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const monthlyData = [];

    for (let month = 1; month <= 12; month++) {
      const startDate = new Date(`${currentYear}-${month}-01`);
      const endDate = new Date(currentYear, month, 0, 23, 59, 59, 999);

      const sportCount = await models.registers.count({
        where: {
          createdAt: {
            [Op.gte]: startDate,
            [Op.lte]: endDate,
          },
          category: "운동",
        },
      });
      const studyCount = await models.registers.count({
        where: {
          createdAt: {
            [Op.gte]: startDate,
            [Op.lte]: endDate,
          },
          category: "스터디",
        },
      });
      const gameCount = await models.registers.count({
        where: {
          createdAt: {
            [Op.gte]: startDate,
            [Op.lte]: endDate,
          },
          category: "게임",
        },
      });
      const etcCount = await models.registers.count({
        where: {
          createdAt: {
            [Op.gte]: startDate,
            [Op.lte]: endDate,
          },
          category: "기타",
        },
      });

      monthlyData.push({
        id: `${month}월`,
        운동: sportCount,
        스터디: studyCount,
        게임: gameCount,
        기타: etcCount,
      });
    }
    res.status(200).json(monthlyData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/getRegisterChart/day", async (req, res) => {
  try {
    const currentDate = new Date();
    const oneWeekAgo = new Date(currentDate);
    oneWeekAgo.setDate(currentDate.getDate() - 6);

    const dailyData = [];

    for (let day = 0; day < 7; day++) {
      const date = new Date(oneWeekAgo);
      date.setDate(oneWeekAgo.getDate() + day);

      const formattedDate = `${
        date.getMonth() + 1
      }월 ${date.getDate()}일(${getDayName(date)})`;

      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);

      const sportCount = await models.registers.count({
        where: {
          createdAt: {
            [Op.gte]: startDate,
            [Op.lte]: endDate,
          },
          category: "운동",
        },
      });
      const studyCount = await models.registers.count({
        where: {
          createdAt: {
            [Op.gte]: startDate,
            [Op.lte]: endDate,
          },
          category: "스터디",
        },
      });
      const gameCount = await models.registers.count({
        where: {
          createdAt: {
            [Op.gte]: startDate,
            [Op.lte]: endDate,
          },
          category: "게임",
        },
      });
      const etcCount = await models.registers.count({
        where: {
          createdAt: {
            [Op.gte]: startDate,
            [Op.lte]: endDate,
          },
          category: "기타",
        },
      });

      dailyData.push({
        id: formattedDate,
        운동: sportCount,
        스터디: studyCount,
        게임: gameCount,
        기타: etcCount,
      });
    }
    res.status(200).json(dailyData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

function getDayName(date: any) {
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  return dayNames[date.getDay()];
}

router.get("/getRegisterChart/table", async (req: Request, res: Response) => {
  try {
    const data = await models.registers.findAll({
      include: [
        {
          nest: true,
          model: models.users,
          attributes: ["id", "nick", "name"],
        },
      ],
      where: {
        state: 1,
      },
      order: [["view", "DESC"]],
      limit: 5,
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
    console.log("data===", transformedData);
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

router.get(
  "/getCommunityChart/category",
  async (req: Request, res: Response) => {
    try {
      const review = await models.communitys.count({
        where: { category: "후기" },
      });
      const question = await models.communitys.count({
        where: { category: "질문" },
      });
      const etc = await models.communitys.count({
        where: { category: "잡담" },
      });
      const data = [
        { id: "후기", value: review },
        { id: "질문", value: question },
        { id: "잡담", value: etc },
      ];
      res.status(200).json(data);
    } catch (error) {
      res.status(500);
    }
  }
);
router.get("/getCommunityChart/month", async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const monthlyData = [];

    for (let month = 1; month <= 12; month++) {
      const startDate = new Date(`${currentYear}-${month}-01`);
      const endDate = new Date(currentYear, month, 0, 23, 59, 59, 999);

      const chatCount = await models.communitys.count({
        where: {
          createdAt: {
            [Op.gte]: startDate,
            [Op.lte]: endDate,
          },
          category: "잡담",
        },
      });
      const askCount = await models.communitys.count({
        where: {
          createdAt: {
            [Op.gte]: startDate,
            [Op.lte]: endDate,
          },
          category: "질문",
        },
      });
      const reviewCount = await models.communitys.count({
        where: {
          createdAt: {
            [Op.gte]: startDate,
            [Op.lte]: endDate,
          },
          category: "후기",
        },
      });

      monthlyData.push({
        id: `${month}월`,
        잡담: chatCount,
        질문: askCount,
        후기: reviewCount,
      });
    }
    res.status(200).json(monthlyData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/getCommunityChart/day", async (req, res) => {
  try {
    const currentDate = new Date();
    const oneWeekAgo = new Date(currentDate);
    oneWeekAgo.setDate(currentDate.getDate() - 6);

    const dailyData = [];

    for (let day = 0; day < 7; day++) {
      const date = new Date(oneWeekAgo);
      date.setDate(oneWeekAgo.getDate() + day);

      const formattedDate = `${
        date.getMonth() + 1
      }월 ${date.getDate()}일(${getDayName(date)})`;

      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);

      const chatCount = await models.communitys.count({
        where: {
          createdAt: {
            [Op.gte]: startDate,
            [Op.lte]: endDate,
          },
          category: "잡담",
        },
      });
      const askCount = await models.communitys.count({
        where: {
          createdAt: {
            [Op.gte]: startDate,
            [Op.lte]: endDate,
          },
          category: "질문",
        },
      });
      const reviewCount = await models.communitys.count({
        where: {
          createdAt: {
            [Op.gte]: startDate,
            [Op.lte]: endDate,
          },
          category: "후기",
        },
      });

      dailyData.push({
        id: formattedDate,
        잡담: chatCount,
        질문: askCount,
        후기: reviewCount,
      });
    }
    console.log("ddd", dailyData);
    res.status(200).json(dailyData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getCommunityChart/table", async (req: Request, res: Response) => {
  console.log("왓다");
  try {
    const data = await models.communitys.findAll({
      include: [
        {
          nest: true,
          model: models.users,
          attributes: ["id", "nick", "name"],
        },
      ],
      order: [["view", "DESC"]],
      limit: 5,
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
    console.log("data===", transformedData);
    res.status(200).json(transformedData);
  } catch (error) {
    res.status(500);
  }
});

// 시간체크 후 자동마감함수
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
