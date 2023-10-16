import express, { Request, Response, NextFunction } from "express";
const { Op } = require("sequelize");
const router = express.Router();
import models from "../models";
import { Users } from "../models/users";

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

    if (view === "highest") {
      orderCondition.push(["view", "DESC"]);
    } else if (view === "lowest") {
      orderCondition.push(["view", "ASC"]);
    }
    const getCommunityPosts = await models.communitys.findAll({
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
    const userId = 17;
    try {
      const newCommunityPost = await models.communitys.create({
        category,
        detail,
        title,
        content,
        userId,
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

router.get(
  "/post/:postId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params; // req.params를 사용하여 postId를 가져옵니다.

    if (postId) {
      try {
        const getPost = await models.communitys.findOne({
          where: { communityNum: postId },
        });

        const getComment = await models.communityComments.findAll({
          where: { postId },
          nest: true,
          include: [
            {
              nest: true,
              model: models.users,
              attributes: ["nick"],
            },
          ],
        });
        console.log("getComment===========", getComment);
        if (getPost) {
          await getPost.increment("view", { by: 1 });

          // 모델 이름을 일관되게 사용합니다 (community)
          const updatedPost = await models.communitys.findOne({
            where: { communityNum: postId },
          });

          res.status(200).json({ updatedPost, getComment });
        } else {
          res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
        }
      } catch (e) {
        res.status(500).json(e);
        console.log(e);
        next(e);
      }
    }
  }
);

router.get(
  "/popularPosts",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const today = new Date();
      const startDate = new Date(today);
      const endDate = new Date(today);
      const dayOfWeek = today.getDay();

      // 시작일을 일요일로 설정
      startDate.setDate(today.getDate() - dayOfWeek + 1);

      // 종료일을 토요일로 설정
      endDate.setDate(today.getDate() + (6 - dayOfWeek));

      // 시작일과 종료일을 각각 주의 처음과 끝으로 설정
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      console.log(startDate, endDate);

      const getPopularPost = await models.communitys.findAll({
        where: {
          createdAt: {
            [Op.between]: [startDate, endDate], // 이번 주의 시작일과 종료일 사이
          },
        },
        order: [["view", "DESC"]],
        limit: 10,
      });

      res.status(200).json(getPopularPost);
    } catch (e) {
      res.status(500).json(e);
      console.log(e);
      next(e);
    }
  }
);

router.post(
  "/addComment",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body.comment);
    const { userId, postId, comment } = req.body.comment.data;
    try {
      const newCommunityComment = await models.communityComments.create({
        content: comment,
        userId,
        postId,
      });
      res.status(200).json({
        message: "성공적으로 저장되었습니다.",
        data: newCommunityComment,
      });
    } catch (e) {
      res.status(500).json(e);
      console.log(e);
      next(e);
    }
  }
);

export default router;
