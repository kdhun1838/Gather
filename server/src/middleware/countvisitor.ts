import { NextFunction, Request, Response } from "express";
import models from "../models";

export const countVisitors = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log("카운트");
  const now = new Date();
  const date = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
  let today = new Date();
  today.setHours(23, 59, 59, 0);
  try {
    if (!req.cookies.countDate) {
      console.log("카운트없음");
      res.cookie("countDate", date, {
        expires: today,
        httpOnly: true,
      });

      const data = await models.visitors.findOne({
        where: { date: date },
      });

      if (!data) {
        const newData = await models.visitors.create({
          visitor_count: 0,
          user_count: 0,
          total_count: 0,
          date,
        });

        if (req.cookies.accessToken) {
          console.log("토큰잇음");
          newData.user_count++;
          newData.total_count++;
          res.cookie("isCounted", 1, {
            expires: today,
            httpOnly: true,
          });
        } else {
          console.log("토큰없음");
          newData.visitor_count++;
          newData.total_count++;
        }
        newData.save();
      } else {
        if (req.cookies.accessToken) {
          console.log("토큰잇음22");
          data.user_count++;
          data.total_count++;
          res.cookie("isCounted", 1, {
            expires: today,
            httpOnly: true,
          });
        } else {
          console.log("토큰없음");
          data.visitor_count++;
          data.total_count++;
        }

        data.save();
      }
    } else {
      if (req.cookies.accessToken && !req.cookies.isCounted) {
        console.log("게스트만 추가햇엇음");
        const data = await models.visitors.findOne({
          where: { date },
        });
        data.user_count++;
        data.visitor_count--;
        data.save();

        res.cookie("isCounted", 1, {
          expires: today,
          httpOnly: true,
        });
      }
    }
  } catch (error) {
    console.error(error);
  }

  next();
};
