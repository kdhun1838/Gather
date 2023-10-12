import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import models from "../models";

router.get("/list", async (req: Request, res: Response, next: NextFunction) => {
  console.log("도착");
  try {
    const registerData = await models.registers.findAll({});
    console.log("백 registerData===", registerData);
    res.status(200).json(registerData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "에러" });
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const {
    title,
    category,
    personnel,
    online,
    position,
    contact,
    period,
    content,
  } = req.body.form;
  // console.log(
  //   "register 백도착",
  //   req.body,
  //   "sssssssss",
  //   title,
  //   category,
  //   personnel,
  //   online,
  //   position,
  //   contact,
  //   period,
  //   content
  // );
  try {
    const newRegister = await models.registers.create({
      title,
      category,
      personnel,
      meeting: online,
      position,
      contact,
      period,
      content,
    });
    res.status(200).json(newRegister);
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});

router.get(
  "/post/:postId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.query;
    console.log("ddvvsvsv", postId);
    try {
      const getFormData = await models.registers.findOne({
        where: { registerNum: postId },
      });
      getFormData.view += 1;
      await getFormData.save();
      res.status(200).json(getFormData);
    } catch (e) {
      console.error(e);
    }
  }
);

router.post(
  "/close/:postId",
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.body.postId; // req.params를 사용하여 URL 파라미터 가져옴
    try {
      const postClose = await models.registers.update(
        { state: 2, updatedAt: new Date() },
        {
          where: { registerNum: postId },
        }
      );
      res.status(200).json(postClose);
    } catch (e) {
      console.error(e);
      res.status(500).json(e);
    }
  }
);

router.post(
  "/delete/:postId",
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.body.postId; // req.params를 사용하여 URL 파라미터 가져옴
    console.log("22222222222222", postId);
    try {
      const postDelete = await models.registers.destroy({
        where: { registerNum: postId },
      });
      res.status(200).json(postDelete);
    } catch (e) {
      console.error(e);
      res.status(500).json(e);
    }
  }
);

export default router;
