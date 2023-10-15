import express, { Request, Response, NextFunction } from "express";
const { Op } = require("sequelize");
const router = express.Router();
import models from "../models";

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

// 각각 req, res, next express에서 가저온 타입 넣어주기

router.get("/list", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: QueryData = req.query.data as QueryData;
    const mainSort: string = data.mainSort || "";
    const search: string = data.search || "";

    const time: string = data.detailSort?.time || "";
    const view: string = data.detailSort?.view || "";
    const like: string = data.detailSort?.like || "";

    const whereCondition: any = {};
    let orderCondition: any = [["createdAt", "DESC"]];
    console.log("sss");
    // 큰틀의 정렬 값 where절에 넣기
    if (mainSort && mainSort !== "전체") {
      whereCondition.category = mainSort;
    }

    // 검색어가 있을 경우 where절에 입력값넣기
    if (search) {
      // $or 연산자를 사용하여 title 또는 content 중 하나에 포함된 경우를 검사
      whereCondition[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } },
      ];
    }

    //디테일 정렬 버튼 값을 가져와서 order값에 넣고 정렬
    if (time === "newset") {
      orderCondition = [["createdAt", "DESC"]];
    } else if (time === "latest") {
      orderCondition = "";
    }

    const getCommunityPosts = await models.community.findAll({
      where: whereCondition,
      order: orderCondition,
    });

    res.status(200).json(getCommunityPosts);
  } catch (e) {
    res.status(500).json(e);
    next(e);
  }
});

router.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    const { category, title, detail, content } = req.body.form;
    try {
      const newCommunityPost = await models.community.create({
        category,
        detail,
        title,
        content,
      });
      res.status(200).json({
        message: "성공적으로 저장되었습니다.",
        data: newCommunityPost,
      });
    } catch (e) {
      res.status(500).json(e);
      console.log(e);
      next(e);
    }
  }
);

export default router;
