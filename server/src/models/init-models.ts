import { Sequelize, DataTypes } from "sequelize";
import { BoardModel } from "./board";
import { UserModel } from "./user";

function initModels(sequelize: Sequelize) {
  const board = BoardModel(sequelize);
  const user = UserModel(sequelize);

  return {
    board,
    user,
  };
}

export default initModels;
export { initModels };
