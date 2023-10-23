import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import models from "../models"; // 수정된 부분: Users 클래스를 가져옴

/* GET users listing. */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const usersData = await models.users.findAll({}); // Users 클래스를 사용
    res.status(200).json(usersData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

export default router;
