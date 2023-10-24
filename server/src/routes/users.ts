import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import models from "../models";

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const usersData = await models.users.findAll({
      attributes: [
        "userNum",
        "id",
        "name",
        "nick",
        "email",
        "tel",
        "age",
        "grade",
        "addr",
        "gender",
        "createdAt",
        "updatedAt",
      ],
    });
    console.log("하하하", usersData);
    res.status(200).json(usersData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

export default router;
