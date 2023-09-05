import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import users from "../models";

/* GET users listing. */
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("respond with a resource");
});

router.get("/user", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await users.findAll({});
    res.status(200).json(user);
    console.log(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

export default router;
