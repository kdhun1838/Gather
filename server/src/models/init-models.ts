import { Sequelize, DataTypes } from "sequelize";
import { boardsModel } from "./boards";
import { usersModel } from "./users";
import { registersModel } from "./registers";
import { communitysModel } from "./community";
import { CommentsModel } from "./registerComments";

function initModels(sequelize: Sequelize) {
  const boards = boardsModel(sequelize);
  const users = usersModel(sequelize);
  const registers = registersModel(sequelize);
  const community = communitysModel(sequelize);
  const registerComments = CommentsModel(sequelize);

  registers.hasMany(registerComments, { foreignKey: "registerNum" });
  registerComments.belongsTo(registers, { foreignKey: "registerNum" });

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
