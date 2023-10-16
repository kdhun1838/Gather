import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import models from "../models"; // 수정된 부분: Users 클래스를 가져옴
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

console.log("jwtsecret", process.env.JWT_SECRET);

function getJwtSecret(): string {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
  }
  return jwtSecret;
}

/* GET users listing. */
router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("login===========================", req.body);
    const { id, password } = req.body.login;

    try {
      // 데이터베이스에서 사용자 찾기
      const user = await models.users.findOne({
        where: { id },
      });
      const hash = await bcrypt.compare(password, user.password);

      if (!user) {
        // 사용자가 없는 경우
        res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
        return;
      }

      // 비밀번호 검사 (실제 비밀번호 검사 로직이 필요)
      if (!hash) {
        res.status(401).json({ error: "비밀번호가 일치하지 않습니다." });
        return;
      } else {
        const accessToken = jwt.sign(
          {
            userNum: user.userNum,
            id: user.id,
            name: user.name,
            nick: user.nick,
            email: user.email,
            tel: user.tel,
            age: user.age,
            grade: user.grade,
            addr: user.addr,
            gender: user.gender,
          },
          getJwtSecret(),
          {
            expiresIn: "7d",
          }
        );

        res.cookie("accessToken", accessToken, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          secure: false,
          httpOnly: true,
        });
        res.status(200).json(accessToken);
      }
    } catch (error) {
      // 데이터베이스 쿼리 중 오류 발생 시
      console.error("로그인 오류:", error);
      res.status(500).json({ error: "서버 오류" });
    }
  }
);

router.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id, password, name, nick, email, tel, age, grade, addr, gender } =
      req.body;
    console.log("register==================", req.body);
    const agetoNum = +age;
    try {
      const User = await models.users.findOne({ where: { id } });
      if (User) {
        console.log("중복");
        res.status(409).json("중복된 id 입니다.");
        return;
      } else {
        const hash = await bcrypt.hash(password, 15);
        console.log("hash==========", hash);
        const newSignup = await models.users.create({
          id,
          password: hash,
          name,
          nick,
          email,
          tel,
          age: agetoNum,
          grade,
          addr,
          gender,
        });

        const accessToken = jwt.sign(
          {
            id: newSignup.id,
            name: newSignup.name,
            nick: newSignup.nick,
            email: newSignup.email,
            tel: newSignup.tel,
            age: newSignup.age,
            grade: newSignup.grade,
            addr: newSignup.addr,
            gender: newSignup.gender,
          },
          getJwtSecret(),
          {
            expiresIn: "7d",
          }
        );
        console.log("accessToken", accessToken);
        res.cookie("accessToken", accessToken, {
          expires: new Date(Date.now() + 3600000),
          secure: false,
          httpOnly: true,
        });
        res.status(200).json({ accessToken });
        return;
      }
    } catch (error) {
      res.status(500).json(error);
    }
    next();
  }
);

router.get(
  "/check",
  async (req: Request, res: Response, next: NextFunction) => {}
);

export default router;
