import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import models from '../models';
import { Op } from 'sequelize';
import cron from 'node-cron';
import { countVisitors } from '../middleware/countvisitor';

type QueryData = {
  mainSort: string;
  detailSort: DetailSort;
  search: string;
  recruit: string;
};

type DetailSort = {
  time: string;
  view: string;
  like: string;
};

router.get('/list', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: QueryData = req.query.data as unknown as QueryData;
    const mainSort: string = data.mainSort || '';
    const search: string = data.search || '';
    const recruit: string = data.recruit || '';
    const time: string = data.detailSort?.time || '';
    const view: string = data.detailSort?.view || '';
    const like: string = data.detailSort?.like || '';

    let where: any = {};
    let order: any = [['createdAt', 'DESC']];

    if (mainSort && mainSort !== '전체') {
      where.category = mainSort;
    }

    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}` } },
        { content: { [Op.like]: `%${search}` } },
      ];
    }
    if (recruit === 'true') {
      where.state = 1;
    } else {
      where.state < 3;
    }

    if (time === 'newset') {
      order = [['createdAt', 'DESC']];
    } else if (time === 'latest') {
      order = [['createdAt', 'ASC']];
    } else if (view === 'highest') {
      order = [['view', 'DESC']];
    } else if (view === 'lowest') {
      order = [['view', 'ASC']];
    } else if (like === 'highest') {
      order = [['favorite', 'DESC']];
    } else if (like === 'lowest') {
      order = [['favorite', 'ASC']];
    }

    const registerData = await models.registers.findAll({
      where,
      order,
    });
    res.status(200).json(registerData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '에러' });
  }
});

router.get(
  '/popularList',
  countVisitors,
  async (req: Request, res: Response, next: NextFunction) => {
    const today = new Date();
    today.setHours(today.getHours() + 9);
    try {
      const popularData = await models.registers.findAll({
        where: {
          period: {
            [Op.gte]: today.toISOString().split('T')[0],
          },
          state: 1,
        },
        order: [['favorite', 'DESC']],
        limit: 10,
      });
      res.status(200).json(popularData);
    } catch (error) {
      res.status(500).json({ error: '에러' });
    }
  }
);

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const {
    title,
    category,
    personnel,
    online,
    position,
    contact,
    period,
    content,
  } = req.body.form.form;
  const userNum = req.body.userNum;
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
      userNum,
    });
    res.status(200).json(newRegister);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
    next(error);
  }
});

router.get(
  '/post/:postId',
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.query;
    try {
      const getFormData = await models.registers.findOne({
        where: { registerNum: postId },
        include: [
          {
            nest: true,
            model: models.users,
            attribute: ['name'],
          },
        ],
      });
      const getComment = await models.registerComments.findAll({
        where: { registerNum: postId },
        include: [
          {
            nest: true,
            model: models.registers,
            attribute: ['registerNum'],
          },
          {
            nest: true,
            model: models.users,
            attribute: ['name'],
          },
        ],
      });
      getFormData.view += 1;
      await getFormData.save();
      res.status(200).json({ getFormData, getComment });
    } catch (e) {
      console.error(e);
    }
  }
);

router.post(
  '/close/:postId',
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.body.postId; // req.params를 사용하여 URL 파라미터 가져옴
    try {
      const post = await models.registers.findOne({
        where: { registerNum: postId },
      });
      if (!post) {
        return res.status(404).json({ error: '게시물을 찾을 수 없습니다.' });
      }
      if (post.state === 1) {
        await models.registers.update(
          { state: 2, updatedAt: new Date() },
          {
            where: { registerNum: postId },
          }
        );
      } else if (post.state === 2) {
        await models.registers.update(
          { state: 1, updatedAt: new Date() },
          {
            where: { registerNum: postId },
          }
        );
      }
      const updatedPost = await models.registers.findOne({
        where: { registerNum: postId },
      });
      res.status(200).json(updatedPost);
    } catch (e) {
      console.error(e);
      res.status(500).json(e);
    }
  }
);

router.post(
  '/delete/:postId',
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.body.postId; // req.params를 사용하여 URL 파라미터 가져옴
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

router.post(
  '/postComment/:postId',
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId, userNum, comment } = req.body;
    try {
      const postComment = await models.registerComments.create({
        userId: userNum,
        comment,
        registerNum: postId,
      });
      res.status(200).json(postComment);
    } catch (e) {
      console.error(e);
    }
  }
);

router.post('/modifyForm/:postId', async (req: Request, res: Response) => {
  const {
    title,
    category,
    personnel,
    online,
    position,
    contact,
    period,
    content,
  } = req.body.form.form;
  const postId = req.body.postId;
  try {
    const modifyForm = await models.registers.update(
      {
        title,
        category,
        personnel,
        meeting: online,
        position,
        contact,
        period,
        content,
      },
      { where: { registerNum: postId } }
    );
    res.status(200).json(modifyForm);
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

const updateExpiredStates = async () => {
  try {
    const currentDate = new Date();
    const currentDateString = new Date(
      currentDate.getTime() + 9 * 60 * 60 * 1000
    )
      .toISOString()
      .split('T')[0];
    const expiredRegisters = await models.registers.findAll({
      where: {
        state: {
          [Op.ne]: 2,
        },
        period: {
          [Op.lt]: currentDateString,
        },
      },
    });
    for (const register of expiredRegisters) {
      await register.update({ state: 2 });
    }

    console.log(
      `${expiredRegisters.length}개의 레코드의 state가 2로 변경되었습니다.`
    );
  } catch (e) {
    console.error('오류가 발생했습니다:', e);
  }
};

cron.schedule('27 * * * *', () => {
  updateExpiredStates();
});

export default router;
