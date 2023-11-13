import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();

import models from '../models'; // 수정된 부분: Users 클래스를 가져옴
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { countVisitors } from '../middleware/countvisitor';
dotenv.config();

function getJwtSecret(): string {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in the environment variables.');
  }
  return jwtSecret;
}

/* GET users listing. */
router.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id, password } = req.body.login;

    try {
      // 데이터베이스에서 사용자 찾기
      const user = await models.users.findOne({
        where: { id },
      });
      const hash = await bcrypt.compare(password, user.password);

      if (!user) {
        // 사용자가 없는 경우
        res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
        return;
      }

      // 비밀번호 검사 (실제 비밀번호 검사 로직이 필요)
      if (!hash) {
        res.status(401).json({ error: '비밀번호가 일치하지 않습니다.' });
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
            expiresIn: '7d',
          }
        );

        res.cookie('accessToken', accessToken, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          secure: false,
          httpOnly: true,
        });
        res.status(200).json(accessToken);
      }
    } catch (error) {
      // 데이터베이스 쿼리 중 오류 발생 시
      console.error('로그인 오류:', error);
      res.status(500).json({ error: '서버 오류' });
    }
  }
);

router.post(
  '/signup',
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      id,
      password,
      name,
      nick,
      email,
      tel,
      age,
      addr,
      gender,
      addr_detail,
    } = req.body;
    const agetoNum = +age;
    try {
      const User = await models.users.findOne({ where: { id } });

      if (User) {
        res.status(409).json('중복된 id 입니다.');
        return;
      } else {
        const hash = await bcrypt.hash(password, 15);
        const newSignup = await models.users.create({
          id,
          password: hash,
          name,
          nick,
          email,
          tel,
          age: agetoNum,
          grade: 1,
          addr: addr + addr_detail,
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
            expiresIn: '7d',
          }
        );
        res.cookie('accessToken', accessToken, {
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
  '/check',
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.cookies.accessToken;
    if (!user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    res.json(jwt.verify(user, getJwtSecret()));
  }
);

router.post(
  '/logout',
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie('accessToken');
    res.status(204).json('good');
  }
);

router.post(
  '/userupdate',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id, name, nick, email, tel, addr, addr_detail, gender } = req.body;

    try {
      const updateData = {
        name,
        nick,
        email,
        tel,
        addr: addr + addr_detail,
        gender,
      };
      const [updateRows] = await models.users.update(updateData, {
        where: { id },
      });
      const updatedUser = await models.users.findOne({
        where: { id },
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.post(
  '/userdel',
  async (req: Request, res: Response, next: NextFunction) => {
    const { userNum } = req.body;
    try {
      const delData = await models.users.destroy({ where: { userNum } });
      res.status(200).json({ delData });
    } catch (error) {
      // 서버 오류 시 500 상태 코드와 오류 메시지를 보냄
      res.status(500).json({ error: '서버 오류' });
    }
  }
);

router.post(
  '/findid',
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, tel } = req.body;
    try {
      const user = await models.users.findOne({
        where: { email, tel },
      });
      if (!user) {
        res.status(404).json({
          error: '해당 이메일과 번호로 등록된 사용자를 찾을 수 없습니다.',
        });
        return;
      }
      res.status(200).json({ id: user.id });
    } catch (error) {
      res.status(500).json({ error: '서버 오류' });
    }
  }
);

router.post(
  '/findpassword',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;
    try {
      const user = await models.users.findOne({
        where: { id },
      });

      if (!user) {
        res.status(404).json({
          error: '해당 아이디로 등록된 사용자를 찾을 수 없습니다.',
        });
        return;
      }

      res.status(200).json({ password: user.password });
    } catch (error) {
      console.error('비밀번호 찾기 오류:', error);
      res.status(500).json({ error: '서버 오류' });
    }
  }
);

export default router;
