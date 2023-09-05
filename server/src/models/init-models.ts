import { Sequelize, DataTypes } from "sequelize";
import { boardsModel } from "./boards"; // 소문자 모델명 사용
import { usersModel } from "./users"; // 소문자 모델명 사용

function initModels(sequelize: Sequelize) {
  const boards = boardsModel(sequelize); // 소문자 모델명 사용
  const users = usersModel(sequelize); // 소문자 모델명 사용

  return {
    boards,
    users,
  };
}

export default initModels;
export { initModels };
