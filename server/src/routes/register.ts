import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import models from "../models";
import { Op } from "sequelize";

type QueryData = {
  mainSort: string;
  detailSort: DetailSort;
  search: string;
};

type DetailSort = {
  time: string;
  view: string;
  like: string;
};

router.get("/list", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: QueryData = req.query.data as QueryData;
    const mainSort: string = data.mainSort || "";
    const search: string = data.search || "";

    const time: string = data.detailSort?.time || "";
    const view: string = data.detailSort?.view || "";
    const like: string = data.detailSort?.like || "";

    let where: any = {};
    let order: any = [["createdAt", "DESC"]];

    if (mainSort && mainSort !== "전체") {
      if (mainSort === "운동") {
        where.category = "sport";
        console.log("where===운동", where);
      } else if (mainSort === "게임") {
        where.category = "game";
        console.log("where===게임", where);
      } else if (mainSort === "스터디") {
        where.category = "study";
        console.log("where===스터디", where);
      } else {
        where.category = "etc";
        console.log("where===기타", where);
      }
    } else if (mainSort && mainSort === "전체") {
      console.log("전체");
      where = {};
    }
    console.log("if밖 where", where);

    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}` } },
        { content: { [Op.like]: `%${search}` } },
      ];
    }

    if (time === "newset") {
      order = [["createdAt", "DESC"]];
    } else if (time === "latest") {
      order = [["createdAt", "ASC"]];
    } else if (view === "highest") {
      order = [["view", "DESC"]];
    } else if (view === "lowest") {
      order = [["view", "ASC"]];
    } else if (like === "highest") {
      order = [["favorite", "DESC"]];
    } else if (like === "lowest") {
      order = [["favorite", "ASC"]];
    }

    const registerData = await models.registers.findAll({
      where,
      order,
    });
    res.status(200).json(registerData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "에러" });
  }
});

router.get(
  "/popularList",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("인기글 백입니다.");
    try {
      const popularData = await models.registers.findAll({
        order: [["favorite", "DESC"]],
        limit: 10,
      });
      res.status(200).json(popularData);
    } catch (error) {
      res.status(500).json({ error: "에러" });
    }
  }
);

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { title, category, personnel, online, position, contact, content } =
    req.body.form;
  console.log(
    "register 백도착",
    req.body,
    "sssssssss",
    title,
    category,
    personnel,
    online,
    position,
    contact,
    content
  );
  try {
    const newRegister = await models.registers.create({
      title,
      category,
      personnel,
      meeting: online,
      position,
      contact,
      content,
    });
    res.status(200).json(newRegister);
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});

export default router;
