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
    res.status(200);
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});

export default router;
