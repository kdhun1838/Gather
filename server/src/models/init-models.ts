import { Sequelize, DataTypes } from "sequelize";
import { boardsModel } from "./boards"; // 소문자 모델명 사용
import { usersModel } from "./users"; // 소문자 모델명 사용
import { registersModel } from "./registers";
import { communitysModel } from "./community";
import { CommentsModel } from "./registerComments";

function initModels(sequelize: Sequelize) {
  const boards = boardsModel(sequelize); // 소문자 모델명 사용
  const users = usersModel(sequelize); // 소문자 모델명 사용
  const registers = registersModel(sequelize);
  const community = communitysModel(sequelize);
  const registerComments = CommentsModel(sequelize);

  return {
    boards,
    users,
    registers,
    community,
    registerComments,
  };
}

export default initModels;
export { initModels };
