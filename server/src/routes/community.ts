import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import models from "../models";

// 각각 req, res, next express에서 가저온 타입 넣어주기

router.get("/list", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getCommunityPosts = await models.community.findAll({});
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
