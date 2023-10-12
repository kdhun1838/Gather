import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import models from '../models'; // 수정된 부분: Users 클래스를 가져옴

/* GET users listing. */
router.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    console.log('login===========================', req.body);
    const { id, password } = req.body.login;

    try {
      // 데이터베이스에서 사용자 찾기
      const user = await models.users.findOne({
        where: { id },
      });

      if (!user) {
        // 사용자가 없는 경우
        res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
        return;
      }

      // 비밀번호 검사 (실제 비밀번호 검사 로직이 필요)
      if (user.password !== password) {
        res.status(401).json({ error: '비밀번호가 일치하지 않습니다.' });
        return;
      }

      // 로그인 성공 시 사용자 정보 반환
      res.status(200).json(user);
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
    const { id, password, name, nick, email, tel, age, grade } = req.body;
    console.log('register==================', req.body);
    const agetoNum = +age;
    console.log('agetoNum==', agetoNum);
    try {
      const newSignup = await models.users.create({
        id,
        password,
        name,
        nick,
        email,
        tel,
        age,
        grade,
      });
      res.status(200).json(newSignup);
    } catch (error) {
      res.status(500).json(error);
      next(error);
    }
  }
);

export default router;
