import createError from "http-errors";
import express, { Express, Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

import usersRouter from "./routes/users";
import boardsRouter from "./routes/boards";
import registerRouter from "./routes/register";
import communityRouter from "./routes/community";
import authRouter from "./routes/auth";
import adminRouter from "./routes/admin";
import models from "./models";
import { countVisitors } from "./middleware/countvisitor";

// import { sequelize } from "../dist/models";

const app: Express = express();
app.set("port", 3003);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/users", usersRouter);
app.use("/boards", boardsRouter);
app.use("/register", registerRouter);
app.use("/community", communityRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// error handler
app.use(
  (
    err: createError.HttpError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
  }
);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});

// async function countVisitors(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> {
//   if (!req.cookies.count) {
//     console.log("카운터");
//     res.cookie("count", "", { maxAge: 86400000, httpOnly: true }); // 24 hours in milliseconds

//     const now = new Date();
//     const date = `${now.getFullYear()}/${now.getMonth()}/${now.getDate()}`;

//     if (date !== req.cookies.countDate) {
//       res.cookie("countDate", date, { maxAge: 86400000, httpOnly: true }); // 24 hours in milliseconds

//       try {
//         const [visitor, created] = await models.visitors.findOrCreate({
//           where: { name: "vistors" },
//           defaults: {
//             total_count: 1,
//             today_count: 1,
//             date: date,
//           },
//         });
//         console.log("created=========", created);

//         if (!created) {
//           visitor.total_count++;
//           if (visitor.date === date) {
//             visitor.today_count++;
//           } else {
//             visitor.today_count = 1;
//             visitor.date = date;
//           }
//           await visitor.save();
//         }
//       } catch (error) {
//         return next(error);
//       }
//     }
//   }
//   next();
// }

export default app;
